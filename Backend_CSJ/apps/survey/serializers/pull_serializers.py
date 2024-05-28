from django.db import transaction
from rest_framework import serializers

from apps.accounts.serializers import UserMinSerializer
from apps.survey.models import Pull, PullQuestion, PullAnswer, PullAnswerQuestionResponse


class PullSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pull
        fields = ['id', 'name', 'code', 'description', 'created_by', 'created_at']


class PullDetailSerializer(PullSerializer):
    created_by = UserMinSerializer()


class PublicPullQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PullQuestion
        fields = ['id', 'question']


class PublicPullSerializer(serializers.ModelSerializer):
    questions = PublicPullQuestionSerializer(many=True)

    class Meta:
        model = Pull
        fields = ['id', 'name', 'code', 'description', 'questions']


class PullAnswerQuestionResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PullAnswerQuestionResponse
        fields = ['pull_question', 'reply']


class SubmitPullResponsesSerializer(serializers.ModelSerializer):
    responses = PullAnswerQuestionResponseSerializer(many=True)

    class Meta:
        model = PullAnswer
        fields = ['pull', 'observations', 'pull', 'responses']

    def validate_responses(self, responses):
        pull = Pull.objects.get(id=self.initial_data['pull'])
        answer_responses = [response['pull_question'] for response in responses]
        questions = pull.questions.all()
        for question in questions:
            if question not in answer_responses:
                raise serializers.ValidationError(f'La respuesta de {question.question} es obligatoria')
        return responses

    def create(self, validated_data):
        with transaction.atomic():
            pull_answer = PullAnswer.objects.create(pull=validated_data['pull'],
                                                    observations=validated_data['observations'])
            for response in validated_data['responses']:
                PullAnswerQuestionResponse.objects.create(pull_answer=pull_answer,
                                                          pull_question=response['pull_question'],
                                                          reply=response['reply'])

            return pull_answer

