from django.urls import path

from apps.tema_tres.views import BusquedaList

app_name = 'tema_tres'

urlpatterns = [
    path("busqueda", BusquedaList.as_view(), name="busqueda"),
]
