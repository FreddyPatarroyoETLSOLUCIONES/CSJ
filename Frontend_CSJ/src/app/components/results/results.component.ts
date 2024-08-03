import { AfterViewInit, Component, Input, OnInit, Inject } from '@angular/core';
import { DatePipe, DOCUMENT } from '@angular/common';
import { ElasticService } from 'src/services/elastic.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';
import { videoModel } from 'src/app/models/videos';
import { CalificarResultado, CalificarResultadoCampos } from 'src/app/models/PostCalificacionResultado';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit, AfterViewInit {
  @Input() public respuesta: any;
  @Input() textobusqueda: string;
  @Input() limit: number;
  @Input() UrlRef: string;
  logoImg:string='';
  logoName:string='';
  corporationTmp: string = '';
  corporationArray: any;
  masivedownload: number[] = [];
  masivedownloadSelectItems: any[] = [];
  masivedownloadSelectItemsTipoActo: any[] = [];
  error: string;
  result: any;
  dropdownresult: boolean[] = [];
  dropdownFile: boolean[] = [];
  pages: number;
  alphas: boolean[];
  modals_medium: boolean[];
  modals_detail_info: boolean[];
  mostrarVideo: boolean;
  modals_results: boolean[];
  modals_selector: boolean[];
  ReportJurisprudencia: any;
  ReportJurisprudenciaGacetas: any;
  ReportJurisprudenciaSamai: any;
  ReportJurisprudenciaBoletines: any;
  ReportLibrosMedios: any;
  ReportActosAdministrativos: any;
  ReportActosAdministrativosAcuerdos: any;
  ReportActosAdministrativosGacetas: any;
  ReportRevistas: any;
  ReportNormas: any;
  ReportExpedientesH: any;
  ReportFotografiasH: any;
  ReportPrensaH: any;
  ReportPublicacionesH: any;
  ReportSentenciasH: any;
  ReportVideosH: any;
  ReportVideosV: any;
  ReportVideoConferenciasV: any;
  ReportFotografiasV: any;
  ReportPublicacionesV: any;
  ReportAudioV: any;
  isMasterSel: boolean;
  isMasterSelmasive: boolean;
  anexosInfo: any;
  transcripcion: boolean;
  reusltsImage: any;
  videoSeleccionado: any;
  indexVideo: any;
  nuevoVideo: videoModel = new videoModel();
  //Filtros
  public querySearch: any = {};
  count_select_snippets = 0;
  public selectionFilters: any = {
    ponentes: [],
    start_date: '',
    end_date: '',
    tiposProvidencias: [],
    fuentesFormales: [],
    claseActuaciones: [],
    delitos: [],
    procedencias: [],
    categoriasGenero: [],
    decisiones: [],
    salas: [],
    magistradosSalvamento: [],
    tiposSalas: [],
  };
  //End Filtros

  constructor(
    public datepipe: DatePipe,
    private elasticService: ElasticService,
    private spinner: NgxSpinnerService,
    private appComponent: AppComponent,
    @Inject(DOCUMENT) private document: Document
  ) {}

  today = new Date();
  modal_selector = false;
  modal_error = false;
  report_selector = false;
  report_masive = false;
  dropdownMasive = false;
  dropdownPages = false;
  reports: any[];
  many_reports: any[];
  extra_origen_report:number;
  tipo_acto_report:string;
  scoreResultAutomatic: CalificarResultado = new CalificarResultado();
  calificarResultado: CalificarResultadoCampos = new CalificarResultadoCampos();
  pointResultadoAutomatic: any = 0;

  ngAfterViewInit(): void {
    // #region fix abstracts
    const abstracts = document.querySelectorAll('.abstract');
    for (let i = 0; i < abstracts.length; i++) {
      let text = abstracts[i].textContent.trim();
      let textLength = text.length;

      if (textLength >= 300) {
        let content = abstracts[i].innerHTML;
        let sliceContent = content.substring(0, 300);
        abstracts[i].innerHTML = sliceContent;
      }
    }
    // #endregion fix abstracts
  }
  ngOnInit() {

    var UrlRefTmp = this.UrlRef ? this.UrlRef : "";
    interface  ICorporation{
      [index: string]: string;
    }
    this.corporationArray = {} as ICorporation;
    this.corporationArray[""] = "corte_suprema_justicia";
    this.corporationArray["CC"] = "corte_constitucional";
    this.corporationArray["CE"] = "consejo_estado";
    this.corporationArray["CNDJ"] = "comision_nacional_disciplina_judicial";
    this.corporationArray["CNSJ"] = "consejo_superior_judicatura";
    this.corporationTmp = this.corporationArray[UrlRefTmp];
    this.getParamLogoById(this.corporationTmp);

    this.reusltsImage = [];
    this.dropdownresult = new Array(this.limit).fill(false);
    this.dropdownFile = new Array(this.limit).fill(false);
    this.pages = Math.ceil(this.respuesta.total_records / this.limit);
    this.alphas = new Array(this.limit).fill(false);
    this.modals_medium = new Array(this.limit).fill(false);
    this.modals_detail_info = new Array(this.limit).fill(false);
    this.modals_results = new Array(this.limit).fill(false);
    this.modals_selector = new Array(this.limit).fill(false);
    this.isMasterSel = false;
    this.isMasterSelmasive = false;
    this.transcripcion = false;
    //El campo typeReport nos ayuda a identidicar de que arreglo proviene cada campo de los snippets
    this.ReportJurisprudencia = [
      {
        id: 1,
        value: 'id',
        name: 'ID',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 2,
        value: 'ponente',
        name: 'Ponente',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 3,
        value: 'sala',
        name: 'Nombre de la sala',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 4,
        value: 'numero_radicacion',
        name: 'N.° proceso',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 5,
        value: 'numero_providencia',
        name: 'N.° providencia',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 6,
        value: 'clase_actuacion',
        name: 'Clase de actuación',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 7,
        value: 'tipo_providencia',
        name: 'Tipo de providencia',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 8,
        value: 'sujetos',
        name: 'Sujetos procesales',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 9,
        value: 'fuente_formal',
        name: 'Fuente Formal',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 10,
        value: 'decision',
        name: 'Decisión',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 11,
        value: 'procedencia',
        name: 'Procedencia',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 12,
        value: 'fecha',
        name: 'Fecha',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 13,
        value: 'asunto',
        name: 'Asunto',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 14,
        value: 'titulacion_',
        name: 'Titulación',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 15,
        value: 'tesis',
        name: 'Tesis',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 16,
        value: 'magistrado_s_a_limpio',
        name: 'Magistrado que salva o aclara voto',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 17,
        value: 'salvamento_voto',
        name: 'Salvamento/Aclaración/Adición de voto',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 18,
        value: 'titulacion_voto',
        name: 'Titulación del Salvamento/Aclaración/Adición de voto',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 19,
        value: 'consideraciones',
        name: 'Consideraciones completas',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 20,
        value: 'csj_jurisprudencia_relacionada',
        name: 'Jurisprudencia relacionada',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 21,
        value: 'parte_resolutiva',
        name: 'Parte resolutiva',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 22,
        value: 'categoria_genero',
        name: 'Categoría de género',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 23,
        value: 'delitos',
        name: 'Delitos',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 24,
        value: 'nota_relatoria',
        name: 'Nota de relatoría',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
      {
        id: 25,
        value: 'tema',
        name: 'Tema',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudencia',
      },
    ];

    //?El campo typeReport nos ayuda a identidicar de que arreglo proviene cada campo de los snippets
    this.ReportJurisprudenciaGacetas = [
      {
        id: 1,
        value: 'nombregaceta',
        name: 'Nombre de la Gaceta',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaGacetas',
      },
      {
        id: 2,
        value: 'tipogaceta',
        name: 'Tipo de Gaceta',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaGacetas',
      },
      {
        id: 3,
        value: 'fechadesde',
        name: 'Año desde',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaGacetas',
      },
      {
        id: 4,
        value: 'fechahasta',
        name: 'Año hasta',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaGacetas',
      },
    ];

    //?El campo typeReport nos ayuda a identidicar de que arreglo proviene cada campo de los snippets
    this.ReportJurisprudenciaSamai = [
      {
        id: 1,
        value: 'fecha',
        name: 'Fecha',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaSamai',
      },
      {
        id: 2,
        value: 'nointerno',
        name: 'N.° interno',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaSamai',
      },
      {
        id: 3,
        value: 'nounico',
        name: 'N.° único',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaSamai',
      },
      {
        id: 4,
        value: 'numproceso',
        name: 'N.° de proceso',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaSamai',
      },
      {
        id: 5,
        value: 'tipo_providencia',
        name: 'Tipo de Providencia',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaSamai',
      },
      {
        id: 6,
        value: 'seccion',
        name: 'Sección',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaSamai',
      },
      {
        id: 7,
        value: 'subseccion',
        name: 'Subsección',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaSamai',
      },
      {
        id: 8,
        value: 'descriptoresagrupados',
        name: 'Descriptores agrupados',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaSamai',
      },
      {
        id: 9,
        value: 'tesisagrupados',
        name: 'Tesis agrupados',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaSamai',
      },
      {
        id: 10,
        value: 'responsabilidadfiscal',
        name: 'Responsabilidad fiscal',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaSamai',
      },
      {
        id: 11,
        value: 'perspectivagenero',
        name: 'Perspectiva genero',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaSamai',
      },
      {
        id: 12,
        value: 'conflictoarmado',
        name: 'Conflicto armado',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaSamai',
      },
      {
        id: 13,
        value: 'fuente_formal',
        name: 'Fuente formal',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaSamai',
      },
      {
        id: 14,
        value: 'magistradoponente',
        name: 'Magistrado ponente',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaSamai',
      },
      {
        id: 15,
        value: 'identificacionponente',
        name: 'Identificación ponente',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaSamai',
      },
      {
        id: 16,
        value: 'naturalezaproceso',
        name: 'Naturaleza proceso',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaSamai',
      },
      {
        id: 17,
        value: 'descriptorestesis',
        name: 'Descriptores Tesis',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaSamai',
      },
      {
        id: 18,
        value: 'norma_demandada',
        name: 'Norma demandada',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaSamai',
      },
      {
        id: 19,
        value: 'demandado',
        name: 'Demandado',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaSamai',
      },
      {
        id: 20,
        value: 'actor',
        name: 'Actor',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaSamai',
      },
      {
        id: 21,
        value: 'detalletitulacion',
        name: 'Detalle Titulación',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaSamai',
      },
    ];

    //?El campo typeReport nos ayuda a identidicar de que arreglo proviene cada campo de los snippets
    this.ReportJurisprudenciaBoletines = [
      {
        id: 1,
        value: 'numero_bol',
        name: 'N.° de Boletin',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaBoletines',
      },
      {
        id: 2,
        value: 'anno',
        name: 'Año',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaBoletines',
      },
      {
        id: 1,
        value: 'mes',
        name: 'Mes',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportJurisprudenciaBoletines',
      },
    ];

    //?El campo typeReport nos ayuda a identidicar de que arreglo proviene cada campo de los snippets
    this.ReportLibrosMedios = [
      {
        id: 1,
        value: 'id',
        name: 'ID',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 2,
        value: 'idioma',
        name: 'Idioma',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 3,
        value: 'autor',
        name: 'Autor(es)',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 4,
        value: 'autor_corporativo',
        name: 'Autor corporativo',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 5,
        value: 'paginas_libro',
        name: 'Páginas',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 6,
        value: 'isbn',
        name: 'ISBN',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 7,
        value: 'serie',
        name: 'Serie(s)',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 8,
        value: 'observaciones',
        name: 'Observaciones',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 9,
        value: 'fecha',
        name: 'Fecha',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 10,
        value: 'titulo',
        name: 'Título',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 11,
        value: 'tipomaterialid',
        name: 'Tipo de material',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 12,
        value: 'annopublicacion',
        name: 'Año de publicación',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 13,
        value: 'numerotopograficoclaveautor',
        name: 'Número topográfico',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 14,
        value: 'edicionid',
        name: 'Edición',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 15,
        value: 'tipoedicionid',
        name: 'Tipo de Edición',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 16,
        value: 'traductor',
        name: 'Traductor',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 17,
        value: 'tema',
        name: 'Temas',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 18,
        value: 'editorial',
        name: 'Editorial',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 19,
        value: 'bilbioteca',
        name: 'Bilbioteca',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 20,
        value: 'analiticatema',
        name: 'Analítica tema',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 21,
        value: 'existencialocalizacion',
        name: 'Existencia localización',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 22,
        value: 'existenciaestado',
        name: 'Existencia estado',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 23,
        value: 'existenciaubicacionfisica',
        name: 'Existencia ubicación física',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 24,
        value: 'ciudad',
        name: 'Ciudad',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
      {
        id: 25,
        value: 'codigodeweycompleto',
        name: 'Código de wey completo',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportLibrosMedios',
      },
    ];

    //?El campo typeReport nos ayuda a identidicar de que arreglo proviene cada campo de los snippets
    this.ReportActosAdministrativos = [
      {
        id: 1,
        value: 'estado',
        name: 'Estado',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativos',
      },
      {
        id: 2,
        value: 'id_acto_administrativo',
        name: 'Acto Administrativo',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativos',
      },
      {
        id: 3,
        value: 'descripcioncontenido',
        name: 'Descripción',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativos',
      },
      {
        id: 4,
        value: 'fecha',
        name: 'Fecha',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativos',
      },
      {
        id: 5,
        value: 'paraactoadmin',
        name: 'Para acto admin',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativos',
      },
      {
        id: 6,
        value: 'deactoadmin',
        name: 'De acto admin',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativos',
      },
      {
        id: 7,
        value: 'presidente_sala',
        name: 'Presente sala',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativos',
      },
      {
        id: 8,
        value: 'titulodescripcion',
        name: 'Titulo descripción',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativos',
      },
      {
        id: 9,
        value: 'tipo_acto',
        name: 'Tipo acto',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativos',
      },
      {
        id: 10,
        value: 'fecha_rige',
        name: 'Fecha rige',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativos',
      },
      {
        id: 11,
        value: 'nombreactoadmin',
        name: 'Nombre acto admin',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativos',
      },
    ];

    //?El campo typeReport nos ayuda a identidicar de que arreglo proviene cada campo de los snippets
    this.ReportActosAdministrativosAcuerdos = [
      {
        id: 1,
        value: 'estado',
        name: 'Estado',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 2,
        value: 'id_acto_administrativo',
        name: 'Acto Administrativo',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 3,
        value: 'descripcioncontenido',
        name: 'Descripción',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 4,
        value: 'fecha',
        name: 'Fecha expedición',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 5,
        value: 'actoadministrativoplitica',
        name: 'Acto administrativo politica',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 6,
        value: 'actoadministrativorelacionados',
        name: 'Acto administrativo relacionados',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 7,
        value: 'actoadministrativocontenidos',
        name: 'Acto administrativo contenidos',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 8,
        value: 'descriptorrestrictor',
        name: 'Descriptor restrictor',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 9,
        value: 'tipo_acto',
        name: 'Tipo acto',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 10,
        value: 'nombreactoadmin',
        name: 'Nombre acto admin',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 11,
        value: 'codigoactoadmin',
        name: 'Código acto admin',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 12,
        value: 'anioactoadmin',
        name: 'Año acto admin',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 13,
        value: 'fecha_sesion',
        name: 'Fecha sesión',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 14,
        value: 'fecha_rige',
        name: 'Fecha rige',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 15,
        value: 'titulodescripcion',
        name: 'Titulo descripción',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 16,
        value: 'presidente_sala',
        name: 'Presidente sala',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 17,
        value: 'paraactoadmin',
        name: 'Para acto admin',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 18,
        value: 'deactoadmin',
        name: 'De acto admin',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 19,
        value: 'temaactoadmin',
        name: 'Tema acto admin',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 20,
        value: 'aniogaceta',
        name: 'Año gaceta',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 21,
        value: 'volumengaceta',
        name: 'Volumen gaceta',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 22,
        value: 'nombregaceta_romano',
        name: 'Nombre gaceta romano',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 23,
        value: 'ediciongaceta',
        name: 'Edición gaceta',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 24,
        value: 'numerogaceta',
        name: 'Número gaceta',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 25,
        value: 'fechagaceta',
        name: 'Fecha gaceta',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
      {
        id: 26,
        value: 'numeropaginagaceta',
        name: 'Número página gaceta',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosAcuerdos',
      },
    ];

    //?El campo typeReport nos ayuda a identidicar de que arreglo proviene cada campo de los snippets
    this.ReportActosAdministrativosGacetas = [
      {
        id: 1,
        value: 'nombregaceta_romano',
        name: 'Nombre Gacetas',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosGacetas',
      },
      {
        id: 2,
        value: 'volumengaceta',
        name: 'Volumen',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosGacetas',
      },
      {
        id: 3,
        value: 'numerogaceta',
        name: 'Número',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosGacetas',
      },
      {
        id: 4,
        value: 'ediciongaceta',
        name: 'Edición',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosGacetas',
      },
      {
        id: 5,
        value: 'estrimestralgaceta',
        name: 'Es trimestral',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportActosAdministrativosGacetas',
      },
    ];

    //?El campo typeReport nos ayuda a identidicar de que arreglo proviene cada campo de los snippets
    this.ReportRevistas = [
      {
        id: 1,
        value: 'id',
        name: 'ID',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportRevistas',
      },
      {
        id: 2,
        value: 'idioma',
        name: 'Idioma',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportRevistas',
      },
      {
        id: 3,
        value: 'periodicidad',
        name: 'Periodicidad',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportRevistas',
      },
      {
        id: 4,
        value: 'issn',
        name: 'ISSN',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportRevistas',
      },
      {
        id: 5,
        value: 'editorial',
        name: 'Editorial(es)',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportRevistas',
      },
      {
        id: 6,
        value: 'institucion',
        name: 'Institución',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportRevistas',
      },
      {
        id: 7,
        value: 'titulo',
        name: 'Título',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportRevistas',
      },
      {
        id: 8,
        value: 'rev_temas',
        name: 'Temas',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportRevistas',
      },
      {
        id: 9,
        value: 'observaciones',
        name: 'Observaciones',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportRevistas',
      },
      {
        id: 10,
        value: 'codigotitulo',
        name: 'Código título',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportRevistas',
      },
      {
        id: 11,
        value: 'annopublicacion',
        name: 'Año de publicación',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportRevistas',
      },
      {
        id: 12,
        value: 'ciudad',
        name: 'Ciudad',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportRevistas',
      },
      {
        id: 13,
        value: 'biblioteca',
        name: 'Biblioteca',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportRevistas',
      },
      {
        id: 14,
        value: 'existenciaestado',
        name: 'Existencia estado',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportRevistas',
      },
      {
        id: 15,
        value: 'ejemplares',
        name: 'Ejemplares',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportRevistas',
      },
      {
        id: 16,
        value: 'numeroinvntario',
        name: 'Numero inventario',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportRevistas',
      },
    ];

    //?El campo typeReport nos ayuda a identidicar de que arreglo proviene cada campo de los snippets
    this.ReportNormas = [
      {
        id: 1,
        value: 'id',
        name: 'ID',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportNormas',
      },
      {
        id: 2,
        value: 'fecha',
        name: 'Fecha',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportNormas',
      },
      {
        id: 3,
        value: 'fecha',
        name: 'Expedido el',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportNormas',
      },
      {
        id: 4,
        value: 'titulo',
        name: 'Título',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportNormas',
      },
      {
        id: 5,
        value: 'fuenteoficial',
        name: 'Publicado en',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportNormas',
      },
      {
        id: 6,
        value: 'fechafuentepublicacion',
        name: 'Fecha Publicación',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportNormas',
      },
      {
        id: 7,
        value: 'entidadgeneradora',
        name: 'Entidad Generadora',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportNormas',
      },
      {
        id: 8,
        value: 'numero',
        name: 'Número de Norma',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportNormas',
      },
      {
        id: 9,
        value: 'tiponorma',
        name: 'Tipo de norma',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportNormas',
      },
      {
        id: 10,
        value: 'observaciones',
        name: 'Observaciones',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportNormas',
      },
      {
        id: 11,
        value: 'analiticatema',
        name: 'Temas',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportNormas',
      },
      {
        id: 12,
        value: 'paginas',
        name: 'Páginas',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportNormas',
      },
      {
        id: 13,
        value: 'idioma',
        name: 'Idioma',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportNormas',
      },
      {
        id: 14,
        value: 'referenciarelacionada',
        name: 'Referencia Relacionada',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportNormas',
      },
    ];

    //?El campo typeReport nos ayuda a identidicar de que arreglo proviene cada campo de los snippets
    this.ReportExpedientesH = [
      {
        id: 1,
        value: 'id',
        name: 'ID',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportExpedientesH',
      },
      {
        id: 2,
        value: 'fecha',
        name: 'Fecha',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportExpedientesH',
      },
      {
        id: 3,
        value: 'n_registro',
        name: 'N° de registro',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportExpedientesH',
      },
      {
        id: 4,
        value: 'titulo',
        name: 'Título',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportExpedientesH',
      },
      {
        id: 5,
        value: 'observaciones',
        name: 'Observaciones',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportExpedientesH',
      },
      {
        id: 6,
        value: 'numero_proceso',
        name: 'Proceso',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportExpedientesH',
      },
      {
        id: 7,
        value: 'despacho_titular',
        name: 'Despacho',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportExpedientesH',
      },
      {
        id: 8,
        value: 'radicado',
        name: 'Radicado',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportExpedientesH',
      },
      {
        id: 9,
        value: 'imputado',
        name: 'Imputado',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportExpedientesH',
      },
      {
        id: 10,
        value: 'folios',
        name: 'Folios',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportExpedientesH',
      },
      {
        id: 11,
        value: 'caja',
        name: 'Caja',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportExpedientesH',
      },
      {
        id: 12,
        value: 'num_cuaderno',
        name: 'N°. Cuaderno',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportExpedientesH',
      },
    ];

    //?El campo typeReport nos ayuda a identidicar de que arreglo proviene cada campo de los snippets
    this.ReportFotografiasH = [
      {
        id: 1,
        value: 'id',
        name: 'ID',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportFotografiasH',
      },
      {
        id: 2,
        value: 'fecha',
        name: 'Fecha',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportFotografiasH',
      },
      {
        id: 3,
        value: 'n_registro',
        name: 'N° de registro',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportFotografiasH',
      },
      {
        id: 4,
        value: 'titulo',
        name: 'Título',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportFotografiasH',
      },
      {
        id: 5,
        value: 'tema',
        name: 'Tema',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportFotografiasH',
      },
      {
        id: 6,
        value: 'descriptores',
        name: 'Descriptores',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportFotografiasH',
      },
      {
        id: 7,
        value: 'materialid',
        name: 'Material id',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportFotografiasH',
      },
      {
        id: 8,
        value: 'autor',
        name: 'Autor',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportFotografiasH',
      },
      {
        id: 9,
        value: 'enlaceweb',
        name: 'Enlace web',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportFotografiasH',
      },
    ];

    //?El campo typeReport nos ayuda a identidicar de que arreglo proviene cada campo de los snippets
    this.ReportPrensaH = [
      {
        id: 1,
        value: 'id',
        name: 'ID',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPrensaH',
      },
      {
        id: 2,
        value: 'fecha',
        name: 'Fecha',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPrensaH',
      },
      {
        id: 3,
        value: 'n_registro',
        name: 'N° de registro',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPrensaH',
      },
      {
        id: 4,
        value: 'titulo',
        name: 'Título',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPrensaH',
      },
      {
        id: 5,
        value: 'observaciones',
        name: 'Observaciones',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPrensaH',
      },
      {
        id: 6,
        value: 'n_proceso',
        name: 'Proceso',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPrensaH',
      },
      {
        id: 7,
        value: 'autor',
        name: 'Autor Artículo',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPrensaH',
      },
      {
        id: 8,
        value: 'paginas',
        name: 'Páginas Artículo',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPrensaH',
      },
      {
        id: 9,
        value: 'tomo',
        name: 'Tomo Identificación',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPrensaH',
      },
      {
        id: 10,
        value: 'tomoPagina',
        name: 'Tomo página',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPrensaH',
      },
      {
        id: 11,
        value: 'fuente',
        name: 'Fuente Artículo',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPrensaH',
      },
    ];

    //?El campo typeReport nos ayuda a identidicar de que arreglo proviene cada campo de los snippets
    this.ReportPublicacionesH = [
      {
        id: 1,
        value: 'id',
        name: 'ID',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesH',
      },
      {
        id: 2,
        value: 'fecha',
        name: 'Fecha',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesH',
      },
      {
        id: 3,
        value: 'n_registro',
        name: 'N° de registro',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesH',
      },
      {
        id: 4,
        value: 'titulo',
        name: 'Título',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesH',
      },
      {
        id: 5,
        value: 'fuente',
        name: 'Origen',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesH',
      },
      {
        id: 6,
        value: 'tema',
        name: 'Tema',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesH',
      },
      {
        id: 7,
        value: 'descriptores',
        name: 'Descriptores',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesH',
      },
      {
        id: 8,
        value: 'autor',
        name: 'Autor Artículo',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesH',
      },
      {
        id: 9,
        value: 'lugar_edicion',
        name: 'Lugar de edición',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesH',
      },
      {
        id: 10,
        value: 'descripcion',
        name: 'Descripción',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesH',
      },
      {
        id: 11,
        value: 'Idioma',
        name: 'Idioma',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesH',
      },
      {
        id: 12,
        value: 'dependencia',
        name: 'Dependencia',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesH',
      },
      {
        id: 13,
        value: 'editorial',
        name: 'Editorial',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesH',
      },
      {
        id: 14,
        value: 'doc_paginas',
        name: 'Paginas',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesH',
      },
    ];

    //?El campo typeReport nos ayuda a identidicar de que arreglo proviene cada campo de los snippets
    this.ReportSentenciasH = [
      {
        id: 1,
        value: 'id',
        name: 'ID',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportSentenciasH',
      },
      {
        id: 2,
        value: 'fecha',
        name: 'Fecha',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportSentenciasH',
      },
      {
        id: 3,
        value: 'n_registro',
        name: 'N° de registro',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportSentenciasH',
      },
      {
        id: 4,
        value: 'titulo',
        name: 'Título',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportSentenciasH',
      },
      {
        id: 5,
        value: 'observaciones',
        name: 'Observaciones',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportSentenciasH',
      },
      {
        id: 6,
        value: 'fechaanno',
        name: 'Año',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportSentenciasH',
      },
      {
        id: 7,
        value: 'sentencia',
        name: 'Sentencia',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportSentenciasH',
      },
      {
        id: 8,
        value: 'magistrado_ponente',
        name: 'Magistrado Ponente',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportSentenciasH',
      },
      {
        id: 9,
        value: 'materialid',
        name: 'Material id',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportSentenciasH',
      },
      {
        id: 10,
        value: 'tema',
        name: 'Tema',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportSentenciasH',
      },
    ];

    //?El campo typeReport nos ayuda a identidicar de que arreglo proviene cada campo de los snippets
    this.ReportVideosH = [
      {
        id: 1,
        value: 'id',
        name: 'ID',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosH',
      },
      {
        id: 2,
        value: 'fecha',
        name: 'Fecha',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosH',
      },
      {
        id: 3,
        value: 'n_registro',
        name: 'N° de registro',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosH',
      },
      {
        id: 4,
        value: 'titulo',
        name: 'Título',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosH',
      },
      {
        id: 5,
        value: 'fuente',
        name: 'Origen',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosH',
      },
      {
        id: 6,
        value: 'tema',
        name: 'Tema',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosH',
      },
      {
        id: 7,
        value: 'descriptores',
        name: 'Descriptores',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosH',
      },
      {
        id: 8,
        value: 'idioma',
        name: 'Idioma',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosH',
      },
      {
        id: 9,
        value: 'descripcion',
        name: 'Descripción',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosH',
      },
      {
        id: 10,
        value: 'duracion',
        name: 'Duración',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosH',
      },
      {
        id: 11,
        value: 'notas',
        name: 'Notas',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosH',
      },
      {
        id: 12,
        value: 'autor',
        name: 'Autor',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosH',
      },
      {
        id: 13,
        value: 'enlace_web',
        name: 'Enlace web',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosH',
      },
      {
        id: 14,
        value: 'materialid',
        name: 'Material ID',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosH',
      },
    ];

    //?El campo typeReport nos ayuda a identidicar de que arreglo proviene cada campo de los snippets
    this.ReportVideosV = [
      {
        id: 1,
        value: 'id',
        name: 'ID',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosV',
      },
      {
        id: 2,
        value: 'fecha',
        name: 'Fecha',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosV',
      },
      {
        id: 3,
        value: 'n_registro',
        name: 'N° de registro',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosV',
      },
      {
        id: 4,
        value: 'titulo',
        name: 'Título',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosV',
      },
      {
        id: 5,
        value: 'fuente',
        name: 'Origen',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosV',
      },
      {
        id: 6,
        value: 'autor',
        name: 'Autor',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosV',
      },
      {
        id: 7,
        value: 'tema',
        name: 'Tema',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosV',
      },
      {
        id: 8,
        value: 'descripcion',
        name: 'Descripción',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosV',
      },
      {
        id: 9,
        value: 'duracion',
        name: 'Duración',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosV',
      },
      {
        id: 10,
        value: 'descriptores',
        name: 'Descriptores',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosV',
      },
      {
        id: 11,
        value: 'materialid',
        name: 'Material id',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosV',
      },
      {
        id: 12,
        value: 'extra_origen_id',
        name: 'Extra origen id',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosV',
      },
      {
        id: 13,
        value: 'anexo1',
        name: 'Anexo1',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideosV',
      },
    ];

    //?El campo typeReport nos ayuda a identidicar de que arreglo proviene cada campo de los snippets
    this.ReportVideoConferenciasV = [
      {
        id: 1,
        value: 'id',
        name: 'ID',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideoConferenciasV',
      },
      {
        id: 2,
        value: 'fecha',
        name: 'Fecha',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideoConferenciasV',
      },
      {
        id: 3,
        value: 'n_registro',
        name: 'N° de registro',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideoConferenciasV',
      },
      {
        id: 4,
        value: 'titulo',
        name: 'Título',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideoConferenciasV',
      },
      {
        id: 5,
        value: 'fuente',
        name: 'Origen',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideoConferenciasV',
      },
      {
        id: 6,
        value: 'autor',
        name: 'Autor',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideoConferenciasV',
      },
      {
        id: 7,
        value: 'tema',
        name: 'Tema',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideoConferenciasV',
      },
      {
        id: 8,
        value: 'duracion',
        name: 'Duración',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideoConferenciasV',
      },
      {
        id: 9,
        value: 'descripcion',
        name: 'Descripción',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideoConferenciasV',
      },
      {
        id: 10,
        value: 'descriptores',
        name: 'Descriptores',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideoConferenciasV',
      },
      {
        id: 11,
        value: 'lugarpublicacion',
        name: 'Lugar publicación',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideoConferenciasV',
      },
      {
        id: 12,
        value: 'tipomediooriginal',
        name: 'Tipo medio original',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideoConferenciasV',
      },
      {
        id: 13,
        value: 'fuente',
        name: 'Fuente',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideoConferenciasV',
      },
      {
        id: 14,
        value: 'idioma ',
        name: 'Idioma',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideoConferenciasV',
      },
      {
        id: 15,
        value: 'lugarorigen',
        name: 'Lugar origen',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideoConferenciasV',
      },
      {
        id: 16,
        value: 'editorial',
        name: 'Editorial',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideoConferenciasV',
      },
      {
        id: 17,
        value: 'dependencia ',
        name: 'Dependencia',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideoConferenciasV',
      },
      {
        id: 18,
        value: 'paginas',
        name: 'Paginas',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideoConferenciasV',
      },
      {
        id: 19,
        value: 'descripcioncompleta',
        name: 'Descripción completa',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportVideoConferenciasV',
      },
    ];

    //?El campo typeReport nos ayuda a identidicar de que arreglo proviene cada campo de los snippets
    this.ReportFotografiasV = [
      {
        id: 1,
        value: 'id',
        name: 'ID',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportFotografiasV',
      },
      {
        id: 2,
        value: 'fecha',
        name: 'Fecha',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportFotografiasV',
      },
      {
        id: 3,
        value: 'n_registro',
        name: 'N° de registro',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportFotografiasV',
      },
      {
        id: 4,
        value: 'titulo',
        name: 'Título',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportFotografiasV',
      },
      {
        id: 5,
        value: 'fuente',
        name: 'Origen',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportFotografiasV',
      },
      {
        id: 6,
        value: 'autor',
        name: 'Autor',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportFotografiasV',
      },
      {
        id: 7,
        value: 'tema',
        name: 'Tema',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportFotografiasV',
      },
      {
        id: 8,
        value: 'descripcion',
        name: 'Descripción',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportFotografiasV',
      },
      {
        id: 9,
        value: 'descriptores',
        name: 'Descriptores',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportFotografiasV',
      },
      {
        id: 10,
        value: 'materialid',
        name: 'Material ID',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportFotografiasV',
      },
      {
        id: 11,
        value: 'puntaje_manual',
        name: 'Puntaje manual',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportFotografiasV',
      },
    ];

    //?El campo typeReport nos ayuda a identidicar de que arreglo proviene cada campo de los snippets
    this.ReportPublicacionesV = [
      {
        id: 1,
        value: 'id',
        name: 'ID',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesV',
      },
      {
        id: 2,
        value: 'fecha',
        name: 'Fecha',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesV',
      },
      {
        id: 3,
        value: 'n_registro',
        name: 'N° de registro',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesV',
      },
      {
        id: 4,
        value: 'titulo',
        name: 'Título',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesV',
      },
      {
        id: 5,
        value: 'fuente',
        name: 'Origen',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesV',
      },
      {
        id: 6,
        value: 'autor',
        name: 'Autor',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesV',
      },
      {
        id: 7,
        value: 'tema',
        name: 'Tema',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesV',
      },
      {
        id: 8,
        value: 'descripcion',
        name: 'Descripción',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesV',
      },
      {
        id: 9,
        value: 'edicion',
        name: 'Edición',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportPublicacionesV',
      },
    ];

    //?El campo typeReport nos ayuda a identidicar de que arreglo proviene cada campo de los snippets
    this.ReportAudioV = [
      {
        id: 1,
        value: 'id',
        name: 'ID',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportAudioV',
      },
      {
        id: 2,
        value: 'fecha',
        name: 'Fecha',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportAudioV',
      },
      {
        id: 3,
        value: 'n_registro',
        name: 'N° de registro',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportAudioV',
      },
      {
        id: 4,
        value: 'tema',
        name: 'Tema',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportAudioV',
      },
      {
        id: 5,
        value: 'materialid',
        name: 'Material ID',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportAudioV',
      },
      {
        id: 6,
        value: 'type',
        name: 'Type',
        isSelected: false,
        isSelectedMasive: false,
        typeReport: 'ReportAudioV',
      },
    ];

    this.anexosInfo = [];

    //Filtros
    this.querySearch = this.appComponent.querySearch;

    this.selectionFilters.ponentes = this.querySearch?.params?.ponente
      ? this.querySearch?.params?.ponente
      : [];
    this.selectionFilters.start_date = this.querySearch?.params?.start_date
      ? this.querySearch?.params?.start_date
      : '';
    this.selectionFilters.end_date = this.querySearch?.params?.end_date
      ? this.querySearch?.params?.end_date
      : '';
    this.selectionFilters.tiposProvidencias = this.querySearch?.params
      ?.tipo_providencia
      ? this.querySearch?.params?.tipo_providencia
      : [];
    this.selectionFilters.fuentesFormales = this.querySearch?.params
      ?.fuente_formal_multiple
      ? this.querySearch?.params?.fuente_formal_multiple
      : [];
    this.selectionFilters.claseActuaciones = this.querySearch?.params
      ?.clase_actuacion_multiple
      ? this.querySearch?.params?.clase_actuacion_multiple
      : [];
    this.selectionFilters.delitos = this.querySearch?.params?.delitos_multiple
      ? this.querySearch?.params?.delitos_multiple
      : [];
    this.selectionFilters.procedencias = this.querySearch?.params
      ?.procedencia_multiple
      ? this.querySearch?.params?.procedencia_multiple
      : [];
    this.selectionFilters.categoriasGenero = this.querySearch?.params
      ?.categoria_genero
      ? this.querySearch?.params?.categoria_genero
      : [];
    this.selectionFilters.decisiones = this.querySearch?.params
      ?.decision_multiple
      ? this.querySearch?.params?.decision_multiple
      : [];
    this.selectionFilters.salas = this.querySearch?.params?.sala
      ? this.querySearch?.params?.sala
      : [];
    this.selectionFilters.magistradosSalvamento = this.querySearch?.params
      ?.magistrado
      ? this.querySearch?.params?.magistrado
      : [];
    this.selectionFilters.tiposSalas = this.querySearch?.params?.tipo_sala
      ? this.querySearch?.params?.tipo_sala
      : [];
    //End Filtros

    this.elasticService.getPointResult().subscribe(resultado => {
      this.pointResultadoAutomatic = resultado;
    })
  }

  downloadPDFmasive() {
    let values_many_reports = this.formatArrays(this.many_reports);

    let resultJson =
      '{ "fields":' + '[' + values_many_reports.toString() + ']' + ',';
    let items = resultJson + '"items": [ ';
    for (let i = 0; i < this.reports.length; i++) {
      let name = 'property' + (i + 1);

      let item = JSON.stringify(this.reports[i]) + ',';
      items = items + item;
    }
    items = items.substring(0, items.length - 1) + ']';
    items =
      items +
      ',' +
      '"' +
      'total_records' +
      '"' +
      ':' +
      this.respuesta.total_records +
      '}';

    this.elasticService.getReport(JSON.parse(items), this.corporationTmp).subscribe(
      (data: Blob) => {
        var file = new Blob([data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        var a = document.createElement('a');
        a.href = fileURL;
        a.target = '_blank';
        a.download = 'Reporte.pdf';
        document.body.appendChild(a);
        a.click();
        this.elasticService
          .postLog(
            'Generar Providencia Masiva',
            'Generar Providencia Masiva',
            JSON.parse(items),
            {},
            0
          )
          .subscribe((response) => {});
        this.calificarVariosResultadosAutomatico();
      },
      (error) => {
        this.error = 'Algo salio mal';
        this.modal_error = true;
      }
    );
  }

  printPDFmasive() {
    
    let values_many_reports = this.formatArrays(this.many_reports);
    
    let resultJson =
      '{ "fields":' + '[' + values_many_reports.toString() + ']' + ',';
    let items = resultJson + '"items": [ ';
    for (let i = 0; i < this.reports.length; i++) {
      let name = 'property' + (i + 1);
      
      let item = JSON.stringify(this.reports[i]) + ',';
      items = items + item;
    }
    items = items.substring(0, items.length - 1) + ']';
    items =
      items +
      ',' +
      '"' +
      'total_records' +
      '"' +
      ':' +
      this.respuesta.total_records +
      '}';
      
    this.elasticService.getReport(JSON.parse(items), this.corporationTmp).subscribe(
      (data: Blob) => {
        var file = new Blob([data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        var a = document.createElement('a');
        a.href = fileURL;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        this.elasticService
          .postLog(
            'Generar Providencia Masiva',
            'Generar Providencia Masiva',
            JSON.parse(items),
            {},
            0
          )
          .subscribe((response) => {});
        this.calificarVariosResultadosAutomatico();
      },
      (error) => {
        this.error = 'Algo salio mal';
        this.modal_error = true;
      }
    );
  }
  
  downloadPDF(report: any, index:any = null) {

    let values_reports;

    values_reports = this.validateExtraOrigen();

    let resultJson =
      '{ "fields":' + '[' + values_reports.toString() + ']' + ',';
    let items = resultJson + '"items": [ ';
    let item = JSON.stringify(report);
    items = items + item;
    items = items + ']';
    items =
      items +
      ',' +
      '"' +
      'total_records' +
      '"' +
      ':' +
      this.respuesta.total_records +
      '}';

    console.log('items', items);
      
    this.elasticService.getReport(JSON.parse(items), this.corporationTmp).subscribe(
      (data: Blob) => {
        console.log('data', data);
        
        this.calificarResultadoAutomatico(index);
        var file = new Blob([data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        var a = document.createElement('a');
        a.href = fileURL;
        a.target = '_blank';
        a.download = 'Reporte.pdf';
        document.body.appendChild(a);
        a.click();
      },
      (error) => {
        this.error = 'Algo salio mal';
        this.modal_error = true;
      }
    );
  }

  printPDF(report: any, index:any = null) {
    let values_reports: any[];
    let itemTransaccion: any = {};

    values_reports = this.validateExtraOrigen();
    
    if(this.transcripcion){
      values_reports.push('"'+'transcripcion'+'"');
      itemTransaccion = {
        transcripcion : report.doc_ocr
      };
    }
    
    report =  Object.assign(report, itemTransaccion);

    console.log('values_reports', values_reports);
    console.log('report', report);
    
    
    
    let resultJson =
      '{ "fields":' + '[' + values_reports.toString() + ']' + ',';
    let items = resultJson + '"items": [ ';
    let item = JSON.stringify(report);
    items = items + item;
    items = items + ']';
    items =
      items +
      ',' +
      '"' +
      'total_records' +
      '"' +
      ':' +
      this.respuesta.total_records +
      '}';
      
    console.log('items', items);
      
    this.elasticService.getReport(JSON.parse(items), this.corporationTmp).subscribe(
      (data: Blob) => {
        
        this.calificarResultadoAutomatico(index);
        var file = new Blob([data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        var a = document.createElement('a');
        a.href = fileURL;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
      },
      (error) => {
        this.error = 'Algo salio mal';
        this.modal_error = true;
      }
    );
  }
  
  onFile(url: string, index:any = null) {
    
    //console.log('index', index);
    
    let sub_url = url.split('?');

    if (sub_url.length > 1) {
      url = '?' + sub_url[1];
    }

    this.spinner.show();
    let extraOrigenes: number[] = this.appComponent.obtenerId(
      this.appComponent.allItemsExtraOrigen
    );
    if (extraOrigenes.includes(28)) {
      this.elasticService.getFile(url + '&extra_origen=28').subscribe(
        (Response: JSON) => {
          this.showfile(Response);
          this.spinner.hide();
          this.elasticService
            .postLog(
              'Previsualizar	Ver providencia',
              'Previsualizar	Ver providencia',
              Response,
              {},
              0
            )
            .subscribe((response) => {});
          if(index){
            this.calificarResultadoAutomatico(index);
          }  
        },
        (error) => {
          if (error.error.error == 'File not found') {
            this.error = 'Archivo no encontrado';
          } else {
            this.error = 'Algo salio mal';
          }
          this.spinner.hide();
          this.modal_error = true;
        }
      );
    } else {
      this.elasticService.getFile(url).subscribe(
        (Response: JSON) => {
          //console.log(Response);
          this.showfile(Response);
          this.spinner.hide();
          this.elasticService
            .postLog(
              'Previsualizar	Ver providencia',
              'Previsualizar	Ver providencia',
              Response,
              {},
              0
            )
            .subscribe((response) => {});
          if(index){
            this.calificarResultadoAutomatico(index);
          }  
        },
        (error) => {
          //console.log(error);
          if (error.error.error == 'File not found') {
            this.error = 'Archivo no encontrado';
          } else {
            this.error = 'Algo salio mal';
          }
          this.spinner.hide();
          this.modal_error = true;
        }
      );
    }

    this.elasticService
      .postLog('Download file', 'download file', url, {}, 0)
      .subscribe((response) => {});
  }

  showfile(Response: any) {
    const blob = this.base64toBlob(Response.base64_file, Response.mime_type);
    const linkSource =
      'data:' + Response.mime_type + ';base64,' + Response.base64_file;
    const downloadLink = document.createElement('a');
    const fileName = Response.file_name;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    const fileURL = URL.createObjectURL(blob);
    downloadLink.click();
  }

  onshowpdf(index: number) {
    let url = '';
    const anexos = this.respuesta.results[index].anexo1;
    for (let i = 0; i < anexos.length; i++) {
      if (anexos[i].tipo == 'pdf') {
        url = anexos[i].public_url;
      }
    }
    if (url == '') {
      this.error =
        'No existe el archivo de tipo pdf para el resultado seleccionado';
      this.modal_error = true;
    } else {
      this.elasticService
        .getFile(url)
        .subscribe((Response: JSON) => this.showfiletab(Response));
      this.elasticService
        .postLog(
          'Previsualizar	Ver providencia',
          'Previsualizar	Ver providencia',
          this.respuesta.results[index],
          {},
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);
    }
  }

  showfiletab(Response: any) {
    const blob = this.base64toBlob(Response.base64_file, Response.mime_type);
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL, '_blank');
  }

  base64toBlob(base64Data: string, contentType: string) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  changuepage(page: number, limit: number) {
    this.limit = limit;
    this.appComponent.onSearch(page, limit, this.selectionFilters);
  }

  downloadmasive(type: string) {
    if (this.masivedownload.length == 0) {
      this.error = 'No has seleccionado ningún elemento para descarga masiva';
      this.modal_error = true;
    } else {
      let noAnexos = true;
      let countExistType = 0;
      for (let i = 0; i < this.masivedownload.length; i++) {
        let anexos = this.respuesta.results[this.masivedownload[i]].anexo1;
        if (anexos !== null) {
          noAnexos = false;
          for (let j = 0; j < anexos.length; j++) {
            if (anexos[j].tipo.includes(type)) {
              countExistType = countExistType + 1;
              let url = anexos[j].public_url;
              if (url != null && url != '') {
                this.onFile(url);
              }
            }
          }
        }
      }
      if (noAnexos) {
        this.error = 'No hay archivos adjuntos para descarga masiva';
        this.modal_error = true;
      }else if(countExistType == 0){
        this.error = 'No hay archivos adjuntos de este tipo para descarga masiva';
        this.modal_error = true;
      }
      this.calificarVariosResultadosAutomatico();
    }
  }

  //! Meotodo de checkbox que selecciona multiples snippets
  selectordownloadmasive(indexr: number, resultadoSelect: any = null, event:any) {
    let exist_extra_origen_id:number;
    let exist_tipo_acto:number;
    this.many_reports = [];
    //let flag = false;
    if(event.target.checked == true){
      if(!this.masivedownload.includes(indexr)){
        this.masivedownload.push(indexr);
      }
      this.masivedownloadSelectItems.push(resultadoSelect.extra_origen_id);
      this.masivedownloadSelectItemsTipoActo.push(resultadoSelect.tipo_acto);
      
    }else{
      this.masivedownload = this.masivedownload.filter(index=> index != indexr);
      exist_extra_origen_id = this.masivedownloadSelectItems.indexOf(resultadoSelect.extra_origen_id);
      exist_tipo_acto = this.masivedownloadSelectItemsTipoActo.indexOf(resultadoSelect.tipo_acto);
      if (exist_extra_origen_id > -1) {
        this.masivedownloadSelectItems.splice(exist_extra_origen_id,1);
      }
      if(exist_tipo_acto > -1){
        this.masivedownloadSelectItemsTipoActo.splice(exist_tipo_acto,1);
      }
    }

    if(this.masivedownloadSelectItems.includes(6) || this.masivedownloadSelectItems.includes(7) || this.masivedownloadSelectItems.includes(8) || this.masivedownloadSelectItems.includes(9) || this.masivedownloadSelectItems.includes(10) ||this.masivedownloadSelectItems.includes(11) || this.masivedownloadSelectItems.includes(12) || this.masivedownloadSelectItems.includes(13) || this.masivedownloadSelectItems.includes(14)){
      this.many_reports = this.many_reports.concat(this.ReportJurisprudencia)
    } 
    if(this.masivedownloadSelectItems.includes(5) && !this.masivedownloadSelectItemsTipoActo.includes('Acuerdos')){
      this.many_reports = this.many_reports.concat(this.ReportActosAdministrativos)
    }
    if(this.masivedownloadSelectItems.includes(5) && this.masivedownloadSelectItemsTipoActo.includes('Acuerdos')){
      this.many_reports = this.many_reports.concat(this.ReportActosAdministrativosAcuerdos)
    }
    if(this.masivedownloadSelectItems.includes(0)){
      this.many_reports = this.many_reports.concat(this.ReportActosAdministrativosGacetas)
    }
    if(this.masivedownloadSelectItems.includes(17)){
      this.many_reports = this.many_reports.concat(this.ReportNormas)
    }
    if(this.masivedownloadSelectItems.includes(15)){
      this.many_reports = this.many_reports.concat(this.ReportLibrosMedios)
    }
    if(this.masivedownloadSelectItems.includes(16)){
      this.many_reports = this.many_reports.concat(this.ReportRevistas)
    }
    if(this.masivedownloadSelectItems.includes(18)){
      this.many_reports = this.many_reports.concat(this.ReportExpedientesH)
    }
    if(this.masivedownloadSelectItems.includes(19)){
      this.many_reports = this.many_reports.concat(this.ReportFotografiasH)
    }
    if(this.masivedownloadSelectItems.includes(20)){
      this.many_reports = this.many_reports.concat(this.ReportPrensaH)
    }
    if(this.masivedownloadSelectItems.includes(21)){
      this.many_reports = this.many_reports.concat(this.ReportPublicacionesH)
    }
    if(this.masivedownloadSelectItems.includes(21)){
      this.many_reports = this.many_reports.concat(this.ReportPublicacionesH)
    }
    if(this.masivedownloadSelectItems.includes(22)){
      this.many_reports = this.many_reports.concat(this.ReportSentenciasH)
    }
    if(this.masivedownloadSelectItems.includes(23)){
      this.many_reports = this.many_reports.concat(this.ReportVideosH)
    }
    if(this.masivedownloadSelectItems.includes(24)){
      this.many_reports = this.many_reports.concat(this.ReportVideosV)
    }
    if(this.masivedownloadSelectItems.includes(24)){
      this.many_reports = this.many_reports.concat(this.ReportVideosV)
    }
    if(this.masivedownloadSelectItems.includes(25) || this.masivedownloadSelectItems.includes(26)){
      this.many_reports = this.many_reports.concat(this.ReportVideoConferenciasV)
    }
    if(this.masivedownloadSelectItems.includes(27)){
      this.many_reports = this.many_reports.concat(this.ReportFotografiasV)
    }
    if(this.masivedownloadSelectItems.includes(28)){
      this.many_reports = this.many_reports.concat(this.ReportPublicacionesV)
    }
    if(this.masivedownloadSelectItems.includes(29)){
      this.many_reports = this.many_reports.concat(this.ReportAudioV)
    }
    if(this.masivedownloadSelectItems.includes(30)){
      this.many_reports = this.many_reports.concat(this.ReportJurisprudenciaGacetas)
    }
    if(this.masivedownloadSelectItems.includes(31)){
      this.many_reports = this.many_reports.concat(this.ReportJurisprudenciaSamai)
    }
    if(this.masivedownloadSelectItems.includes(32)){
      this.many_reports = this.many_reports.concat(this.ReportJurisprudenciaBoletines)
    }

    this.many_reports = this.removeDuplicates(this.many_reports, "value");
  }

  reportgenerate(index: number) {
    this.result = this.respuesta.results[index];
  }

  selectorReportJurisprudencia() {
    for (let i = 0; i < this.ReportJurisprudencia.length; i++) {
      this.isMasterSel
        ? (this.ReportJurisprudencia[i].isSelected = true)
        : (this.ReportJurisprudencia[i].isSelected = false);
    }
  }

  selectorReportJurisprudenciaGacetas() {
    for (let i = 0; i < this.ReportJurisprudenciaGacetas.length; i++) {
      this.isMasterSel
        ? (this.ReportJurisprudenciaGacetas[i].isSelected = true)
        : (this.ReportJurisprudenciaGacetas[i].isSelected = false);
    }
  }

  selectorReportJurisprudenciaSamai() {
    for (let i = 0; i < this.ReportJurisprudenciaSamai.length; i++) {
      this.isMasterSel
        ? (this.ReportJurisprudenciaSamai[i].isSelected = true)
        : (this.ReportJurisprudenciaSamai[i].isSelected = false);
    }
  }

  selectorReportJurisprudenciaBoletines() {
    for (let i = 0; i < this.ReportJurisprudenciaBoletines.length; i++) {
      this.isMasterSel
        ? (this.ReportJurisprudenciaBoletines[i].isSelected = true)
        : (this.ReportJurisprudenciaBoletines[i].isSelected = false);
    }
  }

  selectorReportLibrosMedios() {
    for (let i = 0; i < this.ReportLibrosMedios.length; i++) {
      this.isMasterSel
        ? (this.ReportLibrosMedios[i].isSelected = true)
        : (this.ReportLibrosMedios[i].isSelected = false);
    }
  }

  selectorReportActosAdministrativos() {
    for (let i = 0; i < this.ReportActosAdministrativos.length; i++) {
      this.isMasterSel
        ? (this.ReportActosAdministrativos[i].isSelected = true)
        : (this.ReportActosAdministrativos[i].isSelected = false);
    }
  }

  selectorReportActosAdministrativosAcuerdos() {
    for (let i = 0; i < this.ReportActosAdministrativosAcuerdos.length; i++) {
      this.isMasterSel
        ? (this.ReportActosAdministrativosAcuerdos[i].isSelected = true)
        : (this.ReportActosAdministrativosAcuerdos[i].isSelected = false);
    }
  }

  selectorReportActosAdministrativosGacetas() {
    for (let i = 0; i < this.ReportActosAdministrativosGacetas.length; i++) {
      this.isMasterSel
        ? (this.ReportActosAdministrativosGacetas[i].isSelected = true)
        : (this.ReportActosAdministrativosGacetas[i].isSelected = false);
    }
  }

  selectorReportRevistas() {
    for (let i = 0; i < this.ReportRevistas.length; i++) {
      this.isMasterSel
        ? (this.ReportRevistas[i].isSelected = true)
        : (this.ReportRevistas[i].isSelected = false);
    }
  }

  selectorReportNormas() {
    for (let i = 0; i < this.ReportNormas.length; i++) {
      this.isMasterSel
        ? (this.ReportNormas[i].isSelected = true)
        : (this.ReportNormas[i].isSelected = false);
    }
  }

  selectorReportExpedientesH() {
    for (let i = 0; i < this.ReportExpedientesH.length; i++) {
      this.isMasterSel
        ? (this.ReportExpedientesH[i].isSelected = true)
        : (this.ReportExpedientesH[i].isSelected = false);
    }
  }

  selectorReportFotografiasH() {
    for (let i = 0; i < this.ReportFotografiasH.length; i++) {
      this.isMasterSel
        ? (this.ReportFotografiasH[i].isSelected = true)
        : (this.ReportFotografiasH[i].isSelected = false);
    }
  }

  selectorReportPrensaH() {
    for (let i = 0; i < this.ReportPrensaH.length; i++) {
      this.isMasterSel
        ? (this.ReportPrensaH[i].isSelected = true)
        : (this.ReportPrensaH[i].isSelected = false);
    }
  }

  selectorReportPublicacionesH() {
    for (let i = 0; i < this.ReportPublicacionesH.length; i++) {
      this.isMasterSel
        ? (this.ReportPublicacionesH[i].isSelected = true)
        : (this.ReportPublicacionesH[i].isSelected = false);
    }
  }

  selectorReportSentenciasH() {
    for (let i = 0; i < this.ReportSentenciasH.length; i++) {
      this.isMasterSel
        ? (this.ReportSentenciasH[i].isSelected = true)
        : (this.ReportSentenciasH[i].isSelected = false);
    }
  }

  selectorReportVideosH() {
    for (let i = 0; i < this.ReportVideosH.length; i++) {
      this.isMasterSel
        ? (this.ReportVideosH[i].isSelected = true)
        : (this.ReportVideosH[i].isSelected = false);
    }
  }

  selectorReportVideosV() {
    for (let i = 0; i < this.ReportVideosV.length; i++) {
      this.isMasterSel
        ? (this.ReportVideosV[i].isSelected = true)
        : (this.ReportVideosV[i].isSelected = false);
    }
  }

  selectorReportVideoConferenciasV() {
    for (let i = 0; i < this.ReportVideoConferenciasV.length; i++) {
      this.isMasterSel
        ? (this.ReportVideoConferenciasV[i].isSelected = true)
        : (this.ReportVideoConferenciasV[i].isSelected = false);
    }
  }

  selectorReportFotografiasV() {
    for (let i = 0; i < this.ReportFotografiasV.length; i++) {
      this.isMasterSel
        ? (this.ReportFotografiasV[i].isSelected = true)
        : (this.ReportFotografiasV[i].isSelected = false);
    }
  }

  selectorReportPublicacionesV() {
    for (let i = 0; i < this.ReportPublicacionesV.length; i++) {
      this.isMasterSel
        ? (this.ReportPublicacionesV[i].isSelected = true)
        : (this.ReportPublicacionesV[i].isSelected = false);
    }
  }

  selectorReportAudioV() {
    for (let i = 0; i < this.ReportAudioV.length; i++) {
      this.isMasterSel
        ? (this.ReportAudioV[i].isSelected = true)
        : (this.ReportAudioV[i].isSelected = false);
    }
  }
  
  ReporMasive() {
    if (this.masivedownload.length == 0) {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modal_error = true;
    } else {
      this.report_selector = true;
      this.calificarVariosResultadosAutomatico();
    }
  }
  
  //!Selector para multiples snippets
  selectorReportMasive() {
    for (let i = 0; i < this.many_reports.length; i++) {
      this.isMasterSelmasive
        ? (this.many_reports[i].isSelectedMasive = true)
        : (this.many_reports[i].isSelectedMasive = false);
    }
  }

  selectorReportMasiveJurisprudencia() {
    for (let i = 0; i < this.ReportJurisprudencia.length; i++) {
      this.isMasterSelmasive
        ? (this.ReportJurisprudencia[i].isSelectedMasive = true)
        : (this.ReportJurisprudencia[i].isSelectedMasive = false);
    }
  }

  selectorReportMasiveJurisprudenciaGacetas() {
    for (let i = 0; i < this.ReportJurisprudenciaGacetas.length; i++) {
      this.isMasterSelmasive
        ? (this.ReportJurisprudenciaGacetas[i].isSelectedMasive = true)
        : (this.ReportJurisprudenciaGacetas[i].isSelectedMasive = false);
    }
  }

  selectorReportMasiveJurisprudenciaSamai() {
    for (let i = 0; i < this.ReportJurisprudenciaSamai.length; i++) {
      this.isMasterSelmasive
        ? (this.ReportJurisprudenciaSamai[i].isSelectedMasive = true)
        : (this.ReportJurisprudenciaSamai[i].isSelectedMasive = false);
    }
  }

  selectorReportMasiveJurisprudenciaBoletines() {
    for (let i = 0; i < this.ReportJurisprudenciaBoletines.length; i++) {
      this.isMasterSelmasive
        ? (this.ReportJurisprudenciaBoletines[i].isSelectedMasive = true)
        : (this.ReportJurisprudenciaBoletines[i].isSelectedMasive = false);
    }
  }

  selectorReportMasiveLibrosMedios() {
    for (let i = 0; i < this.ReportLibrosMedios.length; i++) {
      this.isMasterSelmasive
        ? (this.ReportLibrosMedios[i].isSelectedMasive = true)
        : (this.ReportLibrosMedios[i].isSelectedMasive = false);
    }
  }

  selectorReportMasiveActosAdministrativos() {
    for (let i = 0; i < this.ReportActosAdministrativos.length; i++) {
      this.isMasterSelmasive
        ? (this.ReportActosAdministrativos[i].isSelectedMasive = true)
        : (this.ReportActosAdministrativos[i].isSelectedMasive = false);
    }
  }

  selectorReportMasiveActosAdministrativosAcuerdos() {
    for (let i = 0; i < this.ReportActosAdministrativosAcuerdos.length; i++) {
      this.isMasterSelmasive
        ? (this.ReportActosAdministrativosAcuerdos[i].isSelectedMasive = true)
        : (this.ReportActosAdministrativosAcuerdos[i].isSelectedMasive = false);
    }
  }

  selectorReportMasiveActosAdministrativosGaetas() {
    for (let i = 0; i < this.ReportActosAdministrativosGacetas.length; i++) {
      this.isMasterSelmasive
        ? (this.ReportActosAdministrativosGacetas[i].isSelectedMasive = true)
        : (this.ReportActosAdministrativosGacetas[i].isSelectedMasive = false);
    }
  }

  selectorReportMasiveRevistas() {
    for (let i = 0; i < this.ReportRevistas.length; i++) {
      this.isMasterSelmasive
        ? (this.ReportRevistas[i].isSelectedMasive = true)
        : (this.ReportRevistas[i].isSelectedMasive = false);
    }
  }

  selectorReportMasiveNormas() {
    for (let i = 0; i < this.ReportNormas.length; i++) {
      this.isMasterSelmasive
        ? (this.ReportNormas[i].isSelectedMasive = true)
        : (this.ReportNormas[i].isSelectedMasive = false);
    }
  }

  selectorReportMasiveExpedientesH() {
    for (let i = 0; i < this.ReportExpedientesH.length; i++) {
      this.isMasterSelmasive
        ? (this.ReportExpedientesH[i].isSelectedMasive = true)
        : (this.ReportExpedientesH[i].isSelectedMasive = false);
    }
  }

  selectorReportMasiveFotografiasH() {
    for (let i = 0; i < this.ReportFotografiasH.length; i++) {
      this.isMasterSelmasive
        ? (this.ReportFotografiasH[i].isSelectedMasive = true)
        : (this.ReportFotografiasH[i].isSelectedMasive = false);
    }
  }

  selectorReportMasivePrensaH() {
    for (let i = 0; i < this.ReportPrensaH.length; i++) {
      this.isMasterSelmasive
        ? (this.ReportPrensaH[i].isSelectedMasive = true)
        : (this.ReportPrensaH[i].isSelectedMasive = false);
    }
  }

  selectorReportMasivePublicacionesH() {
    for (let i = 0; i < this.ReportPublicacionesH.length; i++) {
      this.isMasterSelmasive
        ? (this.ReportPublicacionesH[i].isSelectedMasive = true)
        : (this.ReportPublicacionesH[i].isSelectedMasive = false);
    }
  }

  selectorReportMasiveSentenciasH() {
    for (let i = 0; i < this.ReportSentenciasH.length; i++) {
      this.isMasterSelmasive
        ? (this.ReportSentenciasH[i].isSelectedMasive = true)
        : (this.ReportSentenciasH[i].isSelectedMasive = false);
    }
  }

  selectorReportMasiveVideosH() {
    for (let i = 0; i < this.ReportVideosH.length; i++) {
      this.isMasterSelmasive
        ? (this.ReportVideosH[i].isSelectedMasive = true)
        : (this.ReportVideosH[i].isSelectedMasive = false);
    }
  }

  selectorReportMasiveVideosV() {
    for (let i = 0; i < this.ReportVideosV.length; i++) {
      this.isMasterSelmasive
        ? (this.ReportVideosV[i].isSelectedMasive = true)
        : (this.ReportVideosV[i].isSelectedMasive = false);
    }
  }

  selectorReportMasiveVideoConferenciasV() {
    for (let i = 0; i < this.ReportVideoConferenciasV.length; i++) {
      this.isMasterSelmasive
        ? (this.ReportVideoConferenciasV[i].isSelectedMasive = true)
        : (this.ReportVideoConferenciasV[i].isSelectedMasive = false);
    }
  }

  selectorReportMasiveFotografiasV() {
    for (let i = 0; i < this.ReportFotografiasV.length; i++) {
      this.isMasterSelmasive
        ? (this.ReportFotografiasV[i].isSelectedMasive = true)
        : (this.ReportFotografiasV[i].isSelectedMasive = false);
    }
  }

  selectorReportMasivePublicacionesV() {
    for (let i = 0; i < this.ReportPublicacionesV.length; i++) {
      this.isMasterSelmasive
        ? (this.ReportPublicacionesV[i].isSelectedMasive = true)
        : (this.ReportPublicacionesV[i].isSelectedMasive = false);
    }
  }

  selectorReportMasiveAudioV() {
    for (let i = 0; i < this.ReportAudioV.length; i++) {
      this.isMasterSelmasive
        ? (this.ReportAudioV[i].isSelectedMasive = true)
        : (this.ReportAudioV[i].isSelectedMasive = false);
    }
  }

  //!selector masivo de varios snippets
  masiveReport() {
    let countselected = false;
    this.count_select_snippets = 0;
    for (let f = 0; f < this.many_reports.length; f++) {
      if (this.many_reports[f].isSelectedMasive) {
        countselected = true;
      }
    }

    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
      this.calificarVariosResultadosAutomatico();

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  masiveReportJurisprudencia() {
    let countselected = false;
    this.count_select_snippets = 0;
    for (let f = 0; f < this.ReportJurisprudencia.length; f++) {
      if (this.ReportJurisprudencia[f].isSelectedMasive) {
        countselected = true;
      }
    }

    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  masiveReportJurisprudenciaGacetas() {
    let countselected = false;
    this.count_select_snippets = 0;
    for (let f = 0; f < this.ReportJurisprudenciaGacetas.length; f++) {
      if (this.ReportJurisprudenciaGacetas[f].isSelectedMasive) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  masiveReportJurisprudenciaSamai() {
    let countselected = false;
    this.count_select_snippets = 0;

    for (let f = 0; f < this.ReportJurisprudenciaSamai.length; f++) {
      if (this.ReportJurisprudenciaSamai[f].isSelectedMasive) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  masiveReportJurisprudenciaBoletines() {
    let countselected = false;
    this.count_select_snippets = 0;
    for (let f = 0; f < this.ReportJurisprudenciaBoletines.length; f++) {
      if (this.ReportJurisprudenciaBoletines[f].isSelectedMasive) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  masiveReportActosAdministrativos() {
    let countselected = false;
    this.count_select_snippets = 0;
    for (let f = 0; f < this.ReportActosAdministrativos.length; f++) {
      if (this.ReportActosAdministrativos[f].isSelectedMasive) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  masiveReportActosAdministrativosAcuerdos() {
    let countselected = false;
    this.count_select_snippets = 0;
    for (let f = 0; f < this.ReportActosAdministrativosAcuerdos.length; f++) {
      if (this.ReportActosAdministrativosAcuerdos[f].isSelectedMasive) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  masiveReportActosAdministrativosGacetas() {
    let countselected = false;
    this.count_select_snippets = 0;
    for (let f = 0; f < this.ReportActosAdministrativosGacetas.length; f++) {
      if (this.ReportActosAdministrativosGacetas[f].isSelectedMasive) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  masiveReportNormas() {
    let countselected = false;
    this.count_select_snippets = 0;
    for (let f = 0; f < this.ReportNormas.length; f++) {
      if (this.ReportNormas[f].isSelectedMasive) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  masiveReportLibrosMedios() {
    let countselected = false;
    this.count_select_snippets = 0;
    for (let f = 0; f < this.ReportLibrosMedios.length; f++) {
      if (this.ReportLibrosMedios[f].isSelectedMasive) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  masiveReportRevistas() {
    let countselected = false;
    this.count_select_snippets = 0;
    for (let f = 0; f < this.ReportRevistas.length; f++) {
      if (this.ReportRevistas[f].isSelectedMasive) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  masiveReportExpedientesH() {
    let countselected = false;
    this.count_select_snippets = 0;
    for (let f = 0; f < this.ReportExpedientesH.length; f++) {
      if (this.ReportExpedientesH[f].isSelectedMasive) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  masiveReportFotografiasH() {
    let countselected = false;
    this.count_select_snippets = 0;
    for (let f = 0; f < this.ReportFotografiasH.length; f++) {
      if (this.ReportFotografiasH[f].isSelectedMasive) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  masiveReportPrensaH() {
    let countselected = false;
    this.count_select_snippets = 0;
    for (let f = 0; f < this.ReportPrensaH.length; f++) {
      if (this.ReportPrensaH[f].isSelectedMasive) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  masiveReportPublicacionesH() {
    let countselected = false;
    this.count_select_snippets = 0;
    for (let f = 0; f < this.ReportPublicacionesH.length; f++) {
      if (this.ReportPublicacionesH[f].isSelectedMasive) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  masiveReportSentenciasH() {
    let countselected = false;
    this.count_select_snippets = 0;
    for (let f = 0; f < this.ReportSentenciasH.length; f++) {
      if (this.ReportSentenciasH[f].isSelectedMasive) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  masiveReportVideosH() {
    let countselected = false;
    this.count_select_snippets = 0;
    for (let f = 0; f < this.ReportVideosH.length; f++) {
      if (this.ReportVideosH[f].isSelectedMasive) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  masiveReportVideosV() {
    let countselected = false;
    this.count_select_snippets = 0;
    for (let f = 0; f < this.ReportVideosV.length; f++) {
      if (this.ReportVideosV[f].isSelectedMasive) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  masiveReportVideoConferenciasV() {
    let countselected = false;
    this.count_select_snippets = 0;
    for (let f = 0; f < this.ReportVideoConferenciasV.length; f++) {
      if (this.ReportVideoConferenciasV[f].isSelectedMasive) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  masiveReportFotografiasV() {
    let countselected = false;
    this.count_select_snippets = 0;
    for (let f = 0; f < this.ReportFotografiasV.length; f++) {
      if (this.ReportFotografiasV[f].isSelectedMasive) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  masiveReportPublicacionesV() {
    let countselected = false;
    this.count_select_snippets = 0;
    for (let f = 0; f < this.ReportPublicacionesV.length; f++) {
      if (this.ReportPublicacionesV[f].isSelectedMasive) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  masiveReportAudioV() {
    let countselected = false;
    this.count_select_snippets = 0;
    for (let f = 0; f < this.ReportAudioV.length; f++) {
      if (this.ReportAudioV[f].isSelectedMasive) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
        this.count_select_snippets++;
      }
      this.report_masive = true;
    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.report_selector = false;
      this.modal_error = true;
    }
  }

  generateReportJurisprudencia(index: number) {
    let countselected = false;
    let initial_value = {};
    let id_registro = [];
    let campo_seleccionado = [];
    this.count_select_snippets = 0;
    countselected = this.validateTrasncripcion();
    for (let f = 0; f < this.ReportJurisprudencia.length; f++) {
      if (this.ReportJurisprudencia[f].isSelected) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
      }

      id_registro.push(this.respuesta.results[index].id);

      for (let i = 0; i < this.ReportJurisprudencia.length; i++) {
        if (this.ReportJurisprudencia[i].isSelected) {
          campo_seleccionado.push(this.ReportJurisprudencia[i].value);
        }
      }

      if (id_registro.length > 0 && campo_seleccionado.length > 0) {
        initial_value = {
          id_registro: id_registro,
          campo_seleccionado: campo_seleccionado,
        };
      }

      this.modals_selector[index] = false;
      this.alphas[index] = true;
      this.elasticService
        .postLog(
          'Generar Reporte',
          'Generar Reporte',
          this.respuesta.results[index],
          initial_value,
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modals_selector[index] = false;
      this.modal_error = true;
    }
  }

  generateReportJurisprudenciaGacetas(index: number) {
    let countselected = false;
    let initial_value = {};
    let id_registro = [];
    let campo_seleccionado = [];
    this.count_select_snippets = 0;
    countselected = this.validateTrasncripcion();
    for (let f = 0; f < this.ReportJurisprudenciaGacetas.length; f++) {
      if (this.ReportJurisprudenciaGacetas[f].isSelected) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
      }

      id_registro.push(this.respuesta.results[index].id);

      for (let i = 0; i < this.ReportJurisprudenciaGacetas.length; i++) {
        if (this.ReportJurisprudenciaGacetas[i].isSelected) {
          campo_seleccionado.push(this.ReportJurisprudenciaGacetas[i].value);
        }
      }

      if (id_registro.length > 0 && campo_seleccionado.length > 0) {
        initial_value = {
          id_registro: id_registro,
          campo_seleccionado: campo_seleccionado,
        };
      }

      this.modals_selector[index] = false;
      this.alphas[index] = true;
      this.elasticService
        .postLog(
          'Generar Reporte',
          'Generar Reporte',
          this.respuesta.results[index],
          initial_value,
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modals_selector[index] = false;
      this.modal_error = true;
    }
  }

  generateReportJurisprudenciaSamai(index: number) {
    let countselected = false;
    let initial_value = {};
    let id_registro = [];
    let campo_seleccionado = [];
    this.count_select_snippets = 0;
    countselected = this.validateTrasncripcion();
    for (let f = 0; f < this.ReportJurisprudenciaSamai.length; f++) {
      if (this.ReportJurisprudenciaSamai[f].isSelected) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
      }

      id_registro.push(this.respuesta.results[index].id);

      for (let i = 0; i < this.ReportJurisprudenciaSamai.length; i++) {
        if (this.ReportJurisprudenciaSamai[i].isSelected) {
          campo_seleccionado.push(this.ReportJurisprudenciaSamai[i].value);
        }
      }

      if (id_registro.length > 0 && campo_seleccionado.length > 0) {
        initial_value = {
          id_registro: id_registro,
          campo_seleccionado: campo_seleccionado,
        };
      }

      this.modals_selector[index] = false;
      this.alphas[index] = true;
      this.elasticService
        .postLog(
          'Generar Reporte',
          'Generar Reporte',
          this.respuesta.results[index],
          initial_value,
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modals_selector[index] = false;
      this.modal_error = true;
    }
  }

  generateReportJurisprudenciaBoletines(index: number) {
    let countselected = false;
    let initial_value = {};
    let id_registro = [];
    let campo_seleccionado = [];
    this.count_select_snippets = 0;
    countselected = this.validateTrasncripcion();
    for (let f = 0; f < this.ReportJurisprudenciaBoletines.length; f++) {
      if (this.ReportJurisprudenciaBoletines[f].isSelected) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
      }

      id_registro.push(this.respuesta.results[index].id);

      for (let i = 0; i < this.ReportJurisprudenciaBoletines.length; i++) {
        if (this.ReportJurisprudenciaBoletines[i].isSelected) {
          campo_seleccionado.push(this.ReportJurisprudenciaBoletines[i].value);
        }
      }

      if (id_registro.length > 0 && campo_seleccionado.length > 0) {
        initial_value = {
          id_registro: id_registro,
          campo_seleccionado: campo_seleccionado,
        };
      }

      this.modals_selector[index] = false;
      this.alphas[index] = true;
      this.elasticService
        .postLog(
          'Generar Reporte',
          'Generar Reporte',
          this.respuesta.results[index],
          initial_value,
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modals_selector[index] = false;
      this.modal_error = true;
    }
  }

  generateReportLibrosMedios(index: number) {
    let countselected = false;
    let initial_value = {};
    let id_registro = [];
    let campo_seleccionado = [];
    this.count_select_snippets = 0;
    countselected = this.validateTrasncripcion();
    for (let f = 0; f < this.ReportLibrosMedios.length; f++) {
      if (this.ReportLibrosMedios[f].isSelected) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
      }

      id_registro.push(this.respuesta.results[index].id);

      for (let i = 0; i < this.ReportLibrosMedios.length; i++) {
        if (this.ReportLibrosMedios[i].isSelected) {
          campo_seleccionado.push(this.ReportLibrosMedios[i].value);
        }
      }

      if (id_registro.length > 0 && campo_seleccionado.length > 0) {
        initial_value = {
          id_registro: id_registro,
          campo_seleccionado: campo_seleccionado,
        };
      }

      this.modals_selector[index] = false;
      this.alphas[index] = true;
      this.elasticService
        .postLog(
          'Generar Reporte',
          'Generar Reporte',
          this.respuesta.results[index],
          initial_value,
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modals_selector[index] = false;
      this.modal_error = true;
    }
  }

  generateReportActosAdministrativos(index: number) {
    let countselected = false;
    let initial_value = {};
    let id_registro = [];
    let campo_seleccionado = [];
    this.count_select_snippets = 0;
    countselected = this.validateTrasncripcion();
    for (let f = 0; f < this.ReportActosAdministrativos.length; f++) {
      if (this.ReportActosAdministrativos[f].isSelected) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
      }

      id_registro.push(this.respuesta.results[index].id);

      for (let i = 0; i < this.ReportActosAdministrativos.length; i++) {
        if (this.ReportActosAdministrativos[i].isSelected) {
          campo_seleccionado.push(this.ReportActosAdministrativos[i].value);
        }
      }

      if (id_registro.length > 0 && campo_seleccionado.length > 0) {
        initial_value = {
          id_registro: id_registro,
          campo_seleccionado: campo_seleccionado,
        };
      }

      this.modals_selector[index] = false;
      this.alphas[index] = true;
      this.elasticService
        .postLog(
          'Generar Reporte',
          'Generar Reporte',
          this.respuesta.results[index],
          initial_value,
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modals_selector[index] = false;
      this.modal_error = true;
    }
  }

  generateReportActosAdministrativosAcuerdos(index: number) {
    let countselected = false;
    let initial_value = {};
    let id_registro = [];
    let campo_seleccionado = [];
    this.count_select_snippets = 0;
    countselected = this.validateTrasncripcion();
    for (let f = 0; f < this.ReportActosAdministrativosAcuerdos.length; f++) {
      if (this.ReportActosAdministrativosAcuerdos[f].isSelected) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
      }

      id_registro.push(this.respuesta.results[index].id);

      for (let i = 0; i < this.ReportActosAdministrativosAcuerdos.length; i++) {
        if (this.ReportActosAdministrativosAcuerdos[i].isSelected) {
          campo_seleccionado.push(
            this.ReportActosAdministrativosAcuerdos[i].value
          );
        }
      }

      if (id_registro.length > 0 && campo_seleccionado.length > 0) {
        initial_value = {
          id_registro: id_registro,
          campo_seleccionado: campo_seleccionado,
        };
      }

      this.modals_selector[index] = false;
      this.alphas[index] = true;
      this.elasticService
        .postLog(
          'Generar Reporte',
          'Generar Reporte',
          this.respuesta.results[index],
          initial_value,
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modals_selector[index] = false;
      this.modal_error = true;
    }
  }

  generateReportActosAdministrativosGacetas(index: number) {
    let countselected = false;
    let initial_value = {};
    let id_registro = [];
    let campo_seleccionado = [];
    this.count_select_snippets = 0;
    countselected = this.validateTrasncripcion();
    for (let f = 0; f < this.ReportActosAdministrativosGacetas.length; f++) {
      if (this.ReportActosAdministrativosGacetas[f].isSelected) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
      }

      id_registro.push(this.respuesta.results[index].id);

      for (let i = 0; i < this.ReportActosAdministrativosGacetas.length; i++) {
        if (this.ReportActosAdministrativosGacetas[i].isSelected) {
          campo_seleccionado.push(
            this.ReportActosAdministrativosGacetas[i].value
          );
        }
      }

      if (id_registro.length > 0 && campo_seleccionado.length > 0) {
        initial_value = {
          id_registro: id_registro,
          campo_seleccionado: campo_seleccionado,
        };
      }

      this.modals_selector[index] = false;
      this.alphas[index] = true;
      this.elasticService
        .postLog(
          'Generar Reporte',
          'Generar Reporte',
          this.respuesta.results[index],
          initial_value,
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modals_selector[index] = false;
      this.modal_error = true;
    }
  }

  generateReportRevistas(index: number) {
    let countselected = false;
    let initial_value = {};
    let id_registro = [];
    let campo_seleccionado = [];
    this.count_select_snippets = 0;
    countselected = this.validateTrasncripcion();
    for (let f = 0; f < this.ReportRevistas.length; f++) {
      if (this.ReportRevistas[f].isSelected) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
      }

      id_registro.push(this.respuesta.results[index].id);

      for (let i = 0; i < this.ReportRevistas.length; i++) {
        if (this.ReportRevistas[i].isSelected) {
          campo_seleccionado.push(this.ReportRevistas[i].value);
        }
      }

      if (id_registro.length > 0 && campo_seleccionado.length > 0) {
        initial_value = {
          id_registro: id_registro,
          campo_seleccionado: campo_seleccionado,
        };
      }

      this.modals_selector[index] = false;
      this.alphas[index] = true;
      this.elasticService
        .postLog(
          'Generar Reporte',
          'Generar Reporte',
          this.respuesta.results[index],
          initial_value,
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modals_selector[index] = false;
      this.modal_error = true;
    }
  }

  generateReportNormas(index: number) {
    let countselected = false;
    let initial_value = {};
    let id_registro = [];
    let campo_seleccionado = [];
    this.count_select_snippets = 0;
    countselected = this.validateTrasncripcion();
    for (let f = 0; f < this.ReportNormas.length; f++) {
      if (this.ReportNormas[f].isSelected) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
      }

      id_registro.push(this.respuesta.results[index].id);

      for (let i = 0; i < this.ReportNormas.length; i++) {
        if (this.ReportNormas[i].isSelected) {
          campo_seleccionado.push(this.ReportNormas[i].value);
        }
      }

      if (id_registro.length > 0 && campo_seleccionado.length > 0) {
        initial_value = {
          id_registro: id_registro,
          campo_seleccionado: campo_seleccionado,
        };
      }

      this.modals_selector[index] = false;
      this.alphas[index] = true;
      this.elasticService
        .postLog(
          'Generar Reporte',
          'Generar Reporte',
          this.respuesta.results[index],
          initial_value,
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modals_selector[index] = false;
      this.modal_error = true;
    }
  }

  generateReportExpedientesH(index: number) {
    let countselected = false;
    let initial_value = {};
    let id_registro = [];
    let campo_seleccionado = [];
    this.count_select_snippets = 0;
    countselected = this.validateTrasncripcion();
    for (let f = 0; f < this.ReportExpedientesH.length; f++) {
      if (this.ReportExpedientesH[f].isSelected) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
      }

      id_registro.push(this.respuesta.results[index].id);

      for (let i = 0; i < this.ReportExpedientesH.length; i++) {
        if (this.ReportExpedientesH[i].isSelected) {
          campo_seleccionado.push(this.ReportExpedientesH[i].value);
        }
      }

      if (id_registro.length > 0 && campo_seleccionado.length > 0) {
        initial_value = {
          id_registro: id_registro,
          campo_seleccionado: campo_seleccionado,
        };
      }

      this.modals_selector[index] = false;
      this.alphas[index] = true;
      this.elasticService
        .postLog(
          'Generar Reporte',
          'Generar Reporte',
          this.respuesta.results[index],
          initial_value,
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modals_selector[index] = false;
      this.modal_error = true;
    }
  }

  generateReportFotografiasH(index: number) {
    let countselected = false;
    let initial_value = {};
    let id_registro = [];
    let campo_seleccionado = [];
    this.count_select_snippets = 0;
    countselected = this.validateTrasncripcion();
    for (let f = 0; f < this.ReportFotografiasH.length; f++) {
      if (this.ReportFotografiasH[f].isSelected) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
      }

      id_registro.push(this.respuesta.results[index].id);

      for (let i = 0; i < this.ReportFotografiasH.length; i++) {
        if (this.ReportFotografiasH[i].isSelected) {
          campo_seleccionado.push(this.ReportFotografiasH[i].value);
        }
      }

      if (id_registro.length > 0 && campo_seleccionado.length > 0) {
        initial_value = {
          id_registro: id_registro,
          campo_seleccionado: campo_seleccionado,
        };
      }

      this.modals_selector[index] = false;
      this.alphas[index] = true;
      this.elasticService
        .postLog(
          'Generar Reporte',
          'Generar Reporte',
          this.respuesta.results[index],
          initial_value,
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modals_selector[index] = false;
      this.modal_error = true;
    }
  }

  generateReportPrensaH(index: number) {
    let countselected = false;
    let initial_value = {};
    let id_registro = [];
    let campo_seleccionado = [];
    this.count_select_snippets = 0;
    countselected = this.validateTrasncripcion();
    for (let f = 0; f < this.ReportPrensaH.length; f++) {
      if (this.ReportPrensaH[f].isSelected) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
      }

      id_registro.push(this.respuesta.results[index].id);

      for (let i = 0; i < this.ReportPrensaH.length; i++) {
        if (this.ReportPrensaH[i].isSelected) {
          campo_seleccionado.push(this.ReportPrensaH[i].value);
        }
      }

      if (id_registro.length > 0 && campo_seleccionado.length > 0) {
        initial_value = {
          id_registro: id_registro,
          campo_seleccionado: campo_seleccionado,
        };
      }

      this.modals_selector[index] = false;
      this.alphas[index] = true;
      this.elasticService
        .postLog(
          'Generar Reporte',
          'Generar Reporte',
          this.respuesta.results[index],
          initial_value,
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modals_selector[index] = false;
      this.modal_error = true;
    }
  }

  generateReportPublicacionesH(index: number) {
    let countselected = false;
    let initial_value = {};
    let id_registro = [];
    let campo_seleccionado = [];
    this.count_select_snippets = 0;
    countselected = this.validateTrasncripcion();
    for (let f = 0; f < this.ReportPublicacionesH.length; f++) {
      if (this.ReportPublicacionesH[f].isSelected) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
      }

      id_registro.push(this.respuesta.results[index].id);

      for (let i = 0; i < this.ReportPublicacionesH.length; i++) {
        if (this.ReportPublicacionesH[i].isSelected) {
          campo_seleccionado.push(this.ReportPublicacionesH[i].value);
        }
      }

      if (id_registro.length > 0 && campo_seleccionado.length > 0) {
        initial_value = {
          id_registro: id_registro,
          campo_seleccionado: campo_seleccionado,
        };
      }

      this.modals_selector[index] = false;
      this.alphas[index] = true;
      this.elasticService
        .postLog(
          'Generar Reporte',
          'Generar Reporte',
          this.respuesta.results[index],
          initial_value,
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modals_selector[index] = false;
      this.modal_error = true;
    }
  }

  generateReportSentenciasH(index: number) {
    let countselected = false;
    let initial_value = {};
    let id_registro = [];
    let campo_seleccionado = [];
    this.count_select_snippets = 0;
    countselected = this.validateTrasncripcion();
    for (let f = 0; f < this.ReportSentenciasH.length; f++) {
      if (this.ReportSentenciasH[f].isSelected) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
      }

      id_registro.push(this.respuesta.results[index].id);

      for (let i = 0; i < this.ReportSentenciasH.length; i++) {
        if (this.ReportSentenciasH[i].isSelected) {
          campo_seleccionado.push(this.ReportSentenciasH[i].value);
        }
      }

      if (id_registro.length > 0 && campo_seleccionado.length > 0) {
        initial_value = {
          id_registro: id_registro,
          campo_seleccionado: campo_seleccionado,
        };
      }

      this.modals_selector[index] = false;
      this.alphas[index] = true;
      this.elasticService
        .postLog(
          'Generar Reporte',
          'Generar Reporte',
          this.respuesta.results[index],
          initial_value,
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modals_selector[index] = false;
      this.modal_error = true;
    }
  }

  generateReportVideosH(index: number) {
    let countselected = false;
    let initial_value = {};
    let id_registro = [];
    let campo_seleccionado = [];
    this.count_select_snippets = 0;
    countselected = this.validateTrasncripcion();
    for (let f = 0; f < this.ReportVideosH.length; f++) {
      if (this.ReportVideosH[f].isSelected) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
      }

      id_registro.push(this.respuesta.results[index].id);

      for (let i = 0; i < this.ReportVideosH.length; i++) {
        if (this.ReportVideosH[i].isSelected) {
          campo_seleccionado.push(this.ReportVideosH[i].value);
        }
      }

      if (id_registro.length > 0 && campo_seleccionado.length > 0) {
        initial_value = {
          id_registro: id_registro,
          campo_seleccionado: campo_seleccionado,
        };
      }

      this.modals_selector[index] = false;
      this.alphas[index] = true;
      this.elasticService
        .postLog(
          'Generar Reporte',
          'Generar Reporte',
          this.respuesta.results[index],
          initial_value,
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modals_selector[index] = false;
      this.modal_error = true;
    }
  }

  generateReportVideosV(index: number) {
    let countselected = false;
    let initial_value = {};
    let id_registro = [];
    let campo_seleccionado = [];
    this.count_select_snippets = 0;
    countselected = this.validateTrasncripcion();
    for (let f = 0; f < this.ReportVideosV.length; f++) {
      if (this.ReportVideosV[f].isSelected) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
      }

      id_registro.push(this.respuesta.results[index].id);

      for (let i = 0; i < this.ReportVideosV.length; i++) {
        if (this.ReportVideosV[i].isSelected) {
          campo_seleccionado.push(this.ReportVideosV[i].value);
        }
      }

      if (id_registro.length > 0 && campo_seleccionado.length > 0) {
        initial_value = {
          id_registro: id_registro,
          campo_seleccionado: campo_seleccionado,
        };
      }

      this.modals_selector[index] = false;
      this.alphas[index] = true;
      this.elasticService
        .postLog(
          'Generar Reporte',
          'Generar Reporte',
          this.respuesta.results[index],
          initial_value,
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modals_selector[index] = false;
      this.modal_error = true;
    }
  }

  generateReportVideoConferenciasV(index: number) {
    let countselected = false;
    let initial_value = {};
    let id_registro = [];
    let campo_seleccionado = [];
    this.count_select_snippets = 0;
    countselected = this.validateTrasncripcion();
    for (let f = 0; f < this.ReportVideoConferenciasV.length; f++) {
      if (this.ReportVideoConferenciasV[f].isSelected) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
      }

      id_registro.push(this.respuesta.results[index].id);

      for (let i = 0; i < this.ReportVideoConferenciasV.length; i++) {
        if (this.ReportVideoConferenciasV[i].isSelected) {
          campo_seleccionado.push(this.ReportVideoConferenciasV[i].value);
        }
      }

      if (id_registro.length > 0 && campo_seleccionado.length > 0) {
        initial_value = {
          id_registro: id_registro,
          campo_seleccionado: campo_seleccionado,
        };
      }

      this.modals_selector[index] = false;
      this.alphas[index] = true;
      this.elasticService
        .postLog(
          'Generar Reporte',
          'Generar Reporte',
          this.respuesta.results[index],
          initial_value,
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modals_selector[index] = false;
      this.modal_error = true;
    }
  }

  generateReportFotografiasV(index: number) {
    let countselected = false;
    let initial_value = {};
    let id_registro = [];
    let campo_seleccionado = [];
    this.count_select_snippets = 0;
    countselected = this.validateTrasncripcion();
    for (let f = 0; f < this.ReportFotografiasV.length; f++) {
      if (this.ReportFotografiasV[f].isSelected) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
      }

      id_registro.push(this.respuesta.results[index].id);

      for (let i = 0; i < this.ReportFotografiasV.length; i++) {
        if (this.ReportFotografiasV[i].isSelected) {
          campo_seleccionado.push(this.ReportFotografiasV[i].value);
        }
      }

      if (id_registro.length > 0 && campo_seleccionado.length > 0) {
        initial_value = {
          id_registro: id_registro,
          campo_seleccionado: campo_seleccionado,
        };
      }

      this.modals_selector[index] = false;
      this.alphas[index] = true;
      this.elasticService
        .postLog(
          'Generar Reporte',
          'Generar Reporte',
          this.respuesta.results[index],
          initial_value,
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modals_selector[index] = false;
      this.modal_error = true;
    }
  }

  generateReportPublicacionesV(index: number) {
    let countselected = false;
    let initial_value = {};
    let id_registro = [];
    let campo_seleccionado = [];
    this.count_select_snippets = 0;
    countselected = this.validateTrasncripcion();
    for (let f = 0; f < this.ReportPublicacionesV.length; f++) {
      if (this.ReportPublicacionesV[f].isSelected) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
      }

      id_registro.push(this.respuesta.results[index].id);

      for (let i = 0; i < this.ReportPublicacionesV.length; i++) {
        if (this.ReportPublicacionesV[i].isSelected) {
          campo_seleccionado.push(this.ReportPublicacionesV[i].value);
        }
      }

      if (id_registro.length > 0 && campo_seleccionado.length > 0) {
        initial_value = {
          id_registro: id_registro,
          campo_seleccionado: campo_seleccionado,
        };
      }

      this.modals_selector[index] = false;
      this.alphas[index] = true;
      this.elasticService
        .postLog(
          'Generar Reporte',
          'Generar Reporte',
          this.respuesta.results[index],
          initial_value,
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modals_selector[index] = false;
      this.modal_error = true;
    }
  }

  generateReportAudioV(index: number) {
    let countselected = false;
    let initial_value = {};
    let id_registro = [];
    let campo_seleccionado = [];
    this.count_select_snippets = 0;
    countselected = this.validateTrasncripcion();
    for (let f = 0; f < this.ReportAudioV.length; f++) {
      if (this.ReportAudioV[f].isSelected) {
        countselected = true;
      }
    }
    if (countselected) {
      this.reports = [];
      for (let i = 0; i < this.masivedownload.length; i++) {
        this.result = this.respuesta.results[this.masivedownload[i]];
        this.reports.push(this.result);
      }

      id_registro.push(this.respuesta.results[index].id);

      for (let i = 0; i < this.ReportAudioV.length; i++) {
        if (this.ReportAudioV[i].isSelected) {
          campo_seleccionado.push(this.ReportAudioV[i].value);
        }
      }

      if (id_registro.length > 0 && campo_seleccionado.length > 0) {
        initial_value = {
          id_registro: id_registro,
          campo_seleccionado: campo_seleccionado,
        };
      }

      this.modals_selector[index] = false;
      this.alphas[index] = true;
      this.elasticService
        .postLog(
          'Generar Reporte',
          'Generar Reporte',
          this.respuesta.results[index],
          initial_value,
          index
        )
        .subscribe((response) => {});
        
      this.calificarResultadoAutomatico(index);

    } else {
      this.error = 'No has seleccionado ningún elemento para generar reportes';
      this.modals_selector[index] = false;
      this.modal_error = true;
    }
  }

  /* HU 03 */
  public modal_filter: boolean = false;

  public changeModelFilter(): void {
    if (this.modal_filter == true) {
      this.modal_filter = false;
    } else {
      this.modal_filter = true;
    }
  }
  /* END HU 03 */

  getFormatedDate(date: string, format: string) {
    if (date) {
      const copydate = new Date(date);
      copydate.setDate(copydate.getDate() + 1);
      return this.datepipe.transform(copydate, format);
    }
    return null;
  }

  setModalSelector(index: number) {
    this.extra_origen_report = this.respuesta.results[index].extra_origen_id;
    this.tipo_acto_report = this.respuesta.results[index].tipo_acto;
    //console.log('this.extra_origen_report', this.extra_origen_report);
    this.elasticService
      .postLog(
        'Ver ficha',
        'Ver ficha',
        this.respuesta.results[index],
        {},
        index
      )
      .subscribe((response) => {});

    /* this.document.body.style.position = 'fixed';
    this.document.body.style.zIndex = '-1'; */
    const mods = this.document.getElementsByClassName(
      'modalsContanier'
    ) as HTMLCollectionOf<HTMLElement>;
    for (let index = 0; index < mods.length; index++) {
      mods[index].style.zIndex = '200';
    }
    this.modals_selector[index] = true;
    
    this.calificarResultadoAutomatico(index);
  }

  unSetModalStyle(index: number, report:string = null) {
    this.alphas[index] = false;
    this.document.body.style.position = 'relative';
    this.document.body.style.zIndex = '1';
    this.transcripcion = false;
    this.isMasterSel = false;
    switch (report) {
      case "ReportJurisprudencia":
        this.ReportJurisprudencia = this.ResetSelectsReport(this.ReportJurisprudencia);
        break;
      case "ReportJurisprudenciaGacetas":
        this.ReportJurisprudenciaGacetas = this.ResetSelectsReport(this.ReportJurisprudenciaGacetas);
        break;
      case "ReportJurisprudenciaSamai":
        this.ReportJurisprudenciaSamai = this.ResetSelectsReport(this.ReportJurisprudenciaSamai);
        break;
      case "ReportJurisprudenciaBoletines":
        this.ReportJurisprudenciaBoletines = this.ResetSelectsReport(this.ReportJurisprudenciaBoletines);
        break;
      case "ReportActosAdministrativos":
        this.ReportActosAdministrativos = this.ResetSelectsReport(this.ReportActosAdministrativos);
        break;
      case "ReportActosAdministrativosAcuerdos":
        this.ReportActosAdministrativosAcuerdos = this.ResetSelectsReport(this.ReportActosAdministrativosAcuerdos);
        break;
      case "ReportActosAdministrativosGacetas":
        this.ReportActosAdministrativosGacetas = this.ResetSelectsReport(this.ReportActosAdministrativosGacetas);
        break;
      case "ReportLibrosMedios":
        this.ReportLibrosMedios = this.ResetSelectsReport(this.ReportLibrosMedios);
        break;
      case "ReportRevistas":
        this.ReportRevistas = this.ResetSelectsReport(this.ReportRevistas);
        break;
      case "ReportNormas":
        this.ReportNormas = this.ResetSelectsReport(this.ReportNormas);
        break;
      case "ReportExpedientesH":
        this.ReportExpedientesH = this.ResetSelectsReport(this.ReportExpedientesH);
        break;
      case "ReportFotografiasH":
        this.ReportFotografiasH = this.ResetSelectsReport(this.ReportFotografiasH);
        break;
      case "ReportPrensaH":
        this.ReportPrensaH = this.ResetSelectsReport(this.ReportPrensaH);
        break;
      case "ReportPublicacionesH":
        this.ReportPublicacionesH = this.ResetSelectsReport(this.ReportPublicacionesH);
        break;
      case "ReportSentenciasH":
        this.ReportSentenciasH = this.ResetSelectsReport(this.ReportSentenciasH);
        break;
      case "ReportVideosH":
        this.ReportVideosH = this.ResetSelectsReport(this.ReportVideosH);
        break;
      case "ReportVideosV":
        this.ReportVideosV = this.ResetSelectsReport(this.ReportVideosV);
        break;
      case "ReportVideoConferenciasV":
        this.ReportVideoConferenciasV = this.ResetSelectsReport(this.ReportVideoConferenciasV);
        break;
      case "ReportFotografiasV":
        this.ReportFotografiasV = this.ResetSelectsReport(this.ReportFotografiasV);
        break;
      case "ReportPublicacionesV":
        this.ReportPublicacionesV = this.ResetSelectsReport(this.ReportPublicacionesV);
        break;
      case "ReportAudioV":
        this.ReportAudioV = this.ResetSelectsReport(this.ReportAudioV);
        break;
     
      default:
        break;
    }
  }

  unsetModalReportMasive(){
    this.transcripcion = false;
    this.isMasterSelmasive = false;
    this.many_reports = this.ResetSelectsReport(this.many_reports);
    this.report_masive = false;
    this.report_selector = false;
  }

  unsetModalSelector(index: number, report:string = null) {
    this.modals_selector[index] = false;
    this.document.body.style.position = 'relative';
    this.document.body.style.zIndex = '1';
    this.transcripcion = false;
    this.isMasterSel = false;
    switch (report) {
      case "ReportJurisprudencia":
        this.ReportJurisprudencia = this.ResetSelectsReport(this.ReportJurisprudencia);
        break;
      case "ReportJurisprudenciaGacetas":
        this.ReportJurisprudenciaGacetas = this.ResetSelectsReport(this.ReportJurisprudenciaGacetas);
        break;
      case "ReportJurisprudenciaSamai":
        this.ReportJurisprudenciaSamai = this.ResetSelectsReport(this.ReportJurisprudenciaSamai);
        break;
      case "ReportJurisprudenciaBoletines":
        this.ReportJurisprudenciaBoletines = this.ResetSelectsReport(this.ReportJurisprudenciaBoletines);
        break;
      case "ReportActosAdministrativos":
        this.ReportActosAdministrativos = this.ResetSelectsReport(this.ReportActosAdministrativos);
        break;
      case "ReportActosAdministrativosAcuerdos":
        this.ReportActosAdministrativosAcuerdos = this.ResetSelectsReport(this.ReportActosAdministrativosAcuerdos);
        break;
      case "ReportActosAdministrativosGacetas":
        this.ReportActosAdministrativosGacetas = this.ResetSelectsReport(this.ReportActosAdministrativosGacetas);
        break;
      case "ReportLibrosMedios":
        this.ReportLibrosMedios = this.ResetSelectsReport(this.ReportLibrosMedios);
        break;
      case "ReportRevistas":
        this.ReportRevistas = this.ResetSelectsReport(this.ReportRevistas);
        break;
      case "ReportNormas":
        this.ReportNormas = this.ResetSelectsReport(this.ReportNormas);
        break;
      case "ReportExpedientesH":
        this.ReportExpedientesH = this.ResetSelectsReport(this.ReportExpedientesH);
        break;
      case "ReportFotografiasH":
        this.ReportFotografiasH = this.ResetSelectsReport(this.ReportFotografiasH);
        break;
      case "ReportPrensaH":
        this.ReportPrensaH = this.ResetSelectsReport(this.ReportPrensaH);
        break;
      case "ReportPublicacionesH":
        this.ReportPublicacionesH = this.ResetSelectsReport(this.ReportPublicacionesH);
        break;
      case "ReportSentenciasH":
        this.ReportSentenciasH = this.ResetSelectsReport(this.ReportSentenciasH);
        break;
      case "ReportVideosH":
        this.ReportVideosH = this.ResetSelectsReport(this.ReportVideosH);
        break;
      case "ReportVideosV":
        this.ReportVideosV = this.ResetSelectsReport(this.ReportVideosV);
        break;
      case "ReportVideoConferenciasV":
        this.ReportVideoConferenciasV = this.ResetSelectsReport(this.ReportVideoConferenciasV);
        break;
      case "ReportFotografiasV":
        this.ReportFotografiasV = this.ResetSelectsReport(this.ReportFotografiasV);
        break;
      case "ReportPublicacionesV":
        this.ReportPublicacionesV = this.ResetSelectsReport(this.ReportPublicacionesV);
        break;
      case "ReportAudioV":
        this.ReportAudioV = this.ResetSelectsReport(this.ReportAudioV);
        break;
     
      default:
        break;
    }
  }

  unsetModalSelectorMasive(){
    this.transcripcion = false;
    this.isMasterSelmasive = false;
    this.many_reports = this.ResetSelectsReport(this.many_reports);
    this.report_selector = false;
  }

  loadImage(index: number) {
    const dataItem = this.respuesta.results[index];
    if (dataItem?.anexo1) {
      dataItem.anexo1.forEach((element: any) => {
        if (element.tipourl == '1') {
          this.elasticService.getFile(element.public_url).subscribe(
            (response: any) => {
              const linkSource =
                'data:' +
                response?.mime_type +
                ';base64,' +
                response?.base64_file;
              this.reusltsImage[index] = linkSource;
            },
            (error) => {
              this.reusltsImage[index] = '/assets/img/icono-libro.png';
            }
          );
        }
      });
    }
    this.reusltsImage[index] = '/assets/img/icono-libro.png';
  }

  setRevistasImage(item: any) {
    if (item?.anexo1 !== null) {
      const arrAnexos = item.anexo1;
      if (arrAnexos[0]?.tipourl == 1) {
        this.elasticService.getFile(arrAnexos[0].url).subscribe(
          (response: any) => {
            const linkSource =
              'data:' +
              response?.mime_type +
              ';base64,' +
              response?.base64_file;
            return linkSource;
          },
          (error) => {
            return '/assets/img/icono-libro.png';
          }
        );
        return '/assets/img/icono-libro.png';
      } else if (arrAnexos[1]?.tipourl == 1) {
        this.elasticService.getFile(arrAnexos[1].url).subscribe(
          (response: any) => {
            const linkSource =
              'data:' +
              response?.mime_type +
              ';base64,' +
              response?.base64_file;
            return linkSource;
          },
          (error) => {
            return '/assets/img/icono-libro.png';
          }
        );
        return '/assets/img/icono-libro.png';
      } else {
        return '/assets/img/icono-libro.png';
      }
    } else {
      return '/assets/img/icono-libro.png';
    }
  }

  formatToJSON(listaAnexos: any) {
    if (listaAnexos.length > 0) {
      const listConverted = JSON.parse(listaAnexos);
      return listConverted;
    } else {
      return [];
    }
  }

  validarDocumentos(anexos: any[]): boolean {
    let contieneDocumento = false;

    for (let i = 0; i < anexos.length; i++) {
      if (
        anexos[i].tipo.toLocaleLowerCase() == 'doc' ||
        anexos[i].tipo.toLocaleLowerCase() == 'pdf' ||
        anexos[i].tipo.toLocaleLowerCase() == 'html' ||
        anexos[i].tipo.toLocaleLowerCase() == 'rtf'
      ) {
        contieneDocumento = true;
        break;
      }
    }

    return contieneDocumento;
  }

  openVideo(resultado: any, index: any) {
    this.videoSeleccionado = resultado;
    this.indexVideo = index;

    this.nuevoVideo.documentovirtualnombre[0].Valor =
      this.videoSeleccionado.documentovirtualnombre[index].Valor;
    this.nuevoVideo.documentovirtualnombre[0].estructura =
      this.videoSeleccionado.documentovirtualnombre[index].estructura;
    this.nuevoVideo.documentovirtualnombre[0].materialID =
      this.videoSeleccionado.documentovirtualnombre[index].MaterialID;
    this.nuevoVideo.documentovirtualnombre[0].public_url =
      this.videoSeleccionado.documentovirtualnombre[index].public_url;
    this.nuevoVideo.documentovirtualnombre[0].tipo =
      this.videoSeleccionado.documentovirtualnombre[index].tipo;
    this.nuevoVideo.documentovirtualnombre[0].url =
      this.videoSeleccionado.documentovirtualnombre[index].url;

    this.elasticService.postVideo(this.nuevoVideo).subscribe({
      next(response: any) {
      },
      error(error) {
      },
    });
    this.mostrarVideo = true;
  }

  closeVideo() {
    this.mostrarVideo = false;
  }

  imprimirConsola(e: any) {
    console.log(e);
  }

  removeDuplicates(originalArray:any, prop:string) {
    var newArray:any = [];
    var lookupObject:any  = {};

    for(var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  castingArrays(array:any[], prop:string){
    array = array.map(item=>{
      return '"' + item[prop] + '"'
    })

    return array;
  }

  formatArrays(array:any[]){
    let array_casting = [];

    for (let index = 0; index < array.length; index++) {
      if(array[index].isSelected === true || array[index].isSelectedMasive === true){
        array_casting.push('"' + array[index].value + '"');
      } 
    }
    return array_casting;
  }


  validateExtraOrigen(){
    let array:any = [];

    if(this.extra_origen_report == 6 || this.extra_origen_report == 7 || this.extra_origen_report == 8 || 
      this.extra_origen_report == 9 || this.extra_origen_report == 10 || this.extra_origen_report == 11|| 
      this.extra_origen_report == 12|| this.extra_origen_report == 13 || this.extra_origen_report == 14){
      array = this.formatArrays(this.ReportJurisprudencia);  
    }else if(this.extra_origen_report == 30){
      console.log(this.ReportJurisprudenciaGacetas);
      array = this.formatArrays(this.ReportJurisprudenciaGacetas);  
    }else if(this.extra_origen_report == 31){
      array = this.formatArrays(this.ReportJurisprudenciaSamai);  
    }else if(this.extra_origen_report == 32){
      array = this.formatArrays(this.ReportJurisprudenciaBoletines);  
    }else if(this.extra_origen_report == 5 && this.tipo_acto_report !== 'Acuerdos'){
      array = this.formatArrays(this.ReportActosAdministrativos);  
    }else if(this.extra_origen_report == 5 && this.tipo_acto_report == 'Acuerdos'){
      array = this.formatArrays(this.ReportActosAdministrativosAcuerdos);  
    }else if(this.extra_origen_report == 0){
      array = this.formatArrays(this.ReportActosAdministrativosGacetas);  
    }else if(this.extra_origen_report == 15){
      array = this.formatArrays(this.ReportLibrosMedios);  
    }else if(this.extra_origen_report == 16){
      array = this.formatArrays(this.ReportRevistas);  
    }else if(this.extra_origen_report == 17){
      array = this.formatArrays(this.ReportNormas);  
    }else if(this.extra_origen_report == 18){
      array = this.formatArrays(this.ReportExpedientesH);  
    }else if(this.extra_origen_report == 19){
      array = this.formatArrays(this.ReportFotografiasH);  
    }else if(this.extra_origen_report == 20){
      array = this.formatArrays(this.ReportPrensaH);  
    }else if(this.extra_origen_report == 21){
      array = this.formatArrays(this.ReportPublicacionesH);  
    }else if(this.extra_origen_report == 22){
      array = this.formatArrays(this.ReportSentenciasH);  
    }else if(this.extra_origen_report == 23){
      array = this.formatArrays(this.ReportVideosH);  
    }else if(this.extra_origen_report == 24){
      array = this.formatArrays(this.ReportVideosV);  
    }else if(this.extra_origen_report == 25 || this.extra_origen_report == 26){
      array = this.formatArrays(this.ReportVideoConferenciasV);  
    }else if(this.extra_origen_report == 27){
      array = this.formatArrays(this.ReportFotografiasV);  
    }else if(this.extra_origen_report == 28){
      array = this.formatArrays(this.ReportPublicacionesV);  
    }else if(this.extra_origen_report == 29){
      array = this.formatArrays(this.ReportAudioV);  
    }
    return array;
  }

  calificarResultadoAutomatico(index:number){
    this.calificarResultado = new CalificarResultadoCampos();
      
    this.calificarResultado.index = this.respuesta.results[index]._index;
    this.calificarResultado.document_id =this.respuesta.results[index]._id;
    this.calificarResultado.puntaje = this.pointResultadoAutomatic.value;
    
    this.scoreResultAutomatic.calificaciones.push(this.calificarResultado)

    this.elasticService.postCalificarResultado(this.scoreResultAutomatic).subscribe(response=>{
      this.scoreResultAutomatic.calificaciones = [];
    }); 
  }

  calificarVariosResultadosAutomatico(){

    for (let index = 0; index < this.masivedownload.length; index++) {

      this.calificarResultado = new CalificarResultadoCampos();

      this.calificarResultado.index = this.respuesta.results[this.masivedownload[index]]._index;
      this.calificarResultado.document_id =this.respuesta.results[this.masivedownload[index]]._id;
      this.calificarResultado.puntaje = this.pointResultadoAutomatic.value;
      
      this.scoreResultAutomatic.calificaciones.push(this.calificarResultado);
    }
    
    this.elasticService.postCalificarResultado(this.scoreResultAutomatic).subscribe(response=>{

      this.scoreResultAutomatic.calificaciones = [];
    });
  }

  public getParamLogoById(idLogo:string){

    var auxToken = sessionStorage.getItem('token');
    this.elasticService.getParamLogoById(auxToken, idLogo).subscribe(
      (respuesta: any) => {
        this.logoImg = respuesta.image_base64;
        console.log(this.logoImg);
        this.logoName = respuesta.name;
    });
  }

  validateTrasncripcion(){
    if(this.transcripcion){
      return true;
    }
    return false;
  }

  validateAnexo1TipoURL(anexo1:any){
    let anexo1Has2 = false;

    for (let index = 0; index < anexo1.length; index++) {
      if(anexo1[index]?.tipourl == "2"){
        anexo1Has2 = true;
        break;
      }
    }
    return anexo1Has2;
  }

  ResetSelectsReport(array:any[]){
    for (let index = 0; index < array.length; index++) {
      array[index].isSelected = false;
      array[index].isSelectedMasive = false
    }

    return array;
  }
}
