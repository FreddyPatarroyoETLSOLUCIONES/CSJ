from rest_framework import serializers


class LogSerializer(serializers.Serializer):
    funcionalidad = serializers.CharField(required=True, help_text='Funcionalidad.')
    accion = serializers.CharField(required=True, help_text='Acción.')
    json_resultado = serializers.JSONField(allow_null=True, help_text='json_resultado')
    json_valor_inicial = serializers.JSONField(allow_null=True, help_text='json_valor_inicial')
    id_registro = serializers.CharField(required=False, help_text='id_registro.')

