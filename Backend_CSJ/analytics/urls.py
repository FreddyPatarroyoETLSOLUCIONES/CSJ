from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from analytics.views import index

schema_view = get_schema_view(
   openapi.Info(
      title="Analítica API",
      default_version='v1',
      description="Documentación de los endpoints.",
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)


urlpatterns = [
    path('', index, name='index'),
    path('elastic/', include('apps.elastic.urls')),
    path('tema-tres/', include('apps.tema_tres.urls')),
    path('accounts/', include('apps.accounts.urls')),
    path('survey/', include('apps.survey.urls')),
    path('admin/', include('apps.administration.urls')),
    path('doc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)