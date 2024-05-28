from django.urls import path

from apps.administration.views.fields_view import FieldAdminListView, FieldPublicListView, UpdateFieldView
from apps.administration.views.logo_views import LogoAdminListView, UpdateLogoAdminView, LogoView
from apps.administration.views.score_views import ScoreView

urlpatterns = [
    path("logos", LogoAdminListView.as_view(), name="logos"),
    path("logos/<str:corporation>", UpdateLogoAdminView.as_view(), name="update_logo"),
    path("logo/<str:id>", LogoView.as_view(), name="get_logo"),
    path("campos-admin", FieldAdminListView.as_view(), name="campos_admin"),
    path("campos-public", FieldPublicListView.as_view(), name="campos_public"),
    path("campos-admin/<str:internal_id>", UpdateFieldView.as_view(), name="update_field"),
    path("score", ScoreView.as_view(), name="score"),
]
