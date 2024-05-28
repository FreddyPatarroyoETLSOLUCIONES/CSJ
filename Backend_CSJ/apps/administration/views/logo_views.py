from django.http import Http404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, serializers
from rest_framework.generics import ListAPIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.accounts.helpers.users import get_user_from_request
from apps.administration.models import Logo
from apps.administration.serializers.logo_serializers import LogoSerializer, LogoSaveSerializer
from utils.helpers.elastic_server_logs_helper import ElasticServerLogsHelper
from utils.helpers.mixins import PrivateMixin


class LogoAdminListView(PrivateMixin, ListAPIView):
    serializer_class = LogoSerializer
    pagination_class = None
    queryset = Logo.objects.all()

    @swagger_auto_schema(responses={200: LogoSerializer}, operation_id='listar logos',
                         tags=['parametrización campos y logos'],
                         operation_description='Lista los logos.')
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class UpdateLogoAdminView(PrivateMixin, APIView):
    parser_classes = (MultiPartParser, )

    def get_object(self, corporation):
        try:
            return Logo.objects.get(corporation=corporation)
        except Logo.DoesNotExist:
            raise Http404

    @swagger_auto_schema(request_body=LogoSaveSerializer, responses={200: LogoSerializer}, operation_id='actualizar logo',
                         tags=['parametrización campos y logos'],
                         operation_description='Actualiza el logo de la corporación.')
    def put(self, request, corporation):
        logo = self.get_object(corporation)
        image = self.request.FILES.get('image')
        log_data = {
            'funcionalidad': 'Actualizar Logo',
            'accion': 'Editar',
            'json_valor_inicial': {
                'corporación': logo.corporation,
            },
            'json_resultado': {
                'resultado': 'Exitoso'
            }
        }

        if not image:
            log_data['json_resultado']['resultado'] = 'Fallido'
            log_data['error'] = True
            ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request), descripcion_error='Backend Error - Actualizar logo sin imágen', es_error='Si')
            raise serializers.ValidationError("Por favor agregue una imágen.")
        serializer = LogoSaveSerializer(logo, data=request.data, context={'image': image.file.read()})
        if serializer.is_valid():
            logo = serializer.save()
            ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request))
            return Response(LogoSerializer(logo).data)

        log_data['json_resultado']['resultado'] = 'Fallido'
        log_data['error'] = True
        ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request), descripcion_error='Backend Error - Actualizar logo sin imágen', es_error='Si')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoView(APIView):

    def get_object(self, id):
        try:
            return Logo.objects.get(pk=id)
        except Logo.DoesNotExist:
            raise Http404

    @swagger_auto_schema(responses={200: LogoSerializer}, operation_id='obtener logo',
                         tags=['parametrización campos y logos'],
                         operation_description='Retorna un logo.')
    def get(self, request, id):
        logo = self.get_object(id)
        serializer = LogoSerializer(logo)
        return Response(serializer.data)