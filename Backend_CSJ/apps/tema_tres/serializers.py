from rest_framework import serializers


class TerminoSerializer(serializers.Serializer):
    id = serializers.CharField(required=True, help_text='ID.')
    value = serializers.CharField(required=True, help_text='Término.')
