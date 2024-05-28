from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from apps.accounts.helpers.users import get_user_from_request
from apps.elastic.serializers.logs_serializers import LogSerializer
from utils.helpers.common_serializers import MessageSerializer
from utils.helpers.elastic_server_logs_helper import ElasticServerLogsHelper


class SaveLogView(APIView):
    serializer_class = LogSerializer

    @swagger_auto_schema(request_body=LogSerializer, responses={200: MessageSerializer}, operation_id='guardar_log',
                         tags=['endpoints_logs'], operation_description='Guarda un log.')
    def post(self, request):
        serializer = LogSerializer(context={'request': request}, data=request.data)
        if serializer.is_valid():
            ElasticServerLogsHelper().save_log(serializer.data, request, username=get_user_from_request(request))
            return Response({'message': 'Log guardado exitosamente'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


