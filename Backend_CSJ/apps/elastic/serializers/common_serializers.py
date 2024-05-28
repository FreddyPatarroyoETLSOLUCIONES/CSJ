from rest_framework import serializers


class PaginationSerializer(serializers.Serializer):
    total_records = serializers.IntegerField(help_text='Retorna la cantidad de registros existentes para ese criterio de búsqueda o servicio.')
    next_page = serializers.IntegerField(allow_null=True, help_text='Retorna la página siguiente, si no existe retorna null.')
    previous_page = serializers.IntegerField(allow_null=True, help_text='Retorna la página anterior, si no existe retorna null.')