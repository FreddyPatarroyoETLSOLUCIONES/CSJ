import uuid

from django.db import models

from apps.accounts.models import User
from apps.survey.choices import SURVEY_REPLY


class Pull(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, help_text='ID de la encuesta.')
    code = models.CharField(max_length=120, unique=True, help_text='Código único de la encuesta.')
    name = models.CharField(max_length=200, help_text='Nombre de la encuesta.')
    description = models.TextField(help_text='Descripción de la encuesta.')
    created_by = models.ForeignKey(User, on_delete=models.PROTECT, verbose_name='Usario que creó la encuesta.')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha y hora de creación de la encuesta.')

    class Meta:
        db_table = '"priapp"."pull"'

    def __str__(self):
        return self.name


class PullQuestion(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, verbose_name='ID')
    question = models.TextField(blank=False, null=False, verbose_name='Pregunta')
    pull = models.ForeignKey(Pull, on_delete=models.CASCADE, related_name='questions', verbose_name='Encuesta a la cueal pertenece esta pregunta.')

    class Meta:
        db_table = '"priapp"."pull_question"'

    def __str__(self):
        return f'{self.pull.name} - {self.question}'


class PullAnswer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, verbose_name='ID')
    pull = models.ForeignKey(Pull, on_delete=models.PROTECT, verbose_name='Encuesta a la cual pertenece esta respuesta.')
    crated_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha y hora del registro.')
    observations = models.TextField(verbose_name='Observaciones', null=True, blank=True)

    class Meta:
        db_table = '"priapp"."pull_answer"'

    def __str__(self):
        return self.pull.name


class PullAnswerQuestionResponse(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, verbose_name='ID ')
    pull_answer = models.ForeignKey(PullAnswer, on_delete=models.CASCADE, related_name='responses', verbose_name='Referencia a la respuesta de la encuesta.')
    pull_question = models.ForeignKey(PullQuestion, on_delete=models.CASCADE, verbose_name='Referencia a la pregunta evaluada o respondida de la encuesta.')
    reply = models.CharField(choices=SURVEY_REPLY, default='acceptable', max_length=30, verbose_name='Respuesta seleccionada.')

    class Meta:
        db_table = '"priapp"."pull_answer_question"'
        unique_together = [['pull_answer', 'pull_question']]