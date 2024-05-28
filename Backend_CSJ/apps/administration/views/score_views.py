from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.administration.models import Score
from apps.administration.serializers.score_serializers import ScoreSerializer


class ScoreView(APIView):

    @swagger_auto_schema(responses={200: ScoreSerializer}, operation_id='obtener score', tags=['Score'],
                         operation_description='Retorna el score para la calificación.')
    def get(self, request):
        score = Score.objects.first()
        serializer = ScoreSerializer(score)
        return Response(serializer.data)
