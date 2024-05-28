from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from apps.elastic.choices import TIPOS_DE_PUNTAJES
from apps.elastic.serializers.common_serializers import PaginationSerializer


class SearchSerializer(serializers.Serializer):
    '''
    Esta clase serializa la data de entrada que será enviada al servicio de Elastic.
    '''
    texto_buscar = serializers.CharField(required=False, help_text='Palabra y/o texto a buscar.')
    origen_id = serializers.ListSerializer(child=serializers.IntegerField(), required=False, help_text='ID Fuente de información/ Altas Cortes/ Tribunales.')
    sub_origen_id = serializers.ListSerializer(child=serializers.IntegerField(), required=False, help_text='Sub origen ID Fuente de información/ Altas Cortes/ Tribunales.')
    extra_origen_id = serializers.ListSerializer(child=serializers.IntegerField(), required=False, help_text='Extra origen ID Fuente de información/ Altas Cortes/ Tribunales.')
    consideraciones = serializers.CharField(required=False, help_text='Texto del campo consideraciones.')
    asunto = serializers.CharField(required=False, help_text='Texto del campo asunto.')
    problema_juridico = serializers.CharField(required=False, help_text='Texto del campo problema jurídico.')
    parte_resolutiva = serializers.CharField(required=False, help_text='Texto del campo parte resolutiva.')
    jurisprudencia_relacionada = serializers.CharField(required=False, help_text='Texto del campo jurisprudencia relacionada.')
    procedencia = serializers.CharField(required=False, help_text='Textos del campo procedencia.')
    procedencia_multiple = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Textos del campo procedencia.')
    sujetos_procesales = serializers.CharField(required=False, help_text='Select o dropdown sujetos procesales.')
    salvamento = serializers.CharField(required=False, allow_blank=True, help_text='Texto del campo salvamento/aclaración/adición.')
    contenga_salvamento = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición AND)')
    o_contenga_salvamento = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición OR)')
    no_contenga_salvamento = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición <>, !=)')
    salvamento_multiple = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='busqueda multiple')
    nombregaceta = serializers.CharField(required=False, allow_blank=True, help_text='Búsqueda abierta en el campo nombre de gaceta.')
    tipogaceta = serializers.CharField(required=False, allow_blank=True, help_text='Búsqueda abierta en el campo tipo de gaceta.')
    magistrado = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Textos del campo magistrado que salva, aclara o adiciona voto.')
    contenidogaceta = serializers.CharField(required=False, allow_blank=True, help_text='Búsqueda abierta en el campo contenido gaceta')
    categoria_genero = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Texto del campo categoría de género.')
    decision = serializers.CharField(required=False, allow_blank=True, help_text='Texto del campo decisión.')
    decision_multiple = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Textos del campo decisión.')
    clase_actuacion = serializers.CharField(required=False, allow_blank=True, help_text='Texto abierto clase de actuacion.')
    clase_actuacion_multiple = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Textos del select clase de actuación.')
    solo_gacetas_judiciales = serializers.BooleanField(required=False, help_text='Si está check solo en gacetas judiciales enviar en true, si no omitir.')
    tema = serializers.CharField(required=False, allow_blank=True, help_text='Select o dropdown tema.')
    temas_multiple = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Texto con sintaxy query string de elasticsearch.')
    publicacion = serializers.IntegerField(required=False, help_text='Texto del campo número de publicación.')
    ponente = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Select o dropdown ponente.')
    sala = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Select o dropdown sala.')
    tipo_sala = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Select o dropdown tipo de sala.')
    tipo_providencia = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Select o dropdown tipo de providencia.')
    numero_radicacion = serializers.CharField(required=False, allow_blank=True, help_text='Texto del campo número de radicación.')
    numero_providencia = serializers.CharField(required=False, allow_blank=True, help_text='Texto del campo número de providencia.')
    id = serializers.CharField(required=False, allow_blank=True, help_text='Texto del campo ID.')
    delitos = serializers.CharField(required=False, help_text='Select o dropdown delitos.')
    delitos_multiple = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Textos del campo delitos.')
    relevante = serializers.BooleanField(required=False, help_text='Si está check Relevantes enviar en true, si no omitir.')
    asunto_sala = serializers.BooleanField(required=False, help_text='Si está check Asunto de sala enviar en true, si no omitir.')
    tutelas = serializers.BooleanField(required=False, help_text='Si está check Tutelas  enviar en true, si no omitir.')
    contenga = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista de palabras obligatorias que quieres que contenga la búsqueda. (análogo a una condición AND)')
    o_contenga = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista de palabras opcionales que quieres que contenga la búsqueda. (análogo a una condición OR)')
    no_contenga = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista de palabras que no quieres que contenga la búsqueda. (análogo a una condición <>, !=)')
    contenga_jurisprudencia_relacionada = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista de palabras obligatorias que quieres que contenga la búsqueda. (análogo a una condición AND)')
    o_contenga_jurisprudencia_relacionada = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista de palabras opcionales que quieres que contenga la búsqueda. (análogo a una condición OR)')
    no_contenga_jurisprudencia_relacionada = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista de palabras que no quieres que contenga la búsqueda. (análogo a una condición <>, !=)')
    contenga_consideraciones = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista de palabras obligatorias que quieres que contenga la búsqueda. (análogo a una condición AND)')
    o_contenga_consideraciones = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista de palabras opcionales que quieres que contenga la búsqueda. (análogo a una condición OR)')
    no_contenga_consideraciones = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista de palabras que no quieres que contenga la búsqueda. (análogo a una condición <>, !=)')
    contenga_asunto = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista de palabras obligatorias que quieres que contenga la búsqueda. (análogo a una condición AND)')
    o_contenga_asunto = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista de palabras opcionales que quieres que contenga la búsqueda. (análogo a una condición OR)')
    no_contenga_asunto = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista de palabras que no quieres que contenga la búsqueda. (análogo a una condición <>, !=)')
    contenga_tema = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista de palabras obligatorias que quieres que contenga la búsqueda. (análogo a una condición AND)')
    o_contenga_tema = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista de palabras opcionales que quieres que contenga la búsqueda. (análogo a una condición OR)')
    no_contenga_tema = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista de palabras que no quieres que contenga la búsqueda. (análogo a una condición <>, !=)')
    contenga_parte_resolutiva = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista de palabras obligatorias que quieres que contenga la búsqueda. (análogo a una condición AND)')
    o_contenga_parte_resolutiva = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista de palabras opcionales que quieres que contenga la búsqueda. (análogo a una condición OR)')
    no_contenga_parte_resolutiva = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista de palabras que no quieres que contenga la búsqueda. (análogo a una condición <>, !=)')
    start_date = serializers.DateField(required=False, help_text='Recibe el formato de fehca "YYYY-MM-DD.')
    end_date = serializers.DateField(required=False, help_text='Recibe el formato de fehca "YYYY-MM-DD.')
    gacetas_fechadesde = serializers.DateField(required=False, help_text='Campo hasta, recibe formatos "YYYY-MM-DD HH:mm:ss" y "YYYY-MM-DD".')
    gacetas_fechahasta = serializers.DateField(required=False, help_text='Campo hasta, recibe formatos "YYYY-MM-DD HH:mm:ss" y "YYYY-MM-DD".')
    demandante = serializers.CharField(required=False, allow_blank=True, help_text='Búsqueda abierta en el campo demandante.')
    demandado = serializers.CharField(required=False, allow_blank=True, help_text='Búsqueda abierta en el campo demandado.')
    norma_demandada = serializers.CharField(required=False, allow_blank=True, help_text='Texto norma demandada.')
    contenga_norma_demandada = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición AND)')
    o_contenga_norma_demandada = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición OR)')
    no_contenga_norma_demandada = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición <>, !=)')
    tomo = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    contenga_tomo = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición AND)')
    o_contenga_tomo = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición OR)')
    no_contenga_tomo = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición <>, !=)')
    volumen = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    contenga_volumen = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición AND)')
    o_contenga_volumen = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición OR)')
    no_contenga_volumen = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición <>, !=)')
    parte = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    contenga_parte = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición AND)')
    o_contenga_parte = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición OR)')
    no_contenga_parte = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición <>, !=)')
    formatotvp = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    contenga_formatotvp = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición AND)')
    o_contenga_formatotvp = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición OR)')
    no_contenga_formatotvp = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición <>, !=)')
    codigodeweycompleto = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    contenga_codigodeweycompleto = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición AND)')
    o_contenga_codigodeweycompleto = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición OR)')
    no_contenga_codigodeweycompleto = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición <>, !=)')
    numversion = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    titulo = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    contenga_titulo = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición AND)')
    o_contenga_titulo = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición OR)')
    no_contenga_titulo = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición <>, !=)')
    autor = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    contenga_autor = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición AND)')
    o_contenga_autor = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición OR)')
    no_contenga_autor = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición <>, !=)')
    biblioteca = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    contenga_biblioteca = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición AND)')
    o_contenga_biblioteca = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición OR)')
    no_contenga_biblioteca = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición <>, !=)')
    autorcorporativo = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    contenga_autorcorporativo = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición AND)')
    o_contenga_autorcorporativo = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición OR)')
    no_contenga_autorcorporativo = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición <>, !=)')
    editorial = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    contenga_editorial = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición AND)')
    o_contenga_editorial = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición OR)')
    no_contenga_editorial = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición <>, !=)')
    serie = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    contenga_serie = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición AND)')
    o_contenga_serie = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición OR)')
    no_contenga_serie = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición <>, !=)')
    idioma = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    ciudad = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    documentovirtualnombre = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    archivo_principal = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    n_registro = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    dependencia = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    descripcion = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    descriptores = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    contenga_descriptores = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición AND)')
    o_contenga_descriptores = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición OR)')
    no_contenga_descriptores = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición <>, !=)')
    descriptores_multiple = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='busqueda multiple')
    lugarorigen = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    editor = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    fuente = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='busqueda multiple')
    lugarpublicacion = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    codigobarras = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    descripcioncompleta = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    lugar_edicion = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    caja = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    despacho_titular = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    folios = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    imputado = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    num_cuaderno = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    numero_proceso = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    observaciones = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    radicado = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    enlace_web = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    fuentepagina = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    tomoidentificacion = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    tomopagina = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    web = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    entidadgeneradora = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='busqueda multiple')
    biblioteca_multiple = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='busqueda multiple')
    tipomaterialid_multiple = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='busqueda multiple')
    annopublicacion = serializers.CharField(required=False, allow_blank=True, help_text='busqueda por año de publicación')
    isbn = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    numerotopograficoclaveautor = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    isnn = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    analiticatitulo = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    analiticadescriptor = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='busqueda multiple')
    analiticatema = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    analiticaautor = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    numero = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    fechaexpedicion = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    fuenteoficial_multiple = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='busqueda multiple')
    numerofuentepublicacion = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    annocompendio = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    mescompendio = serializers.IntegerField(required=False, help_text='busqueda multiple.')
    fechafuentepublicacion = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    anadesres = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    categoria_multiple = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Categoría de genero.')
    fuenteoficial = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    anioactoadmin = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    id_acto_administrativo = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    aniogaceta = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    volumengaceta = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    idestrimestralgaceta = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    ediciongaceta = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    estrimestralgaceta = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    tipo_acto = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='busqueda abierta ')
    estado = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='busqueda abierta ')
    gaceta_acdm = serializers.BooleanField(required=False, help_text='busqueda abierta ')
    tipo_gaceta = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='busqueda abierta ')
    seccion = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='busqueda abierta ')
    decisión_multiple = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista.')
    magistrado_salvamento = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    nota_relatoria = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    id = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    servidores_publicos = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    naturalezaproceso = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='busqueda multiple')
    tesisagrupados = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    contenga_tesisagrupados = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición AND)')
    o_contenga_tesisagrupados = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición OR)')
    no_contenga_tesisagrupados = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='(análogo a una condición <>, !=)')
    perspectivagenero = serializers.BooleanField(required=False, help_text='Campo booleano')
    conflictoarmado = serializers.BooleanField(required=False, help_text='Campo booleano')
    responsabilidadfiscal = serializers.BooleanField(required=False, help_text='Campo booleano')
    unificacion = serializers.BooleanField(required=False, help_text='Campo booleano')
    fuentesformalesagrupadas = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    no_radicado = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    numproceso = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    subseccion = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    tesis = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    tribunales_administrativos_multiple = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='busqueda multiple')
    no_acta = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    genero = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    conjuez = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    tipo_norma = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta ')
    actor = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    numero_bol = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    anno = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    mes = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='busqueda multiple')
    problema_juridico_ce = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    ubicacion_inmueble = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    no_gaceta_acdm = serializers.BooleanField(required=False, help_text='Campo booleano')
    analiticarestrictor = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='busqueda multiple')
    fuente_formal = serializers.CharField(required=False, help_text='Select o dropdown fuente formal.')
    fuente_formal_multiple = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Textos Select fuente formal.')
    contenga_fuente_formal = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista de palabras obligatorias que quieres que contenga la búsqueda. (análogo a una condición AND)')
    o_contenga_fuente_formal = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista de palabras opcionales que quieres que contenga la búsqueda. (análogo a una condición OR)')
    no_contenga_fuente_formal = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='Lista de palabras que no quieres que contenga la búsqueda. (análogo a una condición <>, !=)')
    salvamento_voto = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    magistrado_s_a = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    tema_s_a = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    perspectivagenero = serializers.BooleanField(required=False, help_text='busqueda abierta ')
    conflictoarmado = serializers.BooleanField(required=False, help_text='busqueda abierta ')
    responsabilidadfiscal = serializers.BooleanField(required=False, help_text='busqueda abierta ')
    unificacion = serializers.BooleanField(required=False, help_text='busqueda abierta ')
    tiene_salvamento = serializers.BooleanField(required=False, help_text='busqueda abierta ')
    corporaciones_multiple = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='busqueda multiple')
    bibliotecaRed_multiple = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='busqueda multiple')
    tribunales_superiores_multiple = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='busqueda multiple')
    hechos_providencia = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    nombre_predio = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    cedula_catastral = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    matricula_inmobiliaria = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')
    origen = serializers.ListSerializer(child=serializers.CharField(), required=False, help_text='busqueda multiple')
    codigoactoadmin = serializers.CharField(required=False, allow_blank=True, help_text='busqueda abierta.')

    def is_valid(self, raise_exception=False):
        super().is_valid(False)

        fields_keys = set(self.fields.keys())
        input_keys = set(self.initial_data.keys())

        additional_fields = input_keys - fields_keys

        if bool(additional_fields) and not any("sub_origen_id" in s for s in list(additional_fields)):
            self._errors['fields'] = ['Additional fields not allowed: {}.'.format(list(additional_fields))]

        if self._errors and raise_exception:
            raise ValidationError(self.errors)

        return not bool(self._errors)

    def to_internal_value(self, data):
        for key in list(data.keys()):
            if data[key] is None or data[key] == "" or data[key] == [] or data[key] == False:
                del data[key]
        return super(SearchSerializer, self).to_internal_value(data)

    def validate_contenga(self, value):
        if len(value) > 3:
            raise serializers.ValidationError('Máximo tres valores.')
        return value

    def validate_o_contenga(self, value):
        if len(value) > 3:
            raise serializers.ValidationError('Máximo tres valores.')
        return value

    def validate_no_contenga(self, value):
        if len(value) > 3:
            raise serializers.ValidationError('Máximo tres valores.')
        return value

    def validate_texto_buscar(self, value):
        if value.count('"') > 2:
            raise serializers.ValidationError('El texto a buscar contiene muchas comillas.')
        return value

    def validate_consideraciones(self, value):
        if value.count('"') > 2:
            raise serializers.ValidationError('Consideraciones contiene muchas comillas.')
        return value

    def validate_jurisprudencia_relacionada(self, value):
        if value.count('"') > 2:
            raise serializers.ValidationError('Jurisprudencia relacionada contiene muchas comillas.')
        return value

    def validate_asunto(self, value):
        if value.count('"') > 2:
            raise serializers.ValidationError('Asunto contiene muchas comillas.')
        return value

    def validate_tema(self, value):
        if value.count('"') > 2:
            raise serializers.ValidationError('Tema contiene muchas comillas.')
        return value

    def validate_salvamento(self, value):
        if value.count('"') > 2:
            raise serializers.ValidationError('Salvamento contiene muchas comillas.')
        return value

    def validate_parte_resolutiva(self, value):
        if value.count('"') > 2:
            raise serializers.ValidationError('Parte resolutiva contiene muchas comillas.')
        return value

    def validate_fuente_formal(self, value):
        if value.count('"') > 2:
            raise serializers.ValidationError('fuente_formal contiene muchas comillas.')
        return value


class SearchDataSerializer(serializers.Serializer):
    delitos = serializers.CharField()
    sala = serializers.CharField()
    auxiliar1 = serializers.IntegerField()
    csj_jurisprudencia_relacionada = serializers.CharField()
    nivel_origen = serializers.IntegerField()
    demandado = serializers.CharField()
    anexo2 = serializers.CharField()
    procedencia = serializers.CharField()
    tipo_providencia = serializers.CharField()
    estado_pri = serializers.IntegerField()
    csj_reserva = serializers.IntegerField()
    clase_actuacion = serializers.CharField()
    ponente = serializers.CharField()
    seccion = serializers.CharField()
    nombre_origen = serializers.CharField()
    magistrado_s_a = serializers.CharField()
    decision = serializers.CharField()
    fuente_formal = serializers.CharField()
    timestamp = serializers.DateTimeField()
    result_timestamp = serializers.DateTimeField()
    anexo3 = serializers.CharField()
    id = serializers.IntegerField()
    fecha_update = serializers.DateTimeField()
    tema_s_a = serializers.CharField()
    type = serializers.CharField()
    numero_radicacion = serializers.CharField()
    especialidad = serializers.CharField()
    csj_archivo = serializers.CharField()
    publicacion = serializers.IntegerField()
    enr_analitica = serializers.IntegerField()
    parte_resolutiva = serializers.CharField()
    descriptor = serializers.CharField()
    csj_super_filtro = serializers.CharField()
    nota_relatoria = serializers.CharField()
    version_pri = serializers.IntegerField()
    csj_no_acta = serializers.IntegerField()
    asunto = serializers.CharField()
    consideraciones = serializers.CharField()
    fecha = serializers.DateTimeField()
    origen_id_pri = serializers.CharField()
    tema = serializers.CharField()
    tipo_archivo = serializers.IntegerField()
    origen_id_pri = serializers.IntegerField()
    anexo1 = serializers.CharField()
    demandante = serializers.CharField()
    csj_fulltxt = serializers.CharField()
    numero_providencia = serializers.CharField()
    ruta = serializers.CharField()
    id_pri = serializers.IntegerField()
    doc_ocr = serializers.IntegerField()
    version = serializers.IntegerField()


class SearchResponseSerializer(PaginationSerializer, serializers.Serializer):
    results = SearchDataSerializer(many=True, help_text='Retorna una lista de los resultados obtenidos.')


class FileDownloadSerializer(serializers.Serializer):
    file_name = serializers.CharField()
    extension = serializers.CharField()
    base64_file = serializers.CharField()
    mime_type = serializers.CharField()


class FileDownloadErrorSerializer(serializers.Serializer):
    error = serializers.CharField()


class CardReportSerializer(serializers.Serializer):
    fields = serializers.ListSerializer(child=serializers.CharField(), required=True, help_text='Lista de campos a mostrar en el reporte.')
    items = serializers.ListSerializer(child=serializers.DictField(), required=True, help_text='Lista de resultados de búsqueda.')
    total_records = serializers.IntegerField(required=False, help_text='Total registros', default=1)


class CalificarResultadoSerializer(serializers.Serializer):
    index = serializers.CharField(required=True, help_text='Se encuentra dentro del resultado de cada documento en la propiedad _index.')
    document_id = serializers.CharField(required=True, help_text='Se encuentra dentro del resultado de cada documento en la propiedad _id.')
    puntaje = serializers.IntegerField(required=True, help_text='Puntaje.')
    tipo_puntaje = serializers.ChoiceField(choices=TIPOS_DE_PUNTAJES, required=True, help_text='Tipo de puntaje.')


class CalificarResultadosSerializer(serializers.Serializer):
    calificaciones = CalificarResultadoSerializer(many=True)


class AutocompletarSerializer(serializers.Serializer):
    texto = serializers.CharField(required=True, help_text='Texto a buscar')


class AutocompletarResponseSerializer(serializers.Serializer):
    id = serializers.CharField(required=True, help_text='ID.')
    text = serializers.CharField(required=True, help_text='Texto retornado')


class QuerySerializer(serializers.Serializer):
    query = serializers.DictField(required=True, help_text='Query de la búsqueda.')
    puntaje = serializers.IntegerField(required=True, help_text='Puntaje.')
    total_records = serializers.IntegerField(required=True, help_text='Total de Registros.')


class HistorialBusquedaResponseSerializer(serializers.Serializer):
    id = serializers.CharField(required=True, help_text='ID.')
    fecha_creacion = serializers.CharField(required=True, help_text='Fecha de creación')
    busqueda = serializers.DictField(required=True, help_text='Párametros de Búsqueda')


class ImageDownloadSerializer(serializers.Serializer):
    anexo1 = serializers.ListSerializer(child=serializers.DictField(), required=False, help_text='Campo Anexo1')


class VideoDownloadSerializer(serializers.Serializer):
    documentovirtualnombre = serializers.ListSerializer(child=serializers.DictField(), required=False, help_text='Campo documentovirtualnombre')