import base64
import datetime
import json
import mimetypes
import os
import pathlib
import re
import shutil
import tempfile
import traceback
from copy import copy
from os.path import isfile, join

import pytz
import trml2pdf
from dateutil import parser
from django.http import HttpResponse
from django.template.loader import get_template
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from slugify import slugify

from analytics.helpers.doc_helper import page_doc, filepath_doc, limit_doc
from analytics.helpers.send_email import send_email_alert
from analytics.settings import STATICFILES_DIRS
from apps.accounts.helpers.users import get_user_from_request, get_tipo_user_from_request
from apps.administration.models import Logo
from apps.elastic.helpers import get_image_base64
from apps.elastic.serializers.serializars_search import SearchSerializer, SearchResponseSerializer, \
    FileDownloadSerializer, FileDownloadErrorSerializer, CardReportSerializer, CalificarResultadosSerializer, \
    AutocompletarSerializer, AutocompletarResponseSerializer, QuerySerializer, HistorialBusquedaResponseSerializer, \
    ImageDownloadSerializer, VideoDownloadSerializer
from utils.constants.elastic_server import PAGE_SIZE
from utils.helpers.common_serializers import MessageSerializer
from utils.helpers.elastic_server_helper import ElasticServerHelper
from utils.helpers.elastic_server_logs_helper import ElasticServerLogsHelper
from utils.helpers.mixins import PrivateMixin

ORIGENES = {
    '1': {
        'sub_origenes': [6, 7, 8, 9, 10, 11],
        'extra_origenes': [6, 7, 8, 9, 10, 11, 30, 31, 32],
        'sub_origenes__cnsj': [6, 7, 8, 9, 10, 11, 12, 13, 14],
        'extra_origenes__cnsj': [6, 7, 8, 9, 10, 11, 12, 13, 14, 30, 31, 32],
        'sub_origenes__ce': [8, 14],
        'extra_origenes__ce': [8, 14, 31, 32],
        'sub_origenes__cndj': [6, 7, 8, 9, 10, 11, 12, 13, 14],
        'extra_origenes__cndj': [6, 7, 8, 9, 10, 11, 12, 13, 14, 30, 31, 32],
        'sub_origenes__cc': [6, 7, 8, 9, 10, 11, 12, 13, 14],
        'extra_origenes__cc': [6, 7, 8, 9, 10, 11, 12, 13, 14, 30, 31, 32],

    },
    '2': {
        'sub_origenes': [15, 16, 17],
        'extra_origenes': [15, 16, 17]
    },
    '3': {
        'sub_origenes': [18, 19, 20, 21, 22, 23],
        'extra_origenes': [18, 19, 20, 21, 22, 23]
    },
    '4': {
        'sub_origenes': [24, 25, 26, 27, 28, 29],
        'extra_origenes': [24, 25, 26, 27, 28, 29]
    },
    '5': {
        'sub_origenes': [5, 0],
        'extra_origenes': [5, 0]
    }
}

def get_text_quotes(text_key, new_key, old_key, payload):
    text_to_search = payload['params'].get(text_key, None)
    text_quotes = None
    if text_to_search:
        search_quotes = re.search('"(.*)"', text_to_search)
        if search_quotes:
            text_quotes = list(search_quotes.groups())[0]
            all_text = [word for word in list(re.search('(.*)"(.*)"(.*)', text_to_search).groups()) if
                        word != text_quotes]
            text_to_search = ''.join(all_text)
            payload['params'][new_key] = text_quotes
    if text_to_search:
        del payload['params'][text_key]
        payload['params'][old_key] = text_to_search

    return payload, text_quotes, text_to_search


def parse_contenga_fields(payload, field_key):
    if f'contenga{field_key}' in payload['params']:
        for index, value in enumerate(payload['params'][f'contenga{field_key}'], 1):
            payload['params'].update({f'contenga{index}{field_key}': value})
        del payload['params'][f'contenga{field_key}']

    if f'o_contenga{field_key}' in payload['params']:
        for index, value in enumerate(payload['params'][f'o_contenga{field_key}'], 1):
            payload['params'].update({f'ocontenga{index}': value})
        del payload['params'][f'o_contenga{field_key}']

    if f'no_contenga{field_key}' in payload['params']:
        for index, value in enumerate(payload['params'][f'no_contenga{field_key}'], 1):
            payload['params'].update({f'nocontenga{index}': value})
        del payload['params'][f'no_contenga{field_key}']
    return payload


class SearchList(APIView):
    serializer_class = SearchSerializer

    @swagger_auto_schema(request_body=SearchSerializer, responses={200: SearchResponseSerializer},
                         operation_id='buscar', tags=['endpoints_buscador'], manual_parameters=[page_doc(), limit_doc()],
                         operation_description='Busca y retorna una lista de resultados que coinciden que los criterios'
                                               'de búsqueda.')
    def post(self, request):
        datetime_start = datetime.datetime.now(pytz.timezone('America/Bogota'))
        time_start = datetime_start.timestamp() * 1000
        serializer = SearchSerializer(context={'request': request}, data=request.data)
        page = int(request.GET.get('page', 1))
        origen_key = request.GET.get('origen', '').lower()
        limit = int(request.GET.get('limit', PAGE_SIZE))
        offset = ElasticServerHelper().get_offset(page, limit)
        origen_id = None

        if serializer.is_valid():

            payload = {
                'id': 'pri_search_template',
                'params': serializer.data
            }

            sub_origen_ids = list(dict.fromkeys(payload['params'].get('sub_origen_id', [])))
            extra_origen_ids = list(dict.fromkeys(payload['params'].get('extra_origen_id', [])))

            for key in list(request.data.keys()):
                if key.startswith('sub_origen_id_'):
                    sub_origen_ids.append(request.data[key])

            for origen_id in payload['params'].get('origen_id', []):
                origen = ORIGENES[str(origen_id)]
                key = f'__{origen_key}' if origen_key and origen_id == 1 else ''

                if not any(x in sub_origen_ids for x in origen[f'sub_origenes{key}']):
                    sub_origen_ids.extend(origen[f'sub_origenes{key}'])

                if not any(x in extra_origen_ids for x in origen[f'extra_origenes{key}']):
                    extra_origen_ids.extend(origen[f'extra_origenes{key}'])

            sub_origen_ids = list(dict.fromkeys(sub_origen_ids))
            extra_origen_ids = list(dict.fromkeys(extra_origen_ids))

            if str(origen_id) == '1' and 8 in sub_origen_ids and 8 in extra_origen_ids:
                if str(origen_id) == '1' and 8 in sub_origen_ids:
                    extra_origen_ids.append(31)
                    extra_origen_ids = list(dict.fromkeys(extra_origen_ids))

            if sub_origen_ids:
                payload['params']['sub_origen_id'] = sub_origen_ids

            if extra_origen_ids:
                payload['params']['extra_origen_id'] = extra_origen_ids

            payload = parse_contenga_fields(payload, '')
            payload = parse_contenga_fields(payload, '_jurisprudencia_relacionada')
            payload = parse_contenga_fields(payload, '_consideraciones')
            payload = parse_contenga_fields(payload, '_asunto')
            payload = parse_contenga_fields(payload, '_tema')
            payload = parse_contenga_fields(payload, '_parte_resolutiva')
            payload = parse_contenga_fields(payload, '_tomo')
            payload = parse_contenga_fields(payload, '_volumen')
            payload = parse_contenga_fields(payload, '_parte')
            payload = parse_contenga_fields(payload, '_formatotvp')
            payload = parse_contenga_fields(payload, '_codigodeweycompleto')
            payload = parse_contenga_fields(payload, '_titulo')
            payload = parse_contenga_fields(payload, '_autor')
            payload = parse_contenga_fields(payload, '_biblioteca')
            payload = parse_contenga_fields(payload, '_autorcorporativo')
            payload = parse_contenga_fields(payload, '_editorial')
            payload = parse_contenga_fields(payload, '_serie')
            payload = parse_contenga_fields(payload, '_salvamento')
            payload = parse_contenga_fields(payload, '_norma_demandada')
            payload = parse_contenga_fields(payload, '_tesisagrupados')
            payload = parse_contenga_fields(payload, '_descriptores')
            payload = parse_contenga_fields(payload, '_fuente_formal')

            # Extraer texto en comillas
            payload, text_quotes, text_to_search = get_text_quotes('texto_buscar', 'comillas', 'search_phrase', payload)
            payload, _, _ = get_text_quotes('jurisprudencia_relacionada', 'comillas_jurisprudencia_relacionada', 'jurisprudencia_relacionada', payload)
            payload, _, _ = get_text_quotes('consideraciones', 'comillas_consideraciones', 'consideraciones', payload)
            payload, _, _ = get_text_quotes('asunto', 'comillas_asunto', 'asunto', payload)
            payload, _, _ = get_text_quotes('tema', 'comillas_tema', 'tema', payload)
            payload, _, _ = get_text_quotes('parte_resolutiva', 'comillas_parte_resolutiva', 'parte_resolutiva', payload)
            payload, _, _ = get_text_quotes('salvamento', 'comillas_salvamento', 'salvamento', payload)
            payload, _, _ = get_text_quotes('clase_actuacion', 'comillas_clase_actuacion', 'clase_actuacion', payload)
            payload, _, _ = get_text_quotes('procedencia', 'comillas_procedencia', 'procedencia', payload)
            payload, _, _ = get_text_quotes('tomo', 'comillas_tomo', 'tomo', payload)
            payload, _, _ = get_text_quotes('volumen', 'comillas_volumen', 'volumen', payload)
            payload, _, _ = get_text_quotes('parte', 'comillas_parte', 'parte', payload)
            payload, _, _ = get_text_quotes('formatotvp', 'comillas_formatotvp', 'formatotvp', payload)
            payload, _, _ = get_text_quotes('codigodeweycompleto', 'comillas_codigodeweycompleto', 'codigodeweycompleto', payload)
            payload, _, _ = get_text_quotes('titulo', 'comillas_titulo', 'titulo', payload)
            payload, _, _ = get_text_quotes('autor', 'comillas_autor', 'autor', payload)
            payload, _, _ = get_text_quotes('biblioteca', 'comillas_biblioteca', 'biblioteca', payload)
            payload, _, _ = get_text_quotes('autorcorporativo', 'comillas_autorcorporativo', 'autorcorporativo', payload)
            payload, _, _ = get_text_quotes('editorial', 'comillas_editorial', 'editorial', payload)
            payload, _, _ = get_text_quotes('serie', 'comillas_serie', 'serie', payload)
            payload, _, _ = get_text_quotes('fuente_formal', 'comillas_fuente_formal', 'fuente_formal', payload)
            payload, _, _ = get_text_quotes('delitos', 'comillas_delitos', 'delitos', payload)
            payload, _, _ = get_text_quotes('tesisagrupados', 'comillas_tesisagrupados', 'tesisagrupados', payload)
            payload, _, _ = get_text_quotes('norma_demandada', 'comillas_norma_demandada', 'norma_demandada', payload)

            payload['params'].update({'from': offset, 'size': limit})
            if 'temas_multiple' in payload['params']:
                payload['params']['temas_multiple'] = ' OR '.join(fr'("{item}")' for item in payload['params']['temas_multiple'])

            data = ElasticServerHelper().fetch_data(endpoint='pri_search/_search/template', payload=payload, request=request)

            if text_quotes:
                text_to_search += f' {text_quotes}'
            response = ElasticServerHelper().clean_search(data, page, offset, text_to_search, request, payload, limit)

            search_payload = copy(payload['params'])
            if 'size' in search_payload:
                del search_payload['size']

            if 'from' in search_payload:
                del search_payload['from']

            log_data = {
                'tipo_usuario': get_tipo_user_from_request(request),
                'funcionalidad': 'Búsqueda general y específica',
                'accion': 'Consultar',
                'dominio': 'CSJ',
                'json_valor_inicial': payload,
                'busqueda': search_payload,
                'json_resultado': {
                    'resultados_encontrados': response['total_records']
                },
                'resultados_encontrados': response['total_records'],
                'tiempo_respuesta_ms': int((datetime.datetime.now().timestamp() * 1000) - time_start)
            }
            # send_email_alert('PRI-Alerta por demora en tiempo de respuesta a una consulta', log_data, request, True, time_start, datetime_start)
            ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request))
            return Response(response, status=status.HTTP_200_OK)

        log_data = {
            "funcionalidad": "Error",
            "accion": "Error",
            "error": True,
            "descripcion_error": "Backend Error - Buscar",
            "json_valor_inicial": {'descripcion_error': str(serializer.errors)}
        }
        ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request), descripcion_error='Backend Error - Buscar en elastic', es_error='Si')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DownloadFileView(APIView):
    @swagger_auto_schema(responses={200: FileDownloadSerializer, 400: FileDownloadErrorSerializer},
                         operation_id='download-file', tags=['endpoints_buscador'], manual_parameters=[filepath_doc()],
                         operation_description='Retorna un archivo en base64.')
    def get(self, request):
        try:
            filepath = request.GET.get('filepath', '')
            extra_origen = request.GET.get('extra_origen', None)

            if not os.path.isfile(filepath):
                return Response({'error': 'File not found'}, status=status.HTTP_400_BAD_REQUEST)
            if extra_origen == '28' and filepath.endswith('.html') and os.path.isdir(f'{os.path.dirname(filepath)}/Anexos'):
                anexos_files = [f for f in os.listdir(f'{os.path.dirname(filepath)}/Anexos') if isfile(join(f'{os.path.dirname(filepath)}/Anexos', f))]
                if len(anexos_files) == 1:
                    filepath = f'{os.path.dirname(filepath)}/Anexos/{anexos_files[0]}'
                else:
                    shutil.make_archive(f'{os.path.dirname(filepath)}/anexos', 'zip', f'{os.path.dirname(filepath)}/Anexos/')
                    filepath = f'{os.path.dirname(filepath)}/anexos.zip'

            if extra_origen == '21' and filepath.endswith('.html') and os.path.isdir(f'{os.path.dirname(filepath)}/images'):
                shutil.make_archive(f'{os.path.dirname(filepath)}/images', 'zip', f'{os.path.dirname(filepath)}/images/')
                filepath = f'{os.path.dirname(filepath)}/images.zip'

            mime_type, _ = mimetypes.guess_type(filepath)
            file_name = os.path.basename(filepath)
            encoded_string = base64.b64encode(open(filepath, 'rb').read()).decode()
            data = {
                'file_name': file_name,
                'extension': file_name.split('.')[1:][0],
                'base64_file': encoded_string,
                'mime_type': mime_type
            }
            return Response(data, status=status.HTTP_200_OK)
        except Exception as ex:
            tb = traceback.format_exc()
            log_data = {
                "funcionalidad": "Error",
                "accion": "Error",
                "error": True,
                "descripcion_error": "Backend Error - Descargar archivo",
                "json_valor_inicial": f"{'descripcion_error' : {str(tb)}'}"
            }
            ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request), descripcion_error='Backend Error - Descargar archivo', es_error='Si')
            return Response({'error': str(ex)}, status=status.HTTP_400_BAD_REQUEST)


class CardReportView(APIView):
    @swagger_auto_schema(request_body=CardReportSerializer, responses={200: FileDownloadSerializer, 400: FileDownloadErrorSerializer},
                         operation_id='card-report-download', tags=['endpoints_buscador'], manual_parameters=[filepath_doc()],
                         operation_description='Retorna un archivo en formato pdf.')
    def post(self, request):
        serializer = CardReportSerializer(data=request.data)
        if serializer.is_valid():
            corporation = self.request.GET.get('corporation', 'corte_suprema_justicia').lower()
            logo = Logo.objects.filter(corporation=corporation).first()
            if not logo:
                logo = Logo.objects.filter(corporation='corte_suprema_justicia').first()

            with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as temp_file:
                temp_file.write(logo.image)

            # La ruta del archivo temporal
            temp_file_path = temp_file.name

            filename = f'{int(datetime.datetime.now().timestamp())}.pdf'
            data = serializer.data
            data.update({
                'logo': temp_file_path,
                'date': datetime.datetime.now().strftime('%m/%d/%Y')
            })

            for item in data['items']:
                if 'fecha' in item:
                    item['fecha'] = parser.parse(item['fecha'])
            template = get_template('reports/card_report.rml')

            campos_reporte = []
            items_report = []
            for item in data['items']:
                new_item = {}
                new_item_report = {}
                for key in item.keys():
                    if key in data['fields']:
                        new_item.update({key: item[key]})
                        if item[key]:
                            if type(item[key]) == datetime.datetime:
                                item[key] = item[key].strftime("%Y-%m-%d")
                            elif type(item[key]) == list:
                                if item[key]:
                                    formatted_pairs = []
                                    for data_dict in item[key]:
                                        if data_dict is dict:
                                            formatted_pairs.append(', '.join([f"{key}: {value if value else '-'}" for key, value in data_dict.items()]))
                                        else:
                                            formatted_pairs.append(str(data_dict))
                                    item[key] = ', '.join(formatted_pairs)
                                else:
                                    item[key] = '-'
                            new_item_report.update({key: {'id': item[key], 'value': key.replace('_', ' ').upper()}})
                campos_reporte.append(new_item)
                items_report.append(new_item_report)

            data.update({'items_report': items_report})
            xmlstring = template.render(data)
            pdfstr = trml2pdf.parseString(xmlstring)
            response = HttpResponse(content_type='application/pdf')
            response.write(pdfstr)
            response['Content-Disposition'] = f'attachment; filename={filename}'
            id_registro = [item['id_pri'] for item in data['items'] if 'id_pri' in item]


            campos_reporte = json.loads(json.dumps(campos_reporte, default=str))

            log_data = {
                'funcionalidad': 'Descargar reporte',
                'accion': 'Descargar reporte',
                'id_registro': id_registro,
                'json_valor_inicial': {'id_registro': id_registro, 'campos_reporte': campos_reporte}
            }
            ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request))
            os.remove(temp_file_path)
            return response
        else:
            log_data = {
                "funcionalidad": "Error",
                "accion": "Error",
                "error": True,
                "descripcion_error": "Backend Error - Descargar providencias",
                "json_valor_inicial": {'descripcion_error': str(serializer.errors)}
            }
            ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request), descripcion_error='Backend Error - Descargar providencias', es_error='Si')
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CalificarResultadosView(APIView):
    @swagger_auto_schema(request_body=CalificarResultadosSerializer, responses={200: MessageSerializer, 400: MessageSerializer},
                         operation_id='calificar-resultados', tags=['endpoints_buscador'],
                         operation_description='Califica los resultados')
    def post(self, request):
        serializer = CalificarResultadosSerializer(data=request.data)
        if serializer.is_valid():
            payload = []
            for result in request.data['calificaciones']:
                payload.append({"update": {"_id": result["document_id"], "_index": result["index"]}})

                payload.append({
                    "script": {
                        "source": '''
                        if(params.puntaje_automatico != null){
                            if(ctx._source.puntaje_automatico == null){
                                if(params.puntaje_automatico == 1){
                                    ctx._source.puntaje_automatico = 2;
                                }else{
                                    ctx._source.puntaje_automatico = params.puntaje_automatico;
                                }
                            }else{
                                if(params.puntaje_automatico == 1 && ctx._source.puntaje_automatico==0){
                                    ctx._source.puntaje_automatico = 2;
                                }else{
                                    ctx._source.puntaje_automatico += params.puntaje_automatico;
                                }
                            }
                        }
                        if(params.puntaje_manual != null){
                        if(ctx._source.puntaje_manual == null){
                            if(params.puntaje_manual == 1){
                                ctx._source.puntaje_manual = 2;
                            }else{
                                ctx._source.puntaje_manual = params.puntaje_manual;
                            }
                        }else{
                            if(params.puntaje_manual == 1 && ctx._source.puntaje_manual==0){
                                ctx._source.puntaje_manual = 2;
                            }else{
                                ctx._source.puntaje_manual += params.puntaje_manual;
                            }
                        }
                        }''',
                        "lang": "painless",
                        "params": {
                            result['tipo_puntaje']: result['puntaje']
                        }
                    }
                })
            response = ElasticServerHelper().fetch_data_ndjson(endpoint='_bulk', payload=payload, method='POST', request=request)
            if not response.get('errors', False):
                return Response({'message': 'Calificación exitosa!'}, status=status.HTTP_200_OK)
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        else:
            log_data = {
                "funcionalidad": "Error",
                "accion": "Error",
                "error": True,
                "descripcion_error": "Backend Error - Obtener datos Elastic API",
                "json_valor_inicial": f"{'descripcion_error' : {str(serializer.errors)}'}"
            }
            ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request), descripcion_error='Backend Error - Obtener datos Elastic API', es_error='Si')
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AutocompletarView(APIView):
    @swagger_auto_schema(request_body=AutocompletarSerializer,
                         responses={200: AutocompletarResponseSerializer, 400: MessageSerializer},
                         operation_id='autocompletar', tags=['endpoints_buscador'],
                         operation_description='Autocompletar')
    def post(self, request):
        serializer = AutocompletarSerializer(data=request.data)
        if serializer.is_valid():
            endpoint = 'autocompletar/_search'
            payload = {
                "size": 10,
                "query": {
                    "bool": {
                        "must": {
                            "regexp": {
                                "phrase": f"{serializer.data['texto']}.*"
                            }
                        }
                    }
                },
                "sort": [
                    {
                        "hits": {
                            "order": "asc"
                        }
                    }
                ]
            }

            if request.user.username:
                endpoint = 'search_autocompletar_user/_search'
                payload['query']['bool']['must'] = [
                    {"regexp": {"phrase": f"{serializer.data['texto']}.*"}},
                    {"match": {"user": get_user_from_request(request)}}
                ]
            response = ElasticServerHelper().fetch_data(endpoint, payload, request)
            data = [{'id': hit['_id'], 'text': hit['_source']['phrase']} for hit in response['hits']['hits']]
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CalificarQueryView(APIView):
    serializer_class = QuerySerializer

    @swagger_auto_schema(request_body=QuerySerializer, responses={200: MessageSerializer}, operation_id='calificar_query',
                         tags=['calificar_query'], operation_description='Califica el query de la búsqueda.')
    def post(self, request):
        serializer = QuerySerializer(context={'request': request}, data=request.data)
        if serializer.is_valid():
            endpoint_render_query = '_render/template'
            endpoint_calificar_query = 'pri_search/_update_by_query?wait_for_completion=false&slices=500'

            log_data = {
                "funcionalidad": "Resultados de consulta",
                "accion": "Calificar resultados",
                'json_valor_inicial': serializer.data.get('query'),
                'json_resultado': {'total_resultados_encontrados': request.data['total_records'],
                                   'calificacion_asignada': request.data['puntaje']},
            }
            ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request))

            response_render_query = ElasticServerHelper().fetch_data(endpoint=endpoint_render_query, payload=request.data['query'], request=request)

            payload_calificar_query = {
                "script": {
                    "source": "if(ctx._source.containsKey('puntaje_manual')){ctx._source.puntaje_manual += params['puntaje']}else{ctx._source.puntaje_manual=params['puntaje']}",
                    "lang": "painless",
                    "params": {
                        "puntaje": request.data['puntaje']
                    }
                },
                "query": response_render_query['template_output'].get('query', None)
            }
            ElasticServerHelper().fetch_data(endpoint=endpoint_calificar_query, payload=payload_calificar_query, request=request)

            return Response({'message': 'Query calificado exitosamente'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HistorialUsuarioView(PrivateMixin, APIView):
    @swagger_auto_schema(responses={200: HistorialBusquedaResponseSerializer, 400: MessageSerializer},
                         operation_id='historial_usuario', tags=['endpoints_buscador'], manual_parameters=[page_doc(), limit_doc()],
                         operation_description='Historial de usuario')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        limit = int(request.GET.get('limit', PAGE_SIZE))
        exclude_filters = ['origen_id', 'sub_origen_id', 'extra_origen_id', 'from', 'size']

        payload = {
            "size": limit,
            "from": (page - 1) * limit,
            "sort": [{"fecha_creacion": {"order": "desc"}}],
          "query": {
            "bool": {
              "must": [
                {
                  "match": {
                    "accion.keyword": "Consultar"
                  }
                },
                {
                  "match": {
                    "usuario.keyword": get_user_from_request(request)
                  }
                }
              ]
            }
          }
        }

        response = ElasticServerLogsHelper().filter_logs(payload)
        data = [{'id': hit['_id'], 'fecha_creacion': hit['_source']['fecha_creacion'], 'busqueda': hit['_source']['busqueda']} for hit in response['hits']['hits']]
        for d in data:
            if 'search_phrase' in d['busqueda']:
                d['busqueda']['texto_buscar'] = d['busqueda']['search_phrase']
                del d['busqueda']['search_phrase']

                if 'from' in d['busqueda']:
                    del d['busqueda']['from']

                if 'size' in d['busqueda']:
                    del d['busqueda']['size']

            d['filtro'] = ", ".join([f"{key}: {'|'.join(d['busqueda'][key]) if type(d['busqueda'][key]) == list else d['busqueda'][key]}" for key in d['busqueda'].keys() if key not in exclude_filters])

        total_records = response['hits'].get('total', {}).get('value', 0)
        response_data = {
            'results': data,
            'total_records': total_records,
            'next_page': (page + 1) if (limit*page) < total_records else None,
            'previous_page': (page - 1) if limit*(page-1) <= total_records and page > 1 else None
        }

        return Response(response_data, status=status.HTTP_200_OK)


class DownloadImageView(APIView):
    @swagger_auto_schema(responses={200: ImageDownloadSerializer, 400: FileDownloadErrorSerializer},
                         operation_id='download-image', tags=['endpoints_buscador'],
                         operation_description='Retorna una imágen en base64.')
    def post(self, request):
        try:
            serializer = ImageDownloadSerializer(data=request.data)
            if serializer.is_valid():
                data = get_image_base64(serializer.data['anexo1'])
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response({'error': str(serializer.errors)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as ex:
            tb = traceback.format_exc()
            log_data = {
                "funcionalidad": "Error",
                "accion": "Error",
                "error": True,
                "descripcion_error": "Backend Error - Descargar archivo",
                "json_valor_inicial": f"{'descripcion_error' : {str(tb)}'}"
            }
            ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request), descripcion_error='Backend Error - Descargar archivo', es_error='Si')
            return Response({'error': str(ex)}, status=status.HTTP_400_BAD_REQUEST)


class DownloadVideoView(APIView):
    @swagger_auto_schema(responses={200: VideoDownloadSerializer, 400: FileDownloadErrorSerializer},
                         operation_id='download-video', tags=['endpoints_buscador'],
                         operation_description='Retorna una video en base64.')
    def post(self, request):
        try:
            serializer = VideoDownloadSerializer(data=request.data)
            if serializer.is_valid():
                data = get_image_base64(serializer.data['documentovirtualnombre'], extra_origen_id=26, download_video=True)
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response({'error': str(serializer.errors)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as ex:
            tb = traceback.format_exc()
            log_data = {
                "funcionalidad": "Error",
                "accion": "Error",
                "error": True,
                "descripcion_error": "Backend Error - Descargar archivo",
                "json_valor_inicial": f"{'descripcion_error' : {str(tb)}'}"
            }
            ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request), descripcion_error='Backend Error - Descargar archivo', es_error='Si')
            return Response({'error': str(ex)}, status=status.HTTP_400_BAD_REQUEST)


class DownloadFile(APIView):
    def get(self, request):
        file_path = request.GET.get('file_path', None)
        if not file_path:
            file_path = request.GET.get('filepath', '')
        if os.path.exists(file_path):
            with open(file_path, 'rb') as fh:
                content_type = mimetypes.guess_type(file_path)
                response = HttpResponse(fh.read(), content_type=content_type[0])
                file_extension = pathlib.Path(file_path).suffix
                response['Content-Disposition'] = f'inline; filename={slugify(os.path.basename(file_path))}{file_extension}'
                return response
        return Response({'status': 'file not found'}, status=status.HTTP_404_NOT_FOUND)
