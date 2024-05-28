from django.http import Http404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from analytics.helpers.doc_helper import pull_code_doc
from apps.survey.choices import SURVEY_REPLY
from apps.survey.models import Pull, PullQuestion
from apps.survey.serializers import PublicPullSerializer, SubmitPullResponsesSerializer, PullSerializer, \
    PullDetailSerializer
from utils.helpers.common_serializers import MessageSerializer
from utils.helpers.elastic_server_logs_helper import ElasticServerLogsHelper
from utils.helpers.mixins import PrivateMixin


class PublicPullDetail(APIView):

    def get_object(self, code):
        try:
            return Pull.objects.get(code=code)
        except Pull.DoesNotExist:
            raise Http404

    @swagger_auto_schema(responses={200: PublicPullSerializer}, path_parameters=[pull_code_doc()],
                         operation_id='información encuesta', tags=['encuesta'],
                         operation_description='Retorna una encuesta con sus respectivas preguntas.')
    def get(self, request, code):
        pull = self.get_object(code)
        serializer = PublicPullSerializer(pull)
        return Response(serializer.data)


class SubmitPullResponsesDetail(APIView):

    @swagger_auto_schema(request_body=SubmitPullResponsesSerializer, responses={200: MessageSerializer},
                         operation_id='registrar encuesta', tags=['encuesta'],
                         operation_description='Registra una encuesta con sus respectivas respuestas.')
    def post(self, request):
        serializer = SubmitPullResponsesSerializer(data=request.data)
        if serializer.is_valid():
            initial_data = {}
            for response in serializer.data['responses']:
                initial_data[PullQuestion.objects.get(id=response['pull_question']).question] = dict(SURVEY_REPLY)[response['reply']]

            initial_data.update({'Comentario': serializer.data['observations']})
            data = {
                "funcionalidad": "Encuesta de satisfacción",
                "accion": "Calificar",
                'json_valor_inicial': initial_data
            }
            ElasticServerLogsHelper().save_log(data, request, initial_data)
            return Response({'message': 'Encuesta guardada exitosamente!'}, status=status.HTTP_200_OK)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class PullListView(PrivateMixin, ListAPIView):
    serializer_class = PullSerializer

    def get_queryset(self):
        return Pull.objects.all()

    @swagger_auto_schema(responses={200: PullSerializer}, operation_id='listar encuestas',
                         tags=['encuesta admin'],
                         operation_description='Lista las encuestas.')
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @swagger_auto_schema(responses={200: PullSerializer}, operation_id='crear encuesta',
                         tags=['encuesta admin'],
                         operation_description='Crea una encuesta.')
    def post(self, request):
        request.data['created_by'] = request.user.pk
        serializer = PullSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PullDetailView(PrivateMixin, APIView):

    def get_object(self, pk):
        try:
            return Pull.objects.get(pk=pk)
        except Pull.DoesNotExist:
            raise Http404

    @swagger_auto_schema(responses={200: PullDetailSerializer}, operation_id='encuesta detalle',
                         tags=['encuesta admin'],
                         operation_description='Retorna una encuesta con información extra.')
    def get(self, request, pk):
        pull = self.get_object(pk)
        serializer = PullDetailSerializer(pull)
        return Response(serializer.data)

    @swagger_auto_schema(responses={200: PullSerializer}, operation_id='actualizar encuesta',
                         tags=['encuesta admin'],
                         operation_description='Actualiza una encuesta.')
    def put(self, request, pk):
        pull = self.get_object(pk)
        serializer = PullSerializer(instance=pull, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={200: MessageSerializer}, operation_id='borrar encuesta',
                         tags=['encuesta admin'],
                         operation_description='Borra una encuesta.')
    def delete(self, request, pk):
        pull = self.get_object(pk)
        pull.delete()
        return Response({"message": "Encuesta borrada"}, status=status.HTTP_200_OK)