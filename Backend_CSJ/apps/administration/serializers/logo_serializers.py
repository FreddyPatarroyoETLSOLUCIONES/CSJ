import io
import sys

from rest_framework import serializers
from PIL import Image
from apps.administration.models import Logo


class LogoSaveSerializer(serializers.ModelSerializer):

    class Meta:
        model = Logo
        fields = ['image']

    def validate(self, data):
        """
        Check that start is before finish.
        """
        img = Image.open(io.BytesIO(self.context['image']))
        sys.getsizeof(io.BytesIO(self.context['image']))
        if len(self.context['image'])/1024 > 700:
            raise serializers.ValidationError(
                f'La imagen debe tener menos de 700 kb')
        elif img.format.lower() not in ['png', 'bmp']:
            raise serializers.ValidationError(f'El formato de la imagen debe ser .png o .bmp, por favor verifique')
        elif len(self.context['image']) > 4e+6:
            raise serializers.ValidationError(f'El peso del archivo no puede superar los 4 Mb, por favor verifique')
        data['image'] = self.context['image']
        return data


class LogoSerializer(serializers.ModelSerializer):
    corporation = serializers.SerializerMethodField()

    class Meta:
        model = Logo
        fields = ['corporation', 'image_base64', 'alt']

    def get_corporation(self, obj):
        return {'id': obj.corporation, 'name': obj.get_corporation_display()}
