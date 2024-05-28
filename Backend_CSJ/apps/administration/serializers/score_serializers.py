from rest_framework import serializers

from apps.administration.models import Score


class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = ['value']
