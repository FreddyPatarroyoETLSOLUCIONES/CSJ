import uuid

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.utils import timezone

from .choices import ROLES
from .managers import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, verbose_name='ID.')
    username = models.CharField(max_length=100, unique=True, verbose_name='Nombre de usuario.')
    full_name = models.CharField(max_length=100, verbose_name='Nombre y apellido', blank=True, null=True)
    roles = ArrayField(models.CharField(max_length=120, blank=True, choices=ROLES, default='usuario_interno'))
    email = models.EmailField(unique=True, verbose_name='Correo electrónico del usuario.', blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True, verbose_name='Está activo')
    date_joined = models.DateTimeField(default=timezone.now, verbose_name='Fecha de registro.')
    updated_at = models.DateTimeField(default=timezone.now, verbose_name='Fecha de actualizacion.')

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = CustomUserManager()

    class Meta:
        db_table = '"priapp"."users"'

    def __str__(self):
        return self.username

    def to_dict(self):
        return {'id': str(self.id), 'username': self.username, 'email': self.email, 'roles': self.roles, 'full_name': self.full_name, 'is_active': self.is_active}

class UserChangeState(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, verbose_name='ID.')
    date = models.DateTimeField(default=timezone.now, verbose_name='Fecha de registro.')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    observations = models.CharField(max_length=250, verbose_name='Observaciones')

    class Meta:
        db_table = '"priapp"."userchangestate"'
