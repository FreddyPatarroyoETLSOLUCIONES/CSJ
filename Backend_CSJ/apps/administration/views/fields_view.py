import datetime

from django.http import Http404
from django_filters import rest_framework as filters
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.accounts.helpers.users import get_user_from_request
from apps.administration.models import Field
from apps.administration.serializers import FieldSerializer, UpdateFieldSerializer
from utils.helpers.elastic_server_logs_helper import ElasticServerLogsHelper
from utils.helpers.mixins import PrivateMixin


class FieldFilter(filters.FilterSet):
    campo = filters.CharFilter(field_name="campo", lookup_expr='icontains', help_text='Nombre campo.')
    dropdowns = filters.CharFilter(field_name="dropdowns", lookup_expr='overlap', help_text='Dropdowns campo.')
    sources = filters.CharFilter(field_name="sources", lookup_expr='overlap', help_text='Sources campo.')
    look_feel = filters.CharFilter(field_name="look_feel", lookup_expr='overlap', help_text='Look & feel campo.')
    tipo_filtro = filters.CharFilter(field_name="tipo_filtro", lookup_expr='contains', help_text='Tipo filtro')

    class Meta:
        model = Field
        fields = ['campo', 'dropdowns']


class FieldAdminListView(PrivateMixin, ListAPIView):
    serializer_class = FieldSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = FieldFilter

    def get_queryset(self):
        return Field.objects.all()

    @swagger_auto_schema(responses={200: FieldSerializer}, operation_id='listar campos paginados',
                         tags=['parametrización campos y logos'],
                         operation_description='Lista los campos paginados.')
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class FieldPublicListView(ListAPIView):
    serializer_class = FieldSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    pagination_class = None

    def get_queryset(self):
        return Field.objects.all()

    @swagger_auto_schema(responses={200: FieldSerializer}, operation_id='listar campos públicos',
                         tags=['parametrización campos y logos'],
                         operation_description='Lista pública de los campos.')
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class UpdateFieldView(PrivateMixin, APIView):

    def get_object(self, id):
        try:
            return Field.objects.get(internal_id=id)
        except Field.DoesNotExist:
            raise Http404

    @swagger_auto_schema(request_body=UpdateFieldSerializer, responses={200: FieldSerializer},
                         operation_id='actualizar campo', tags=['parametrización campos y logos'],
                         operation_description='Actualiza un campo.')
    def put(self, request, internal_id):
        field = self.get_object(internal_id)
        old_field = UpdateFieldSerializer(field).data.copy()
        new_data = request.data.copy()
        request.data['updated_by'] = request.user.id
        serializer = UpdateFieldSerializer(instance=field, data=request.data)
        if serializer.is_valid():
            log_data = {
                "funcionalidad": "Parametrización de Filtros Avanzados",
                "accion": "Editar",
                "json_valor_inicial": old_field,
                "json_resultado": new_data
            }
            serializer.save()
            ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request))

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
