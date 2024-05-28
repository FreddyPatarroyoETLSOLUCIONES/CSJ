import requests
from django.http import JsonResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework.views import APIView

from analytics.helpers.doc_helper import search_value
from apps.tema_tres.serializers import TerminoSerializer

TEMA_TRES_URL = 'http://190.217.24.78:8888/tematres3/vocab/services.php'


class BusquedaList(APIView):
    """Búsqueda y recuperación de términos."""

    @swagger_auto_schema(responses={200: TerminoSerializer(many=True)}, operation_id='busqueda',
                         tags=['tematres'], manual_parameters=[search_value()],
                         operation_description='Búsqueda y recuperación de términos.')
    def get(self, request):
        value = request.GET.get('value', '')
        url = f'{TEMA_TRES_URL}?task=search&output=json&arg={value}'
        response = requests.request("GET", url, headers={}, data={})
        if 'result' in response.json():
            data = [{'id': item['term_id'], 'value': item['string']} for item in list(response.json()['result'].values())]
            return JsonResponse(data, safe=False)
        return JsonResponse([], safe=False)
