import traceback

from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from apps.accounts.helpers.recaptcha import recaptcha_verify
from apps.accounts.helpers.users import get_user_from_request
from apps.accounts.models import User
from utils.helpers.ldap_connect import connect_ldap
from apps.accounts.serializers import LoginTokenObtainPairSerializer, LoginResponseSerializer
from utils.helpers.elastic_server_logs_helper import ElasticServerLogsHelper


class LoginView(TokenObtainPairView):
    serializer_class = LoginTokenObtainPairSerializer

    @swagger_auto_schema(request_body=LoginTokenObtainPairSerializer, responses={200: LoginResponseSerializer},
                         operation_id='login', tags=['Autenticación'],
                         operation_description='Retorna un access token para las credenciales proporcionadas.')
    def post(self, request, *args, **kwargs):
        try:
            username = request.data['username']
            password = request.data['password']
            ldap_user, error = connect_ldap(username, password)
            if ldap_user:
                try:
                    user = User.objects.get(username=username)
                except Exception as ex:
                    user = User.objects.create(username=username, is_superuser=False, roles=['usuario_interno'])

                user.set_password(password)
                user.is_active = True
                user.save()
                serializer = self.get_serializer(data={'username': username, 'password': password})
                serializer.is_valid(raise_exception=True)
                log_data = {
                    "funcionalidad": "Autenticación",
                    "accion": "Autenticación",
                    "json_resultado": "{'resultado' : Exitoso}"
                }
                ElasticServerLogsHelper().save_log(log_data, request, username=serializer.user.username)
                data = serializer.validated_data
                data.update({'roles': user.roles, 'username': user.username})
                return Response(data, status=status.HTTP_200_OK)
            log_data = {
                "funcionalidad": "Autenticación",
                "accion": "Autenticación",
                "json_resultado": "{'resultado' : Fallido}"
            }
            ElasticServerLogsHelper().save_log(log_data, request, username=username, descripcion_error='Usuario y/o contraseña incorrecta', es_error='Si')
            return Response({'error': f'Usuario y/o contraseña incorrecta', 'exception': str(error)}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as ex:
            tb = traceback.format_exc()
            log_data = {
                "funcionalidad": "Error",
                "accion": "Error",
                "error": True,
                "descripcion_error": "Backend Error - Iniciar sesión",
                "json_valor_inicial": f"{'descripcion_error' : {str(tb)}'}"
            }
            ElasticServerLogsHelper().save_log(log_data, request, username=get_user_from_request(request), descripcion_error='Backend Error - Iniciar sesión', es_error='Si')
            return Response({'error': f'Usuario y/o contraseña incorrecta'}, status=status.HTTP_401_UNAUTHORIZED)
