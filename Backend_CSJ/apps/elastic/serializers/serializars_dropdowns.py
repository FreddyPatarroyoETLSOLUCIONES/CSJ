from rest_framework import serializers

from apps.elastic.serializers.common_serializers import PaginationSerializer


class DropdownSerializer(serializers.Serializer):
    id = serializers.CharField(help_text='ID del objeto')
    value = serializers.CharField(help_text='Valor del objeto')


class DropdownResponseSerializer(PaginationSerializer, serializers.Serializer):
    results = DropdownSerializer(many=True, help_text='Retorna una lista de los resultados obtenidos.')


class OrigenSerializer(serializers.Serializer):
    origen_id = serializers.IntegerField(help_text='ID del origen.')
    nombre_origen = serializers.CharField(help_text='Nombre del origen.')
    sub_origen_id = serializers.IntegerField(help_text='ID del sub-origen.')
    nombre_sub_origen = serializers.CharField(help_text='Nombre del sub-origen.')
    id_extra_origen = serializers.IntegerField(help_text='ID del extra-origen')
    nombre_extra_origen = serializers.CharField(help_text='Nombre del extra-origen.')


class OrigenesSerializerResponseSerializer(PaginationSerializer, serializers.Serializer):
    results = OrigenSerializer(many=True, help_text='Retorna una lista de los resultados obtenidos.')