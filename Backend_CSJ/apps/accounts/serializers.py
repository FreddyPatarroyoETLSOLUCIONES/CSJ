from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from apps.accounts.models import User


class UserMinSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'full_name',]


class LoginTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['roles'] = user.roles
        return token


class LoginResponseSerializer(serializers.Serializer):
    refresh = serializers.CharField(help_text='refresh token.')
    access = serializers.CharField(help_text='access token.')
    rol = serializers.CharField(help_text='Rol del usuario')


class RolSerializer(serializers.Serializer):
    id = serializers.CharField(help_text='Id.')
    value = serializers.CharField(help_text='Nombre del rol')


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(max_length=200, required=False, allow_blank=True)
    email = serializers.CharField(max_length=200, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['id', 'full_name', 'email', 'is_active', 'roles', 'updated_at']


class UpdateUserSerializer(UserSerializer):
    observations = serializers.CharField(help_text='Justifiación del cambio de estado', required=False)
    full_name = serializers.CharField(max_length=200, required=False, allow_blank=True)
    username = serializers.CharField(max_length=200, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'full_name', 'email', 'is_active', 'roles', 'observations', 'updated_at']