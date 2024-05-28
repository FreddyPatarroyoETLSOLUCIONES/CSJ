import base64
import json
import re
from copy import copy

import requests
from django.urls import reverse
from rest_framework import status
from rest_framework.exceptions import APIException
from slugify import slugify

from apps.accounts.helpers.users import get_user_from_request
from apps.elastic.helpers import get_image_base64
from utils.constants.elastic_server import ELASTIC_SERVER_URL, ELASTIC_SERVER_USER, ELASTIC_SERVER_PASSWORD, PAGE_SIZE
from utils.helpers.elastic_server_logs_helper import ElasticServerLogsHelper
from utils.helpers.singleton import Singleton

EXCLUDED_HIGHLIGHTS_WORDS = ['para', 'por', 'los', 'las', 'que', 'del', 'unos', 'unas', 'c', 'class', 'ct', 'yellow', 'fw', 'medium']


class ElasticServerHelper(metaclass=Singleton):
    headers = {}

    def __init__(self):
        user_password = f'{ELASTIC_SERVER_USER}:{ELASTIC_SERVER_PASSWORD}'
        self.headers = {'Authorization': f'Basic {base64.b64encode(bytes(user_password, "utf-8")).decode("utf-8")}'}

    def fetch_data_ndjson(self, endpoint: str, payload: dict, method='GET', request=None):
        headers_ndjson = {**{'Content-Type': 'application/x-ndjson'}, **self.headers}
        parsed_data = self.parse_ndjson_payload(payload)
        response = requests.request(method, f'{ELASTIC_SERVER_URL}{endpoint}', headers=headers_ndjson, data=parsed_data, verify=False)
        if response.status_code == status.HTTP_200_OK:
            for r in response.json().get('responses', []):
                if 'error' in r:
                    log_data = {
                        "funcionalidad": "Error",
                        "accion": "Error",
                        "error": True,
                        "descripcion_error": "Backend Error - Obtener datos Elastic API",
                        "json_valor_inicial": f"{'descripcion_error' : {str(r)}'}"
                    }
                    ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request), descripcion_error='Backend Error - Obtener datos Elastic API', es_error='Si')
                    raise APIException(r['error']['caused_by']['reason'])
            return response.json()
        log_data = {
            "funcionalidad": "Error",
            "accion": "Error",
            "error": True,
            "descripcion_error": "Backend Error - Obtener datos Elastic API",
            "json_valor_inicial": f"{'descripcion_error' : {str(response.reason)}'}"
        }
        ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request), descripcion_error='Backend Error - Obtener datos Elastic API', es_error='Si')
        raise APIException(response.reason)

    def fetch_data(self, endpoint: str, payload: dict, request=None):
        headers_json = {**{'Content-Type': 'application/json'}, **self.headers}
        parsed_data = json.dumps(payload)
        response = requests.post(f'{ELASTIC_SERVER_URL}{endpoint}', headers=headers_json, data=parsed_data, verify=False)
        if response.status_code == status.HTTP_200_OK:
            if 'error' in response.json():
                log_data = {
                    "funcionalidad": "Error",
                    "accion": "Error",
                    "error": True,
                    "descripcion_error": "Backend Error - Obtener datos Elastic API",
                    "json_valor_inicial": f"{'descripcion_error' : {str(response.reason)}'}"
                }
                ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request), descripcion_error='Backend Error - Obtener datos Elastic API', es_error='Si')
                raise APIException(response.reason)
            return response.json()

        log_data = {
            "funcionalidad": "Error",
            "accion": "Error",
            "error": True,
            "descripcion_error": "Backend Error - Obtener datos Elastic API",
            "json_valor_inicial": {'descripcion_error' : {str(response.reason)}}
        }
        ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request), descripcion_error='Backend Error - Obtener datos Elastic API', es_error='Si')
        raise APIException(response.reason)

    @staticmethod
    def get_offset(page: int, limit: int = PAGE_SIZE):
        if page < 1:
            raise APIException('Page not valid!')
        return (page - 1) * limit

    def clean_msearch(self, data, page: int, source_key: str, offset: int, deep: int = 0):
        total_records = data['responses'][deep]['hits']['total']['value']
        if source_key == 'sala':
            return {
                'results': [{'id': value['_id'], 'value': value['_source'][source_key], 'magistrados_salvamento': value['_source']['magistrados_salvamento'], 'tipo_salas': value['_source']['tipo_salas']} for value in data['responses'][deep]['hits']['hits']],
                'total_records': total_records,
                **self.get_next_previous_page(page, offset, total_records)
            }
        elif source_key == 'sala_conocimiento':
            return {
                'results': [{'id': value['_id'], 'value': ', '.join([value['_source']['seccion'], value['_source']['subseccion']]) if value['_source']['subseccion'] else value['_source']['seccion']} for value in data['responses'][deep]['hits']['hits']],
                'total_records': total_records,
                **self.get_next_previous_page(page, offset, total_records)
            }
        else:
            return {
                'results': [{'id': value['_id'], 'value': value['_source'][source_key]} for value in data['responses'][deep]['hits']['hits']],
                'total_records': total_records,
                **self.get_next_previous_page(page, offset, total_records)
            }

    def clean_search(self, data, page: int, offset: int, text_to_search: str, request, query: None, limit=None):
        total_records = data['hits']['total']['value']
        dynamic_filters = data.get('aggregations', [])
        results = [{**result['_source'],**{'_index': result['_index'], '_id': result['_id']}} for result in data['hits']['hits']]
        if text_to_search:
            list_text_to_search = [word.strip() for word in text_to_search.split() if len(word) >= 3 and slugify(word) not in EXCLUDED_HIGHLIGHTS_WORDS]
        for result in results:
            if result.get('anexo1'):
                files = []
                try:
                    data_anexo1 = json.loads(result['anexo1'])
                    for data in data_anexo1:
                        file_path = f"/csj_fs/{data['url'].split('/csjanaliticadevfs/')[1]}"
                        data['public_url'] = f'?filepath={file_path}'

                        if data.get('tipo', '').upper() == 'MP4' and ('VIDEOTECA' in data.get('url', '') or 'HOLOCAUSTO' in data.get('url', '')):
                            download_file_url = f"{request.build_absolute_uri('/')[:-1]}{reverse('elastic:download')}?file_path={file_path}"
                            data['download_file_url'] = download_file_url

                        if data.get('tipo', None):
                            data['tipo'] = data['tipo'].lower()

                        if data.get('estructura', None):
                            data['estructura'] = data['estructura'].lower()

                        files.append(data)

                    result['anexo1'] = files
                    result['image_svg'] = get_image_base64(result['anexo1'], result.get('extra_origen_id', None))

                except:
                    result['anexo1'] = None
                    result['image_svg'] = None

            if 'documentovirtualnombre' in result and result['documentovirtualnombre']:
                files = []
                try:
                    data_anexo1 = json.loads(result['documentovirtualnombre'])
                    for data in data_anexo1:
                        file_path = f"/csj_fs/{data['url'].split('/csjanaliticadevfs/')[1]}"
                        data['public_url'] = f'?filepath={file_path}'
                        files.append(data)
                    result['documentovirtualnombre'] = files
                except:
                    result['documentovirtualnombre'] = None
            if 'referenciarelacionada' in result and result['referenciarelacionada']:
                try:
                    result['referenciarelacionada'] = json.loads(result['referenciarelacionada'])
                    for index, referenciarelacionada in enumerate(result['referenciarelacionada']):
                        if referenciarelacionada.get('EnlaceArchivoReferencia', None):
                            enlacearchivo = f"/csj_fs/PRI{referenciarelacionada['EnlaceArchivoReferencia'].split('PRI')[1]}"
                            result['referenciarelacionada'][index]['enlacearchivo'] = f"{request.build_absolute_uri('/')[:-1]}{reverse('elastic:download')}?filepath={enlacearchivo}"
                        else:
                            result['referenciarelacionada'][index]['enlacearchivo'] = None

                except:
                    result['referenciarelacionada'] = None
            if 'detalletitulacion' in result and result['detalletitulacion']:
                try:
                    detalletitulacion = json.loads(result['detalletitulacion'])
                    for index, descriptor in enumerate(detalletitulacion):
                        if 'Descriptores' in descriptor:
                            for index_des, des in enumerate(descriptor['Descriptores']):
                                new_des = copy(des)
                                for key in des.keys():
                                    new_key = slugify(key, separator='_')
                                    new_des.update({new_key: des[key]})
                                    del new_des[key]
                                detalletitulacion[index]['Descriptores'][index_des] = new_des

                    result['detalletitulacion'] = detalletitulacion
                except Exception as ex:
                    print(ex)
                    result['detalletitulacion'] = None

            if result.get('enlacearchivo', None):
                try:
                    file_path = f"/csj_fs/{result['enlacearchivo'].split('/csjanaliticadevfs/')[1]}".replace('\\', '/')
                    result['enlacearchivo'] = f"{request.build_absolute_uri('/')[:-1]}{reverse('elastic:download')}?filepath={file_path}"
                except:
                    pass

            if result.get('archivocontenido', None):
                try:
                    clean_path = result['archivocontenido'].split('csjanaliticadevfs')[1].replace('\\','/')
                    file_path = f"/csj_fs{clean_path}"
                    result['archivocontenido'] = f"{request.build_absolute_uri('/')[:-1]}{reverse('elastic:download_file')}?filepath={file_path}"
                except:
                    pass

            if result.get('archivoportadagaceta', None):
                try:
                    clean_path = result['archivoportadagaceta'][0].split('csjanaliticadevfs')[2].replace('\\', '/')
                    file_path = f"/csj_fs{clean_path}"
                    result['archivoportadagaceta'] = f"{request.build_absolute_uri('/')[:-1]}{reverse('elastic:download_file')}?filepath={file_path}"
                except:
                    pass
            if result.get('descriptorrestrictor', None):
                try:
                    result['descriptorrestrictor'] = json.loads(re.sub(r'"([^"]+)"', r'"\1"', result['descriptorrestrictor']), strict=False)
                except:
                    result['descriptorrestrictor'] = []

            if result.get('actoadministrativocontenidos', None):
                try:
                    texto = result['actoadministrativocontenidos']
                    index_inicio = texto.find('"Observaciones":"') + len('"Observaciones":"')
                    index_fin = texto.find('"}]')
                    texto_sin_comillas = texto[:index_inicio] + texto[index_inicio:index_fin].replace('"', ' ') + texto[index_fin:]
                    result['actoadministrativocontenidos'] = json.loads(texto_sin_comillas, strict=False)
                except:
                    result['actoadministrativocontenidos'] = []

            if result.get('actoadministrativorelacionados', None):
                result['actoadministrativorelacionados'] = json.loads(re.sub(r'"([^"]+)"', r'"\1"', result['actoadministrativorelacionados']), strict=False)

            if result.get('actoadministrativoplitica', None):
                result['actoadministrativoplitica'] = json.loads(re.sub(r'"([^"]+)"', r'"\1"', result['actoadministrativoplitica']), strict=False)

            # Resaltar palabras buscadas
            if text_to_search:
                for result_key in result.keys():
                    if type(result[result_key]) == str and result_key in ['tema', 'ponente']:
                        for text in list_text_to_search:
                            words = list(set([re.sub('\W+', '', word) for word in list(set(result[result_key].split())) if slugify(text.lower()) == slugify(word.strip().lower())]))
                            for word in words:
                                result[result_key] = re.sub(word, f"<i class='ct-yellow fw-medium'>{word}</i>",  result[result_key])

        return {
            'results': results,
            'dynamic_filters': dynamic_filters,
            'query': query,
            'total_records': total_records,
            **self.get_next_previous_page(page, offset, total_records, limit)
        }

    @staticmethod
    def get_next_previous_page(page: int, offset: int, total_records: int, limit=1):
        if total_records <= 0:
            return {
                'next_page': None,
                'previous_page': None,
                'last_page': 1,
            }

        total_pages = max(1, (total_records + limit - 1) // limit)
        last_page = min(total_pages, 50000 - limit)

        return {
            'next_page': min(page + 1, last_page) if page < last_page else None,
            'previous_page': max(page - 1, 1) if page > 1 else None,
            'last_page': last_page,
        }

    @staticmethod
    def parse_ndjson_payload(payload: list):
        return '\n'.join(json.dumps(d) for d in payload) + '\n'
