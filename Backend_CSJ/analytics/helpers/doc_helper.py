from drf_yasg import openapi


def page_doc():
    return openapi.Parameter('page', in_=openapi.IN_QUERY, type=openapi.TYPE_NUMBER, description='Número de página.')


def search_value():
    return openapi.Parameter('value', in_=openapi.IN_QUERY, type=openapi.TYPE_STRING, description='Palabra a buscar.')


def dropdown_doc():
    return [
        page_doc(),
        openapi.Parameter('origen', in_=openapi.IN_QUERY, type=openapi.TYPE_ARRAY, description='Lista de origenes.', items=openapi.Items(type=openapi.TYPE_NUMBER)),
        openapi.Parameter('sub_origen', in_=openapi.IN_QUERY, type=openapi.TYPE_ARRAY, description='Lista de sub-origenes.', items=openapi.Items(type=openapi.TYPE_NUMBER)),
        openapi.Parameter('extra_origen', in_=openapi.IN_QUERY, type=openapi.TYPE_ARRAY, description='Lista de extra-origenes.', items=openapi.Items(type=openapi.TYPE_NUMBER)),
    ]


def filepath_doc():
    return openapi.Parameter('filepath', in_=openapi.IN_QUERY, type=openapi.TYPE_STRING, description='Ruta del archivo.')


def pull_code_doc():
    return openapi.Parameter('code', in_=openapi.IN_QUERY, type=openapi.FORMAT_UUID, description='ID de la encuesta.')


def limit_doc():
    return openapi.Parameter('limit', in_=openapi.IN_QUERY, type=openapi.TYPE_NUMBER, description='Cantidad de registros a retornar.')