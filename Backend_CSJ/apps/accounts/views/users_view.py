import datetime
from copy import copy

from django.http import Http404
from django_filters import rest_framework as filters
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, serializers
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from analytics.pagination import PaginationClass
from apps.accounts.choices import ROLES
from apps.accounts.filters import UserFilter
from apps.accounts.helpers.users import get_user_from_request
from apps.accounts.models import User, UserChangeState
from apps.accounts.serializers import RolSerializer, UserSerializer, UpdateUserSerializer
from utils.helpers.elastic_server_logs_helper import ElasticServerLogsHelper
from utils.helpers.mixins import PrivateMixin


class UsersListView(ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = UserFilter
    pagination_class = PaginationClass

    @swagger_auto_schema(operation_id='listar_usuarios', tags=['Usuarios'], responses={200: UserSerializer(many=True)},
                         operation_description='Retorna usuarios registrados.')
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class RolesView(APIView):
    @swagger_auto_schema(operation_id='roles', tags=['Roles'], responses={200: RolSerializer(many=True)},
                         operation_description='Retorna los roles disponibles.')
    def get(self, request):
        data = [{'id': rol[0], 'value': rol[1]} for rol in ROLES]
        return Response(data, status=status.HTTP_200_OK)


class UpdateUserView(PrivateMixin, APIView):

    def get_object(self, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            raise Http404

    @swagger_auto_schema(operation_id='Actualizar usuario', tags=['Usuarios'], responses={200: UpdateUserSerializer},
                         operation_description='Actualiza un usuario.')
    def put(self, request, id):
        user = self.get_object(id)
        initial_user = copy(user.to_dict())
        request.data['updated_at'] = datetime.datetime.now()
        serializer = UpdateUserSerializer(user, data=request.data, partial=True)
        observations = request.data.get('observations', '')
        if serializer.is_valid():
            if request.data['is_active'] != initial_user['is_active']:
                if not observations:
                    raise serializers.ValidationError('La justifiación del cambio de estado es requerida.')
                UserChangeState(user=user, observations=observations).save()
            serializer.save()

            # Guardar log roles
            initial_user['roles'].sort()
            request.data['roles'].sort()
            if not initial_user['roles'] == request.data['roles']:
                log_data = {
                    'funcionalidad': 'Administrar usuarios',
                    'accion': 'Editar roles',
                    'json_valor_inicial': {'nombre_de_usuario': initial_user['username'], 'roles_iniciales': initial_user['roles']},
                    'json_resultado': {'nombre_de_usuario': initial_user['username'], 'roles': request.data['roles'], 'justificacion': request.data['observations']},
                }
                UserChangeState(user=user, observations=observations).save()
                ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request))

            if request.data['is_active'] != initial_user['is_active']:
                log_data = {
                    'funcionalidad': 'Administrar usuarios',
                    'accion': 'Activar usuario' if request.data['is_active'] else 'Inactivar usuario',
                    'json_valor_inicial': {'nombre_de_usuario': initial_user['username']},
                    'json_resultado': {'nombre_de_usuario': initial_user['username'], 'justificacion': request.data['observations']},
                }
                ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request))

            return Response(serializer.data)

        log_data = {
            "funcionalidad": "Error",
            "accion": "Error",
            "error": True,
            "descripcion_error": "Backend Error - Actualizar usuario",
            "json_valor_inicial": {'descripcion_error' : serializer.errors}
        }
        ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request), es_error='Si')

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
