from django.urls import path

from apps.survey.views import *

urlpatterns = [
    path("pulls", PullListView.as_view(), name="pulls"),
    path("pulls/<uuid:pk>", PullDetailView.as_view(), name="pull"),
    path("pull/<str:code>", PublicPullDetail.as_view(), name="public_pull"),
    path("submit-pull-responses", SubmitPullResponsesDetail.as_view(), name="submit_pull_responses"),
]