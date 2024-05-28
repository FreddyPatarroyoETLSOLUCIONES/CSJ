from django.urls import path

from apps.elastic.views.elastic_dropdowns_views import *
from apps.elastic.views.elastic_search_views import *
from apps.elastic.views.logs_views import SaveLogView

app_name = 'elastic'

urlpatterns = [
    path("demandantes", DemandantesList.as_view(), name="demandantes"),
    path("demandados", DemandadosList.as_view(), name="demandados"),
    path("delitos", DelitosList.as_view(), name="delitos"),
    path("procedencias", ProcedenciasList.as_view(), name="procedencias"),
    path("fuentes_formales", FuentesFormalesList.as_view(), name="fuentes_formales"),
    path("clases_actuacion", ClasesActuacionList.as_view(),  name="clases_actuacion"),
    path("tipos_providencia", TiposProvidenciaList.as_view(), name="tipos_providencia"),
    path("tipos_sala", TiposSalaList.as_view(), name="tipos_sala"),
    path("salas", SalasList.as_view(), name="salas"),
    path("ponentes", PonentesList.as_view(), name="ponentes"),
    path("temas", TemasList.as_view(), name="temas"),
    path("origenes", OrigenesList.as_view(), name="origenes"),
    path("buscar", SearchList.as_view(), name="buscar"),
    path("categoria_genero", CategoriasGeneroList.as_view(), name="categoria_genero"),
    path("salvamento", SalvamentoList.as_view(), name="salvamento"),
    path("decision", DecisionList.as_view(), name="decision"),
    path("magistrado_salvamento", MagistradoSalvamentoList.as_view(), name="magistrado_salvamento"),
    path("download-file", DownloadFileView.as_view(), name="download_file"),
    path("download-image", DownloadImageView.as_view(), name="download_image"),
    path("download-video", DownloadVideoView.as_view(), name="download_video"),
    path("card-report-download", CardReportView.as_view(), name="card_report_download"),
    path("calificar-resultados", CalificarResultadosView.as_view(), name="calificar_resultados"),
    path("autocompletar", AutocompletarView.as_view(), name="autocompletar"),
    path("log", SaveLogView.as_view(), name="log"),
    path("calificar-query", CalificarQueryView.as_view(), name="calificar_query"),
    path("bibliotecas", BibliotecasList.as_view(), name="bibliotecas"),
    path("tipo-material-libro", TipoMaterialLibroList.as_view(), name="tipo_material_libro"),
    path("videotecas", VideotecaList.as_view(), name="videotecas"),
    path("corporacion-genero", CorporacionGeneroList.as_view(), name="corporacion_genero"),
    path("tipo-acto", TipoActoList.as_view(), name="tipo_acto"),
    path("tipo-gaceta", TipoGacetaList.as_view(), name="tipo_gaceta"),
    path("entidad-generadora", EntidadGeneradoraList.as_view(), name="entidad-generadora"),
    path("fuente-oficial", FuenteOficialList.as_view(), name="fuente-oficial"),
    path("historial-usuario", HistorialUsuarioView.as_view(), name="historial_usuario"),
    path("estado", EstadoList.as_view(), name="estado"),
    path("seccion", SeccionList.as_view(), name="seccion"),
    path("sala-conocimiento", SalaConocimientoList.as_view(), name="sala_conocimiento"),
    path("naturaleza-proceso", NaturalezaProcesoList.as_view(), name="naturaleza-proceso"),
    path("descriptores", DescriptoresList.as_view(), name="descriptores"),
    path("tribunales-administrativos", TribunalesAdministrativosList.as_view(), name="tribunales-administrativos"),
    path("tribunal-superior", TribunalSuperiorList.as_view(), name="tribunal-superior"),
    path("tipo-norma", TipoNormaList.as_view(), name="tipo-norma"),
    path("download", DownloadFile.as_view(), name="download"),
]
