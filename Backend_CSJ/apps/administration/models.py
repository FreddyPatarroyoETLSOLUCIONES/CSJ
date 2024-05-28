from base64 import b64encode

from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.utils import timezone

from apps.accounts.models import User
from apps.administration.choices import CORPORATIONS
from utils.helpers.mixins import ModelDiffMixin


class Field(models.Model):
    internal_id = models.IntegerField(primary_key=True, help_text='Código interno del Filtro.')
    tooltip = models.TextField(verbose_name='Texto de ayuda (Tooltip).', blank=True, null=True)
    form_control_name = models.CharField(max_length=140, verbose_name='FORMCONTROLNAME', blank=True, null=True)
    campo = models.CharField(max_length=140, verbose_name='Campo.', blank=True, null=True)
    tipo_filtro = models.CharField(max_length=1, verbose_name='Tipo Filtro.', blank=True, null=True)
    updated_at = models.DateTimeField(default=timezone.now, verbose_name='Fecha de actualizacion.')
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Actualizado por.')
    status = models.BooleanField(default=True, verbose_name='Estado')
    dropdowns = ArrayField(models.CharField(max_length=120, blank=True), default=list)
    look_feel = ArrayField(models.CharField(max_length=120, blank=True), default=list)
    sources = ArrayField(models.CharField(max_length=120, blank=True), default=list)

    class Meta:
        db_table = '"priapp"."fields"'
        ordering = ['internal_id']

    def __str__(self):
        return self.name


class Logo(models.Model, ModelDiffMixin):
    corporation = models.CharField(primary_key=True, choices=CORPORATIONS, max_length=120, verbose_name='Corporación.')
    image = models.BinaryField(verbose_name='Imagen logo - Base64')
    alt = models.CharField(max_length=120, blank=True, null=True, verbose_name='Texto etiqueta alt')

    class Meta:
        db_table = '"priapp"."logos"'

    def __str__(self):
        return self.corporation

    @property
    def image_base64(self):
        return f'data: image/png; base64,{b64encode(self.image).decode("utf8")}'


class AppSettings(models.Model):
    email_notifications_username = models.CharField(max_length=120, verbose_name='Usuario email notificaciones.')
    email_notifications_password = models.CharField(max_length=120, verbose_name='Conteraseña email notificaciones.')
    email_notifications_mail_from = models.CharField(max_length=120, verbose_name='Email desde donde saldrán las notificaciones.')
    email_notifications_mails_to = ArrayField(models.CharField(max_length=120, blank=True), verbose_name='Emails donde se enviarán las notificaciones.')
    email_notifications_smtp = models.CharField(max_length=120, verbose_name='Email SMTP.')
    email_notifications_port = models.CharField(max_length=120, verbose_name='Email SMTP Port.')

    class Meta:
        db_table = '"priapp"."app_settings"'


class Score(models.Model):
    value = models.IntegerField(primary_key=True, help_text='Valor del score.')

    class Meta:
        db_table = '"priapp"."score"'

    def __str__(self):
        return self.value
