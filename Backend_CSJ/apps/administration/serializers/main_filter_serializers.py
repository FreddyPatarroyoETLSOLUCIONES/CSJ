from rest_framework import serializers

from apps.administration.models import Field


class FieldSerializer(serializers.ModelSerializer):
    updated_by = serializers.SerializerMethodField('get_updated_by')

    class Meta:
        model = Field
        fields = '__all__'

    def get_updated_by(self, object):
        if object.updated_by_id:
            return object.updated_by.username
        return None


class UpdateFieldSerializer(serializers.ModelSerializer):
    updated_by = serializers.SerializerMethodField('get_updated_by')

    class Meta:
        model = Field
        fields = '__all__'

    def get_updated_by(self, object):
        if object.updated_by_id:
            return object.updated_by.username
        return None
