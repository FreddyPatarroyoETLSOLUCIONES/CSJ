import traceback

from django.http import JsonResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.views import APIView

from analytics.helpers.doc_helper import dropdown_doc
from apps.accounts.helpers.users import get_user_from_request
from apps.elastic.serializers.serializars_dropdowns import *
from utils.constants.elastic_server import PAGE_SIZE, MAX_PAGE_SIZE
from utils.helpers.elastic_server_helper import ElasticServerHelper
from utils.helpers.elastic_server_logs_helper import ElasticServerLogsHelper


def get_combo_data(source: str, page: int, offset: int, source_key: str, request=None, other_source=None) -> dict:
    """
    Esta función retorna y transforma la data de una fuente de datos de Elastic.
    :param source: Fuente de datos.
    :param page: Página a treaer.
    :param offset: Cantidad de datos a retornar.
    :param source_key: Llave para extraer y transformar la data.
    :return: Un diccionario con data transformada.
    """
    try:
        payload = [{"index": source}]
        query = {"query": {"bool": {"must": []}}}

        if request:
            origen = request.GET.get('origen', None)
            sub_origen = request.GET.get('sub_origen', None)
            extra_origen = request.GET.get('extra_origen', None)

            if origen:
                origen = origen.split(',')
                origen = [int(item) for item in origen]
            if sub_origen:
                sub_origen = sub_origen.split(',')
                sub_origen = [int(item) for item in sub_origen]
            if extra_origen:
                extra_origen = extra_origen.split(',')
                extra_origen = [int(item) for item in extra_origen]

            if origen:
                query['query']['bool']['must'].append({"terms": {"origen": origen}})
            if sub_origen:
                query['query']['bool']['must'].append({"terms": {"sub_origen": sub_origen}})
            if extra_origen:
                query['query']['bool']['must'].append({"terms": {"extra_origen": extra_origen}})
        if other_source:
            query.update({"sort": [{f'{other_source}': {"order": "asc"}}], "size": MAX_PAGE_SIZE, "from": offset})
        elif source == 'tema':
            query.update({"sort": [{f'{source}.keyword': {"order": "asc"}}], "size": MAX_PAGE_SIZE, "from": offset})
        else:
            query.update({"sort": [{f'{source}': {"order": "asc"}}], "size": MAX_PAGE_SIZE, "from": offset})
        payload.append(query)

        data = ElasticServerHelper().fetch_data_ndjson(endpoint='_msearch', payload=payload, request=request)
        cleaned_data = ElasticServerHelper().clean_msearch(data=data, page=page, offset=offset, source_key=source_key)

        del cleaned_data['total_records']
        del cleaned_data['next_page']
        del cleaned_data['previous_page']
        return JsonResponse(cleaned_data)
    except Exception as ex:
        tb = traceback.format_exc()
        log_data = {
            "funcionalidad": "Error",
            "accion": "Error",
            "error": True,
            "descripcion_error": "Backend Error - Obtener data para dropdowns",
            "json_valor_inicial": {'descripcion_error' : str(tb)}
        }
        ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request), descripcion_error='Backend Error - Obtener data para dropdowns', es_error='Si')
        return JsonResponse({"error": str(ex)}, status=status.HTTP_400_BAD_REQUEST)


class DemandantesList(APIView):
    """Retorna una lista paginada de Demandantes."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='demandantes',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista paginada de demandantes.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='demandante', page=page, offset=offset, source_key='demandante', request=request)


class DemandadosList(APIView):
    """Retorna una lista paginada de Demandados."""
    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='demandados',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista paginada de demandados.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='demandado', page=page, offset=offset, source_key='demandado', request=request)


class DelitosList(APIView):
    """Retorna una lista paginada de Delitos."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='delitos',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista paginada de delitos.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='delito', page=page, offset=offset, source_key='delitos', request=request, other_source='delitos')


class ProcedenciasList(APIView):
    """Retorna una lista paginada de Procedencias."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='procedencias',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista paginada de procedencias.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='procedencia', page=page, offset=offset, source_key='procedencia', request=request)


class FuentesFormalesList(APIView):
    """Retorna una lista paginada de Fuentes Formales."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='fuentes_formales',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista paginada de fuentes formales.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='fuente_formal', page=page, offset=offset, source_key='fuente_formal', request=request)


class ClasesActuacionList(APIView):
    """Retorna una lista paginada de Clases Actuaciones."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='clases_actuaciones',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista paginada de Clases Actuaciones.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='clase_actuacion', page=page, offset=offset, source_key='clase_actuacion', request=request)


class TiposProvidenciaList(APIView):
    """Retorna una lista paginada de Tipos de Providencias."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='tipos_providencia',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista paginada de Tipos de Providencias.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='tipo_providencia', page=page, offset=offset, source_key='tipo_providencia', request=request)


class TiposSalaList(APIView):
    """Retorna una lista paginada de Tipos de Salas."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer},
                         operation_id='tipos_sala',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista paginada de Tipos de Salas.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='tipo_sala', page=page, offset=offset, source_key='tipo_sala', request=request)


class SalasList(APIView):
    """Retorna una lista paginada de Salas."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer},
                         operation_id='sala',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista paginada de Salas.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='sala', page=page, offset=offset, source_key='sala', request=request)


class PonentesList(APIView):
    """Retorna una lista paginada de Ponentes."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer},
                         operation_id='ponentes',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista paginada de Ponentes.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='ponente', page=page, offset=offset, source_key='ponente', request=request)


class TemasList(APIView):
    """Retorna una lista paginada de Temas."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer},
                         operation_id='temas',
                         tags=['endpoints_dropdowns'], manual_parameters=dropdown_doc(),
                         operation_description='Retorna una lista paginada de Temas.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='tema', page=page, offset=offset, source_key='tema', request=request)


class OrigenesList(APIView):
    """Retorna una lista paginada de Origenes."""

    @swagger_auto_schema(responses={200: OrigenesSerializerResponseSerializer},
                         operation_id='origenes',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista paginada de Origenes.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        try:
            payload = [
                {"index": "origen"},
                {"query": {"match_all": {}}, "size": PAGE_SIZE, "from": offset}
            ]

            data = ElasticServerHelper().fetch_data_ndjson(endpoint='_msearch', payload=payload, request=request)
            cleaned_data = [{
                'origen_id': item['_source']['origen'],
                'nombre_origen': item['_source']['nombre_origen'],
                'sub_origen_id': item['_source']['sub_origen'],
                'nombre_sub_origen': item['_source']['nombre_suborigen'],
                'id_extra_origen': item['_source']['extra'],
                'nombre_extra_origen': item['_source']['nombre_extraorigen']
            } for item in [res['hits']['hits'] for res in data['responses']][0]]

            total_records = data['responses'][0]['hits']['total']['value']
            response = {
                'results': cleaned_data,
                'total_records':  data['responses'][0]['hits']['total']['value'],
                ** ElasticServerHelper().get_next_previous_page(page, offset, total_records)
            }

            return JsonResponse(response, safe=False)
        except Exception as ex:
            return JsonResponse({"error": str(ex)}, status=status.HTTP_400_BAD_REQUEST)


class CategoriasGeneroList(APIView):
    """Retorna una lista paginada de Categorías de genero."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='categoria_genero',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista paginada de Categorías de género.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='categoria_genero', page=page, offset=offset, source_key='categoria_genero', request=request)


class SalvamentoList(APIView):
    """Retorna una lista paginada de salvamentos."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='salvamento',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista paginada de salvamentos.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='salvamento', page=page, offset=offset, source_key='salvamento', request=request)


class DecisionList(APIView):
    """Retorna una lista paginada de decisiones."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='decision',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista paginada de decisiones.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='decision', page=page, offset=offset, source_key='decision', request=request)


class MagistradoSalvamentoList(APIView):
    """Retorna una lista paginada de magistrados salvamentos."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='magistrado_salvamento',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista paginada de magistrados salvamentos.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='magistrado_salvamento', page=page, offset=offset, source_key='magistrado_salvamento', request=request)


class BibliotecasList(APIView):
    """Retorna una lista de bibliotecas."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='bibliotecas',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista de bibliotecas.')
    def get(self, request):
        response = ElasticServerHelper().fetch_data('biblioteca/_search', {}, request)
        data = [{'id': data['_id'], 'value': data['_source']['biblioteca']} for data in response['hits']['hits']]
        return JsonResponse(data, safe=False)


class TipoMaterialLibroList(APIView):
    """Retorna una lista de bibliotecas."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='tipo_material_libro',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista de tipos de material de libro.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='tipo_material_libro', page=page, offset=offset, source_key='tipo_material_libro', request=request)


class VideotecaList(APIView):
    """Retorna una lista de videotecas."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='videotecas',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista de videotecas.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='fuente_videoteca', page=page, offset=offset, source_key='fuente_videoteca', request=request)


class CorporacionGeneroList(APIView):
    """Retorna una lista de corporaciones."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='corporaciones',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista de corporaciones.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='corporacion_genero', page=page, offset=offset, source_key='corporacion_genero', request=request)


class TipoActoList(APIView):
    """Retorna una lista de tipo_acto."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='tipo_acto',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista de tipo_acto.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='tipo_acto', page=page, offset=offset, source_key='tipo_acto', request=request)


class TipoGacetaList(APIView):
    """Retorna una lista de tipos de gacetas."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='tipo_gaceta',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista de tipos de gacetas.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='tipo_gaceta', page=page, offset=offset, source_key='tipogaceta', other_source='tipogaceta', request=request)


class EntidadGeneradoraList(APIView):
    """Retorna una lista de entidades generadoras."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='entidad_generadora',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista de entidades generadoras.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='entidadgeneradora', page=page, offset=offset, source_key='entidadgeneradora', request=request)


class FuenteOficialList(APIView):
    """Retorna una lista de fuentes oficiales."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='fuente_oficial',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista de entidades generadoras.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='fuenteoficial', page=page, offset=offset, source_key='fuenteoficial', request=request)


class EstadoList(APIView):
    """Retorna una lista de Estados."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='estado',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista de estados.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='estado', page=page, offset=offset, source_key='estado', request=request)


class SeccionList(APIView):
    """Retorna una lista seccion."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='seccion',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista de seccion.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='seccion', page=page, offset=offset, source_key='seccion', request=request)


class SalaConocimientoList(APIView):
    """Retorna una lista."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='sala_conocimiento',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='sala_conocimiento', page=page, offset=offset, source_key='sala_conocimiento', other_source='seccion', request=request)


class NaturalezaProcesoList(APIView):
    """Retorna una lista."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='naturalezaproceso',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='naturalezaproceso', page=page, offset=offset, source_key='naturalezaproceso', request=request)


class DescriptoresList(APIView):
    """Retorna una lista."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='descriptores',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='descriptores', page=page, offset=offset, source_key='descriptores', request=request)


class TribunalesAdministrativosList(APIView):
    """Retorna una lista."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='tribunales_administrativos',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='tribunales_administrativos', page=page, offset=offset, source_key='tribunales_administrativos', request=request)


class TribunalSuperiorList(APIView):
    """Retorna una lista."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='tribunal_superior',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='tribunal_superior', page=page, offset=offset, source_key='tribunal_superior', request=request)


class TipoNormaList(APIView):
    """Retorna una lista."""

    @swagger_auto_schema(responses={200: DropdownResponseSerializer}, operation_id='tipo_norma',
                         tags=['endpoints_dropdowns'],
                         operation_description='Retorna una lista.')
    def get(self, request):
        page = int(request.GET.get('page', 1))
        offset = ElasticServerHelper().get_offset(page)
        return get_combo_data(source='tipo_norma', page=page, offset=offset, source_key='tipo_norma', request=request)
