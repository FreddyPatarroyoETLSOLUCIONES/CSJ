import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ElasticService } from 'src/services/elastic.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FilterModel } from 'src/app/models/filter-model';
import { BusquedaHistoricoModel } from 'src/app/models/BusquedaHistorico.model';
import {DomSanitizer} from "@angular/platform-browser";


import { DOCUMENT } from '@angular/common';
import { IfStmt } from '@angular/compiler';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    urlRef: string = '';
    recaptchaValidation:boolean = false;

    public generalForm: FormGroup;
    itemCriteria: number;
    itemCriteriaJR: number;
    itemCriteriaPR: number;
    itemCriteriaC: number;
    itemCriteriaA: number;
    itemCriteriaD: number;
    itemCriteriaT: number;
    auxCriterios: any = [];
    auxCriteriosJR: any = [];
    auxCriteriosPR: any = [];
    auxCriteriosC: any = [];
    auxCriteriosA: any = [];
    auxCriteriosD: any = [];
    auxCriteriosT: any = [];
    flagLimiteYContenga: boolean = false;
    flagLimiteOContenga: boolean = false;
    flagLimiteExcluya: boolean = false;
    flagLimiteYContengaJR: boolean = false;
    flagLimiteOContengaJR: boolean = false;
    flagLimiteExcluyaJR: boolean = false;
    flagLimiteYContengaPR: boolean = false;
    flagLimiteOContengaPR: boolean = false;
    flagLimiteExcluyaPR: boolean = false;
    flagLimiteYContengaT: boolean = false;
    flagLimiteOContengaT: boolean = false;
    flagLimiteExcluyaT: boolean = false;
    flagLimiteYContengaA: boolean = false;
    flagLimiteOContengaA: boolean = false;
    flagLimiteExcluyaA: boolean = false;
    flagLimiteYContengaD: boolean = false;
    flagLimiteOContengaD: boolean = false;
    flagLimiteExcluyaD: boolean = false;
    flagLimiteYContengaC: boolean = false;
    flagLimiteOContengaC: boolean = false;
    flagLimiteExcluyaC: boolean = false;
    flagLimiteExcluyaFF: boolean = false;
    flagLimiteYContengaFF: boolean = false;
    flagLimiteOContengaFF: boolean = false;
    flagLimiteExcluyaND: boolean = false;
    flagLimiteYContengaND: boolean = false;
    flagLimiteOContengaND: boolean = false;
    flagLimiteExcluyaE: boolean = false;
    flagLimiteOContengaE: boolean = false;
    flagLimiteYContengaE: boolean = false;
    flagTextoMinimo: boolean = false;
    flagTextoValido: boolean = false;
    flagBusquedaVacia: boolean = true;
    flagBiblioteca1: boolean = false;
    flagBiblioteca2: boolean = false;
    flagItems1: boolean = true;
    flagItems2: boolean = false;
    searchText: string;
    dropdownList: Array<any> = [];
    dropdownSettingsTipoGaceta: any = {};
    dropdownSettingsCorporaciones: any = {};
    dropdownSettingsEstado: any = {};
    tipoGaceta: Array<any> = [];
    criterioYContenga: Array<any> = [];
    criterioOContenga: Array<any> = [];
    criterioExcluya: Array<any> = [];
    dropdownSettingsTribunales: any = {};
    dropdownSettingsSeccion: any = {};
    dropdownSettingsTipoNorma: any = {};
    dropdownSettingsBibliotecaRed: any = {};
    seccion: Array<any> = [];
    seccionOptions: Array<any> = [];
    seccionOptionsCheck: Array<any> = [];
    dropdownSettings: any = {};
    dropdownSettingsEntidadGeneradora: any = {};
    dropdownSettingsFuenteOrigen: any = {};
    dropdownSettingsOrigenVideoteca: any = {};
    dropdownSettingsActos: any = {};
    dropdownSettingsMeses: any = {};
    dropdownSettingsMesesFuenteOficial: any = {};
    dropdownSettingsTipoMaterial: any = {};
    dropdownSettingsInfoHolocausto: any = {};
    dropdownSettingsInfoVideoteca: any = {};
    dropdownSettingsInfo: any = {};
    dropdownSettingsTemas: any = {};
    dropdownSettingsTemaTres: any = {};
    dropdownSettingsTemaTres6: any = {};
    dropdownSettingsTemaTres8: any = {};
    dropdownSettingsBiblioteca: any = {};
    dropdownSettingsTipoProvidencia: any = {};
    dropdownSettingsSalas: any = {};
    dropdownSettingsCategoriaGenero: any = {};
    dropdownSettingsDecision: any = {};
    dropdownSettingsTipoSala: any = {};
    dropdownSettingsSingle: any = {};
    dropdownSettingsPonente: any = {};
    dropdownSettingsSalaConocimiento: any = {};
    dropdownSettingsNaturalezaProceso: any = {};
    dropdownSettingsAspectosRelevantes: any = {};
    dropdownSettingsTipoProcedencia: any = {};
    dropdownSettingsClaseActuacion: any = {};
    dropdownSettingsDelitos: any = {};
    dropdownSettingsMagistrado: any = {};
    dropdownSettingsDepartamentoInmueble: any = {};
    dropdownSettingsCiudadInmueble: any = {};
    dropdownSettingsMunicipioInmueble: any = {};
    dropdownSettingsCorregimientoInmueble: any = {};
    dropdownSettingsVeredaInmueble: any = {};
    dropdownSettingsBarrioInmueble: any = {};
    dropdownSettingsTribunalSuperior: any = {};
    dropdownSettingsTribunalDespacho: any = {};
    dropdownSettingsTribunalAdministrativo: any = {};
    dropdownSettingsTemaTresDescriptivo: any = {};
    dropdownSettingsTemaTresVocabularioControlado15: any = {};
    auxSelectedItems: any = [];
    auxSelectedItemsJurisGenero: any = [];
    auxSelectedItemsGacetasJudiciales: any = [];
    allItems: any = [{ id: 6, texto: "Corte Suprema de Justicia" }];
    allItemsExtraOrigen: any = [{ id: 6, texto: "Corte Suprema de Justicia" }];
    departamentoInmueble: any = [];
    ciudadInmueble: any = [];
    municipioInmueble: any = [];
    corregimientoInmueble: any = [];
    veredaInmueble: any = [];
    barrioInmueble: any = [];
    tribunalSuperior: any = [];
    tribunalAdministrativo: any = [];
    tribunalDespacho: any = [];
    flagNormativa: boolean = false;
    flagRevistas: boolean = false;
    flagLibrosAudiovisuales: boolean = false;
    flagHolocausto: boolean = false;
    flagVideoteca: boolean = false;
    flagAdmin: boolean = false;
    itemsShowLimit: boolean;
    subOrigenes: Array<number> = [];
    TipoProcedencias: Array<any> = [];
    TipoProcedenciasCheck: Array<any> = [];
    tribunalDespachoCheck: Array<any> = [];
    MesesCheck: Array<any> = [];
    Procedencias: Array<any> = [];
    DelitosCheck: Array<any> = [];
    EstadoCheck: Array<any> = [];
    MagistradoCheck: Array<any> = [];
    DecisionesCheck: Array<any> = [];
    SalasCheck: Array<any> = [];
    TipoSalasCheck: Array<any> = [];
    subTipoProvidencias: Array<number> = [];
    respuesta: any;
    textobusqueda: string;
    emptyresults: boolean;
    limit: number;
    chkJurisprudencia = 'true';
    textEmpty = false;
    chkAltaCorte: boolean = false;
    Tihidden = 'true';
    Gjhidden = 'false';
    Gjhidde = 'false';
    title = 'Frontend_CSJ';
    activeSearch: boolean;
    activeSearch1 = false;
    activeSearch2 = false;
    activeSearch3 = false;
    biblioteca: Array<any> = [];
    
    origenBibliotecaRedCheck: Array<any> = [];
    bibliotecaCNSJ: Array<any> = [];
    tribunales: Array<any> = [];
    tribunalesCE: Array<any> = [];
    altasCortes: Array<any> = [];
    consejoDeEstado: Array<any> = [];
    altasCortesCE: Array<any> = [];
    tipoInformacionHV: Array<any> = [];
    tipoInformacion: Array<any> = [];
    tipoInformacionVA: Array<any> = [];
    tipoInformacionHA: Array<any> = [];
    tipoInformacionHolocausto: Array<any> = [];
    tipoInformacionVideoteca: Array<any> = [];
    tipoInformacionActosAdmin: Array<any> = [];
    tipoInformacionActosAdministrativos: Array<any> = [];
    tipoNorma: Array<any> = [];
    tipoNormaSelect: any[]= [];
    criterios: Array<any> = [];
    criteriosPR: Array<any> = [];
    criteriosJR: Array<any> = [];
    criteriosA: Array<any> = [];
    criteriosT: Array<any> = [];
    criteriosD: Array<any> = [];
    criteriosC: Array<any> = [];
    criteriosFF: Array<any> = [];
    criteriosND: Array<any> = [];
    criteriosE: Array<any> = [];
    trimestral: Array<any> = [];
    edicion: Array<any> = [];
    origenVideoteca: Array<any> = [];
    tipoMaterial: Array<any> = [];
    origenVideotecaCheck: Array<any> = [];
    aspectosRelevantes: Array<any> = [];
    salaConocimiento: Array<any> = [];
    naturalezaProceso: Array<any> = [];
    salaConocimientoCheck: Array<any> = [];
    naturalezaProcesoCheck: Array<any> = [];
    aspectosRelevantesCheck: Array<any> = [];
    tema: Array<any> = [];
    temaTres: Array<any> = [];
    ponencia: Array<any> = [];
    entidadGeneradora: Array<any> = [];
    ponenciasCheck: Array<any> = [];
    entidadGeneradoraCheck: Array<any> = [];
    fuenteOficialCheck: Array<any> = [];
    corporaciones: Array<any> = [];
    corporacionesCheck: Array<any> = [];
    estado: Array<any> = [];
    temasChecks: Array<any> = [];
    temaTresChecks: Array<any> = [];
    temaTresChecks6: Array<any> = []; 
    temaTresChecks8: Array<any> = []; 
    temaTresDescriptivo:  Array<any> = [];
    temaTresDescriptivoChecks:  Array<any> = [];
    temaTresDescriptoresNormativa: Array<any> = [];
    temaTresVocabularioControlado15: Array<any> = [];
    temaTresChecksVocabularioControlado15: Array<any> = [];
    temaVocabularioChecks: Array<any> =[];
    sala: Array<any> = [];
    salas: Array<any> = [];
    magistradosInicial : Array<any> = [];
    tipoSalasInicial : Array<any> = [];
    descriptoresList: Array<any> = [];
    tipoSalas: Array<any> = [];
    tipoNroProvidencia: Array<any> = [];
    claseActuacionChecks: Array<any> = [];
    tipoNroProvidenciasCheck: Array<any> = []; 
    busquedaActiva: boolean = false;
    auxAnd: any = [];
    auxAnd2: any = [];
    auxOr: any = [];
    auxEx: any = [];
    auxAndT: any = [];
    auxOrT: any = [];
    auxExT: any = [];
    auxAndPR: any = [];
    auxOrPR: any = [];
    auxExPR: any = [];
    auxAndJR: any = [];
    auxOrJR: any = [];
    auxExJR: any = [];
    auxAndC: any = [];
    auxOrC: any = [];
    auxExC: any = [];
    auxAndA: any = [];
    auxOrA: any = [];
    auxExA: any = [];
    auxAndD: any = [];
    auxOrD: any = [];
    auxExD: any = [];
    auxAndE: any = [];
    auxOrE: any = [];
    auxExE: any = [];
    auxAndND: any = [];
    auxOrND: any = [];
    auxExND: any = [];
    auxAndFF: any = [];
    auxOrFF: any = [];
    auxExFF: any = [];
    categoriaGenero: any[];
    categoriaGenerosCheck: Array<any> = [];
    claseDeActuacion: Array<any> = [];
    fuentesFormales: any = [];
    fuentesFormalesCheck: any = [];
    procedencia: any = [];
    decision: any = [];
    delitos: any = [];
    auxTipoGaceta: any = [];
    auxTribunales: any = [];
    auxTribunalesCE: any = [];
    auxActosAdmin: any = [];
    servidoresPublicos: any[];
    minText: boolean = false;
    auxOrigen: any = [1];
    auxSubOrigen: any = [];
    auxSubOrigenID: any;
    auxTemaLength: number = 0;
    auxTemaLengthValidate: boolean = false;
    auxExtraOrigen: any = [];
    auxExtraOrigenAvanzado: any = [];
    servidores_publicos: any = '';
    tipoDelitos: any = [];
    tipoProcedencias: any = [];
    tipoTribunalAdministrativo: any = [];
    tipoTribunalSuperior: any = [];
    tipoTribunalSuperiorCheck: any = [];
    tipoFuentesFormales: any = [];
    tipoFuentesFormalesTemp: any = [];
    tipoActos: any = [];
    tipoClaseActuacion: any = [];
    salvamento: any = [];
    fuenteBiblioteca: any = [];
    magistradoSalvamento: any = [];
    auxDateHastaValidate: boolean;
    auxDateDesdeValidate: boolean;
    auxpublicacion: number;
    auxNoDataFilterText: any = "La búsqueda no trajo resultados.";
    auxFuenteFormal: string;
    auxFilteredItems: any;
    auxtIems: any;
    origenBibliotecaRed: any = [];
    origenFunteOficialNormativa: any = [];
    meses: any = [];
    jurisprudencias: boolean = false;
    flagAllVideoteca: boolean = false;
    flagIncExButtoms: boolean = true;
    flagActos_1: boolean = false;
    flagActos_2: boolean = false;
    flagActos_3: boolean = false;
    flagActos_4: boolean = false;
    flagActos_5: boolean = false;
    flagActos_6: boolean = false;
    flagActos_7: boolean = false;
    flagTribunales_1: boolean = false;
    flagTribunales_2: boolean = false;
    flagTribunales_3: boolean = false;
    auxHolocausto: number;
    APLength:number = 0;
    errorInput:boolean = false;
    anioPubActosAdmin: any = [];
    flagMin:boolean = false;
    flagMax:boolean = false;
    anio_actual:number;
    temaTres6:  Array<any> = [];
    temaTres8:  Array<any> = [];
    temasSendJson: Array<any> = []; 
    tituloSendJason: any;
    temaSendJson: any;
    annoSendJson: any;
    fuenteFormalSendJson: any;
    flagIncExButtomsND: boolean = true; flagIncExButtomsE: boolean = true; flagIncExButtomsFF: boolean = true; grupoCriterioFF: Array<number> = []; grupoCriterioE: Array<number> = []; grupoCriterioND: Array<number> = [];
    flagIncExButtomsT: boolean = true; flagIncExButtomsPR: boolean = true; flagIncExButtomsJR: boolean = true; flagIncExButtomsC: boolean = true; flagIncExButtomsA: boolean = true; flagIncExButtomsD: boolean = true
    grupoCriterio: Array<any> = []; grupoCriterioT: Array<number> = []; grupoCriterioPR: Array<number> = []; grupoCriterioJR: Array<number> = []; grupoCriterioC: Array<number> = []; grupoCriterioA: Array<number> = []; grupoCriterioD: Array<number> = [];
    flagMoreAnd1: boolean = false; flagMoreOr1: boolean = false; flagMoreEx1: boolean = false; flagMoreAnd2: boolean = false; flagMoreOr2: boolean = false; flagMoreEx2: boolean = false; flagMoreAnd3: boolean = false; flagMoreOr3: boolean = false; flagMoreEx3: boolean = false;
    flagMoreAnd4: boolean = false; flagMoreOr4: boolean = false; flagMoreEx4: boolean = false; flagMoreAnd5: boolean = false; flagMoreOr5: boolean = false; flagMoreEx5: boolean = false; flagMoreAnd6: boolean = false; flagMoreOr6: boolean = false; flagMoreEx6: boolean = false;
    flagMoreAnd7: boolean = false; flagMoreOr7: boolean = false; flagMoreEx7: boolean = false; flagMoreAnd8: boolean = false; flagMoreOr8: boolean = false; flagMoreEx8: boolean = false; flagMoreAnd9: boolean = false; flagMoreOr9: boolean = false; flagMoreEx9: boolean = false;

    flagMoreAndT: boolean = false; flagMoreOrT: boolean = false; flagMoreExT: boolean = false; flagMoreAnd1T: boolean = false; flagMoreOr1T: boolean = false; flagMoreEx1T: boolean = false;
    flagMoreAnd2T: boolean = false; flagMoreOr2T: boolean = false; flagMoreEx2T: boolean = false; flagMoreAnd3T: boolean = false; flagMoreOr3T: boolean = false; flagMoreEx3T: boolean = false;
    flagMoreAnd4T: boolean = false; flagMoreOr4T: boolean = false; flagMoreEx4T: boolean = false; flagMoreAnd5T: boolean = false; flagMoreOr5T: boolean = false; flagMoreEx5T: boolean = false;
    flagMoreAnd6T: boolean = false; flagMoreOr6T: boolean = false; flagMoreEx6T: boolean = false; flagMoreAnd7T: boolean = false; flagMoreOr7T: boolean = false; flagMoreEx7T: boolean = false;
    flagMoreAnd8T: boolean = false; flagMoreOr8T: boolean = false; flagMoreEx8T: boolean = false; flagMoreAnd9T: boolean = false; flagMoreOr9T: boolean = false; flagMoreEx9T: boolean = false;

    flagMoreAndPR: boolean = false; flagMoreOrPR: boolean = false; flagMoreExPR: boolean = false; flagMoreAnd1PR: boolean = false; flagMoreOr1PR: boolean = false; flagMoreEx1PR: boolean = false;
    flagMoreAnd2PR: boolean = false; flagMoreOr2PR: boolean = false; flagMoreEx2PR: boolean = false; flagMoreAnd3PR: boolean = false; flagMoreOr3PR: boolean = false; flagMoreEx3PR: boolean = false;
    flagMoreAnd4PR: boolean = false; flagMoreOr4PR: boolean = false; flagMoreEx4PR: boolean = false; flagMoreAnd5PR: boolean = false; flagMoreOr5PR: boolean = false; flagMoreEx5PR: boolean = false;
    flagMoreAnd6PR: boolean = false; flagMoreOr6PR: boolean = false; flagMoreEx6PR: boolean = false; flagMoreAnd7PR: boolean = false; flagMoreOr7PR: boolean = false; flagMoreEx7PR: boolean = false;
    flagMoreAnd8PR: boolean = false; flagMoreOr8PR: boolean = false; flagMoreEx8PR: boolean = false; flagMoreAnd9PR: boolean = false; flagMoreOr9PR: boolean = false; flagMoreEx9PR: boolean = false;

    flagMoreAndJR: boolean = false; flagMoreOrJR: boolean = false; flagMoreExJR: boolean = false;; flagMoreAnd1JR: boolean = false; flagMoreOr1JR: boolean = false; flagMoreEx1JR: boolean = false;
    flagMoreAnd2JR: boolean = false; flagMoreOr2JR: boolean = false; flagMoreEx2JR: boolean = false; flagMoreAnd3JR: boolean = false; flagMoreOr3JR: boolean = false; flagMoreEx3JR: boolean = false;
    flagMoreAnd4JR: boolean = false; flagMoreOr4JR: boolean = false; flagMoreEx4JR: boolean = false; flagMoreAnd5JR: boolean = false; flagMoreOr5JR: boolean = false; flagMoreEx5JR: boolean = false;
    flagMoreAnd6JR: boolean = false; flagMoreOr6JR: boolean = false; flagMoreEx6JR: boolean = false; flagMoreAnd7JR: boolean = false; flagMoreOr7JR: boolean = false; flagMoreEx7JR: boolean = false;
    flagMoreAnd8JR: boolean = false; flagMoreOr8JR: boolean = false; flagMoreEx8JR: boolean = false; flagMoreAnd9JR: boolean = false; flagMoreOr9JR: boolean = false; flagMoreEx9JR: boolean = false;

    flagMoreAndC: boolean = false; flagMoreOrC: boolean = false; flagMoreExC: boolean = false; flagMoreAnd1C: boolean = false; flagMoreOr1C: boolean = false; flagMoreEx1C: boolean = false;
    flagMoreAnd2C: boolean = false; flagMoreOr2C: boolean = false; flagMoreEx2C: boolean = false; flagMoreAnd3C: boolean = false; flagMoreOr3C: boolean = false; flagMoreEx3C: boolean = false;
    flagMoreAnd4C: boolean = false; flagMoreOr4C: boolean = false; flagMoreEx4C: boolean = false; flagMoreAnd5C: boolean = false; flagMoreOr5C: boolean = false; flagMoreEx5C: boolean = false;
    flagMoreAnd6C: boolean = false; flagMoreOr6C: boolean = false; flagMoreEx6C: boolean = false; flagMoreAnd7C: boolean = false; flagMoreOr7C: boolean = false; flagMoreEx7C: boolean = false;
    flagMoreAnd8C: boolean = false; flagMoreOr8C: boolean = false; flagMoreEx8C: boolean = false; flagMoreAnd9C: boolean = false; flagMoreOr9C: boolean = false; flagMoreEx9C: boolean = false;

    flagMoreAndA: boolean = false; flagMoreOrA: boolean = false; flagMoreExA: boolean = false; flagMoreAnd1A: boolean = false; flagMoreOr1A: boolean = false; flagMoreEx1A: boolean = false;
    flagMoreAnd2A: boolean = false; flagMoreOr2A: boolean = false; flagMoreEx2A: boolean = false; flagMoreAnd3A: boolean = false; flagMoreOr3A: boolean = false; flagMoreEx3A: boolean = false;
    flagMoreAnd4A: boolean = false; flagMoreOr4A: boolean = false; flagMoreEx4A: boolean = false; flagMoreAnd5A: boolean = false; flagMoreOr5A: boolean = false; flagMoreEx5A: boolean = false;
    flagMoreAnd6A: boolean = false; flagMoreOr6A: boolean = false; flagMoreEx6A: boolean = false; flagMoreAnd7A: boolean = false; flagMoreOr7A: boolean = false; flagMoreEx7A: boolean = false;
    flagMoreAnd8A: boolean = false; flagMoreOr8A: boolean = false; flagMoreEx8A: boolean = false; flagMoreAnd9A: boolean = false; flagMoreOr9A: boolean = false; flagMoreEx9A: boolean = false;

    flagMoreAndD: boolean = false; flagMoreOrD: boolean = false; flagMoreExD: boolean = false; flagMoreAnd1D: boolean = false; flagMoreOr1D: boolean = false; flagMoreEx1D: boolean = false;
    flagMoreAnd2D: boolean = false; flagMoreOr2D: boolean = false; flagMoreEx2D: boolean = false; flagMoreAnd3D: boolean = false; flagMoreOr3D: boolean = false; flagMoreEx3D: boolean = false;
    flagMoreAnd4D: boolean = false; flagMoreOr4D: boolean = false; flagMoreEx4D: boolean = false; flagMoreAnd5D: boolean = false; flagMoreOr5D: boolean = false; flagMoreEx5D: boolean = false;
    flagMoreAnd6D: boolean = false; flagMoreOr6D: boolean = false; flagMoreEx6D: boolean = false; flagMoreAnd7D: boolean = false; flagMoreOr7D: boolean = false; flagMoreEx7D: boolean = false;
    flagMoreAnd8D: boolean = false; flagMoreOr8D: boolean = false; flagMoreEx8D: boolean = false; flagMoreAnd9D: boolean = false; flagMoreOr9D: boolean = false; flagMoreEx9D: boolean = false;

    flagMoreAndE: boolean = false; flagMoreOrE: boolean = false; flagMoreExE: boolean = false; flagMoreAnd1E: boolean = false; flagMoreOr1E: boolean = false; flagMoreEx1E: boolean = false;
    flagMoreAnd2E: boolean = false; flagMoreOr2E: boolean = false; flagMoreEx2E: boolean = false; flagMoreAnd3E: boolean = false; flagMoreOr3E: boolean = false; flagMoreEx3E: boolean = false;
    flagMoreAnd4E: boolean = false; flagMoreOr4E: boolean = false; flagMoreEx4E: boolean = false; flagMoreAnd5E: boolean = false; flagMoreOr5E: boolean = false; flagMoreEx5E: boolean = false;
    flagMoreAnd6E: boolean = false; flagMoreOr6E: boolean = false; flagMoreEx6E: boolean = false; flagMoreAnd7E: boolean = false; flagMoreOr7E: boolean = false; flagMoreEx7E: boolean = false;
    flagMoreAnd8E: boolean = false; flagMoreOr8E: boolean = false; flagMoreEx8E: boolean = false; flagMoreAnd9E: boolean = false; flagMoreOr9E: boolean = false; flagMoreEx9E: boolean = false;

    flagMoreAndFF: boolean = false; flagMoreOrFF: boolean = false; flagMoreExFF: boolean = false; flagMoreAnd1FF: boolean = false; flagMoreOr1FF: boolean = false; flagMoreEx1FF: boolean = false;
    flagMoreAnd2FF: boolean = false; flagMoreOr2FF: boolean = false; flagMoreEx2FF: boolean = false; flagMoreAnd3FF: boolean = false; flagMoreOr3FF: boolean = false; flagMoreEx3FF: boolean = false;
    flagMoreAnd4FF: boolean = false; flagMoreOr4FF: boolean = false; flagMoreEx4FF: boolean = false; flagMoreAnd5FF: boolean = false; flagMoreOr5FF: boolean = false; flagMoreEx5FF: boolean = false;
    flagMoreAnd6FF: boolean = false; flagMoreOr6FF: boolean = false; flagMoreEx6FF: boolean = false; flagMoreAnd7FF: boolean = false; flagMoreOr7FF: boolean = false; flagMoreEx7FF: boolean = false;
    flagMoreAnd8FF: boolean = false; flagMoreOr8FF: boolean = false; flagMoreEx8FF: boolean = false; flagMoreAnd9FF: boolean = false; flagMoreOr9FF: boolean = false; flagMoreEx9FF: boolean = false;

    flagMoreAndND: boolean = false; flagMoreOrND: boolean = false; flagMoreExND: boolean = false; flagMoreAnd1ND: boolean = false; flagMoreOr1ND: boolean = false; flagMoreEx1ND: boolean = false;
    flagMoreAnd2ND: boolean = false; flagMoreOr2ND: boolean = false; flagMoreEx2ND: boolean = false; flagMoreAnd3ND: boolean = false; flagMoreOr3ND: boolean = false; flagMoreEx3ND: boolean = false;
    flagMoreAnd4ND: boolean = false; flagMoreOr4ND: boolean = false; flagMoreEx4ND: boolean = false; flagMoreAnd5ND: boolean = false; flagMoreOr5ND: boolean = false; flagMoreEx5ND: boolean = false;
    flagMoreAnd6ND: boolean = false; flagMoreOr6ND: boolean = false; flagMoreEx6ND: boolean = false; flagMoreAnd7ND: boolean = false; flagMoreOr7ND: boolean = false; flagMoreEx7ND: boolean = false;
    flagMoreAnd8ND: boolean = false; flagMoreOr8ND: boolean = false; flagMoreEx8ND: boolean = false; flagMoreAnd9ND: boolean = false; flagMoreOr9ND: boolean = false; flagMoreEx9ND: boolean = false;

    filter: FilterModel = new FilterModel();
    modalFuenteFormal: any;
    flagModal_ff: boolean = false;
    flagModalTemas: boolean = false;
    flagModalTemasVocabulario: boolean = false;
    flagModalTemasVocabularioDescriptoresNormativa: boolean = false;

    flagModalTemasVocabularioDescriptivo: boolean = false;
    flagModalTemasVocabularioDescriptivoNormativa: boolean = false;
    flagModalTemasVocabularioControlado15: boolean = false;
    flagModalTemasVocabulario6: boolean = false;
    flagModalTemasVocabulario8: boolean = false;
    flagModalDelitos: boolean = false;
    UrlRef: string = null;
    showComponents: string = "principal"
    findResult: any;
    querySearch: any;
    loginUser: boolean = false;
    authenticated_user: any = {
        refresh: '',
        access: '',
        roles: [],
        username: ''
    };
    historial_search: any;
    usuarioEditarSeleccionado: any;

    flagShowHistoricoBusqueda: boolean = false;
    historicoBusquedaList: Array<any> = [];

    public sub_origen: number[] = [];

    textoBusquedaLocalStorage: string = '';
    vocabularioControladoErrorType: string = '';
    ddTemaTresDescriptivo: any;
    ddTemaTresDescriptivoNormativa: any;
    ddTemaTresVocabularioControlado15: any;
    listParamEnabledArray: any;
    ddTemaTres8: any;
    cerrarSecion: boolean = false;
    criterioAux:string[] = [];
    criterioAuxT:string[] = [];
    criterioAuxA:string[] = [];
    criterioAuxC:string[] = [];
    criterioAuxD:string[] = [];
    criterioAuxJR:string[] = [];
    criterioAuxPR:string[] = [];
    completoYQueContenga = 0;
    completoOQueContenga = 0;
    completoQueExcluya = 0;
    completoYQueContengaT = 0;
    completoOQueContengaT = 0;
    completoQueExcluyaT = 0;
    completoYQueContengaA = 0;
    completoOQueContengaA = 0;
    completoQueExcluyaA = 0;
    completoYQueContengaC = 0;
    completoOQueContengaC = 0;
    completoQueExcluyaC = 0;
    completoYQueContengaD = 0;
    completoOQueContengaD = 0;
    completoQueExcluyaD = 0;
    completoYQueContengaJR = 0;
    completoOQueContengaJR = 0;
    completoQueExcluyaJR = 0;
    completoYQueContengaPR = 0;
    completoOQueContengaPR = 0;
    completoQueExcluyaPR = 0;
    numeroFuenteFormal:string = '';
    anioFuenteFormal:string = '';
    articuloFuenteFormal:string = '';
    incisoFuenteFormal:string = '';
    literalFuenteFormal:string = '';
    numeralFuenteFormal:string = '';
    paragrafoFuenteFormal:string = '';
    parrafoFuenteFormal:string = '';
    domain:string = '';
    domainLogAudit:any = '';
    domainDashboard:any = '';

    constructor(
        @Inject(DOCUMENT) document: any,
        private elasticService: ElasticService,
        public formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        private sanitized: DomSanitizer) { }

    ngOnInit() {

        var UrlRefTmp = document.location.href?.split("?");

        if(1 in UrlRefTmp){
          UrlRefTmp = UrlRefTmp[1]?.split("=");
          this.urlRef = UrlRefTmp[1]?.toUpperCase();
    
        }
        else{
        }
    

        this.recaptchaValidation = (sessionStorage.getItem('recaptchaValidation_'+this.urlRef) == "true" );

        this.elasticService.getDomain().subscribe(domain => {
            this.domain = domain.elastic_dashboard;
            this.domainLogAudit = `${this.domain}app/dashboards?auth_provider_hint=anonymous1#/view/40a1d840-4459-11ed-a698-492c314d42ba?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-1h,to:now))&show-time-filter=true&hide-filter-bar=true`;
            this.domainDashboard = `${this.domain}app/dashboards?auth_provider_hint=anonymous1#/view/13e22050-4aa1-11ed-a538-719e27d0c1d0?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-1h,to:now))&show-time-filter=true&hide-filter-bar=true`;
            console.log(this.domainLogAudit);
            console.log(this.domainDashboard);
        });

        this.cargarListParamEnabled();
        interface  IParamFilter{
            [index: string]: string;
        }
        this.listParamEnabledArray = {} as IParamFilter;
    
        if(sessionStorage.getItem('token') && sessionStorage.getItem('usuario')){
            this.authenticated_user = JSON.parse(sessionStorage.getItem('usuario'));
        }

        this.generalForm = this.formBuilder.group({
            searchText: [''],
            selectedItems: [[{ id: 6, texto: "Corte Suprema de Justicia" }]],
            selectedItemsCE: [[{ id: 8, texto: "Consejo de Estado" }]],
            consejoDeEstado: 'Consejo de Estado',
            selectedItemsCC: [[{ id: 7, texto: "Corte Constitucional" }]],
            selectedItemsCNDJ: [[{ id: 9, texto: "Comisión Nacional de Disciplina Judicial" }]],
            selectedItemsJurisGenero: [],
            selectedItemsBiblioteca: [],
            selectedItemsMeses: [''],
            selectedItemsInfoHolocausto: [],
            selectedItemsTribunales: [],
            selectedItemsInfoVideoteca: [],
            selectedItemsTipoGaceta: [],
            selectedItemsSeccion: [],
            selectedItemsInfo: [],
            selectedItemsTipoNorma: [],
            selectedItemsActos: [],
            selectedItemsOrigenVideoteca: [],
            selectedItemsOrigenBibliotecas: [],
            selectedItemsBibliotecaRedLYMA: [],
            selectedItemsTipoMaterialLYMA: [],
            InputTituloLYMA: [],
            InputAutorCorpLYMA: [],
            AnioPubActosAdmin: [],
            InputAñoPubLYMA: [],
            InputSerieLYMA: [],
            InputISBNLYMA: [],
            InputNumeroTopograficoLYMA: [],
            InputExtracto: [],
            InputCodigoSistemaLYMA: [],
            tipoDeMaterial: [],
            InputISNNRevistas: [],
            InputEditorialRevistas: [],
            InputTituloAnaliticaRevistas: [],
            InputDescriptoresAnaliticaRevistas: [],
            InputAutoresAnaliticaRevistas: [],
            InputTemaAnaliticaRevistas: [],
            InputNumeroNormaNormativa: [],
            InputNumeroRadicacion: [],
            dateExp: [''],
            datePub: [''],
            InputAñoNormativa: '',
            InputMesNormativa: [],
            InputDescriptoresNormativa: [],
            InputNumeroFuenteOficialNormativa: [],
            chkJurisprudencia: true,
            chkVideotecaCNSJ: false,
            chkBibliotecaCNSJ: false,
            chkHolocaustoCNSJ: false,
            chkActosAdministrativos: false,
            origen: [[1]],
            subOrigen: [6],
            extraOrigen: [''],
            ddlAltasCortes: ['Corte Suprema de Justicia'],
            ddAltasCortesCE: ['Consejo de Estado'],
            ddEstado: [''],
            ddMeses: [''],
            chkSoloGacetas: false,
            chkSoloGacetasAvanzado: [false],
            chkBoletinesJurisprudenciales: false,
            ddTipoActo: [''],
            ddTribunales: [''],
            ddtribunalesCE: [],
            ddCorporaciones: [''],
            chkComisionGenero: false,
            ddSeccion: [''],
            ddTipoNorma: [],
            ddlFuenteInformacion: [''],
            ddlFuenteNorma: [''],
            ddlTipoInformacion: [''],
            textoBusqueda: [''],
            TipoGaceta: [],
            InputNombreGaceta: [''],
            InputContenidoGaceta: [''],
            añoDesdeGaceta: 1886,
            GacetasFechaDesde: '',
            GacetasFechaHasta: '',
            añoHastaGaceta: 2022,
            GmodalChangeTemasVocabulario6acetasFechaHasta: '',
            busquedaAvanzada: [false],
            InputTema: '',
            InputTema16: '',
            InputTema15: '',
            InputTema17: '',
            InputTema15Descrip: [''],
            InputTema6:'',
            InputTema8:[''],
            ddTemas: [''],
            ddPonencia: [''],
            ddEntidadGeneradora: [''],
            ddFuenteOficial: [''],
            InputFuenteFormal: '',
            InputConcideraciones: [''],
            InputAsunto: [''],
            InputParteResolutiva: [''],
            InputDecision: [''],
            InputServidorPublico: '',
            InputClaseDeActuacion: [],
            ddClaseActuacion: [],
            InputDemandante: '',
            InputDemandado: '',
            InputNormaDemandada: '',
            InputProcedencia: [''],
            ActosAdmin: '',
            AnnoActosAdmin: '',
            AñoPubActosAdmin: '',
            IdActosAdmin: '',
            EdicionActosAdmin: '',
            VolumenActosAdmin: '',
            NoTrimestreActosAdmin: '',
            AñoGacetaActosAdmin: '',
            RegxPagActosAdmin: '',
            EsTrimestralActosAdmin: '',
            ddTipoActos: [''],
            ddSalas: [''],
            ddTipoSalas: [''],
            chkAsuntoSala: [false],
            chkTutelas: [false],
            chkRelevantes: [false],
            dateDesde: [''],
            dateHasta: [''],
            InputNroProceso: "",
            InputSustentoNormativo: "",
            InputNroBoletin: "",
            ddTipoNroProvidencia: [''],
            InputNroProvidencia: "",
            InputID: "",
            ddFuentesFormales: [''],
            InputJurisprudenciaRelacionada: '',
            InputDelitos: '',
            ddProcedencia: [''],
            ddDelitos: '',
            ddCategoriaGenero: '',
            ddSalvamento: '',
            ddDecision: '',
            ddMagistradoSalvamento: '',
            ddTribunalAdministrativo: '', 
            ddTemaTres: [''],
            InputSujetosProcesales: [''],
            InputSubseccion: [''],
            InputSeccion: [''],
            InputTesis: [''],
            InputNoActa: [''],
            ddServidoresPublicos: [''],
            InputObsrvaciones: [''],
            InputCategoriaGenero: [''],
            InputCategoriaDecision: [''],
            InputRegVideoteca: '',
            InputJurisdiccionVideoteca: '',
            InputAutorVideoteca: '',
            InputAñoVideoteca: '',
            InputTituloVideoteca: '',
            InputTituloHolocausto: '',
            InputTemaHolocausto: '',
            InputNotaRelatoria: '',
            chkTieneSalvamento: '',
            InputSalvamento: '',
            InputMagistrado: '',
            chkGenero: '',
            InputSearchFuenteFormal: [''],
            ff_numero: '',
            ff_anio: '',
            ff_articulo: '',
            ff_inciso: '',
            ff_literal: '',
            ff_numeral: '',
            ff_paragrafo: '',
            ff_parrafo: '',
            mesFuenteOficial: '',
            fuenteoficial:'',
            textoCriterio1: '', textoCriterio2: '', textoCriterio3: '', textoCriterio4: '', textoCriterio5: '', textoCriterio6: '', textoCriterio7: '', textoCriterio8: '', textoCriterio9: '',
            textoAux1: '', textoAux2: '', textoAux3: '', textoAux4: '', textoAux5: '', textoAux6: '', textoAux7: '', textoAux8: '', textoAux9: '',
            textoYContenga: '', textoOContenga: '', textoExcluya: '',
            textoCriterio1T: '', textoCriterio2T: '', textoCriterio3T: '', textoCriterio4T: '', textoCriterio5T: '', textoCriterio6T: '', textoCriterio7T: '', textoCriterio8T: '', textoCriterio9T: '',
            textoAux1T: '', textoAux2T: '', textoAux3T: '', textoAux4T: '', textoAux5T: '', textoAux6T: '', textoAux7T: '', textoAux8T: '', textoAux9T: '',
            textoYContengaT: '', textoOContengaT: '', textoExcluyaT: '',
            textoCriterio1PR: '', textoCriterio2PR: '', textoCriterio3PR: '', textoCriterio4PR: '', textoCriterio5PR: '', textoCriterio6PR: '', textoCriterio7PR: '', textoCriterio8PR: '', textoCriterio9PR: '',
            textoAux1PR: '', textoAux2PR: '', textoAux3PR: '', textoAux4PR: '', textoAux5PR: '', textoAux6PR: '', textoAux7PR: '', textoAux8PR: '', textoAux9PR: '',
            textoYContengaPR: '', textoOContengaPR: '', textoExcluyaPR: '',
            textoCriterio1JR: '', textoCriterio2JR: '', textoCriterio3JR: '', textoCriterio4JR: '', textoCriterio5JR: '', textoCriterio6JR: '', textoCriterio7JR: '', textoCriterio8JR: '', textoCriterio9JR: '',
            textoAux1JR: '', textoAux2JR: '', textoAux3JR: '', textoAux4JR: '', textoAux5JR: '', textoAux6JR: '', textoAux7JR: '', textoAux8JR: '', textoAux9JR: '',
            textoYContengaJR: '', textoOContengaJR: '', textoExcluyaJR: '',
            textoCriterio1C: '', textoCriterio2C: '', textoCriterio3C: '', textoCriterio4C: '', textoCriterio5C: '', textoCriterio6C: '', textoCriterio7C: '', textoCriterio8C: '', textoCriterio9C: '',
            textoAux1C: '', textoAux2C: '', textoAux3C: '', textoAux4C: '', textoAux5C: '', textoAux6C: '', textoAux7C: '', textoAux8C: '', textoAux9C: '',
            textoYContengaC: '', textoOContengaC: '', textoExcluyaC: '',
            textoCriterio1A: '', textoCriterio2A: '', textoCriterio3A: '', textoCriterio4A: '', textoCriterio5A: '', textoCriterio6A: '', textoCriterio7A: '', textoCriterio8A: '', textoCriterio9A: '',
            textoAux1A: '', textoAux2A: '', textoAux3A: '', textoAux4A: '', textoAux5A: '', textoAux6A: '', textoAux7A: '', textoAux8A: '', textoAux9A: '',
            textoYContengaA: '', textoOContengaA: '', textoExcluyaA: '',
            textoCriterio1D: '', textoCriterio2D: '', textoCriterio3D: '', textoCriterio4D: '', textoCriterio5D: '', textoCriterio6D: '', textoCriterio7D: '', textoCriterio8D: '', textoCriterio9D: '',
            textoAux1D: '', textoAux2D: '', textoAux3D: '', textoAux4D: '', textoAux5D: '', textoAux6D: '', textoAux7D: '', textoAux8D: '', textoAux9D: '',
            textoYContengaD: '', textoOContengaD: '', textoExcluyaD: '',
            textoCriterio1E: '', textoCriterio2E: '', textoCriterio3E: '', textoCriterio4E: '', textoCriterio5E: '', textoCriterio6E: '', textoCriterio7E: '', textoCriterio8E: '', textoCriterio9E: '',
            textoAux1E: '', textoAux2E: '', textoAux3E: '', textoAux4E: '', textoAux5E: '', textoAux6E: '', textoAux7E: '', textoAux8E: '', textoAux9E: '',
            textoYContengaE: '', textoOContengaE: '', textoExcluyaE: '',
            textoCriterio1FF: '', textoCriterio2FF: '', textoCriterio3FF: '', textoCriterio4FF: '', textoCriterio5FF: '', textoCriterio6FF: '', textoCriterio7FF: '', textoCriterio8FF: '', textoCriterio9FF: '',
            textoAux1FF: '', textoAux2FF: '', textoAux3FF: '', textoAux4FF: '', textoAux5FF: '', textoAux6FF: '', textoAux7FF: '', textoAux8FF: '', textoAux9FF: '',
            textoYContengaFF: '', textoOContengaFF: '', textoExcluyaFF: '',
            textoCriterio1ND: '', textoCriterio2ND: '', textoCriterio3ND: '', textoCriterio4ND: '', textoCriterio5ND: '', textoCriterio6ND: '', textoCriterio7ND: '', textoCriterio8ND: '', textoCriterio9ND: '',
            textoAux1ND: '', textoAux2ND: '', textoAux3ND: '', textoAux4ND: '', textoAux5ND: '', textoAux6ND: '', textoAux7ND: '', textoAux8ND: '', textoAux9ND: '',
            textoYContengaND: '', textoOContengaND: '', textoExcluyaND: '',
            sub_origen_id_1: 6, sub_origen_id_2: '', sub_origen_id_3: '', sub_origen_id_4: '', sub_origen_id_5: '', sub_origen_id_21: '', sub_origen_id_6: '', sub_origen_id_7: '', sub_origen_id_8: '', sub_origen_id_9: '', sub_origen_id_10: '',
            sub_origen_id_11: '', sub_origen_id_12: '', sub_origen_id_13: '', sub_origen_id_14: '', sub_origen_id_15: '', sub_origen_id_16: '', sub_origen_id_17: '', sub_origen_id_18: '', sub_origen_id_19: '', sub_origen_id_20: '', sub_origen_id_22: '',
            sub_origen_id_23: '', sub_origen_id_24: '', sub_origen_id_25: '',
            InputHechosProvidecia: '',
            InputProblemaJuridicoText: '',
            InputNombrePredio: '',
            InputCedulaCastastral: '',
            InputMatriculaInmobiliaria: '',
            InputDepartamentoInmueble: '',
            selectedItemsDepartamentoInmueble: [],
            selectedItemsCiudadInmueble: [],
            selectedItemsMunicipioInmueble: [],
            selectedItemsCorregimientoInmueble: [],
            selectedItemsVeredaInmueble: [],
            selectedItemsBarrioInmueble: [],
            InputDireccionInmueble: '',
            selectedItemsTribunalSuperior: [],
            selectedItemsTribunalDespacho: [],
            selectedItemsTribunalAdministrativo: [],
            ddSalaConocimiento: [''],
            ddNaturalezaProceso: [''],
            ddAspectosRelevantes: [''],
            ddTemaTresDescriptivo: '',
            ddTemaTresDescriptivoNormativa: [''],
            ddTemaTresDescriptoresNormativa: [''],
            ddTemaTresVocabularioControlado15: [''],
            ddTemaTres6: [''],
            ddTemaTres8: [''],
            InputTraductorLYMA: '',
            numero_bol: '',
            anno: '',
            mes: [''],

        })

        this.generalForm.patchValue({
            sub_origen_id_1: 6
        })
        this.generalForm.get("ddtribunalesCE").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddtribunalesCE')?.value.length > 0) {
                this.flagTribunales_1 = true;
            } else {
                this.flagTribunales_1 = false;
            }
        })
        this.generalForm.get("chkComisionGenero").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('chkJurisprudencia')?.value == true && this.generalForm.get('chkComisionGenero')?.value == true) {
                this.jurisprudencias = true;
            } else {
                this.jurisprudencias = false;
            }
        })
        this.generalForm.get("chkJurisprudencia").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('chkJurisprudencia')?.value == true && this.generalForm.get('chkComisionGenero')?.value == true) {
                this.jurisprudencias = true;
            } else {
                this.jurisprudencias = false;
            }
        })
        this.generalForm.get("selectedItemsInfoVideoteca").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get("selectedItemsInfoVideoteca")?.value.length == 0 || this.generalForm.get("selectedItemsInfoVideoteca")?.value.length > 1) {
                this.flagAllVideoteca = true;
            } else {
                this.flagAllVideoteca = false;
            }
        })

        this.dropdownSettings = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'texto',
            allowSearchFilter: false,
            maxHeight: 180,
        };
        this.dropdownSettingsEntidadGeneradora = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            allowSearchFilter: false,
            maxHeight: 180,
        };

        this.dropdownSettingsFuenteOrigen = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'texto',
            allowSearchFilter: false,
            maxHeight: 180,
        };



        this.dropdownSettingsMeses = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            allowSearchFilter: false,
            maxHeight: 180,
            selectAllText: "Seleccionar todo",
            unSelectAllText: "Deseleccionar todo",
        };

        this.dropdownSettingsMesesFuenteOficial = {
            singleSelection: true,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            allowSearchFilter: false,
            maxHeight: 180
        };

        this.dropdownSettingsTipoMaterial = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            allowSearchFilter: false,
            maxHeight: 180,
            selectAllText: "Seleccionar todo",
            unSelectAllText: "Deseleccionar todo",
        };
        this.dropdownSettingsOrigenVideoteca = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'texto',
            allowSearchFilter: false,
            maxHeight: 180,
        };
        this.dropdownSettingsTribunales = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'texto',
            allowSearchFilter: false,
            maxHeight: 180,
        };
        this.dropdownSettingsTipoGaceta = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'texto',
            allowSearchFilter: false,
            maxHeight: 180,
        };
        this.dropdownSettingsTipoNorma = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            noDataLabel: "La búsqueda no trajo resultados",
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 180,
        };
        this.dropdownSettingsCorporaciones = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            noDataLabel: "La búsqueda no trajo resultados",
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 180,
        };
        this.dropdownSettingsBibliotecaRed = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            allowSearchFilter: true,
            maxHeight: 180,
        };
        this.dropdownSettingsEstado = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            noDataLabel: "La búsqueda no trajo resultados",
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 180,
        };
        this.dropdownSettingsSeccion = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            noDataLabel: "La búsqueda no trajo resultados",
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 180,
        };
        this.dropdownSettingsInfoHolocausto = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'texto',
            allowSearchFilter: false,
            maxHeight: 180,
        };
        this.dropdownSettingsInfoVideoteca = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",

            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'texto',
            allowSearchFilter: false,
            maxHeight: 180,
        };
        this.dropdownSettingsInfo = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'texto',
            allowSearchFilter: false,
            maxHeight: 180,
        };
        this.dropdownSettingsTemas = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 350,
        };
        this.dropdownSettingsTemaTres = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 350,
        };

        this.dropdownSettingsTemaTres6 = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 350,
        };

        this.dropdownSettingsTemaTres8 = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 350,
        };

        this.dropdownSettingsBiblioteca = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'texto',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: false,
            maxHeight: 180,
        };
        this.dropdownSettingsTipoProvidencia = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 180,
        };
        this.dropdownSettingsSingle = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 180,
        };
        this.dropdownSettingsPonente = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            noDataLabel: "La búsqueda no trajo resultados",
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 180,
        };
        this.dropdownSettingsSalaConocimiento = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            noDataLabel: "La búsqueda no trajo resultados",
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 180,
        };
        this.dropdownSettingsNaturalezaProceso = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            noDataLabel: "La búsqueda no trajo resultados",
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 180,
        };
        this.dropdownSettingsAspectosRelevantes = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            noDataLabel: "La búsqueda no trajo resultados",
            idField: 'id',
            textField: 'texto',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 180,
        };
        this.dropdownSettingsDecision = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 180,
        };
        this.dropdownSettingsCategoriaGenero = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 180,
        };
        this.dropdownSettingsSalas = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 180,
        };
        this.dropdownSettingsActos = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'texto',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: false,
            maxHeight: 180,
        };
        this.dropdownSettingsTipoSala = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 180,
        };
        this.dropdownSettingsTipoProcedencia = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 180,
        };
        this.dropdownSettingsClaseActuacion = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 180,
        };
        this.dropdownSettingsDelitos = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 350,
        };
        this.dropdownSettingsMagistrado = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 180,
        };
        this.dropdownSettingsDepartamentoInmueble = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'texto',
            allowSearchFilter: false,
            maxHeight: 180,
        }
        this.dropdownSettingsCiudadInmueble = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'texto',
            allowSearchFilter: false,
            maxHeight: 180,
        }
        this.dropdownSettingsMunicipioInmueble = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'texto',
            allowSearchFilter: false,
            maxHeight: 180,
        }
        this.dropdownSettingsCorregimientoInmueble = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'texto',
            allowSearchFilter: false,
            maxHeight: 180,
        }
        this.dropdownSettingsVeredaInmueble = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'texto',
            allowSearchFilter: false,
            maxHeight: 180,
        }
        this.dropdownSettingsBarrioInmueble = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'texto',
            allowSearchFilter: false,
            maxHeight: 180,
        }
        this.dropdownSettingsTribunalSuperior = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            allowSearchFilter: false,
            maxHeight: 180,
        }
        this.dropdownSettingsTribunalAdministrativo = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            allowSearchFilter: false,
            maxHeight: 180,
        }
        this.dropdownSettingsTribunalDespacho = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            allowSearchFilter: false,
            maxHeight: 180,
        }
        this.dropdownSettingsTemaTresDescriptivo = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 350,
        };
        this.dropdownSettingsTemaTresVocabularioControlado15 = {
            singleSelection: false,
            noFilteredDataAvailablePlaceholderText: this.auxNoDataFilterText,
            noDataAvailablePlaceholderText: "Datos no disponibles",
            searchPlaceholderText: 'Buscar',
            idField: 'id',
            textField: 'value',
            selectAllText: 'Todos',
            unSelectAllText: 'Ninguno',
            allowSearchFilter: true,
            maxHeight: 350,
        };

        //this.limitesOpLogicos();
        this.concatFechas(); this.onDeSelectAllActos(); this.onDeSelectAllSeccion(); this.onDeSelectAllTribunales(); this.onDeSelectAllTipoGaceta(); this.controlOrigenes();
        this.onDeSelectAllEstado(); this.onDeSelectAllBiblioteca(); this.onDeSelectAllHolocausto(); this.onDeSelectAllVideoteca(); this.onDeSelectAllInfo(); this.onDeSelectAll(); this.onDeSelectAllDelitos(); 
        this.onDeSelectAllCategoriaGenero(); this.onDeSelectAllTipoSalas(); this.onDeSelectAllSalas(); this.onDeSelectAllTipoProvidencia(); this.onDeSelectAllMeses(); this.onDeSelectAllCorporaciones();
        this.onDeSelectAllEstado(); this.onDeSelectAllTribunalDespacho(); this.onDeSelectAllTribunalAdministrativo(); this.onDeSelectAllTribunalSuperior(); this.onDeSelectAllBarrioInmueble(); 
        this.onDeSelectAllVeredaInmueble(); this.onDeSelectAllCorregimientoInmueble(); this.onDeSelectAllMunicipioInmueble(); this.onDeSelectAllCiudadInmueble(); this.onDeSelectAllDepartamentoInmueble(); 
        this.onDeSelectAllOrigen(); this.onDeSelectAllBibliotecaRed(); this.onDeSelectAllTipoNorma(); this.onDeSelectAllTipoProcedencia(); this.onDeSelectAllPonente(); this.onDeSelectAllDecision(); 
        this.onDeSelectAllClaseActuacion(); this.onDeSelectAllTipoProcedencia(); this.origenCE(); this.assignCopy(); this.cargarOrigenBiblioteca(); this.validacionBotonBuscar();
        this.showIncExButtoms(); this.showIncExButtomsT(); this.showIncExButtomsPR(); this.showIncExButtomsJR(); this.showIncExButtomsC(); this.showIncExButtomsA(); this.showIncExButtomsD(); 

        this.onDeSelectAllFuenteOrigen(); this.onDeSelectAllTemas();
        this.onDeSelectAllSalaConocimiento();

        if (document.location.href == "http://localhost:4200/?p=CNSJ" || document.location.href == "https://csjprifront-pre.azurewebsites.net/?p=CNSJ") {
            this.UrlRef = "CNSJ"
        }
        else if (document.location.href == "http://localhost:4200/?p=CE" || document.location.href == "https://csjprifront-pre.azurewebsites.net/?p=CE") {
            this.UrlRef = "CE"
        }
        else if (document.location.href == "http://localhost:4200/?p=CC" || document.location.href == "https://csjprifront-pre.azurewebsites.net/?p=CC") {
            this.UrlRef = "CC"
        }
        else if (document.location.href == "http://localhost:4200" || document.location.href == "https://csjprifront-pre.azurewebsites.net") {
            this.UrlRef = "CSSJ"
        }
        else if (document.location.href == "http://localhost:4200/?p=CNDJ" || document.location.href == "https://csjprifront-pre.azurewebsites.net/?p=CNDJ") {
            this.UrlRef = "CNDJ"
        }
        if (document.location.href == "https://csj-apigatewayfront.azurewebsites.net/?p=CNSJ" || document.location.href == "https://csjprifront-pre.azurewebsites.net/?p=CNSJ") {
            this.UrlRef = "CNSJ"
        }
        else if (document.location.href == "https://csj-apigatewayfront.azurewebsites.net/?p=CE" || document.location.href == "https://csjprifront-pre.azurewebsites.net/?p=CE") {
            this.UrlRef = "CE"
        }
        else if (document.location.href == "https://csj-apigatewayfront.azurewebsites.net/?p=CC" || document.location.href == "https://csjprifront-pre.azurewebsites.net/?p=CC") {
            this.UrlRef = "CC"
        }
        else if (document.location.href == "https://csj-apigatewayfront.azurewebsites.net/?p=CNDJ" || document.location.href == "https://csjprifront-pre.azurewebsites.net/?p=CNDJ") {
            this.UrlRef = "CNDJ"
        }
        else if (document.location.href == "https://csj-apigatewayfront.azurewebsites.net" || document.location.href == "https://csjprifront-pre.azurewebsites.net") {
            this.UrlRef = "CSSJ"
        }

        const fecha = new Date();
        const añoActual = fecha.getFullYear();
        this.anio_actual = añoActual+1;

        this.generalForm.get("selectedItemsBiblioteca").valueChanges.subscribe((origen: any) => {

            if(this.generalForm.get('selectedItemsBiblioteca')?.value.length == 1){
                this.flagBiblioteca1 = true;
            }else if(this.generalForm.get('selectedItemsBiblioteca')?.value.length > 1){
                this.flagBiblioteca2 = true;
            }else if(this.generalForm.get('selectedItemsBiblioteca')?.value.length == 0){
                this.flagBiblioteca1 = false;
                this.flagBiblioteca2 = false;
            }
        })

        this.generalForm.get("selectedItems").valueChanges.subscribe((origen: any) => {

            if(this.generalForm.get('selectedItems')?.value.length == 1){
                this.flagItems1 = true;
                this.flagItems2 = false;
            }else if(this.generalForm.get('selectedItems')?.value.length > 1){
                this.flagItems1 = true;
                this.flagItems2 = true;
            }else if(this.generalForm.get('selectedItems')?.value.length == 0){
                this.flagItems1 = false;
                this.flagItems2 = false;
            }
        })

        if (this.UrlRef == "CE") {
            this.generalForm.patchValue({
                sub_origen_id_1: '',
                sub_origen_id_2: '',
                sub_origen_id_3: '',
                sub_origen_id_4: '',
                sub_origen_id_5: '',
                subOrigen: [8],
                selectedItems: [{ id: 8, texto: "Consejo de Estado" }]
            })
            this.generalForm.get("consejoDeEstado").valueChanges.subscribe((origen: any) => {
                if (this.generalForm.get('consejoDeEstado')?.value == 'Consejo de Estado') {
                    this.generalForm.patchValue({
                        sub_origen_id_2: 8,
                    })
                }
                else if (this.generalForm.get('consejoDeEstado')?.value == '') {
                    this.generalForm.patchValue({
                        sub_origen_id_2: 8,
                    })
                }
            })
            this.auxSubOrigen = this.auxSubOrigen.filter((id: any) => id != 6);
            this.generalForm.patchValue({
                subOrigen: this.auxSubOrigen
            })
            this.allItems = [{ id: 8, texto: "Consejo de Estado" }];
            this.allItemsExtraOrigen = [{ id: 8, texto: "Consejo de Estado" }];
        }
        if (this.UrlRef == "CNSJ") {
            this.generalForm.patchValue({
                sub_origen_id_1: '',
                sub_origen_id_2: '',
                sub_origen_id_3: '',
                sub_origen_id_4: '',
                sub_origen_id_5: '',
                subOrigen: [],
                selectedItems: [],
                chkJurisprudencia: false
            })
            this.allItems = [];
            this.allItemsExtraOrigen = [];
            this.flagItems1 = false;
        }
        if (this.UrlRef == "CC") {
            this.generalForm.patchValue({
                sub_origen_id_1: '',
                sub_origen_id_2: '',
                sub_origen_id_3: 7,
                sub_origen_id_4: '',
                sub_origen_id_5: '',
                subOrigen: [7],
                selectedItems: [{ id: 7, texto: "Corte Constitucional" }]
            })
            this.auxSubOrigen = this.auxSubOrigen.filter((id: any) => id != 6);
            this.generalForm.patchValue({
                subOrigen: this.auxSubOrigen
            })
            this.allItems = [{ id: 7, texto: "Corte Constitucional" }];
            this.allItemsExtraOrigen = [{ id: 7, texto: "Corte Constitucional" }];
        }
        if (this.UrlRef == "CNDJ") {
            this.generalForm.patchValue({
                sub_origen_id_1: '',
                sub_origen_id_2: '',
                sub_origen_id_3: '',
                sub_origen_id_4: 9,
                sub_origen_id_5: '',
                subOrigen: [9],
                selectedItems: [{ id: 9, texto: "Comisión Nacional de Disciplina Judicial" }]
            })
            this.auxSubOrigen = this.auxSubOrigen.filter((id: any) => id != 6);
            this.generalForm.patchValue({
                subOrigen: this.auxSubOrigen
            })
            this.allItems = [{ id: 9, texto: "Comisión Nacional de Disciplina Judicial" }];
            this.allItemsExtraOrigen = [{ id: 9, texto: "Comisión Nacional de Disciplina Judicial" }];
        }
        this.generalForm.valueChanges.subscribe((v: any) => {
            /* console.log("Flag: ",this.flagIncExButtoms);
            console.log("FlagJR: ",this.flagIncExButtomsJR); */
            this.auxHolocausto = this.generalForm.get("selectedItemsInfoHolocausto").value?.length;
        })

        //SECCION LIMPIAR FILTROS
        
        //PANTALLA NORMAL
        this.generalForm.get("chkJurisprudencia").valueChanges.subscribe(() => {
            this.limpiarFiltros();
        })
        this.generalForm.get("selectedItems").valueChanges.subscribe(() => {
            this.limpiarFiltros();
        })
        this.generalForm.get("chkSoloGacetas").valueChanges.subscribe(() => {
            this.limpiarFiltros();
        })
        this.generalForm.get("chkBoletinesJurisprudenciales").valueChanges.subscribe(() => {
            this.limpiarFiltros();
        })
        this.generalForm.get("chkComisionGenero").valueChanges.subscribe(() => {
            this.limpiarFiltros();
        })
        this.generalForm.get("selectedItemsBiblioteca").valueChanges.subscribe(() => {
            this.limpiarFiltros();
        })
        /* this.generalForm.get("ddTipoNorma").valueChanges.subscribe(() => {
            this.limpiarFiltros();
        }) */
        this.generalForm.get("selectedItemsInfoHolocausto").valueChanges.subscribe(() => {
            this.limpiarFiltros();
        })
        this.generalForm.get("selectedItemsInfoVideoteca").valueChanges.subscribe(() => {
            this.limpiarFiltros();
        })
        this.generalForm.get("selectedItemsActos").valueChanges.subscribe(() => {
            this.limpiarFiltros();
        })
        this.generalForm.get("selectedItemsInfo").valueChanges.subscribe(() => {
            this.limpiarFiltros();
        })
        //PANTALLA CC - CNDJ - CNSJ
        this.generalForm.get("selectedItemsTribunales").valueChanges.subscribe(() => {
            this.limpiarFiltros();
        })
        //PANTALLA CE
        this.generalForm.get("ddtribunalesCE").valueChanges.subscribe(() => {
            this.limpiarFiltros();
        })
        //PANTALLA CNSJ
        this.generalForm.get("chkActosAdministrativos").valueChanges.subscribe(() => {
            this.limpiarFiltros();
        })

        //FIN SECCION LIMPIAR FILTROS
            
        this.biblioteca = [
            { id: 17, texto: "Normativa", titulo: "" },
            { id: 15, texto: "Libros y medios audiovisuales", titulo: "" },
            { id: 16, texto: "Revistas", titulo: "" },
            { id: 3, texto: "Holocausto", titulo: "Consulte aquí información relacionada con los hechos del Palacio de Justicia" },
            { id: 4, texto: "Videoteca", titulo: "Consulte material audiovisual de la Rama Judicial" },
            { id: 5, texto: "Actos Administrativos", titulo: "Consulte acuerdos, circulares, resoluciones y gaceta, expedidos por el Consejo Superior de la Judicatura" },
        ]
        this.bibliotecaCNSJ = [
            { id: 17, texto: "Normativa", titulo: "" },
            { id: 15, texto: "Libros y medios audiovisuales", titulo: "" },
            { id: 16, texto: "Revistas", titulo: "" },
        ]
        this.tipoInformacionHolocausto = [
            { id: 18, texto: "Expedientes" },
            { id: 19, texto: "Fotografías" },
            { id: 20, texto: "Prensa" },
            { id: 21, texto: "Publicaciones" },
            { id: 22, texto: "Sentencias" },
            { id: 23, texto: "Videos" },
        ]
        this.tipoInformacionVideoteca = [
            { id: 26, texto: "Audiencias Públicas" },
            { id: 29, texto: "Audios" },
            { id: 27, texto: "Fotografías" },
            { id: 28, texto: "Publicaciones" },
            { id: 25, texto: "Videoconferencias" },
            { id: 24, texto: "Videos" },
        ]
        this.tipoInformacionActosAdmin = [
            { id: 1, texto: "Acuerdos" },
            { id: 2, texto: "Circular" },
            { id: 3, texto: "Resoluciones de Sala" },
            { id: 4, texto: "Resoluciones de Presidencia" },
            { id: 5, texto: "Gacetas" },
        ]
        this.tipoInformacion = [
            { id: 18, texto: "Expedientes" },
            { id: 19, texto: "Fotografías (Holocausto)" },
            { id: 20, texto: "Prensa" },
            { id: 21, texto: "Publicaciones (Holocausto)" },
            { id: 22, texto: "Sentencias" },
            { id: 23, texto: "Videos (Holocausto)" },
            { id: 26, texto: "Audiencias Públicas" },
            { id: 29, texto: "Audios" },
            { id: 27, texto: "Fotografías (Videoteca)" },
            { id: 28, texto: "Publicaciones (Videoteca)" },
            { id: 25, texto: "Videoconferencias" },
            { id: 24, texto: "Videos (Videoteca)" },
            { id: 40, texto: "Acuerdo" },
            { id: 41, texto: "Circular" },
            { id: 42, texto: "Resolución de Sala" },
            { id: 43, texto: "Resolución de Presidencia" },
            { id: 44, texto: "Gacetas" },
        ]
        this.tipoInformacionHV = [
            { id: 18, texto: "Expedientes" },
            { id: 19, texto: "Fotografías (Holocausto)" },
            { id: 20, texto: "Prensa" },
            { id: 21, texto: "Publicaciones (Holocausto)" },
            { id: 22, texto: "Sentencias" },
            { id: 23, texto: "Videos (Holocausto)" },
            { id: 26, texto: "Audiencias Públicas" },
            { id: 29, texto: "Audios" },
            { id: 27, texto: "Fotografías (Videoteca)" },
            { id: 28, texto: "Publicaciones (Videoteca)" },
            { id: 25, texto: "Videoconferencias" },
            { id: 24, texto: "Videos (Videoteca)" },
        ]
        this.tipoInformacionHA = [
            { id: 18, texto: "Expedientes" },
            { id: 19, texto: "Fotografías" },
            { id: 20, texto: "Prensa" },
            { id: 21, texto: "Publicaciones" },
            { id: 22, texto: "Sentencias" },
            { id: 23, texto: "Videos" },
            { id: 40, texto: "Acuerdo" },
            { id: 41, texto: "Circular" },
            { id: 42, texto: "Resolución de Sala" },
            { id: 43, texto: "Resolución de Presidencia" },
            { id: 44, texto: "Gacetas" },
        ]
        this.tipoInformacionVA = [
            { id: 26, texto: "Audiencias Públicas" },
            { id: 29, texto: "Audios" },
            { id: 27, texto: "Fotografías" },
            { id: 28, texto: "Publicaciones" },
            { id: 25, texto: "Videoconferencias" },
            { id: 24, texto: "Videos" },
            { id: 40, texto: "Acuerdo" },
            { id: 41, texto: "Circular" },
            { id: 42, texto: "Resolución de Sala" },
            { id: 43, texto: "Resolución de Presidencia" },
            { id: 44, texto: "Gacetas" },
        ]
        this.altasCortes = [
            { id: 6, texto: "Corte Suprema de Justicia" },
            { id: 8, texto: "Consejo de Estado" },
            { id: 7, texto: "Corte Constitucional" },
            { id: 9, texto: "Comisión Nacional de Disciplina Judicial" },
            { id: 10, texto: "Sala Disciplinaria (1992 - 2020)" },
        ]
        this.consejoDeEstado = [
            { id: 1, texto: "" },
            { id: 2, texto: "Consejo de Estado" },
        ]
        this.criterios = [
            { id: 1, texto: "Y Que Contenga" },
            { id: 2, texto: "O Que Contenga" },
            { id: 3, texto: "Que Excluya" },
        ]
        this.criteriosJR = [
            { id: 1, texto: "Y Que Contenga" },
            { id: 2, texto: "O Que Contenga" },
            { id: 3, texto: "Que Excluya" },
        ]
        this.criteriosPR = [
            { id: 1, texto: "Y Que Contenga" },
            { id: 2, texto: "O Que Contenga" },
            { id: 3, texto: "Que Excluya" },
        ]
        this.criteriosT = [
            { id: 1, texto: "Y Que Contenga" },
            { id: 2, texto: "O Que Contenga" },
            { id: 3, texto: "Que Excluya" },
        ]
        this.criteriosA = [
            { id: 1, texto: "Y Que Contenga" },
            { id: 2, texto: "O Que Contenga" },
            { id: 3, texto: "Que Excluya" },
        ]
        this.criteriosD = [
            { id: 1, texto: "Y Que Contenga" },
            { id: 2, texto: "O Que Contenga" },
            { id: 3, texto: "Que Excluya" },
        ]
        this.criteriosC = [
            { id: 1, texto: "Y Que Contenga" },
            { id: 2, texto: "O Que Contenga" },
            { id: 3, texto: "Que Excluya" },
        ]
        this.criteriosND = [
            { id: 1, texto: "Y Que Contenga" },
            { id: 2, texto: "O Que Contenga" },
            { id: 3, texto: "Que Excluya" },
        ]
        this.criteriosFF = [
            { id: 1, texto: "Y Que Contenga" },
            { id: 2, texto: "O Que Contenga" },
            { id: 3, texto: "Que Excluya" },
        ]
        this.criteriosE = [
            { id: 1, texto: "Y Que Contenga" },
            { id: 2, texto: "O Que Contenga" },
            { id: 3, texto: "Que Excluya" },
        ]
        this.criterioYContenga = [
            { id: 1, texto: "Y Que Contenga" },
        ]
        this.criterioOContenga = [
            { id: 2, texto: "O Que Contenga" },
        ]
        this.criterioExcluya = [
            { id: 3, texto: "Que Excluya" },
        ]
        this.tipoGaceta = [
            { id: 1, texto: "Gaceta del Trabajo" },
            { id: 2, texto: "Gaceta Especial Sala Constitucional" },
            { id: 3, texto: "Gaceta Judicial" },
            { id: 4, texto: "Gaceta Judicial - Acción de Tutela" },
        ]
        this.tribunales = [
            { id: 13, texto: "Tribunales Superiores" },
            { id: 14, texto: "Tribunales Administrativos" },
            { id: 12, texto: "Restitución de Tierras" },
        ]
        this.tribunalesCE = [
            { id: 1, texto: "" },
            { id: 2, texto: "Tribunales Administrativos" },
        ]
        this.trimestral = [
            { id: 1, texto: "Si" },
            { id: 2, texto: "No" },
        ]
        this.edicion = [
            { id: 1, texto: "Ordinaria" },
            { id: 2, texto: "Extraordinaria" },
        ]
        this.origenVideoteca = [
            { id: 1, texto: "Consejo Superior de la Judicatura" },
            { id: 2, texto: "Jurisdicción de lo Contencioso Administrativo" },
            { id: 3, texto: "Jurisdicción Ordinaria" },
            { id: 4, texto: "Jurisdicción Constitucional" },
            { id: 5, texto: "Comisión Nacional de Género" },
            { id: 6, texto: "Comisión Nacional de Disciplina Judicial" },
        ]
        this.aspectosRelevantes = [
            { id: 1, texto: "Perspectiva de Género" },
            { id: 2, texto: "Conflicto Armado" },
            { id: 3, texto: "Responsabilidad Fiscal" },
            { id: 4, texto: "De Unificación" },
        ]
        this.origenFunteOficialNormativa = [
            { id: 1, texto: "Diario oficial" },
            { id: 2, texto: "Gaceta constitucional" },
            { id: 3, texto: "Gaceta Cundinamarca" },
            { id: 4, texto: "Gaceta de la judicatura (extraordinaria)" },
            { id: 5, texto: "Gaceta de la judicatura (ordinaria)" },
            { id: 6, texto: "Gaceta del congreso" },
            { id: 7, texto: "Legislación" },
            { id: 8, texto: "Plan sectorial de desarrollo Rama Judicial" },
            { id: 9, texto: "Registro Distrital" },
        ]
        this.meses = [
            { id: 1, value: "Enero" },
            { id: 2, value: "Febrero" },
            { id: 3, value: "Marzo" },
            { id: 4, value: "Abril" },
            { id: 5, value: "Mayo" },
            { id: 6, value: "Junio" },
            { id: 7, value: "Julio" },
            { id: 8, value: "Agosto" },
            { id: 9, value: "Septiembre" },
            { id: 10, value: "Octubre" },
            { id: 11, value: "Noviembre" },
            { id: 12, value: "Diciembre" },
        ]
        this.departamentoInmueble = [
            { id: 1, texto: "Cundinamarca" },
            { id: 2, texto: "Guainía" },
            { id: 3, texto: "Guaviare" },
            { id: 4, texto: "Huila" }
        ]

        this.ciudadInmueble = [
            { id: 1, texto: "Bogotá D.C" },
            { id: 2, texto: "Medellín" },
            { id: 3, texto: "Cali" },
            { id: 4, texto: "Barranquilla" }
        ]

        this.municipioInmueble = [
            { id: 1, texto: "Bogotá D.C" },
            { id: 2, texto: "Amazonas" },
            { id: 3, texto: "Antioquia" },
            { id: 4, texto: "Arauca" }
        ]

        this.corregimientoInmueble = [
            { id: 1, texto: "Corregimiento 1" },
            { id: 2, texto: "Corregimiento 2" },
            { id: 3, texto: "Corregimiento 3" },
            { id: 4, texto: "Corregimiento 4" }
        ]

        this.veredaInmueble = [
            { id: 1, texto: "Vereda 1" },
            { id: 2, texto: "Vereda 2" },
            { id: 3, texto: "Vereda 3" },
            { id: 4, texto: "Vereda 4" }
        ]

        this.barrioInmueble = [
            { id: 1, texto: "Barrio 1" },
            { id: 2, texto: "Barrio 2" },
            { id: 3, texto: "Barrio 3" },
            { id: 4, texto: "Barrio 4" }
        ]
    }

    actualizarFiltros(): void {
        this.cargarPonente();
        this.cargarEntidadGeneradora();
        this.cargarSeccion();
        this.cargarTipoNorma();
        this.cargarSalas();
        this.cargarTipoSala();
        this.cargarTemas();
        this.cargarTipoNroProvidencia();
        this.cargarClaseDeActuacion();
        this.cargarTipoProcedencias();
        this.cargarTipoDelitos();
        this.cargarMagistradoSalvamento();
        this.cargarTribunalAdmin();
        this.cargarTribunalesSuperiores();
        this.cargarCategoriaGenero();
        this.cargarDecision();
        this.cargarOrigenBiblioteca();
        //this.cargarTemaTres();
        this.cargarDescriptores();
        this.cargarEstado();
        this.cargarTipoMaterial();
        this.cargarBibliotecas();
    }

    checkYear(){
        if(this.generalForm.get('InputAñoNormativa')?.value.length == 4 || this.generalForm.get('InputAñoPubLYMA')?.value.length == 4 ||  this.generalForm.get('AnioPubActosAdmin')?.value.length == 4){
            this.flagMin = true;
            this.flagMax = true;
        }else{
            this.flagMin = false;
            this.flagMax = false;
        }
    }
    //Funciones - métodos Arturo

    preventAction(event: Event) {
        event.preventDefault();
    }
    assignCopy() {
        this.auxFilteredItems = Object.assign([], this.tipoFuentesFormales);
    }
    filterItem() {
        let searchTerm = this.generalForm.get("InputSearchFuenteFormal").value;

        if (!searchTerm) {
            this.assignCopy();
        }

        return this.auxFilteredItems.filter((item: { value: string | any[]; }) => {
            return item.value.includes(searchTerm);
        });
    }

    validateLenghtTema() {
        this.auxTemaLength = this.generalForm.get("InputTema").value?.length;
        this.auxTemaLengthValidate = true;
    }

    /** Eventos MultiSelect Temas */
    onItemSelectTemas(item: any) {
        this.temasChecks.push(item.value);
        this.generalForm.patchValue({
            temasChecks: this.temasChecks
        })
    }

    onItemDeSelectTemas(item: any) {

        for (const iterator of this.generalForm.get("ddTemas").value) {
            if (this.temasChecks.push(item.id) == iterator.id) {
                this.temasChecks.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            temasChecks: this.temasChecks
        })
    }

    onSelectAllTemas(items: any) {
        for (const iterator of items) {
            this.temasChecks.push(iterator.value);
        }
        this.generalForm.patchValue({
            temasChecks: this.temasChecks
        })
    }

    public onDeSelectAllTemas() {
        this.generalForm.get("ddTemas").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddTemas')?.value.length == 0) {
                this.temasChecks = [];
            }
            this.generalForm.patchValue({
                temasChecks: this.temasChecks
            })
        })
    }
    /** Fin Eventos MultiSelect Temas*/

    /** Eventos MultiSelect TemaTres */
    onItemSelectTemaTres(item: any) {
        this.temaTresChecks.push(item.value);
        this.generalForm.patchValue({
            temaTresChecks: this.temaTresChecks
        })
    }

    onItemDeSelectTemaTres(item: any) {

        for (const iterator of this.generalForm.get("ddTemaTres").value) {
            if (this.temaTresChecks.push(item.id) == iterator.id) {
                this.temaTresChecks.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            temaTresChecks: this.temaTresChecks
        })
    }

    onSelectAllTemaTres(items: any) {
        for (const iterator of items) {
            this.temaTresChecks.push(iterator.value);
        }
        this.generalForm.patchValue({
            temaTresChecks: this.temaTresChecks
        })
    }

    public onDeSelectAllTemaTres() {
        this.generalForm.get("ddTemaTres").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddTemaTres')?.value.length == 0) {
                this.temaTresChecks = [];
            }
            this.generalForm.patchValue({
                temaTresChecks: this.temaTresChecks
            })
        })
    }
    /** Fin Eventos MultiSelect TemaTres*/

    /** Eventos MultiSelect TemaTres */
    onItemSelectTemaTres6(item: any) {
        this.temaTresChecks6.push(item.value);
        this.generalForm.patchValue({
            temaTresChecks6: this.temaTresChecks6
        })
    }

    onItemDeSelectTemaTres6(item: any) {

        for (const iterator of this.generalForm.get("ddTemaTres6").value) {
            if (this.temaTresChecks6.push(item.id) == iterator.id) {
                this.temaTresChecks6.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            temaTresChecks6: this.temaTresChecks6
        })
    }

    onSelectAllTemaTres6(items: any) {
        for (const iterator of items) {
            this.temaTresChecks6.push(iterator.value);
        }
        this.generalForm.patchValue({
            temaTresChecks6: this.temaTresChecks6
        })
    }

    public onDeSelectAllTemaTres6() {
        this.generalForm.get("ddTemaTres6").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddTemaTres6')?.value.length == 0) {
                this.temaTresChecks6 = [];
            }
            this.generalForm.patchValue({
                temaTresChecks6: this.temaTresChecks6
            })
        })
    }
    /** Fin Eventos MultiSelect TemaTres*/


    /** Eventos MultiSelect TemaTres */
    onItemSelectTemaTres8(item: any) {
        this.temaTresChecks8.push(item.value);
        this.generalForm.patchValue({
            temaTresChecks8: this.temaTresChecks8
        })
    }

    onItemDeSelectTemaTres8(item: any) {

        for (const iterator of this.generalForm.get("ddTemaTres8").value) {
            if (this.temaTresChecks8.push(item.id) == iterator.id) {
                this.temaTresChecks8.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            temaTresChecks8: this.temaTresChecks8
        })
    }

    onSelectAllTemaTres8(items: any) {
        for (const iterator of items) {
            this.temaTresChecks8.push(iterator.value);
        }
        this.generalForm.patchValue({
            temaTresChecks8: this.temaTresChecks8
        })
    }

    public onDeSelectAllTemaTres8() {
        this.generalForm.get("ddTemaTres8").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddTemaTres8')?.value.length == 0) {
                this.temaTresChecks8 = [];
            }
            this.generalForm.patchValue({
                temaTresChecks8: this.temaTresChecks8
            })
        })
    }
    /** Fin Eventos MultiSelect TemaTres*/

    /** Eventos MultiSelect TemaTres Descriptivo*/
    onItemSelectTemaTresDescriptivo(item: any) {
        this.temaTresDescriptivoChecks.push(item.value);
        this.generalForm.patchValue({
            temaTresDescriptivoChecks: this.temaTresDescriptivoChecks
        })
    }

    onItemDeSelectTemaTresDescriptivo(item: any) {

        for (const iterator of this.generalForm.get("ddTemaTresDescriptivo").value) {
            if (this.temaTresDescriptivoChecks.push(item.id) == iterator.id) {
                this.temaTresDescriptivoChecks.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            temaTresDescriptivoChecks: this.temaTresDescriptivoChecks
        })
    }

    
    onSelectAllTemaTresDescriptivo(items: any) {
        for (const iterator of items) {
            this.temaTresDescriptivoChecks.push(iterator.value);
        }
        this.generalForm.patchValue({
            temaTresDescriptivoChecks: this.temaTresDescriptivoChecks
        })
    }

    public onDeSelectAllTemaTresDescriptivo() {
        this.generalForm.get("ddTemaTresDescriptivo").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddTemaTresDescriptivo')?.value.length == 0) {
                this.temaTresDescriptivoChecks = [];
            }
            this.generalForm.patchValue({
                temaTresDescriptivoChecks: this.temaTresDescriptivoChecks
            })
        })
    }
    /** Fin Eventos MultiSelect TemaTres Descriptivos*/

    

     /** Eventos MultiSelect TemaTres Descriptivo*/
     onItemSelectTemaTresDescriptivoNormativa(item: any) {
        this.temaTresDescriptivo.push(item.value);
        this.generalForm.patchValue({
            temaTresDescriptivo: this.temaTresDescriptivo
        })
    }

    onItemDeSelectTemaTresDescriptivoNormativa(item: any) {

        for (const iterator of this.generalForm.get("ddTemaTresDescriptivoNormativa").value) {
            if (this.temaTresDescriptivo.push(item.id) == iterator.id) {
                this.temaTresDescriptivo.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            temaTresDescriptivo: this.temaTresDescriptivo
        })
    }

    
    onSelectAllTemaTresDescriptivoNormativa(items: any) {
        for (const iterator of items) {
            this.temaTresDescriptivo.push(iterator.value);
        }
        this.generalForm.patchValue({
            temaTresDescriptivo: this.temaTresDescriptivo
        })
    }

    public onDeSelectAllTemaTresDescriptivoNormativa() {
        this.generalForm.get("ddTemaTresDescriptivoNormativa").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddTemaTresDescriptivoNormativa')?.value.length == 0) {
                this.temaTresDescriptivo = [];
            }
            this.generalForm.patchValue({
                temaTresDescriptivo: this.temaTresDescriptivo
            })
        })
    }
    /** Fin Eventos MultiSelect TemaTres Descriptivos*/


     /** Eventos MultiSelect TemaTres */
     onItemSelectTemaTresVocabularioControlado15(item: any) {
        this.temaTresChecks.push(item.value);
        this.generalForm.patchValue({
            temaTresChecks: this.temaTresChecks
        })
    }

    onItemDeSelectTemaTresVocabularioControlado15(item: any) {

        for (const iterator of this.generalForm.get("ddTemaTresVocabularioControlado15").value) {
            if (this.temaTresChecksVocabularioControlado15.push(item.id) == iterator.id) {
                this.temaTresChecksVocabularioControlado15.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            temaTresChecksVocabularioControlado15: this.temaTresChecksVocabularioControlado15
        })
    }

    onSelectAllTemaTresVocabularioControlado15(items: any) {
        for (const iterator of items) {
            this.temaTresChecksVocabularioControlado15.push(iterator.value);
        }
        this.generalForm.patchValue({
            temaTresChecksVocabularioControlado15: this.temaTresChecksVocabularioControlado15
        })
    }

    public onDeSelectAllTemaTresVocabularioControlado15() {
        this.generalForm.get("ddTemaTresVocabularioControlado15").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddTemaTresVocabularioControlado15')?.value.length == 0) {
                this.temaTresChecksVocabularioControlado15 = [];
            }
            this.generalForm.patchValue({
                temaTresChecksVocabularioControlado15: this.temaTresChecksVocabularioControlado15
            })
        })
    }
    /** Fin Eventos MultiSelect TemaTres*/

    /** Eventos MultiSelect Tipo Ponente */

    onItemSelectPonente(item: any) {
        this.ponenciasCheck.push(item.value);
        this.generalForm.patchValue({
            ponenciasCheck: this.ponenciasCheck
        })
    }

    onItemDeSelectPonente(item: any) {
        for (const iterator of this.generalForm.get("ddPonencia").value) {
            if (this.ponenciasCheck.push(item.id) == iterator.id) {
                this.ponenciasCheck.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            ponenciasCheck: this.ponenciasCheck
        })
    }

    onSelectAllPonente(items: any) {
        for (const iterator of items) {
            this.ponenciasCheck.push(iterator.value);
        }
        this.generalForm.patchValue({
            ponenciasCheck: this.ponenciasCheck
        })
    }

    public onDeSelectAllPonente() {
        this.generalForm.get("ddPonencia").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddPonencia')?.value.length == 0) {
                this.ponenciasCheck = [];
            }
            this.generalForm.patchValue({
                ponenciasCheck: this.ponenciasCheck
            })
        })
    }

    /** Fin Eventos MultiSelect Ponente */

    /** Eventos MultiSelect Tipo Entidad generadora */

    onItemSelectEntidadGeneradora(item: any) {
        this.entidadGeneradoraCheck.push(item.value);
        this.generalForm.patchValue({
            entidadGeneradoraCheck: this.entidadGeneradoraCheck
        })
    }

    onItemDeSelectEntidadGeneradora(item: any) {
        for (const iterator of this.generalForm.get("ddEntidadGeneradora").value) {
            if (this.entidadGeneradoraCheck.push(item.id) == iterator.id) {
                this.entidadGeneradoraCheck.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            entidadGeneradoraCheck: this.entidadGeneradoraCheck
        })
    }

    onSelectAllEntidadGeneradora(items: any) {
        for (const iterator of items) {
            this.entidadGeneradoraCheck.push(iterator.value);
        }
        this.generalForm.patchValue({
            entidadGeneradoraCheck: this.entidadGeneradoraCheck
        })
    }

    public onDeSelectAllEntidadGeneradora() {
        this.generalForm.get("ddEntidadGeneradora").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddEntidadGeneradora')?.value.length == 0) {
                this.entidadGeneradoraCheck = [];
            }
            this.generalForm.patchValue({
                entidadGeneradoraCheck: this.entidadGeneradoraCheck
            })
        })
    }

    /** Fin Eventos MultiSelect EntidadGeneradora */



    /** Eventos MultiSelect Fuente Oficial */

    onItemSelectFuenteOrigen(item: any) {
        this.fuenteOficialCheck.push(item.texto);
        this.generalForm.patchValue({
            fuenteOficialCheck: this.fuenteOficialCheck
        })
    }

    onItemDeSelectFuenteOrigen(item: any) {
        for (const iterator of this.generalForm.get("ddFuenteOficial").value) {
            if (this.fuenteOficialCheck.push(item.id) == iterator.id) {
                this.fuenteOficialCheck.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            fuenteOficialCheck: this.fuenteOficialCheck
        })
    }

    onSelectAllFuenteOrigen(items: any) {
        for (const iterator of items) {
            this.fuenteOficialCheck.push(iterator.texto);
        }
        this.generalForm.patchValue({
            fuenteOficialCheck: this.fuenteOficialCheck
        })
    }

    public onDeSelectAllFuenteOrigen() {
        this.generalForm.get("ddFuenteOficial").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddFuenteOficial')?.value.length == 0) {
                this.fuenteOficialCheck = [];
            }
            this.generalForm.patchValue({
                fuenteOficialCheck: this.fuenteOficialCheck
            })
        })
    }

    /** Fin Eventos Fuente Oficial */



    /** Eventos MultiSelect Tipo SalaConocimiento */

    onItemSelectSalaConocimiento(item: any) {
        this.salaConocimientoCheck.push(item.value);
        this.generalForm.patchValue({
            salaConocimientoCheck: this.salaConocimientoCheck
        })
    }

    onItemDeSelectSalaConocimiento(item: any) {
        for (const iterator of this.generalForm.get("ddSalaConocimiento").value) {
            if (this.salaConocimientoCheck.push(item.id) == iterator.id) {
                this.salaConocimientoCheck.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            salaConocimientoCheck: this.salaConocimientoCheck
        })
    }

    onSelectAllSalaConocimiento(items: any) {
        for (const iterator of items) {
            this.salaConocimientoCheck.push(iterator.value);
        }
        this.generalForm.patchValue({
            salaConocimientoCheck: this.salaConocimientoCheck
        })
    }

    public onDeSelectAllSalaConocimiento() {
        this.generalForm.get("ddSalaConocimiento").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddSalaConocimiento')?.value.length == 0) {
                this.salaConocimientoCheck = [];
            }
            this.generalForm.patchValue({
                salaConocimientoCheck: this.salaConocimientoCheck
            })
        })
    }

    /** Fin Eventos MultiSelect salaConocimiento */

    /** Eventos MultiSelect Tipo NaturalezaProceso */

    onItemSelectNaturalezaProceso(item: any) {
        this.naturalezaProcesoCheck.push(item.value);
        this.generalForm.patchValue({
            naturalezaProcesoCheck: this.naturalezaProcesoCheck
        })
    }

    onItemDeSelectNaturalezaProceso(item: any) {
        for (const iterator of this.generalForm.get("selectedItems").value) {
            if (this.naturalezaProcesoCheck.push(item.id) == iterator.id) {
                this.naturalezaProcesoCheck.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            naturalezaProcesoCheck: this.naturalezaProcesoCheck
        })
    }

    onSelectAllNaturalezaProceso(items: any) {
        for (const iterator of items) {
            this.naturalezaProcesoCheck.push(iterator.value);
        }
        this.generalForm.patchValue({
            naturalezaProcesoCheck: this.naturalezaProcesoCheck
        })
    }

    public onDeSelectAllNaturalezaProceso() {
        this.generalForm.get("selectedItems").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('selectedItems')?.value.length == 0) {
                this.naturalezaProcesoCheck = [];
            }
            this.generalForm.patchValue({
                naturalezaProcesoCheck: this.naturalezaProcesoCheck
            })
        })
    }

    /** Fin Eventos MultiSelect naturalezaProceso */

    /** Eventos MultiSelect Tipo AspectosRelevantes */

    onItemSelectAspectosRelevantes(item: any) {
        this.aspectosRelevantesCheck.push(item.texto);
        this.generalForm.patchValue({
            aspectosRelevantesCheck: this.aspectosRelevantesCheck
        })
    }

    onItemDeSelectAspectosRelevantes(item: any) {
        for (const iterator of this.generalForm.get("selectedItems").value) {
            if (this.aspectosRelevantesCheck.push(item.id) == iterator.id) {
                this.aspectosRelevantesCheck.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            aspectosRelevantesCheck: this.aspectosRelevantesCheck
        })
    }

    onSelectAllAspectosRelevantes(items: any) {
        for (const iterator of items) {
            this.aspectosRelevantesCheck.push(iterator.texto);
        }
        this.generalForm.patchValue({
            aspectosRelevantesCheck: this.aspectosRelevantesCheck
        })
    }

    public onDeSelectAllAspectosRelevantes() {
        this.generalForm.get("selectedItems").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('selectedItems')?.value.length == 0) {
                this.aspectosRelevantesCheck = [];
            }
            this.generalForm.patchValue({
                aspectosRelevantesCheck: this.aspectosRelevantesCheck
            })
        })
    }

    /** Fin Eventos MultiSelect AspectosRelevantes */

    /** Eventos MultiSelect Tipo Providencia */
    onItemSelectTipoProvidencia(item: any) {
        this.tipoNroProvidenciasCheck.push(item.value);
        this.generalForm.patchValue({
            tipoNroProvidenciasCheck: this.tipoNroProvidenciasCheck
        })
    }

    onItemDeSelectTipoProvidencia(item: any) {
        for (const iterator of this.generalForm.get("ddTipoNroProvidencia").value) {
            if (this.tipoNroProvidenciasCheck.push(item.id) == iterator.id) {
                this.tipoNroProvidenciasCheck.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            tipoNroProvidenciasCheck: this.tipoNroProvidenciasCheck
        })
    }

    onSelectAllTipoProvidencia(items: any) {
        for (const iterator of items) {
            this.tipoNroProvidenciasCheck.push(iterator.value);
        }
        this.generalForm.patchValue({
            tipoNroProvidenciasCheck: this.tipoNroProvidenciasCheck
        })
    }

    public onDeSelectAllTipoProvidencia() {
        this.generalForm.get("ddTipoNroProvidencia").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddTipoNroProvidencia')?.value.length == 0) {
                this.tipoNroProvidenciasCheck = [];
            }
            this.generalForm.patchValue({
                tipoNroProvidenciasCheck: this.tipoNroProvidenciasCheck
            })
        })
    }
    /** Fin Eventos MultiSelect Tipo Providencia*/



    /** Eventos MultiSelect Clase Actuacion */
    getClasesActuacionesonItemSelectClaseActuacion(item: any) {
        this.claseActuacionChecks.push(item.value);
        this.generalForm.patchValue({
            claseActuacionChecks: this.claseActuacionChecks
        })
    }


    onItemDeSelectClaseActuacion(item: any) {
        for (const iterator of this.generalForm.get("ddClaseActuacion").value) {
            if (this.claseActuacionChecks.push(item.id) == iterator.id) {
                this.claseActuacionChecks.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            claseActuacionChecks: this.claseActuacionChecks
        })
    }

    onSelectAllClaseActuacion(items: any) {
        for (const iterator of items) {
            this.claseActuacionChecks.push(iterator.value);
        }
        this.generalForm.patchValue({
            claseActuacionChecks: this.claseActuacionChecks
        })
    }

    public onDeSelectAllClaseActuacion() {
        this.generalForm.get("ddClaseActuacion").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddClaseActuacion')?.value.length == 0) {
                this.claseActuacionChecks = [];
            }

            this.generalForm.patchValue({
                claseActuacionChecks: this.claseActuacionChecks
            })
        })
    }
    /** Fin Eventos MultiSelect Tipo Providencia*/



    /** Eventos MultiSelect Decision */
    onItemSelectDecision(item: any) {
        this.DecisionesCheck.push(item.value);
        this.generalForm.patchValue({
            decisionesCheck: this.DecisionesCheck
        })
    }

    onItemDeSelectDecision(item: any) {
        for (const iterator of this.generalForm.get("ddDecision").value) {
            if (this.DecisionesCheck.push(item.id) == iterator.id) {
                this.DecisionesCheck.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            decision: this.DecisionesCheck
        })
    }

    onSelectAllCategoriaDecision(items: any) {
        for (const iterator of items) {
            this.DecisionesCheck.push(iterator.value);
        }
        this.generalForm.patchValue({
            DecisionesCheck: this.DecisionesCheck
        })
    }

    public onDeSelectAllDecision() {
        this.generalForm.get("ddDecision").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddDecision')?.value.length == 0) {
                this.DecisionesCheck = [];
            }
            this.generalForm.patchValue({
                decisionesCheck: this.DecisionesCheck
            })
        })
    }



    /** Fin Eventos MultiSelect Decision*/

    /** Eventos MultiSelect Categoria Genero */
    onItemSelectCategoriaGenero(item: any) {
        this.categoriaGenerosCheck.push(item.value);
        this.generalForm.patchValue({
            categoriaGenerosCheck: this.categoriaGenerosCheck
        })
    }

    onItemDeSelectCategoriaGenero(item: any) {
        for (const iterator of this.generalForm.get("ddCategoriaGenero").value) {
            if (this.categoriaGenerosCheck.push(item.id) == iterator.id) {
                this.categoriaGenerosCheck.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            categoriaGenerosCheck: this.categoriaGenerosCheck
        })
    }

    onSelectAllCategoriaGenero(items: any) {
        for (const iterator of items) {
            this.categoriaGenerosCheck.push(iterator.value);
        }
        this.generalForm.patchValue({
            categoriaGenerosCheck: this.categoriaGenerosCheck
        })
    }

    public onDeSelectAllCategoriaGenero() {
        this.generalForm.get("ddCategoriaGenero").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddCategoriaGenero')?.value.length == 0) {
                this.categoriaGenerosCheck = [];
            }
            this.generalForm.patchValue({
                categoriaGenerosCheck: this.categoriaGenerosCheck
            })
        })
    }


    /** Fin Eventos MultiSelect Categoria de género */

    /** Eventos MultiSelect Salas */
    onItemSelectSalas(item: any) {
        let sala = []
        let magistrados = []
        let tipoSalasAux = []
        if(this.SalasCheck.length == 0) {
            this.magistradoSalvamento = [];
            this.tipoSalas = [];
        }
        this.SalasCheck.push(item.value);
        this.generalForm.patchValue({
            SalasCheck: this.SalasCheck
        })
        sala = this.salas.filter(sala => sala.id === item.id);
        magistrados = sala[0].magistrados_salvamento;
        tipoSalasAux = sala[0].tipo_salas;
        magistrados = magistrados.map((magistrado:any)=>{
            let objeto;
            objeto = {
                id: item.id,
                value: magistrado
            }
            return objeto;
        })
        tipoSalasAux = tipoSalasAux.map((tipoSala:any)=>{
            let objeto;
            objeto = {
                id: item.id,
                value: tipoSala
            }
            return objeto;
        })
        
        this.magistradoSalvamento = this.magistradoSalvamento.concat(magistrados);
        this.tipoSalas = this.tipoSalas.concat(tipoSalasAux);
    }

    onItemDeSelectSalas(item: any) {
        for (const iterator of this.generalForm.get("ddSalas").value) {
            if (this.SalasCheck.push(item.id) == iterator.id) {
                this.SalasCheck.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            SalasCheck: this.SalasCheck
        })
        if(this.SalasCheck.length == 0){
            this.magistradoSalvamento = this.magistradosInicial;
            this.tipoSalas = this.tipoSalasInicial;
        }else{
            this.magistradoSalvamento = this.magistradoSalvamento.filter((magistrado:any)=> magistrado.id !== item.id);
            this.tipoSalas = this.tipoSalas.filter((tipoSala:any)=> tipoSala.id !== item.id);
        }
    }

    onSelectAllSalas(items: any) {
        let magistrados:any = [];
        let tipoSalasAux:any = [];

        for (const iterator of items) {
            this.SalasCheck.push(iterator.value);
        };

        for (let i = 0; i < this.salas.length; i++) {
            for (let j = 0; j < this.salas[i].magistrados_salvamento.length; j++) {
                magistrados.push({id: this.salas[i].id, value: this.salas[i].magistrados_salvamento[j]})
            }
            for (let j = 0; j < this.salas[i].tipo_salas.length; j++) {
                tipoSalasAux.push({id: this.salas[i].id, value: this.salas[i].tipo_salas[j]})
            }
        }
        
        this.generalForm.patchValue({
            SalasCheck: this.SalasCheck
        });
        this.magistradoSalvamento = magistrados;
        this.tipoSalas = tipoSalasAux;
    }


    public onDeSelectAllSalas() {
        this.generalForm.get("ddSalas").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddSalas')?.value.length == 0) {
                this.SalasCheck = [];
                this.magistradoSalvamento = this.magistradosInicial;
                this.tipoSalas = this.tipoSalasInicial;
            }
            this.generalForm.patchValue({
                SalasCheck: this.SalasCheck
            })
        })
    }

    /** Fin Eventos MultiSelect Salas */

    /** Eventos MultiSelect Tipo Salas */

    onItemSelectTipoSalas(item: any) {
        this.TipoSalasCheck.push(item.value);
        this.generalForm.patchValue({
            TipoSalasCheck: this.TipoSalasCheck
        })
    }

    onItemDeSelectTipoSalas(item: any) {
        for (const iterator of this.generalForm.get("ddTipoSalas").value) {
            if (this.TipoSalasCheck.push(item.id) == iterator.id) {
                this.TipoSalasCheck.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            TipoSalasCheck: this.TipoSalasCheck
        })
    }


    onSelectAllTipoSalas(items: any) {
        for (const iterator of items) {
            this.TipoSalasCheck.push(iterator.value);
        }
        this.generalForm.patchValue({
            TipoSalasCheck: this.TipoSalasCheck
        })
    }

    public onDeSelectAllTipoSalas() {
        this.generalForm.get("ddTipoSalas").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddTipoSalas')?.value.length == 0) {
                this.TipoSalasCheck = [];
            }
            this.generalForm.patchValue({
                TipoSalasCheck: this.TipoSalasCheck
            })
        })
    }

    /** Fin Eventos MultiSelect Tipo Salas */

    /** Eventos MultiSelect Tipo Gaceta*/

    onItemSelectTipoGaceta(item: any) {
        if (item.id == 1) {
            this.auxTipoGaceta.push(item.texto)
            this.generalForm.patchValue({
                TipoGaceta: this.auxTipoGaceta
            })
        }
        if (item.id == 2) {
            this.auxTipoGaceta.push(item.texto)
            this.generalForm.patchValue({
                TipoGaceta: this.auxTipoGaceta
            })
        }
        if (item.id == 3) {
            this.auxTipoGaceta.push(item.texto)
            this.generalForm.patchValue({
                TipoGaceta: this.auxTipoGaceta
            })
        }
        if (item.id == 4) {
            this.auxTipoGaceta.push(item.texto)
            this.generalForm.patchValue({
                TipoGaceta: this.auxTipoGaceta
            })
        }
    }

    onItemDeSelectTipoGaceta(item: any) {
        if (item.id == 1) {
            this.auxTipoGaceta = this.auxTipoGaceta.filter((id: any) => id != 1);
            this.generalForm.patchValue({
                TipoGaceta: this.auxTipoGaceta
            })
        }
        if (item.id == 2) {
            this.auxTipoGaceta = this.auxTipoGaceta.filter((id: any) => id != 2);
            this.generalForm.patchValue({
                TipoGaceta: this.auxTipoGaceta
            })
        }
        if (item.id == 3) {
            this.auxTipoGaceta = this.auxTipoGaceta.filter((id: any) => id != 3);
            this.generalForm.patchValue({
                TipoGaceta: this.auxTipoGaceta
            })
        }
        if (item.id == 4) {
            this.auxTipoGaceta = this.auxTipoGaceta.filter((id: any) => id != 4);
            this.generalForm.patchValue({
                TipoGaceta: this.auxTipoGaceta
            })
        }
    }
    onSelectAllTipoGaceta(items: any) {
        for (const iterator of items) {
            this.auxTipoGaceta.push(iterator.texto)
        }
        this.generalForm.patchValue({
            TipoGaceta: this.auxTipoGaceta
        })
    }
    public onDeSelectAllTipoGaceta() {
        this.generalForm.get("selectedItemsTipoGaceta").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('selectedItemsTipoGaceta')?.value.length == 0) {
                this.auxTipoGaceta = [];
                this.generalForm.patchValue({
                    TipoGaceta: this.auxTipoGaceta
                })
            }
        })
    }

    public validacionBotonBuscar(){
        this.generalForm.get("textoBusqueda").valueChanges.subscribe((origen: any) => {
            if(this.generalForm.get('textoBusqueda')?.errors?.['minlength']){
            this.flagTextoMinimo = true;
            }else
            this.flagTextoMinimo = false;
        });
        this.generalForm.get("textoBusqueda").valueChanges.subscribe((origen: any) => {
            if(this.generalForm.get('textoBusqueda')?.value.length > 0){
            this.flagBusquedaVacia = false;
            }else
            this.flagBusquedaVacia = true;
        });
        this.generalForm.get("textoBusqueda").valueChanges.subscribe((origen: any) => {
            this.validText(this.generalForm.get('textoBusqueda')?.value);
        });
    }

    public concatFechas() {
        this.generalForm.get("añoDesdeGaceta").valueChanges.subscribe((origen: any) => {
            let str1: string = this.generalForm.get("añoDesdeGaceta").value;
            let str2: string = "-01-01";
            let str3: string = str1 + str2;
            this.generalForm.patchValue({
                GacetasFechaDesde: str3
            })
        });
        this.generalForm.get("añoHastaGaceta").valueChanges.subscribe((origen: any) => {
            let str4: string = this.generalForm.get("añoHastaGaceta").value;
            let str5 = "-12-01";
            let str6 = str4 + str5;
            this.generalForm.patchValue({
                GacetasFechaHasta: str6
            })
        })

    }
    /** Fin Tipo Gaceta */

    public limitesOpLogicos() {
        this.generalForm.get("textoYContenga").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoYContenga").value[0]?.length >= 3){
                this.criterios = [{ id: 2, texto: "O Que Contenga" }, { id: 3, texto: "Que Excluya" }];
                this.flagLimiteYContenga = true;
            }
            else{
                this.criterios = [{ id: 1, texto: "Y Que Contenga" }, { id: 2, texto: "O Que Contenga"} , { id: 3, texto: "Que Excluya" }];
                this.flagLimiteYContenga = false;
            }
        })
        this.generalForm.get("textoYContengaJR").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoYContengaJR").value[0]?.length >= 3){                
                this.criteriosJR = [{ id: 2, texto: "O Que Contenga" }, { id: 3, texto: "Que Excluya" }];
                this.flagLimiteYContengaJR = true;
            }
            else{
                this.criteriosJR = [{ id: 1, texto: "Y Que Contenga" }, { id: 2, texto: "O Que Contenga"} , { id: 3, texto: "Que Excluya" }];
                this.flagLimiteYContengaJR = false;
            }
        })
        this.generalForm.get("textoYContengaPR").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoYContengaPR").value[0]?.length >= 3){
                this.criteriosPR = [{ id: 2, texto: "O Que Contenga" }, { id: 3, texto: "Que Excluya" }];
                this.flagLimiteYContengaPR = true;
            }
            else{
                this.criteriosPR = [{ id: 1, texto: "Y Que Contenga" }, { id: 2, texto: "O Que Contenga"} , { id: 3, texto: "Que Excluya" }];
                this.flagLimiteYContengaPR = false;
            }
        })
        this.generalForm.get("textoYContengaT").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoYContengaT").value[0]?.length >= 3 ){
                this.criteriosT = [{ id: 2, texto: "O Que Contenga" }, { id: 3, texto: "Que Excluya" }];
                this.flagLimiteYContengaT = true;
            }
            else{
                this.criteriosT = [{ id: 1, texto: "Y Que Contenga" }, { id: 2, texto: "O Que Contenga"} , { id: 3, texto: "Que Excluya" }];
                this.flagLimiteYContengaT = false;
            }
        })
        this.generalForm.get("textoYContengaA").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoYContengaA").value[0]?.length >= 3){
                
                this.criteriosA = [{ id: 2, texto: "O Que Contenga" }, { id: 3, texto: "Que Excluya" }];
                this.flagLimiteYContengaA = true;
            }
            else{
                this.criteriosA = [{ id: 1, texto: "Y Que Contenga" }, { id: 2, texto: "O Que Contenga"} , { id: 3, texto: "Que Excluya" }];
                this.flagLimiteYContengaA = false;
            }
        })
        this.generalForm.get("textoYContengaD").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoYContengaD").value[0]?.length >= 3){
                this.criteriosD = [{ id: 2, texto: "O Que Contenga" }, { id: 3, texto: "Que Excluya" }];
                this.flagLimiteYContengaD = true;
            }
            else{
                this.criteriosD = [{ id: 1, texto: "Y Que Contenga" }, { id: 2, texto: "O Que Contenga"} , { id: 3, texto: "Que Excluya" }];
                this.flagLimiteYContengaD = false;
            }
        })
        this.generalForm.get("textoYContengaC").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoYContengaC").value[0]?.length >= 3){
                this.criteriosC = [{ id: 2, texto: "O Que Contenga" }, { id: 3, texto: "Que Excluya" }];
                this.flagLimiteYContengaC = true;
            }
            else{
                this.criteriosC = [{ id: 1, texto: "Y Que Contenga" }, { id: 2, texto: "O Que Contenga"} , { id: 3, texto: "Que Excluya" }];
                this.flagLimiteYContengaC = false;
            }
        })
        this.generalForm.get("textoYContengaND").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoYContengaND").value[0]?.length >= 3){
                
                this.criteriosND = [{ id: 2, texto: "O Que Contenga" }, { id: 3, texto: "Que Excluya" }];
                this.flagLimiteYContengaND = true;
            }
            else{
                this.criteriosND = [{ id: 1, texto: "Y Que Contenga" }, { id: 2, texto: "O Que Contenga"} , { id: 3, texto: "Que Excluya" }];
                this.flagLimiteYContengaND = false;
            }
        })
        this.generalForm.get("textoYContengaFF").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoYContengaFF").value[0]?.length >= 3){
                this.criteriosFF = [{ id: 2, texto: "O Que Contenga" }, { id: 3, texto: "Que Excluya" }];
                this.flagLimiteYContengaFF = true;
            }
            else{
                this.criteriosFF = [{ id: 1, texto: "Y Que Contenga" }, { id: 2, texto: "O Que Contenga"} , { id: 3, texto: "Que Excluya" }];
                this.flagLimiteYContengaFF = false;
            }
        })
        this.generalForm.get("textoYContengaE").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoYContengaE").value[0]?.length >= 3){
                this.criteriosE = [{ id: 2, texto: "O Que Contenga" }, { id: 3, texto: "Que Excluya" }];
                this.flagLimiteYContengaE = true;
            }
            else{
                this.criteriosE = [{ id: 1, texto: "Y Que Contenga" }, { id: 2, texto: "O Que Contenga"} , { id: 3, texto: "Que Excluya" }];
                this.flagLimiteYContengaE = false;
            }
        })


        this.generalForm.get("textoOContenga").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoOContenga").value[0]?.length >= 3){
                this.criterios = [{ id: 1, texto: "Y Que Contenga" }, { id: 3, texto: "Que Excluya" }];
                this.flagLimiteOContenga = true;
            }
            else{
                this.flagLimiteOContenga = false;
            }
        })
        this.generalForm.get("textoYContengaJR").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoOContengaJR").value[0]?.length >= 3){
                this.criteriosJR = [{ id: 1, texto: "Y Que Contenga" }, { id: 3, texto: "Que Excluya" }];
                this.flagLimiteOContengaJR = true;
            }
            else{
                this.flagLimiteOContengaJR = false;
            }
        })

        this.generalForm.get("textoOContengaPR").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoOContengaPR").value[0]?.length >= 3){
                this.criteriosPR = [{ id: 1, texto: "Y Que Contenga" }, { id: 3, texto: "Que Excluya" }];
                this.flagLimiteOContengaPR = true;
            }
            else{                
                this.flagLimiteOContengaPR = false;
            }
        })
        this.generalForm.get("textoOContengaT").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoOContengaT").value[0]?.length >= 3 ){                
                this.criteriosT = [{ id: 1, texto: "Y Que Contenga" }, { id: 3, texto: "Que Excluya" }];
                this.flagLimiteOContengaT = true;
            }
            else{                
                this.flagLimiteOContengaT = false;
            }
        })
        this.generalForm.get("textoOContengaA").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoOContengaA").value[0]?.length >= 3){                
                this.criteriosA = [{ id: 1, texto: "Y Que Contenga" }, { id: 3, texto: "Que Excluya" }];
                this.flagLimiteOContengaA = true;
            }
            else{                
                this.flagLimiteOContengaA = false;
            }
        })
        this.generalForm.get("textoOContengaD").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoOContengaD").value[0]?.length >= 3){                
                this.criteriosD = [{ id: 1, texto: "Y Que Contenga" }, { id: 3, texto: "Que Excluya" }];
                this.flagLimiteOContengaD = true;
            }
            else{                
                this.flagLimiteOContengaD = false;
            }
        })
        this.generalForm.get("textoOContengaC").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoOContengaC").value[0]?.length >= 3){                
                this.criteriosC = [{ id: 1, texto: "Y Que Contenga" }, { id: 3, texto: "Que Excluya" }];
                this.flagLimiteOContengaC = true;
            }
            else{                
                this.flagLimiteOContengaC = false;
            }
        })
        this.generalForm.get("textoOContengaE").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoOContengaE").value[0]?.length >= 3){                
                this.criteriosE = [{ id: 1, texto: "Y Que Contenga" }, { id: 3, texto: "Que Excluya" }];
                this.flagLimiteOContengaE = true;
            }
            else{                
                this.flagLimiteOContengaE = false;
            }
        })
        this.generalForm.get("textoOContengaFF").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoOContengaFF").value[0]?.length >= 3){                
                this.criteriosFF = [{ id: 1, texto: "Y Que Contenga" }, { id: 3, texto: "Que Excluya" }];
                this.flagLimiteOContengaFF = true;
            }
            else{                
                this.flagLimiteOContengaFF = false;
            }
        })
        this.generalForm.get("textoOContengaND").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoOContengaND").value[0]?.length >= 3){                
                this.criteriosND = [{ id: 1, texto: "Y Que Contenga" }, { id: 3, texto: "Que Excluya" }];
                this.flagLimiteOContengaND = true;
            }
            else{                
                this.flagLimiteOContengaND = false;
            }
        })
        

        this.generalForm.get("textoExcluya").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluya").value[0]?.length >= 3){
                this.criterios = [{ id: 1, texto: "Y Que Contenga" }, { id: 2, texto: "O Que Contenga" }];
                this.flagLimiteExcluya = true;
            }
            else{
                this.flagLimiteExcluya = false;
            }
        })
        this.generalForm.get("textoExcluyaT").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaT").value[0]?.length >= 3 ){                
                this.criteriosT = [{ id: 1, texto: "Y Que Contenga" }, { id: 3, texto: "O Que Contenga" }];
                this.flagLimiteExcluyaT = true;
            }
            else{                
                this.flagLimiteExcluyaT = false;
            }
        })
        this.generalForm.get("textoExcluyaA").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaA").value[0]?.length >= 3){                
                this.criteriosA = [{ id: 1, texto: "Y Que Contenga" }, { id: 3, texto: "O Que Contenga" }];
                this.flagLimiteExcluyaA = true;
            }
            else{                
                this.flagLimiteExcluyaA = false;
            }
        })
        this.generalForm.get("textoExcluyaD").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaD").value[0]?.length >= 3){                
                this.criteriosD = [{ id: 1, texto: "Y Que Contenga" }, { id: 3, texto: "O Que Contenga" }];
                this.flagLimiteExcluyaD = true;
            }
            else{                
                this.flagLimiteExcluyaD = false;
            }
        })
        this.generalForm.get("textoExcluyaC").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaC").value[0]?.length >= 3){                
                this.criteriosC = [{ id: 1, texto: "Y Que Contenga" }, { id: 3, texto: "O Que Contenga" }];
                this.flagLimiteExcluyaC = true;
            }
            else{                
                this.flagLimiteExcluyaC = false;
            }
        })
        this.generalForm.get("textoExcluyaPR").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaPR").value[0]?.length >= 3){ 
                this.criteriosPR = [{ id: 1, texto: "Y Que Contenga" }, { id: 3, texto: "O Que Contenga" }];              
                this.flagLimiteExcluyaPR = true;
            }
            else{                
                this.flagLimiteExcluyaPR = false;
            }
        })
        this.generalForm.get("textoExcluyaJR").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaJR").value[0]?.length >= 3){                
                this.criteriosJR = [{ id: 1, texto: "Y Que Contenga" }, { id: 3, texto: "O Que Contenga" }];
                this.flagLimiteExcluyaJR = true;
            }
            else{                
                this.flagLimiteExcluyaJR = false;
            }
        })
        this.generalForm.get("textoExcluyaE").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaE").value[0]?.length >= 3){                
                this.criteriosE = [{ id: 1, texto: "Y Que Contenga" }, { id: 3, texto: "O Que Contenga" }];
                this.flagLimiteExcluyaE = true;
            }
            else{                
                this.flagLimiteExcluyaE = false;
            }
        })
        this.generalForm.get("textoExcluyaND").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaND").value[0]?.length >= 3){                
                this.criteriosND = [{ id: 1, texto: "Y Que Contenga" }, { id: 3, texto: "O Que Contenga" }];
                this.flagLimiteExcluyaND = true;
            }
            else{                
                this.flagLimiteExcluyaND = false;
            }
        })
        this.generalForm.get("textoExcluyaFF").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaFF").value[0]?.length >= 3){                
                this.criteriosFF = [{ id: 1, texto: "Y Que Contenga" }, { id: 3, texto: "O Que Contenga" }];
                this.flagLimiteExcluyaFF = true;
            }
            else{                
                this.flagLimiteExcluyaFF = false;
            }
        })


        this.generalForm.get("textoYContenga").valueChanges.subscribe(() => {
            if((this.generalForm.get("textoYContenga").value[0]?.length >= 3 && this.generalForm.get("textoOContenga").value[0]?.length >= 3)) {
                this.criterios = [{ id: 3, texto: "Que Excluya" }]
            }else if((this.generalForm.get("textoYContenga").value[0]?.length >= 3 && this.generalForm.get("textoExcluya").value[0]?.length >= 3)){
                this.criterios = [{ id: 2, texto: "O Que Contenga"}];
            }
        })
        this.generalForm.get("textoYContengaT").valueChanges.subscribe(() => {
            if((this.generalForm.get("textoYContengaT").value[0]?.length >= 3 && this.generalForm.get("textoOContengaT").value[0]?.length >= 3)) {
                this.criteriosT = [{ id: 3, texto: "Que Excluya" }]
            }else if((this.generalForm.get("textoYContengaT").value[0]?.length >= 3 && this.generalForm.get("textoExcluyaT").value[0]?.length >= 3)){
                this.criteriosT = [{ id: 2, texto: "O Que Contenga"}];
            }
        })
        this.generalForm.get("textoYContengaA").valueChanges.subscribe(() => {
            if((this.generalForm.get("textoYContengaA").value[0]?.length >= 3 && this.generalForm.get("textoOContengaA").value[0]?.length >= 3)) {
                this.criteriosA = [{ id: 3, texto: "Que Excluya" }]
            }else if((this.generalForm.get("textoYContengaA").value[0]?.length >= 3 && this.generalForm.get("textoExcluyaA").value[0]?.length >= 3)){
                this.criteriosA = [{ id: 2, texto: "O Que Contenga"}];
            }
        })
        this.generalForm.get("textoYContengaC").valueChanges.subscribe(() => {
            if((this.generalForm.get("textoYContengaC").value[0]?.length >= 3 && this.generalForm.get("textoOContengaC").value[0]?.length >= 3)) {
                this.criteriosC = [{ id: 3, texto: "Que Excluya" }]
            }else if((this.generalForm.get("textoYContengaC").value[0]?.length >= 3 && this.generalForm.get("textoExcluyaC").value[0]?.length >= 3)){
                this.criteriosC = [{ id: 2, texto: "O Que Contenga"}];
            }
        })
        this.generalForm.get("textoYContengaD").valueChanges.subscribe(() => {
            if((this.generalForm.get("textoYContengaD").value[0]?.length >= 3 && this.generalForm.get("textoOContengaD").value[0]?.length >= 3)) {
                this.criteriosD = [{ id: 3, texto: "Que Excluya" }]
            }else if((this.generalForm.get("textoYContengaD").value[0]?.length >= 3 && this.generalForm.get("textoExcluyaD").value[0]?.length >= 3)){
                this.criteriosD = [{ id: 2, texto: "O Que Contenga"}];
            }
        })
        this.generalForm.get("textoYContengaFF").valueChanges.subscribe(() => {
            if((this.generalForm.get("textoYContengaFF").value[0]?.length >= 3 && this.generalForm.get("textoOContengaFF").value[0]?.length >= 3)) {
                this.criteriosFF = [{ id: 3, texto: "Que Excluya" }]
            }else if((this.generalForm.get("textoYContengaFF").value[0]?.length >= 3 && this.generalForm.get("textoExcluyaFF").value[0]?.length >= 3)){
                this.criteriosFF = [{ id: 2, texto: "O Que Contenga"}];
            }
        })
        this.generalForm.get("textoYContengaE").valueChanges.subscribe(() => {
            if((this.generalForm.get("textoYContengaE").value[0]?.length >= 3 && this.generalForm.get("textoOContengaE").value[0]?.length >= 3)) {
                this.criteriosE = [{ id: 3, texto: "Que Excluya" }]
            }else if((this.generalForm.get("textoYContengaE").value[0]?.length >= 3 && this.generalForm.get("textoExcluyaE").value[0]?.length >= 3)){
                this.criteriosE = [{ id: 2, texto: "O Que Contenga"}];
            }
        })
        this.generalForm.get("textoYContengaND").valueChanges.subscribe(() => {
            if((this.generalForm.get("textoYContengaND").value[0]?.length >= 3 && this.generalForm.get("textoOContengaND").value[0]?.length >= 3)) {
                this.criteriosND = [{ id: 3, texto: "Que Excluya" }]
            }else if((this.generalForm.get("textoYContengaND").value[0]?.length >= 3 && this.generalForm.get("textoExcluyaND").value[0]?.length >= 3)){
                this.criteriosND = [{ id: 2, texto: "O Que Contenga"}];
            }
        })
        this.generalForm.get("textoYContengaPR").valueChanges.subscribe(() => {
            if((this.generalForm.get("textoYContengaPR").value[0]?.length >= 3 && this.generalForm.get("textoOContengaPR").value[0]?.length >= 3)) {
                this.criteriosPR = [{ id: 3, texto: "Que Excluya" }]
            }else if((this.generalForm.get("textoYContengaPR").value[0]?.length >= 3 && this.generalForm.get("textoExcluyaPR").value[0]?.length >= 3)){
                this.criteriosPR = [{ id: 2, texto: "O Que Contenga"}];
            }
        })
        this.generalForm.get("textoYContengaJR").valueChanges.subscribe(() => {
            if((this.generalForm.get("textoYContengaJR").value[0]?.length >= 3 && this.generalForm.get("textoOContengaJR").value[0]?.length >= 3)) {
                this.criteriosJR = [{ id: 3, texto: "Que Excluya" }]
            }else if((this.generalForm.get("textoYContengaJR").value[0]?.length >= 3 && this.generalForm.get("textoExcluyaJR").value[0]?.length >= 3)){
                this.criteriosJR = [{ id: 2, texto: "O Que Contenga"}];
            }
        })


        this.generalForm.get("textoOContenga").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluya").value[0]?.length >= 3 && this.generalForm.get("textoOContenga").value[0]?.length >= 3){
                this.criterios = [{ id: 1, texto: "Y Que Contenga" }]
            }else if(this.generalForm.get("textoOContenga").value[0]?.length >= 3 && this.generalForm.get("textoYContenga").value[0]?.length >= 3){
                this.criterios = [{ id: 3, texto: "Que Excluya"}];
            }
        })
        this.generalForm.get("textoOContengaT").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaT").value[0]?.length >= 3 && this.generalForm.get("textoOContengaT").value[0]?.length >= 3){
                this.criteriosT = [{ id: 1, texto: "Y Que Contenga" }]
            }else if(this.generalForm.get("textoOContengaT").value[0]?.length >= 3 && this.generalForm.get("textoYContengaT").value[0]?.length >= 3){
                this.criteriosT = [{ id: 3, texto: "Que Excluya"}];
            }
        })
        this.generalForm.get("textoOContengaA").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaA").value[0]?.length >= 3 && this.generalForm.get("textoOContengaA").value[0]?.length >= 3){
                this.criteriosA = [{ id: 1, texto: "Y Que Contenga" }]
            }else if(this.generalForm.get("textoOContengaA").value[0]?.length >= 3 && this.generalForm.get("textoYContengaA").value[0]?.length >= 3){
                this.criteriosA = [{ id: 3, texto: "Que Excluya"}];
            }
        })
        this.generalForm.get("textoOContengaC").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaC").value[0]?.length >= 3 && this.generalForm.get("textoOContengaC").value[0]?.length >= 3){
                this.criteriosC = [{ id: 1, texto: "Y Que Contenga" }]
            }else if(this.generalForm.get("textoOContengaC").value[0]?.length >= 3 && this.generalForm.get("textoYContengaC").value[0]?.length >= 3){
                this.criteriosC = [{ id: 3, texto: "Que Excluya"}];
            }
        })
        this.generalForm.get("textoOContengaD").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaD").value[0]?.length >= 3 && this.generalForm.get("textoOContengaD").value[0]?.length >= 3){
                this.criteriosD = [{ id: 1, texto: "Y Que Contenga" }]
            }else if(this.generalForm.get("textoOContengaD").value[0]?.length >= 3 && this.generalForm.get("textoYContengaD").value[0]?.length >= 3){
                this.criteriosD = [{ id: 3, texto: "Que Excluya"}];
            }
        })
        this.generalForm.get("textoOContengaPR").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaPR").value[0]?.length >= 3 && this.generalForm.get("textoOContengaPR").value[0]?.length >= 3){
                this.criteriosPR = [{ id: 1, texto: "Y Que Contenga" }]
            }else if(this.generalForm.get("textoOContengaPR").value[0]?.length >= 3 && this.generalForm.get("textoYContengaPR").value[0]?.length >= 3){
                this.criteriosPR = [{ id: 3, texto: "Que Excluya"}];
            }
        })
        this.generalForm.get("textoOContengaJR").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaJR").value[0]?.length >= 3 && this.generalForm.get("textoOContengaJR").value[0]?.length >= 3){
                this.criteriosJR = [{ id: 1, texto: "Y Que Contenga" }]
            }else if(this.generalForm.get("textoOContengaJR").value[0]?.length >= 3 && this.generalForm.get("textoYContengaJR").value[0]?.length >= 3){
                this.criteriosJR = [{ id: 3, texto: "Que Excluya"}];
            }
        })
        this.generalForm.get("textoOContengaND").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaND").value[0]?.length >= 3 && this.generalForm.get("textoOContengaND").value[0]?.length >= 3){
                this.criteriosND = [{ id: 1, texto: "Y Que Contenga" }]
            }else if(this.generalForm.get("textoOContengaND").value[0]?.length >= 3 && this.generalForm.get("textoYContengaND").value[0]?.length >= 3){
                this.criteriosND = [{ id: 3, texto: "Que Excluya"}];
            }
        })
        this.generalForm.get("textoOContengaE").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaE").value[0]?.length >= 3 && this.generalForm.get("textoOContengaE").value[0]?.length >= 3){
                this.criteriosE = [{ id: 1, texto: "Y Que Contenga" }]
            }else if(this.generalForm.get("textoOContengaE").value[0]?.length >= 3 && this.generalForm.get("textoYContengaE").value[0]?.length >= 3){
                this.criteriosE = [{ id: 3, texto: "Que Excluya"}];
            }
        })
        this.generalForm.get("textoOContengaFF").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaFF").value[0]?.length >= 3 && this.generalForm.get("textoOContengaFF").value[0]?.length >= 3){
                this.criteriosFF = [{ id: 1, texto: "Y Que Contenga" }]
            }else if(this.generalForm.get("textoOContengaFF").value[0]?.length >= 3 && this.generalForm.get("textoYContengaFF").value[0]?.length >= 3){
                this.criteriosFF = [{ id: 3, texto: "Que Excluya"}];
            }
        })

        
        this.generalForm.get("textoExcluya").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluya").value[0]?.length >= 3 && this.generalForm.get("textoOContenga").value[0]?.length >= 3){
                this.criterios = [{ id: 1, texto: "Y Que Contenga" }]
            }else if(this.generalForm.get("textoYContenga").value[0]?.length >= 3 && this.generalForm.get("textoExcluya").value[0]?.length >= 3){
                this.criterios = [{ id: 2, texto: "O Que Contenga"}];
            }
        })
        this.generalForm.get("textoExcluyaC").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaC").value[0]?.length >= 3 && this.generalForm.get("textoOContengaC").value[0]?.length >= 3){
                this.criteriosC = [{ id: 1, texto: "Y Que Contenga" }]
            }else if(this.generalForm.get("textoYContengaC").value[0]?.length >= 3 && this.generalForm.get("textoExcluyaC").value[0]?.length >= 3){
                this.criteriosC = [{ id: 2, texto: "O Que Contenga"}];
            }
        })
        this.generalForm.get("textoExcluyaA").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaA").value[0]?.length >= 3 && this.generalForm.get("textoOContengaA").value[0]?.length >= 3){
                this.criteriosA = [{ id: 1, texto: "Y Que Contenga" }]
            }else if(this.generalForm.get("textoYContengaA").value[0]?.length >= 3 && this.generalForm.get("textoExcluyaA").value[0]?.length >= 3){
                this.criteriosA = [{ id: 2, texto: "O Que Contenga"}];
            }
        })
        this.generalForm.get("textoExcluyaT").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaT").value[0]?.length >= 3 && this.generalForm.get("textoOContengaT").value[0]?.length >= 3){
                this.criteriosT = [{ id: 1, texto: "Y Que Contenga" }]
            }else if(this.generalForm.get("textoYContengaT").value[0]?.length >= 3 && this.generalForm.get("textoExcluyaT").value[0]?.length >= 3){
                this.criteriosT = [{ id: 2, texto: "O Que Contenga"}];
            }
        })
        this.generalForm.get("textoExcluyaD").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaD").value[0]?.length >= 3 && this.generalForm.get("textoOContengaD").value[0]?.length >= 3){
                this.criteriosD = [{ id: 1, texto: "Y Que Contenga" }]
            }else if(this.generalForm.get("textoYContengaD").value[0]?.length >= 3 && this.generalForm.get("textoExcluyaD").value[0]?.length >= 3){
                this.criteriosD = [{ id: 2, texto: "O Que Contenga"}];
            }
        })
        this.generalForm.get("textoExcluyaPR").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaPR").value[0]?.length >= 3 && this.generalForm.get("textoOContengaPR").value[0]?.length >= 3){
                this.criteriosPR = [{ id: 1, texto: "Y Que Contenga" }]
            }else if(this.generalForm.get("textoYContengaPR").value[0]?.length >= 3 && this.generalForm.get("textoExcluyaPR").value[0]?.length >= 3){
                this.criteriosPR = [{ id: 2, texto: "O Que Contenga"}];
            }
        })
        this.generalForm.get("textoExcluyaJR").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaJR").value[0]?.length >= 3 && this.generalForm.get("textoOContengaJR").value[0]?.length >= 3){
                this.criteriosJR = [{ id: 1, texto: "Y Que Contenga" }]
            }else if(this.generalForm.get("textoYContengaJR").value[0]?.length >= 3 && this.generalForm.get("textoExcluyaJR").value[0]?.length >= 3){
                this.criteriosJR = [{ id: 2, texto: "O Que Contenga"}];
            }
        })
        this.generalForm.get("textoExcluyaND").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaND").value[0]?.length >= 3 && this.generalForm.get("textoOContengaND").value[0]?.length >= 3){
                this.criteriosND = [{ id: 1, texto: "Y Que Contenga" }]
            }else if(this.generalForm.get("textoYContengaND").value[0]?.length >= 3 && this.generalForm.get("textoExcluyaND").value[0]?.length >= 3){
                this.criteriosND = [{ id: 2, texto: "O Que Contenga"}];
            }
        })
        this.generalForm.get("textoExcluyaE").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaE").value[0]?.length >= 3 && this.generalForm.get("textoOContengaE").value[0]?.length >= 3){
                this.criteriosE = [{ id: 1, texto: "Y Que Contenga" }]
            }else if(this.generalForm.get("textoYContengaE").value[0]?.length >= 3 && this.generalForm.get("textoExcluyaE").value[0]?.length >= 3){
                this.criteriosE = [{ id: 2, texto: "O Que Contenga"}];
            }
        })
        this.generalForm.get("textoExcluyaFF").valueChanges.subscribe(() => {
            if(this.generalForm.get("textoExcluyaFF").value[0]?.length >= 3 && this.generalForm.get("textoOContengaFF").value[0]?.length >= 3){
                this.criteriosFF = [{ id: 1, texto: "Y Que Contenga" }]
            }else if(this.generalForm.get("textoYContengaFF").value[0]?.length >= 3 && this.generalForm.get("textoExcluyaFF").value[0]?.length >= 3){
                this.criteriosFF = [{ id: 2, texto: "O Que Contenga"}];
            }
        })


        this.generalForm.get("textoExcluya").valueChanges.subscribe(() => {
            if((this.generalForm.get("textoExcluya").value[0]?.length >= 3 && this.generalForm.get("textoOContenga").value[0]?.length >= 3 && this.generalForm.get("textoYContenga").value[0]?.length >= 3)){
                this.criterios = [];
            }
        })
        this.generalForm.get("textoExcluyaPR").valueChanges.subscribe(() => {
            if((this.generalForm.get("textoExcluyaPR").value[0]?.length >= 3 && this.generalForm.get("textoOContengaPR").value[0]?.length >= 3 && this.generalForm.get("textoYContengaPR").value[0]?.length >= 3)){
                this.criteriosPR = [];
            }
        })
        this.generalForm.get("textoExcluyaJR").valueChanges.subscribe(() => {
            if((this.generalForm.get("textoExcluyaJR").value[0]?.length >= 3 && this.generalForm.get("textoOContengaJR").value[0]?.length >= 3 && this.generalForm.get("textoYContengaJR").value[0]?.length >= 3)){
                this.criteriosJR = [];
            }
        })
        this.generalForm.get("textoExcluyaT").valueChanges.subscribe(() => {
            if((this.generalForm.get("textoExcluyaT").value[0]?.length >= 3 && this.generalForm.get("textoOContengaT").value[0]?.length >= 3 && this.generalForm.get("textoYContengaT").value[0]?.length >= 3)){
                this.criteriosT = [];
            }
        })
        this.generalForm.get("textoExcluyaA").valueChanges.subscribe(() => {
            if((this.generalForm.get("textoExcluyaA").value[0]?.length >= 3 && this.generalForm.get("textoOContengaA").value[0]?.length >= 3 && this.generalForm.get("textoYContengaA").value[0]?.length >= 3)){
                this.criteriosA = [];
            }
        })
        this.generalForm.get("textoExcluyaD").valueChanges.subscribe(() => {
            if((this.generalForm.get("textoExcluyaD").value[0]?.length >= 3 && this.generalForm.get("textoOContengaD").value[0]?.length >= 3 && this.generalForm.get("textoYContengaD").value[0]?.length >= 3)){
                this.criteriosD = [];
            }
        })
        this.generalForm.get("textoExcluyaC").valueChanges.subscribe(() => {
            if((this.generalForm.get("textoExcluyaC").value[0]?.length >= 3 && this.generalForm.get("textoOContengaC").value[0]?.length >= 3 && this.generalForm.get("textoYContengaC").value[0]?.length >= 3)){
                this.criteriosC = [];
            }
        })
        this.generalForm.get("textoExcluyaE").valueChanges.subscribe(() => {
            if((this.generalForm.get("textoExcluyaE").value[0]?.length >= 3 && this.generalForm.get("textoOContengaE").value[0]?.length >= 3 && this.generalForm.get("textoYContengaE").value[0]?.length >= 3)){
                this.criteriosE = [];
            }
        })
        this.generalForm.get("textoExcluyaFF").valueChanges.subscribe(() => {
            if((this.generalForm.get("textoExcluyaFF").value[0]?.length >= 3 && this.generalForm.get("textoOContengaFF").value[0]?.length >= 3 && this.generalForm.get("textoYContengaFF").value[0]?.length >= 3)){
                this.criteriosFF = [];
            }
        })
        this.generalForm.get("textoExcluyaND").valueChanges.subscribe(() => {
            if((this.generalForm.get("textoExcluyaND").value[0]?.length >= 3 && this.generalForm.get("textoOContengaND").value[0]?.length >= 3 && this.generalForm.get("textoYContengaND").value[0]?.length >= 3)){
                this.criteriosND = [];
            }
        })
        
    }

    /** Eventos MultiSelect Tribunales*/

    onItemSelectTribunales(item: any) {
        if (item.id == 13) {
            this.flagTribunales_1 = true
            this.auxTribunales.push(item.texto)
            if (this.generalForm.get('origen')?.value.indexOf(1) < 0) {
                this.auxOrigen.push(1)
                this.generalForm.patchValue({
                    origen: this.auxOrigen
                })
            }
            this.generalForm.patchValue({
                ddTribunales: this.auxTribunales,
                sub_origen_id_23: 13
            })
        }
        if (item.id == 14) {
            this.flagTribunales_2 = true
            this.auxTribunales.push(item.texto)
            if (this.generalForm.get('origen')?.value.indexOf(1) < 0) {
                this.auxOrigen.push(1)
                this.generalForm.patchValue({
                    origen: this.auxOrigen
                })
            }
            this.generalForm.patchValue({
                ddTribunales: this.auxTribunales,
                sub_origen_id_24: 14
            })
        }
        if (item.id == 12) {
            this.flagTribunales_3 = true
            this.auxTribunales.push(item.texto)
            if (this.generalForm.get('origen')?.value.indexOf(1) < 0) {
                this.auxOrigen.push(1)
                this.generalForm.patchValue({
                    origen: this.auxOrigen
                })
            }
            this.generalForm.patchValue({
                ddTribunales: this.auxTribunales,
                sub_origen_id_25: 12
            })
        }

        this.allItems.push(item);
        this.allItemsExtraOrigen.push(item);
        this.actualizarFiltros();
    }

    onItemDeSelectTribunales(item: any) {
        if (item.id == 13) {
            this.flagTribunales_1 = false
            this.auxTribunales = this.auxTribunales.filter((id: any) => id != 1);
            this.generalForm.patchValue({
                ddTribunales: this.auxTribunales,
                sub_origen_id_23: ''
            })
            if (this.generalForm.get('chkJurisprudencia')?.value == false) {
                if (this.generalForm.get('chkComisionGenero')?.value == false) {
                    if (this.flagTribunales_1 == false &&
                        this.flagTribunales_2 == false &&
                        this.flagTribunales_3 == false) {
                        this.auxOrigen = this.auxOrigen.filter((id: any) => id != 1);
                        this.generalForm.patchValue({
                            origen: this.auxOrigen
                        })
                    }
                }
            }
        }
        if (item.id == 14) {
            this.flagTribunales_2 = false
            this.auxTribunales = this.auxTribunales.filter((id: any) => id != 2);
            this.generalForm.patchValue({
                ddTribunales: this.auxTribunales,
                sub_origen_id_24: ''
            })
            if (this.generalForm.get('chkJurisprudencia')?.value == false) {
                if (this.generalForm.get('chkComisionGenero')?.value == false) {
                    if (this.flagTribunales_1 == false &&
                        this.flagTribunales_2 == false &&
                        this.flagTribunales_3 == false) {
                        this.auxOrigen = this.auxOrigen.filter((id: any) => id != 1);
                        this.generalForm.patchValue({
                            origen: this.auxOrigen
                        })
                    }
                }
            }
        }
        if (item.id == 12) {
            this.flagTribunales_3 = false
            this.auxTribunales = this.auxTribunales.filter((id: any) => id != 3);
            this.generalForm.patchValue({
                ddTribunales: this.auxTribunales,
                sub_origen_id_25: ''
            })
            if (this.generalForm.get('chkJurisprudencia')?.value == false) {
                if (this.generalForm.get('chkComisionGenero')?.value == false) {
                    if (this.flagTribunales_1 == false &&
                        this.flagTribunales_2 == false &&
                        this.flagTribunales_3 == false) {
                        this.auxOrigen = this.auxOrigen.filter((id: any) => id != 1);
                        this.generalForm.patchValue({
                            origen: this.auxOrigen
                        })
                    }
                }
            }
        }
        this.allItems = this.allItems.filter((_item: any) => _item.id !== item.id);
        this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((_item: any) => _item.id !== item.id);
        this.actualizarFiltros();
    }
    onSelectAllTribunales(items: any) {
        this.flagTribunales_1 = true
        this.flagTribunales_2 = true
        this.flagTribunales_3 = true
        for (const iterator of items) {
            this.auxTribunales.push(iterator.texto)
        }
        if (this.generalForm.get('origen')?.value.indexOf(1) < 0) {
            this.auxOrigen.push(1)
            this.generalForm.patchValue({
                origen: this.auxOrigen
            })
        }
        this.generalForm.patchValue({
            ddTribunales: this.auxTribunales,
            sub_origen_id_23: '13',
            sub_origen_id_24: '14',
            sub_origen_id_25: '12'
        })
        this.generalForm.get("selectedItemsTribunales").valueChanges.subscribe((origen: any) => {
            this.allItems = this.allItems.concat(this.generalForm.get('selectedItemsTribunales')?.value);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.concat(this.generalForm.get('selectedItemsTribunales')?.value);
            this.actualizarFiltros();
        })
        this.actualizarFiltros();
    }
    public onDeSelectAllTribunales() {
        this.flagTribunales_1 = false
        this.flagTribunales_2 = false
        this.flagTribunales_3 = false
        this.generalForm.get("selectedItemsTribunales").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('selectedItemsTribunales')?.value.length == 0) {
                this.auxTribunales = [];
                if (this.generalForm.get('chkJurisprudencia')?.value == false) {
                    if (this.generalForm.get('chkComisionGenero')?.value == false) {
                        this.auxOrigen = this.auxOrigen.filter((id: any) => id != 1);
                        this.generalForm.patchValue({
                            origen: this.auxOrigen
                        })
                    }
                }
                this.generalForm.patchValue({
                    ddTribunales: this.auxTribunales,
                    sub_origen_id_23: '',
                    sub_origen_id_24: '',
                    sub_origen_id_25: ''
                })

                this.allItems = this.allItems.filter((item: any) => item.id != 12);
                this.allItems = this.allItems.filter((item: any) => item.id != 13);
                this.allItems = this.allItems.filter((item: any) => item.id != 14);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 12);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 13);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 14);
                if(!this.loginUser && !this.cerrarSecion){
                    this.actualizarFiltros();
                }
            }
            this.flagTribunales_1 = false
            this.flagTribunales_2 = false
            this.flagTribunales_3 = false
        })
    }

    /** Fin Tribunales */

    public origenCE() {
        this.generalForm.get("chkActosAdministrativos").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('chkActosAdministrativos')?.value == true) {
                this.flagAdmin = true;
                this.auxOrigen.push(5)
                this.generalForm.patchValue({
                    origen: this.auxOrigen
                })
            }
            else if (this.generalForm.get('chkActosAdministrativos')?.value == false) {
                this.flagAdmin = false;
                this.auxOrigen = this.auxOrigen.filter((id: any) => id != 5);
                this.generalForm.patchValue({
                    origen: this.auxOrigen,
                    selectedItemsActos:[]
                })
            }
            if(!this.loginUser && !this.cerrarSecion){
                this.actualizarFiltros();
            }
        })
        this.generalForm.get("sub_origen_id_21").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('sub_origen_id_21')?.value == 5) {
                this.flagAdmin = true;
            }
            else if (this.generalForm.get('sub_origen_id_21')?.value == '') {
                this.flagAdmin = false;
            }
        })
    }
    /** Eventos MultiSelect Actos*/

    onItemSelectActos(item: any) {
        if (item.id == 1) {
            this.flagActos_1 = true;
            this.auxActosAdmin.push(item.texto)
            this.generalForm.patchValue({
                ddTipoActos: this.auxActosAdmin
            })

            this.allItems.push({ id: 5, texto: "Acuerdo" });
            this.allItemsExtraOrigen.push({ id: 5, texto: "Acuerdo" });
        }
        if (item.id == 2) {
            this.flagActos_2 = true;
            this.auxActosAdmin.push(item.texto)
            this.generalForm.patchValue({
                ddTipoActos: this.auxActosAdmin
            })
            this.allItems.push({ id: 5, texto: "Circular" });
            this.allItemsExtraOrigen.push({ id: 5, texto: "Circular" });
        }
        if (item.id == 3) {
            this.flagActos_3 = true;
            this.auxActosAdmin.push(item.texto)
            this.generalForm.patchValue({
                ddTipoActos: this.auxActosAdmin
            })
            this.allItems.push({ id: 5, texto: "Resolución de Sala" });
            this.allItemsExtraOrigen.push({ id: 5, texto: "Resolución de Sala" });
        }
        if (item.id == 4) {
            this.flagActos_4 = true;
            this.auxActosAdmin.push(item.texto)
            this.generalForm.patchValue({
                ddTipoActos: this.auxActosAdmin
            })
            this.allItems.push({ id: 5, texto: "Resolución de Presidencia" });
            this.allItemsExtraOrigen.push({ id: 5, texto: "Resolución de Presidencia" });
        }
        if (item.id == 5) {
            this.flagActos_5 = true;
            this.generalForm.patchValue({
                ddTipoActos: this.auxActosAdmin
            })
            this.allItems.push({ id: 0, texto: "Gacetas" });
            this.allItemsExtraOrigen.push({ id: 0, texto: "Gacetas" });
        }

        this.actualizarFiltros();
    }

    onItemDeSelectActos(item: any) {
        if (item.id == 1) {
            this.flagActos_1 = false;
            this.auxActosAdmin = this.auxActosAdmin.filter((texto: any) => texto != "Acuerdos");
            this.generalForm.patchValue({
                ddTipoActos: this.auxActosAdmin
            })

            if (this.flagActos_2 == false &&
                this.flagActos_3 == false &&
                this.flagActos_4 == false) {
                this.allItems = this.allItems.filter((item: any) => item.id != 5);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 5);
            }

        }
        if (item.id == 2) {
            this.flagActos_2 = false;
            this.auxActosAdmin = this.auxActosAdmin.filter((texto: any) => texto != "Circular");
            this.generalForm.patchValue({
                ddTipoActos: this.auxActosAdmin
            })

            if (this.flagActos_1 == false &&
                this.flagActos_3 == false &&
                this.flagActos_4 == false) {
                this.allItems = this.allItems.filter((item: any) => item.id != 5);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 5);
            }
        }
        if (item.id == 3) {
            this.flagActos_3 = false;
            this.auxActosAdmin = this.auxActosAdmin.filter((texto: any) => texto != "Resoluciones de Sala");
            this.generalForm.patchValue({
                ddTipoActos: this.auxActosAdmin
            })

            if (this.flagActos_1 == false &&
                this.flagActos_2 == false &&
                this.flagActos_4 == false) {
                this.allItems = this.allItems.filter((item: any) => item.id != 5);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 5);
            }
        }
        if (item.id == 4) {
            this.flagActos_4 = false;
            this.auxActosAdmin = this.auxActosAdmin.filter((texto: any) => texto != "Resoluciones de Presidencia");
            this.generalForm.patchValue({
                ddTipoActos: this.auxActosAdmin
            })

            if (this.flagActos_1 == false &&
                this.flagActos_2 == false &&
                this.flagActos_3 == false) {
                this.allItems = this.allItems.filter((item: any) => item.id != 5);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 5);
            }
        }
        if (item.id == 5) {
            this.flagActos_5 = false;
            this.generalForm.patchValue({
                ddTipoActos: this.auxActosAdmin
            })

            this.allItems = this.allItems.filter((item: any) => item.id != 0);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 0);
        }
        this.actualizarFiltros();
    }
    onSelectAllActos(items: any) {
        this.flagActos_1 = true;
        this.flagActos_2 = true;
        this.flagActos_3 = true;
        this.flagActos_4 = true;
        this.flagActos_5 = true;
        this.flagActos_6 = true;
        for (const iterator of items) {
            if(iterator.texto!=="Gacetas"){
                this.auxActosAdmin.push(iterator.texto)
            }
        }
        this.generalForm.patchValue({
            ddTipoActos: this.auxActosAdmin
        })
       

        this.allItems.push({ id: 5, texto: "All" });
        this.allItemsExtraOrigen.push({ id: 5, texto: "All" });
        this.allItems.push({ id: 0, texto: "Gacetas" });
        this.allItemsExtraOrigen.push({ id: 0, texto: "Gacetas" });

        this.actualizarFiltros();
    }
    public onDeSelectAllActos() {
        this.flagActos_1 = false;
        this.flagActos_2 = false;
        this.flagActos_3 = false;
        this.flagActos_4 = false;
        this.flagActos_5 = false;
        this.flagActos_6 = false;
        this.generalForm.get("selectedItemsActos").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('selectedItemsActos')?.value.length == 0) {
                this.auxActosAdmin = [];
                this.generalForm.patchValue({
                    ddTipoActos: this.auxActosAdmin
                })

                this.allItems = this.allItems.filter((item: any) => item.id != 0);
                this.allItems = this.allItems.filter((item: any) => item.id != 5);

                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 0);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 5);
                if(!this.loginUser && !this.cerrarSecion){
                    this.actualizarFiltros();
                }
            }
        })
    }

    /** Fin Actos */

    /** Eventos MultiSelect Sección*/

    onItemSelectSeccion(item: any) {
        this.seccionOptionsCheck.push(item.value);
        this.generalForm.patchValue({
            seccionOptionsCheck: this.seccionOptionsCheck
        })
        //console.log(this.seccionOptionsCheck);
    }

    onItemDeSelectSeccion(item: any) {
        for (const iterator of this.generalForm.get("ddSeccion").value) {
            if (this.seccionOptionsCheck.push(item.id) == iterator.id) {
                this.seccionOptionsCheck.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            seccionOptionsCheck: this.seccionOptionsCheck
        })
    }

    onSelectAllSeccion(items: any) {
        for (const iterator of items) {
            this.seccion.push(iterator.value);
        }
        this.generalForm.patchValue({
            seccionOptionsCheck: this.seccionOptionsCheck
        })
    }

    public onDeSelectAllSeccion() {
        this.generalForm.get("ddSeccion").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddSeccion')?.value.length == 0) {
                this.seccionOptionsCheck = [];
            }
            this.generalForm.patchValue({
                seccionOptionsCheck: this.seccionOptionsCheck
            })
        })
    }
    /** Fin Sección */
    /** Eventos MultiSelect TipoNorma*/

    onItemSelectTipoNorma(item: any) {
        this.tipoNormaSelect.push(item.value);
        this.generalForm.patchValue({
        })
    }

    onItemDeSelectTipoNorma(item: any) {
        for (const iterator of this.generalForm.get("selectedItemsTipoNorma").value) {
            if (this.tipoNormaSelect.push(item.id) == iterator.id) {
                this.tipoNormaSelect.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
        })
    }

    onSelectAllTipoNorma(items: any) {
        for (const iterator of items) {
            this.tipoNormaSelect.push(iterator.value);
        }
        this.generalForm.patchValue({
        })
    }

    public onDeSelectAllTipoNorma() {
        this.generalForm.get("selectedItemsTipoNorma").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('selectedItemsTipoNorma')?.value.length == 0) {
                this.tipoNormaSelect = [];
                this.generalForm.patchValue({
                })
            }
        })
    }
    /** Fin TipoNorma */

    /** Eventos MultiSelect MesesTribunales*/


    onItemSelectMeses(item: any) {
        this.MesesCheck.push(item.id);
        this.generalForm.patchValue({
            MesesCheck: this.MesesCheck
        })
    }

    onItemDeSelectMeses(item: any) {
        /* for (const iterator of this.generalForm.get("selectedItemsMeses").value) {
            if (this.MesesCheck.push(item.id) != iterator.id) {
                this.MesesCheck.splice(iterator, item.id)
            }
        } */

        this.MesesCheck = this.MesesCheck.filter(mes => mes != item.id);

        this.generalForm.patchValue({
            MesesCheck: this.MesesCheck
        })
        
    }

    onSelectAllMeses(items: any) {
        for (const iterator of items) {
            this.MesesCheck.push(iterator.id);
        }
        this.generalForm.patchValue({
            MesesCheck: this.MesesCheck
        })
    }

    public onDeSelectAllMeses() {
        this.generalForm.get("selectedItemsMeses").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('selectedItemsMeses')?.value.length == 0) {
                this.MesesCheck = [];
                this.generalForm.patchValue({
                    MesesCheck: this.MesesCheck
                })
            }
        })
    }

    /** Eventos MultiSelect Corporaciones*/

    onItemSelectCorporaciones(item: any) { 
        this.corporacionesCheck.push(item.value);
        this.generalForm.patchValue({
            corporacionesCheck: this.corporacionesCheck
        })
    }
    onItemDeSelectCorporaciones(item: any) { 
        for(const iterator of this.generalForm.get("ddCorporaciones").value) {
            if (this.corporacionesCheck.push(item.id) == iterator.id) {
                this.corporacionesCheck.splice(iterator, item.id)
            }
    }
    this.generalForm.patchValue({
        corporacionesCheck: this.corporacionesCheck
    })
}
    onSelectAllCorporaciones(items: any) { 
        for (const iterator of items) {
            this.corporacionesCheck.push(iterator.value);
        }
        this.generalForm.patchValue({
            corporacionesCheck: this.corporacionesCheck
        })
    }
    public onDeSelectAllCorporaciones() { 
        this.generalForm.get("ddCorporaciones").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddCorporaciones')?.value.length == 0) {
                this.corporacionesCheck = [];
            }
            this.generalForm.patchValue({
                corporacionesCheck: this.corporacionesCheck
            })
        })
    }

    /** Fin Corporaciones */

    /** Eventos MultiSelect Estado*/

    onItemSelectEstado(item: any) { 
      this.EstadoCheck.push(item.value);
      this.generalForm.patchValue({
        EstadoCheck: this.EstadoCheck
      })  
    }
    onItemDeSelectEstado(item: any) { 
        for (const iterator of this.generalForm.get("ddEstado").value){
            if (this.EstadoCheck.push(item.id) == iterator.id){
                this.EstadoCheck.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            EstadoCheck: this.EstadoCheck
        })
    }
    onSelectAllEstado(items: any) { 
        for (const iterator of items){
            this.EstadoCheck.push(iterator.value);
        }
        this.generalForm.patchValue({
            EstadoCheck: this.EstadoCheck
        })
    }
    public onDeSelectAllEstado() {
        this.generalForm.get("ddEstado").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddEstado')?.value.length == 0) {
                this.EstadoCheck = [];
            }
            this.generalForm.patchValue({
                EstadoCheck: this.EstadoCheck   
            })
        })
     }

    /** Fin Estado */

    /** Eventos MultiSelect BibliotecaRed*/
    
    



    onItemSelectBibliotecaBibliotecas(item: any) { 
        this.origenBibliotecaRedCheck.push(item.value);
        this.generalForm.patchValue({
            origenBibliotecaRedCheck: this.origenBibliotecaRedCheck
        })

    }
    onItemDeSelectBibliotecaBibliotecas(item: any) {
        for (const iterator of this.generalForm.get("selectedItemsOrigenBibliotecas").value) {
            if (this.origenBibliotecaRedCheck.push(item.id) == iterator.id) {
                this.origenBibliotecaRedCheck.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            origenBibliotecaRedCheck: this.origenBibliotecaRedCheck
        })
     }
    onSelectAllBibliotecaBibliotecas(items: any) { 
        for (const iterator of items) {
            this.origenBibliotecaRedCheck.push(iterator.value);
        }
        this.generalForm.patchValue({
            origenBibliotecaRedCheck: this.origenBibliotecaRedCheck
        })
    }
    onDeSelectAllBibliotecaBibliotecas() { 
        this.generalForm.get("selectedItemsOrigenBibliotecas").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('selectedItemsOrigenBibliotecas')?.value.length == 0) {
                this.origenBibliotecaRedCheck = [];
            }
            this.generalForm.patchValue({
                origenBibliotecaRedCheck: this.origenBibliotecaRedCheck
            })
        })
    }




    onItemSelectBibliotecaRed(item: any) { 
        this.origenBibliotecaRedCheck.push(item.texto);
        this.generalForm.patchValue({
            origenBibliotecaRedCheck: this.origenBibliotecaRedCheck
        })

    }
    onItemDeSelectBibliotecaRed(item: any) {
        for (const iterator of this.generalForm.get("selectedItemsOrigenBibliotecas").value) {
            if (this.origenBibliotecaRedCheck.push(item.id) == iterator.id) {
                this.origenBibliotecaRedCheck.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            origenBibliotecaRedCheck: this.origenBibliotecaRedCheck
        })
     }
    onSelectAllBibliotecaRed(items: any) { 
        for (const iterator of items) {
            this.origenBibliotecaRedCheck.push(iterator.texto);
        }
        this.generalForm.patchValue({
            origenBibliotecaRedCheck: this.origenBibliotecaRedCheck
        })
    }
    onDeSelectAllBibliotecaRed() { 
        this.generalForm.get("selectedItemsOrigenBibliotecas").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('selectedItemsOrigenBibliotecas')?.value.length == 0) {
                this.origenBibliotecaRedCheck = [];
            }
            this.generalForm.patchValue({
                origenBibliotecaRedCheck: this.origenBibliotecaRedCheck
            })
        })
    }

    /** Fin BibliotecaRed */

    /** Eventos MultiSelect Origen-Origen*/

    onItemSelectOrigen(item: any) { }
    onItemDeSelectOrigen(item: any) { }
    onSelectAllOrigen(items: any) { }
    public onDeSelectAllOrigen() { }

    /** Fin Origen-Origen */

    onItemSelectTipoMaterial(item: any) { 
        this.origenVideotecaCheck.push(item.value);
        this.generalForm.patchValue({
            tipoMaterial: this.origenVideotecaCheck
        })
    }
    onItemDeSelectTipoMaterial(item: any) { 
        for (const iterator of this.generalForm.get("tipoDeMaterial").value) {
            if (this.origenVideotecaCheck.push(item.id) == iterator.id) {
                this.origenVideotecaCheck.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            tipoMaterial: this.origenVideotecaCheck
        })
    }
    onSelectAllTipoMaterial(items: any) { 
        for (const iterator of items) {
            this.origenVideotecaCheck.push(iterator.value);
        }
        this.generalForm.patchValue({
            tipoMaterial: this.origenVideotecaCheck
        })
    }
    public onDeSelectAllTipoMaterial() {
        this.generalForm.get("tipoDeMaterial").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get("tipoDeMaterial")?.value.length == 0) {
                this.origenVideotecaCheck = [];
            }
            this.generalForm.patchValue({
                tipoMaterial: this.origenVideotecaCheck
            })
        })
     }

    /** Inicio Anexo 4 */
    onItemSelectDepartamentoInmueble(item: any) { }
    onItemDeSelectDepartamentoInmueble(item: any) { }
    onSelectAllDepartamentoInmueble(items: any) { }
    public onDeSelectAllDepartamentoInmueble() { }

    onItemSelectCiudadInmueble(item: any) { }
    onItemDeSelectCiudadInmueble(item: any) { }
    onSelectAllCiudadInmueble(items: any) { }
    public onDeSelectAllCiudadInmueble() { }

    onItemSelectMunicipioInmueble(item: any) { }
    onItemDeSelectMunicipioInmueble(item: any) { }
    onSelectAllMunicipioInmueble(items: any) { }
    public onDeSelectAllMunicipioInmueble() { }

    onItemSelectCorregimientoInmueble(item: any) { }
    onItemDeSelectCorregimientoInmueble(item: any) { }
    onSelectAllCorregimientoInmueble(items: any) { }
    public onDeSelectAllCorregimientoInmueble() { }

    onItemSelectVeredaInmueble(item: any) { }
    onItemDeSelectVeredaInmueble(item: any) { }
    onSelectAllVeredaInmueble(items: any) { }
    public onDeSelectAllVeredaInmueble() { }

    onItemSelectBarrioInmueble(item: any) { }
    onItemDeSelectBarrioInmueble(item: any) { }
    onSelectAllBarrioInmueble(items: any) { }
    public onDeSelectAllBarrioInmueble() { }

    onItemSelectTribunalSuperior(item: any) {
        this.tipoTribunalSuperiorCheck.push(item.value);
        this.generalForm.patchValue({
            tribunalSuperior: this.tipoTribunalSuperiorCheck
        })
    
     }
    onItemDeSelectTribunalSuperior(item: any) {
        for (const iterator of this.generalForm.get("tribunalSuperior").value) {
            if (this.tipoTribunalSuperiorCheck.push(item.id) == iterator.id) {
                this.tipoTribunalSuperiorCheck.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            tipoTribunalSuperior: this.tipoTribunalSuperiorCheck
        })
     }
    onSelectAllTribunalSuperior(items: any) {
        for (const iterator of items) {
            this.tipoTribunalSuperiorCheck.push(iterator.value);
        }
        this.generalForm.patchValue({
            tipoTribunalSuperior: this.tipoTribunalSuperiorCheck
        })
     }
    public onDeSelectAllTribunalSuperior() { 
        this.generalForm.get("selectedItemsTribunalSuperior").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('selectedItemsTribunalSuperior')?.value.length == 0) {
                this.tipoTribunalSuperiorCheck = [];
            }
            this.generalForm.patchValue({
                tipoTribunalSuperior: this.tipoTribunalSuperiorCheck
            })
        })
    }

    onItemSelectTribunalAdministrativo(item: any) {
        this.tipoTribunalAdministrativo.push(item.value);
        this.generalForm.patchValue({
            tribunalAdministrativo: this.tipoTribunalAdministrativo
        })
        this.generalForm.patchValue({
            tribunalAdministrativo: '',
        })
    }
    onItemDeSelectTribunalAdministrativo(item: any) {
        for (const iterator of this.generalForm.get("tribunalAdministrativo").value) {
            if (this.tipoTribunalAdministrativo.push(item.id) == iterator.id) {
                this.tipoTribunalAdministrativo.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            tribunalAdministrativo: this.tipoTribunalAdministrativo
        })
    }
    
    onSelectAllTribunalAdministrativo(items: any) {
        for (const iterator of items) {
            this.tipoTribunalAdministrativo.push(iterator.value);
        }
        this.generalForm.patchValue({
            tribunalAdministrativo: this.tipoTribunalAdministrativo
        })
    }

    public onDeSelectAllTribunalAdministrativo() {
        this.generalForm.get("selectedItemsTribunalAdministrativo").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('selectedItemsTribunalAdministrativo')?.value.length == 0) {
                this.tipoTribunalAdministrativo = [];
            }
            this.generalForm.patchValue({
                tribunalAdministrativo: this.tipoTribunalAdministrativo
            })
        })
    }



    /** Procedencia */

    onItemSelectTribunalDespacho(item: any) {
        this.TipoProcedenciasCheck.push(item.value);
        this.generalForm.patchValue({
            TipoProcedencia: this.TipoProcedenciasCheck
        })
    }

    onItemDeSelectTribunalDespacho(item: any) {
        for (const iterator of this.generalForm.get("selectedItemsTribunalDespacho").value) {
            if (this.tribunalDespachoCheck.push(item.id) == iterator.id) {
                this.tribunalDespachoCheck.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            TipoProcedencia: this.tribunalDespachoCheck
        })
    }

    onSelectAllTribunalDespacho(items: any) {
        for (const iterator of items) {
            this.tribunalDespachoCheck.push(iterator.value);
        }
        this.generalForm.patchValue({
            tribunalDespachoCheck: this.tribunalDespachoCheck
        })
    }

    public onDeSelectAllTribunalDespacho() {
        this.generalForm.get("selectedItemsTribunalDespacho").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('selectedItemsTribunalDespacho')?.value.length == 0) {
                this.tribunalDespachoCheck = [];
            }
            this.generalForm.patchValue({
                tribunalDespachoCheck: this.tribunalDespachoCheck
            })
        })
    }

    /** Fin Procedencia */


    /** Fin Anexo 4 */

    /** Procedencia */

    onItemSelectTipoProcedencia(item: any) {
        this.TipoProcedenciasCheck.push(item.value);
        this.generalForm.patchValue({
            TipoProcedencia: this.TipoProcedenciasCheck
        })
    }

    onItemDeSelectTipoProcedencia(item: any) {
        for (const iterator of this.generalForm.get("ddProcedencia").value) {
            if (this.TipoProcedenciasCheck.push(item.id) == iterator.id) {
                this.TipoProcedenciasCheck.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            TipoProcedencia: this.TipoProcedenciasCheck
        })
    }

    onSelectAllTipoProcedencia(items: any) {
        for (const iterator of items) {
            this.TipoProcedenciasCheck.push(iterator.value);
        }
        this.generalForm.patchValue({
            TipoProcedencia: this.TipoProcedenciasCheck
        })
    }

    public onDeSelectAllTipoProcedencia() {
        this.generalForm.get("ddProcedencia").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddProcedencia')?.value.length == 0) {
                this.TipoProcedenciasCheck = [];
            }
            this.generalForm.patchValue({
                TipoProcedencia: this.TipoProcedenciasCheck
            })
        })
    }

    /** Fin Procedencia */

    /** Eventos MultiSelect Delitos*/

    onItemSelectDelitos(item: any) {
        this.DelitosCheck.push(item.value);
        this.generalForm.patchValue({
            DelitosCheck: this.DelitosCheck
        })
    }

    onItemDeSelectDelitos(item: any) {
        for (const iterator of this.generalForm.get("ddDelitos").value) {
            if (this.DelitosCheck.push(item.id) == iterator.id) {
                this.DelitosCheck.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            DelitosCheck: this.DelitosCheck
        })
    }

    onSelectAllDelitos(items: any) {
        for (const iterator of items) {
            this.DelitosCheck.push(iterator.value);
        }
        this.generalForm.patchValue({
            DelitosCheck: this.DelitosCheck
        })
    }

    public onDeSelectAllDelitos() {
        this.generalForm.get("ddDelitos").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddDelitos')?.value.length == 0) {
                this.DelitosCheck = [];
            }
            this.generalForm.patchValue({
                DelitosCheck: this.DelitosCheck
            })
        })
    }

    /**Fin  Eventos MultiSelect Delitos*/

    /** Eventos MultiSelect Magistrado*/

    onItemSelectMagistrado(item: any) {
        this.MagistradoCheck.push(item.value);
        this.generalForm.patchValue({
            MagistradoCheck: this.MagistradoCheck
        })
    }

    onItemDeSelectMagistrado(item: any) {
        for (const iterator of this.generalForm.get("ddMagistradoSalvamento").value) {
            if (this.MagistradoCheck.push(item.id) == iterator.id) {
                this.MagistradoCheck.splice(iterator, item.id)
            }
        }
        this.generalForm.patchValue({
            MagistradoCheck: this.MagistradoCheck
        })
    }

    onSelectAllMagistrado(items: any) {
        for (const iterator of items) {
            this.MagistradoCheck.push(iterator.value);
        }
        this.generalForm.patchValue({
            MagistradoCheck: this.MagistradoCheck
        })
    }

    public onDeSelectAllMagistrado() {
        this.generalForm.get("ddMagistradoSalvamento").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('ddMagistradoSalvamento')?.value.length == 0) {
                this.MagistradoCheck = [];
            }
            this.generalForm.patchValue({
                MagistradoCheck: this.MagistradoCheck
            })
        })
    }

    /**Fin  Eventos MultiSelect Delitos*/

    /** Eventos MultiSelect Tipo+*/

    onItemSelect(item: any) {

        if (item.id == 6) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_1: this.auxSubOrigenID
            })
        }
        if (item.id == 8) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_2: this.auxSubOrigenID
            })
            this.allItemsExtraOrigen.push({ id: 31, texto: "SAMAI" })
        }
        if (item.id == 7) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_3: this.auxSubOrigenID
            })
        }
        if (item.id == 9) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_4: this.auxSubOrigenID
            })
        }
        if (item.id == 10) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_5: this.auxSubOrigenID
            })
        }

        this.allItems.push(item);
        this.allItemsExtraOrigen.push(item);
        this.actualizarFiltros();
    }

    onItemDeSelect(item: any) {
        if (item.id == 6) {
            this.auxSubOrigen = this.auxSubOrigen.filter((id: any) => id != 6);
            this.auxSubOrigenID = ''
            this.generalForm.patchValue({
                sub_origen_id_1: '',
                extra_origen_id: [''],
                chkSoloGacetas: false,
                subOrigen: this.auxSubOrigen
            })
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 30);
        }
        if (item.id == 8) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_2: '',
                chkBoletinesJurisprudenciales: false
            })
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 31);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 32);
        }
        if (item.id == 7) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_3: ''
            })
        }
        if (item.id == 9) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_4: ''
            })
        }
        if (item.id == 10) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_5: ''
            })
        }

        this.allItems = this.allItems.filter((_item: any) => _item.id !== item.id);
        this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((_item: any) => _item.id !== item.id);
        this.actualizarFiltros();
    }

    onSelectAll(items: any) {
        this.generalForm.patchValue({
            sub_origen_id_1: 6,
            sub_origen_id_2: 8,
            sub_origen_id_3: 7,
            sub_origen_id_4: 9,
            sub_origen_id_5: 10,
        })
        this.generalForm.get("selectedItems").valueChanges.subscribe((origen: any) => {
            this.allItems = this.allItems.concat(this.generalForm.value.selectedItems);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.concat(this.generalForm.value.selectedItems);
            this.actualizarFiltros();
        })
        this.allItemsExtraOrigen.push({ id: 31, texto: "SAMAI" })
    }

    public onDeSelectAll() {
        this.auxSubOrigen = this.auxSubOrigen.filter((id: any) => id != 6);
        this.generalForm.get("selectedItems").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('selectedItems')?.value.length == 0) {
                this.generalForm.patchValue({
                    sub_origen_id_1: '',
                    sub_origen_id_2: '',
                    sub_origen_id_3: '',
                    sub_origen_id_4: '',
                    sub_origen_id_5: '',
                    extra_origen_id: [],
                    chkSoloGacetas: false,
                    subOrigen: this.auxSubOrigen
                })
                this.allItems = this.allItems.filter((item: any) => item.id != 6);
                this.allItems = this.allItems.filter((item: any) => item.id != 7);
                this.allItems = this.allItems.filter((item: any) => item.id != 8);
                this.allItems = this.allItems.filter((item: any) => item.id != 9);
                this.allItems = this.allItems.filter((item: any) => item.id != 10);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 6);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 7);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 8);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 9);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 10);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 30);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 31);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 32);
                this.actualizarFiltros();
            }
        }
        )
        //this.cargarTemaTres();
    }
    /**Fin  Eventos MultiSelect Delitos*/

    /** Eventos MultiSelect Tipo Biblioteca */

    onItemSelectBiblioteca(item: any) {
        if (item.id == 17) {
            this.auxSubOrigenID = item.id;
            this.flagNormativa = true;
            this.generalForm.patchValue({
                sub_origen_id_6: this.auxSubOrigenID,
                origen: this.auxOrigen,
            })

            this.allItems.push(item);
            this.allItemsExtraOrigen.push(item);
            this.actualizarFiltros();
        }
        if (item.id == 15) {
            this.auxSubOrigenID = item.id;
            this.flagLibrosAudiovisuales = true;
            this.generalForm.patchValue({
                sub_origen_id_7: this.auxSubOrigenID,
                origen: this.auxOrigen,
            })

            this.allItems.push(item);
            this.allItemsExtraOrigen.push(item);
            this.actualizarFiltros();
        }
        if (item.id == 16) {
            this.auxSubOrigenID = item.id;
            this.flagRevistas = true;
            this.generalForm.patchValue({
                sub_origen_id_8: this.auxSubOrigenID,
                origen: this.auxOrigen,
            })

            this.allItems.push(item);
            this.allItemsExtraOrigen.push(item);
            this.actualizarFiltros();
        }
        /*___________________________________________________________________________ */
        /* if (item.id == 3) {
            this.flagHolocausto = true;
            this.auxOrigen.push(3)
            this.generalForm.patchValue({
                origen: this.auxOrigen
            })
            this.actualizarFiltros();
        } */
        /*___________________________________________________________________________ */
        /* if (item.id == 4) {
            this.flagVideoteca = true;
            this.auxOrigen.push(4)
            this.generalForm.patchValue({
                origen: this.auxOrigen
            })
            this.actualizarFiltros();
        } */
        /*___________________________________________________________________________ */
        /* if (item.id == 5) {
            this.flagAdmin = true;
            this.auxOrigen.push(5)
            this.generalForm.patchValue({
                origen: this.auxOrigen,
                sub_origen_id_21: 5
            })
            this.actualizarFiltros();
        } */

    }

    onItemDeSelectBiblioteca(item: any) {
        if (item.id == 17) {
            this.auxSubOrigenID = item.id;
            this.flagNormativa = false;
            this.tipoNormaSelect = [];
            this.generalForm.patchValue({
                sub_origen_id_6: '',
                origen: this.auxOrigen,
                ddTipoNorma: this.tipoNormaSelect
            })
            this.allItems = this.allItems.filter((_item: any) => _item.id !== item.id);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((_item: any) => _item.id !== item.id);
        }
        if (item.id == 15) {
            this.auxSubOrigenID = item.id;
            this.flagLibrosAudiovisuales = false;
            this.generalForm.patchValue({
                sub_origen_id_7: '',
                origen: this.auxOrigen
            })
            this.allItems = this.allItems.filter((_item: any) => _item.id !== item.id);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((_item: any) => _item.id !== item.id);
        }
        if (item.id == 16) {
            this.auxSubOrigenID = item.id;
            this.flagRevistas = false;
            this.generalForm.patchValue({
                sub_origen_id_8: '',
                origen: this.auxOrigen
            })
            this.allItems = this.allItems.filter((_item: any) => _item.id !== item.id);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((_item: any) => _item.id !== item.id);
        }
        /*___________________________________________________________________________ */
        /* if (item.id == 3) {
            this.flagHolocausto = false;
            this.auxOrigen = this.auxOrigen.filter((id: any) => id != 3);
            this.generalForm.patchValue({
                origen: this.auxOrigen
            })

            this.allItems = this.allItems.filter((item: any) => item.id != 18);
            this.allItems = this.allItems.filter((item: any) => item.id != 19);
            this.allItems = this.allItems.filter((item: any) => item.id != 20);
            this.allItems = this.allItems.filter((item: any) => item.id != 21);
            this.allItems = this.allItems.filter((item: any) => item.id != 22);
            this.allItems = this.allItems.filter((item: any) => item.id != 23);

            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 18);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 19);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 20);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 21);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 22);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 23);
        } */
        /*___________________________________________________________________________ */
        /* if (item.id == 4) {
            this.flagVideoteca = false;
            this.auxOrigen = this.auxOrigen.filter((id: any) => id != 4);
            this.generalForm.patchValue({
                origen: this.auxOrigen
            })

            this.allItems = this.allItems.filter((item: any) => item.id != 24);
            this.allItems = this.allItems.filter((item: any) => item.id != 25);
            this.allItems = this.allItems.filter((item: any) => item.id != 26);
            this.allItems = this.allItems.filter((item: any) => item.id != 27);
            this.allItems = this.allItems.filter((item: any) => item.id != 28);
            this.allItems = this.allItems.filter((item: any) => item.id != 29);

            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 24);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 25);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 26);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 27);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 28);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 29);
        } */
        /*___________________________________________________________________________ */
        /* if (item.id == 5) {
            this.flagAdmin = false;
            this.auxOrigen = this.auxOrigen.filter((id: any) => id != 5);
            this.generalForm.patchValue({
                origen: this.auxOrigen
            })

            this.allItems = this.allItems.filter((item: any) => item.id != 5);
            this.allItems = this.allItems.filter((item: any) => item.id != 0);

            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 5);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 0);
        } */
        this.actualizarFiltros();
    }

    onSelectAllBiblioteca(items: any) {
        this.flagHolocausto = true;
        this.flagVideoteca = true;
        this.flagNormativa = true;
        this.flagAdmin = true;
        this.flagLibrosAudiovisuales = true;
        this.flagRevistas = true;

        this.generalForm.patchValue({
            sub_origen_id_6: 17,
            sub_origen_id_7: 15,
            sub_origen_id_8: 16,
            /* sub_origen_id_9: 18,
            sub_origen_id_10: 19,
            sub_origen_id_11: 12,
            sub_origen_id_12: 21,
            sub_origen_id_13: 22,
            sub_origen_id_14: 23,
            sub_origen_id_15: 24,
            sub_origen_id_16: 25,
            sub_origen_id_17: 26,
            sub_origen_id_18: 27,
            sub_origen_id_19: 28,
            sub_origen_id_20: 29,
            sub_origen_id_21: 5, */
            origen: this.auxOrigen
        })
        //this.cargarTemaTres();
        this.generalForm.get("selectedItemsBiblioteca").valueChanges.subscribe((origen: any) => {
            this.allItems = this.allItems.concat(this.generalForm.get('selectedItemsBiblioteca')?.value);
            /* this.allItems = this.allItems.filter((item: any) => item.id != 3);
            this.allItems = this.allItems.filter((item: any) => item.id != 4);
            this.allItems = this.allItems.filter((item: any) => item.id != 5); */
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.concat(this.generalForm.get('selectedItemsBiblioteca')?.value);
            /* this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 3);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 4);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 5); */
            this.actualizarFiltros();
        })
    }

    public onDeSelectAllBiblioteca() {
        this.generalForm.get("selectedItemsBiblioteca").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('selectedItemsBiblioteca')?.value.length == 0) {
                this.flagAdmin = false;
                this.flagNormativa = false;
                this.flagHolocausto = false;
                this.flagVideoteca = false;
                this.flagLibrosAudiovisuales = false;
                this.flagRevistas = false;
                this.tipoNormaSelect = [];
                //this.auxOrigen = this.auxOrigen.filter((id: any) => id != 3);
                //this.auxOrigen = this.auxOrigen.filter((id: any) => id != 4);
                //this.auxOrigen = this.auxOrigen.filter((id: any) => id != 5);
                this.generalForm.patchValue({
                    sub_origen_id_6: '',
                    sub_origen_id_7: '',
                    sub_origen_id_8: '',
                    /* sub_origen_id_9: '',
                    sub_origen_id_10: '',
                    sub_origen_id_11: '',
                    sub_origen_id_12: '',
                    sub_origen_id_13: '',
                    sub_origen_id_14: '',
                    sub_origen_id_15: '',
                    sub_origen_id_16: '',
                    sub_origen_id_17: '',
                    sub_origen_id_18: '',
                    sub_origen_id_19: '',
                    sub_origen_id_20: '',
                    sub_origen_id_21: '', */
                    origen: this.auxOrigen,
                    ddTipoNorma: this.tipoNormaSelect
                })

                this.allItems = this.allItems.filter((item: any) => item.id != 15);
                this.allItems = this.allItems.filter((item: any) => item.id != 16);
                this.allItems = this.allItems.filter((item: any) => item.id != 17);

                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 15);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 16);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 17);

                /* this.allItems = this.allItems.filter((item: any) => item.id != 18);
                this.allItems = this.allItems.filter((item: any) => item.id != 19);
                this.allItems = this.allItems.filter((item: any) => item.id != 20);
                this.allItems = this.allItems.filter((item: any) => item.id != 21);
                this.allItems = this.allItems.filter((item: any) => item.id != 22);
                this.allItems = this.allItems.filter((item: any) => item.id != 23);

                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 18);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 19);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 20);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 21);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 22);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 23);

                this.allItems = this.allItems.filter((item: any) => item.id != 24);
                this.allItems = this.allItems.filter((item: any) => item.id != 25);
                this.allItems = this.allItems.filter((item: any) => item.id != 26);
                this.allItems = this.allItems.filter((item: any) => item.id != 27);
                this.allItems = this.allItems.filter((item: any) => item.id != 28);
                this.allItems = this.allItems.filter((item: any) => item.id != 29);

                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 24);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 25);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 26);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 27);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 28);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 29);

                this.allItems = this.allItems.filter((item: any) => item.id != 5);
                this.allItems = this.allItems.filter((item: any) => item.id != 0);

                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 5);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 0); */

                if(!this.loginUser && !this.cerrarSecion){
                    this.actualizarFiltros();
                }
            }
        })
    }
    /** Fin Eventos MultiSelect Biblioteca */

    /** Eventos MultiSelect Tipo Holocausto */

    onItemSelectHolocausto(item: any) {
        if (item.id == 18) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_9: this.auxSubOrigenID
            })
        }
        if (item.id == 19) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_10: this.auxSubOrigenID
            })
        }
        if (item.id == 20) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_11: this.auxSubOrigenID
            })
        }
        if (item.id == 21) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_12: this.auxSubOrigenID
            })
        }
        if (item.id == 22) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_13: this.auxSubOrigenID
            })
        }
        if (item.id == 23) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_14: this.auxSubOrigenID
            })
        }
        this.allItems.push(item);
        this.allItemsExtraOrigen.push(item);
        this.actualizarFiltros();
    }

    onItemDeSelectHolocausto(item: any) {
        if (item.id == 18) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_9: ''
            })
        }
        if (item.id == 19) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_10: ''
            })
        }
        if (item.id == 20) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_11: ''
            })
        }
        if (item.id == 21) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_12: ''
            })
        }
        if (item.id == 22) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_13: ''
            })
        }
        if (item.id == 23) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_14: ''
            })
        }

        this.allItems = this.allItems.filter((_item: any) => _item.id !== item.id);
        this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((_item: any) => _item.id !== item.id);
        this.actualizarFiltros();
    }

    onSelectAllHolocausto(items: any) {
        this.generalForm.patchValue({
            sub_origen_id_9: 18,
            sub_origen_id_10: 19,
            sub_origen_id_11: 12,
            sub_origen_id_12: 21,
            sub_origen_id_13: 22,
            sub_origen_id_14: 23,
        })
        this.generalForm.get("selectedItemsInfoHolocausto").valueChanges.subscribe((origen: any) => {
            this.allItems = this.allItems.concat(this.generalForm.get('selectedItemsInfoHolocausto')?.value);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.concat(this.generalForm.get('selectedItemsInfoHolocausto')?.value);
            this.actualizarFiltros();
        })

    }

    public onDeSelectAllHolocausto() {

        this.generalForm.get("selectedItemsInfoHolocausto").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('selectedItemsInfoHolocausto')?.value.length == 0) {
                console.log('onDeSelectAllHolocausto');
                
                this.generalForm.patchValue({
                    sub_origen_id_9: '',
                    sub_origen_id_10: '',
                    sub_origen_id_11: '',
                    sub_origen_id_12: '',
                    sub_origen_id_13: '',
                    sub_origen_id_14: '',
                })
                this.allItems = this.allItems.filter((item: any) => item.id != 18);
                this.allItems = this.allItems.filter((item: any) => item.id != 19);
                this.allItems = this.allItems.filter((item: any) => item.id != 20);
                this.allItems = this.allItems.filter((item: any) => item.id != 21);
                this.allItems = this.allItems.filter((item: any) => item.id != 22);
                this.allItems = this.allItems.filter((item: any) => item.id != 23);
                
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 18);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 19);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 20);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 21);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 22);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 23);
            }
            if(!this.loginUser && !this.cerrarSecion){
                this.actualizarFiltros();
            }
        })
    }
    /** Fin Eventos MultiSelect Holocausto */

    /** Eventos MultiSelect Tipo Videoteca */

    onItemSelectVideoteca(item: any) {
        if (item.id == 24) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_15: this.auxSubOrigenID
            })
        }
        if (item.id == 25) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_16: this.auxSubOrigenID
            })
        }
        if (item.id == 26) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_17: this.auxSubOrigenID
            })
        }
        if (item.id == 27) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_18: this.auxSubOrigenID
            })
        }
        if (item.id == 28) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_19: this.auxSubOrigenID
            })
        }
        if (item.id == 29) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_20: this.auxSubOrigenID
            })
        }

        this.allItems.push(item);
        this.allItemsExtraOrigen.push(item);
        this.actualizarFiltros();
    }

    onItemDeSelectVideoteca(item: any) {
        if (item.id == 24) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_15: ''
            })
        }
        if (item.id == 25) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_16: ''
            })
        }
        if (item.id == 26) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_17: ''
            })
        }
        if (item.id == 27) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_18: ''
            })
        }
        if (item.id == 28) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_19: ''
            })
        }
        if (item.id == 29) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_20: ''
            })
        }

        this.allItems = this.allItems.filter((_item: any) => _item.id !== item.id);
        this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((_item: any) => _item.id !== item.id);
        this.actualizarFiltros();
    }

    onSelectAllVideoteca(items: any) {
        this.generalForm.patchValue({
            sub_origen_id_15: 24,
            sub_origen_id_16: 25,
            sub_origen_id_17: 26,
            sub_origen_id_18: 27,
            sub_origen_id_19: 28,
            sub_origen_id_20: 29,
        })

        this.generalForm.get("selectedItemsInfoVideoteca").valueChanges.subscribe((origen: any) => {
            this.allItems = this.allItems.concat(this.generalForm.get('selectedItemsInfoVideoteca')?.value);
            this.allItemsExtraOrigen = this.allItemsExtraOrigen.concat(this.generalForm.get('selectedItemsInfoVideoteca')?.value);
            this.actualizarFiltros();
        })
    }

    public onDeSelectAllVideoteca() {
        this.generalForm.get("selectedItemsInfoVideoteca").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('selectedItemsInfoVideoteca')?.value.length == 0) {
                this.generalForm.patchValue({
                    sub_origen_id_15: '',
                    sub_origen_id_16: '',
                    sub_origen_id_17: '',
                    sub_origen_id_18: '',
                    sub_origen_id_19: '',
                    sub_origen_id_20: '',
                })

                this.allItems = this.allItems.filter((item: any) => item.id != 24);
                this.allItems = this.allItems.filter((item: any) => item.id != 25);
                this.allItems = this.allItems.filter((item: any) => item.id != 26);
                this.allItems = this.allItems.filter((item: any) => item.id != 27);
                this.allItems = this.allItems.filter((item: any) => item.id != 28);
                this.allItems = this.allItems.filter((item: any) => item.id != 29);

                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 24);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 25);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 26);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 27);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 28);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 29);
                 if(!this.loginUser && !this.cerrarSecion){
                    this.actualizarFiltros();
                }
            }
        })
    }
    /** Fin Eventos MultiSelect Videoteca */

    /** Eventos MultiSelect Tipo Info */

    onItemSelectInfo(item: any) {
        if (item.id == 18) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_9: this.auxSubOrigenID
            })
        }
        if (item.id == 19) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_10: this.auxSubOrigenID
            })
        }
        if (item.id == 20) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_11: this.auxSubOrigenID
            })
        }
        if (item.id == 21) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_12: this.auxSubOrigenID
            })
        }
        if (item.id == 22) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_13: this.auxSubOrigenID
            })
        }
        if (item.id == 23) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_14: this.auxSubOrigenID
            })
        }
        if (item.id == 24) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_15: this.auxSubOrigenID
            })
        }
        if (item.id == 25) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_16: this.auxSubOrigenID
            })
        }
        if (item.id == 26) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_17: this.auxSubOrigenID
            })
        }
        if (item.id == 27) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_18: this.auxSubOrigenID
            })
        }
        if (item.id == 28) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_19: this.auxSubOrigenID
            })
        }
        if (item.id == 29) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_20: this.auxSubOrigenID
            })
        }
    }

    onItemDeSelectInfo(item: any) {
        if (item.id == 18) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_9: ''
            })
        }
        if (item.id == 19) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_10: ''
            })
        }
        if (item.id == 20) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_11: ''
            })
        }
        if (item.id == 21) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_12: ''
            })
        }
        if (item.id == 22) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_13: ''
            })
        }
        if (item.id == 23) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_14: ''
            })
        }
        if (item.id == 24) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_15: ''
            })
        }
        if (item.id == 25) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_16: ''
            })
        }
        if (item.id == 26) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_17: ''
            })
        }
        if (item.id == 27) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_18: ''
            })
        }
        if (item.id == 28) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_19: ''
            })
        }
        if (item.id == 29) {
            this.auxSubOrigenID = item.id;
            this.generalForm.patchValue({
                sub_origen_id_20: ''
            })
        }
    }

    onSelectAllInfo(items: any) {
        this.generalForm.patchValue({
            sub_origen_id_9: 18,
            sub_origen_id_10: 19,
            sub_origen_id_11: 20,
            sub_origen_id_12: 21,
            sub_origen_id_13: 22,
            sub_origen_id_14: 23,
            sub_origen_id_15: 24,
            sub_origen_id_16: 25,
            sub_origen_id_17: 26,
            sub_origen_id_18: 27,
            sub_origen_id_19: 28,
            sub_origen_id_20: 29,
        })
    }

    public onDeSelectAllInfo() {
        this.generalForm.get("selectedItemsInfo").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('selectedItemsInfo')?.value.length == 0) {
                this.generalForm.patchValue({
                    sub_origen_id_9: '',
                    sub_origen_id_10: '',
                    sub_origen_id_11: '',
                    sub_origen_id_12: '',
                    sub_origen_id_13: '',
                    sub_origen_id_14: '',
                    sub_origen_id_15: '',
                    sub_origen_id_16: '',
                    sub_origen_id_17: '',
                    sub_origen_id_18: '',
                    sub_origen_id_19: '',
                    sub_origen_id_20: '',
                })
            }
        })
    }
    /** Fin Eventos MultiSelect Info */

    checkAdvanceSearch2() {
        if (this.generalForm.get("busquedaAvanzada")?.value == true) {
            this.generalForm.patchValue({
                busquedaAvanzada: false
            })
        }
    }

    checkAdvanceSearch() {
        if (this.generalForm.get("busquedaAvanzada")?.value == false) {
            this.generalForm.patchValue({
                busquedaAvanzada: true
            })
        }
        else {
            this.generalForm.patchValue({
                busquedaAvanzada: false
            })
        }
        this.cargarSalas(); this.cargarTipoNorma(); this.cargarSeccion(); this.cargarTemas(); this.cargarPonente(); this.cargarEstado(); this.cargarCorporacion();  this.cargarBibliotecas();  
        
        this.cargarTipoSala(); this.cargarTipoNroProvidencia(); this.cargarClaseDeActuacion(); this.cargarFuentesFormales(); this.cargarTipoProcedencias();
		this.cargarEntidadGeneradora(); this.cargarTipoDelitos(); this.cargarTipoServidoresPublicos(); this.cargarTipoActos(); this.cargarTipoFuentesFormales();
        this.cargarSalaConocimiento(); this.cargarNaturalezaProceso(); this.cargarDescriptores(); this.cargarCategoriaGenero(); this.cargarSalvamento(); this.cargarDecision(); 
        this.cargarMagistradoSalvamento(); this.cargarTribunalAdmin(); this.cargarTribunalesSuperiores(); this.cargarOrigenBiblioteca(); this.cargarBibliotecas(); this.cargarTipoMaterial();
    }

    dateDesdeValidate() {
        const dateDesde = this.generalForm.get('dateDesde')?.value?.split("-");
        
        if(parseInt(dateDesde[0]) > 1000){
            if (this.generalForm.get('dateHasta')?.value != "") {
                if (this.generalForm.get('dateDesde')?.value > this.generalForm.get('dateHasta')?.value) {
                    this.generalForm.get('dateDesde').setValue("");
                    this.auxDateDesdeValidate = false;
                }
                else {
                    this.auxDateHastaValidate = true;
                }
            }
        }
    }

    dateHastaValidate() {
        const dateHata = this.generalForm.get('dateHasta')?.value?.split("-");
        
        if(parseInt(dateHata[0]) > 1000){
            if (this.generalForm.get('dateDesde')?.value != "") {
                if (this.generalForm.get('dateHasta')?.value < this.generalForm.get('dateDesde')?.value) {
                    this.generalForm.get('dateHasta').setValue("");
                    this.auxDateHastaValidate = false;
                }
                else {
                    this.auxDateHastaValidate = true;
                }
            }
        }
    }

    validateValueGacetasAvanzado() {
        this.auxpublicacion = 0;
        if (this.generalForm.get('chkSoloGacetasAvanzado')?.value == true) {
            this.auxpublicacion = 1;
        }
    }

    controlOrigenes() {
        this.generalForm.get("chkJurisprudencia").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('chkJurisprudencia')?.value == true) {
                if (this.generalForm.get('origen')?.value.indexOf(1) < 0) {
                    this.auxOrigen.push(1)
                    this.generalForm.patchValue({
                        origen: this.auxOrigen,
                        consejoDeEstado: 'Consejo de Estado',
                    })
                }
                console.log("this.generalForm.value.selectedItems", this.generalForm.value.selectedItems);
                
                this.allItems = this.allItems.concat(this.generalForm.value.selectedItems);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.concat(this.generalForm.value.selectedItems);
            } else if (this.generalForm.get('chkJurisprudencia')?.value == false) {
                if (this.generalForm.get('chkComisionGenero')?.value == false) {
                    if (this.flagTribunales_1 == false &&
                        this.flagTribunales_2 == false &&
                        this.flagTribunales_3 == false) {
                        this.auxOrigen = this.auxOrigen.filter((id: any) => id != 1);
                    }
                }
                this.allItems = this.allItems.filter((item: any) => item.id != 6);
                this.allItems = this.allItems.filter((item: any) => item.id != 7);
                this.allItems = this.allItems.filter((item: any) => item.id != 8);
                this.allItems = this.allItems.filter((item: any) => item.id != 9);
                this.allItems = this.allItems.filter((item: any) => item.id != 10);

                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 6);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 7);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 8);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 9);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 10);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 30);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 31);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 32);
                this.generalForm.patchValue({
                    origen: this.auxOrigen,
                    sub_origen_id_1: '',
                    sub_origen_id_2: '',
                    sub_origen_id_3: '',
                    sub_origen_id_4: '',
                    sub_origen_id_5: '',
                    selectedItems: [],
                    consejoDeEstado: '',
                    selectedItemsTribunales: [],
                    chkSoloGacetas: false,
                    chkBoletinesJurisprudenciales: false,
                    ddtribunalesCE: []
                })
            }
            if(!this.loginUser && !this.cerrarSecion){
                this.actualizarFiltros();
            }
        }),
            this.generalForm.get("chkComisionGenero").valueChanges.subscribe((origen: any) => {
                if (this.generalForm.get('chkComisionGenero')?.value == true) {
                    if (this.generalForm.get('chkJurisprudencia')?.value == false) {
                        this.auxOrigen.push(1)
                        this.generalForm.patchValue({
                            origen: this.auxOrigen,
                        })
                    }

                    this.auxSelectedItemsJurisGenero.push({ id: 11, texto: "Jurisprudencia de Género" })
                    this.generalForm.patchValue({
                        //extraOrigen: this.auxExtraOrigen,
                        sub_origen_id_22: 11,
                        selectedItemsJurisGenero: this.auxSelectedItemsJurisGenero
                    })
                    this.allItems = this.allItems.concat(this.generalForm.value.selectedItemsJurisGenero);
                    this.allItemsExtraOrigen = this.allItemsExtraOrigen.concat(this.generalForm.value.selectedItemsJurisGenero);
                } else if (this.generalForm.get('chkComisionGenero')?.value == false) {
                    if (this.generalForm.get('chkJurisprudencia')?.value == false) {
                        console.log(this.flagTribunales_1, this.flagTribunales_2, this.flagTribunales_3);
                        
                        if (this.flagTribunales_1 == false &&
                            this.flagTribunales_2 == false &&
                            this.flagTribunales_3 == false) {
                            this.auxOrigen = this.auxOrigen.filter((id: any) => id != 1);
                            this.generalForm.patchValue({
                                origen: this.auxOrigen,
                                sub_origen_id_22: '',
                            })
                        }

                    }
                    this.auxSelectedItemsJurisGenero = this.auxSelectedItemsJurisGenero.filter((item: any) => item.id != 11);
                    this.generalForm.patchValue({
                        sub_origen_id_22: '',
                        selectedItemsJurisGenero: this.auxSelectedItemsJurisGenero
                    })

                    this.allItems = this.allItems.filter((item: any) => item.id != 11);
                    this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 11);
                }
                if(!this.loginUser && !this.cerrarSecion){
                    this.actualizarFiltros();
                }
            })

        this.generalForm.get("chkSoloGacetas").valueChanges.subscribe((origen: any) => {
            this.auxSelectedItemsGacetasJudiciales.push({ id: 30, texto: "Gacetas Judiciales" })
            this.auxExtraOrigen = this.auxExtraOrigen.filter((id: any) => id != 6);
            if (this.generalForm.get('chkSoloGacetas')?.value == true) {
                this.auxExtraOrigen.push(30)
                this.generalForm.patchValue({
                    extraOrigen: this.auxExtraOrigen
                })
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.concat(this.auxSelectedItemsGacetasJudiciales);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 6);
            } else if (this.generalForm.get('chkSoloGacetas')?.value == false) {
                this.auxExtraOrigen = this.auxExtraOrigen.filter((id: any) => id != 30);
                this.generalForm.patchValue({
                    extraOrigen: this.auxExtraOrigen
                })
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 30);
                if(this.generalForm.get("chkJurisprudencia")?.value == true){
                    this.allItemsExtraOrigen.push({ id: 6, texto: "Corte Suprema de Justicia" });
                }
                
            }
            if(!this.loginUser && !this.cerrarSecion){
                this.actualizarFiltros();
            }
        }
        )
        this.generalForm.get("chkSoloGacetasAvanzado").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('chkSoloGacetasAvanzado')?.value == true) {
                this.auxExtraOrigenAvanzado.push(30)
                this.generalForm.patchValue({
                    extraOrigenAvanzado: this.auxExtraOrigenAvanzado
                })
            } else {
                this.auxExtraOrigenAvanzado.pop()
                this.generalForm.patchValue({
                    extraOrigenAvanzado: this.auxExtraOrigenAvanzado
                })
            }
        })
        /* this.generalForm.get("sub_origen_id_6").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('sub_origen_id_6')?.value == 17) {
                this.auxOrigen.push(2)
                this.generalForm.patchValue({
                    origen: this.auxOrigen
                })
            } else {
                this.auxOrigen = this.auxOrigen.filter((id: any) => id != 2);
                this.generalForm.patchValue({
                    origen: this.auxOrigen
                })
            }
        }) */

        this.generalForm.get("chkBoletinesJurisprudenciales").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('chkBoletinesJurisprudenciales')?.value == true) {

                this.allItemsExtraOrigen.push({ id: 32, texto: "Boletines Consejo de Estado" })
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 8);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 31);
            } else if (this.generalForm.get('chkBoletinesJurisprudenciales')?.value == false) {

                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 32);
                if(this.generalForm.get("chkJurisprudencia")?.value == true){
                    this.allItemsExtraOrigen.push({ id: 8, texto: "Consejo de Estado" });
                    this.allItemsExtraOrigen.push({ id: 31, texto: "SAMAI" });
                }
            }
            if(!this.loginUser && !this.cerrarSecion){
                this.actualizarFiltros();
            }
        })
        this.generalForm.get("chkHolocaustoCNSJ").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('chkHolocaustoCNSJ')?.value == true) {
                this.flagHolocausto = true;
                if (this.generalForm.get('origen')?.value.indexOf(3) < 0) {
                    this.auxOrigen.push(3)
                    this.generalForm.patchValue({
                        origen: this.auxOrigen,
                    })
                }
            } else {
                
                this.flagHolocausto = false;

                this.auxOrigen = this.auxOrigen.filter((item: any) => item != 3);

                this.allItems = this.allItems.filter((item: any) => item.id != 18);
                this.allItems = this.allItems.filter((item: any) => item.id != 19);
                this.allItems = this.allItems.filter((item: any) => item.id != 20);
                this.allItems = this.allItems.filter((item: any) => item.id != 21);
                this.allItems = this.allItems.filter((item: any) => item.id != 22);
                this.allItems = this.allItems.filter((item: any) => item.id != 23);

                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 18);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 19);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 20);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 21);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 22);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 23);
                this.generalForm.patchValue({
                    origen: this.auxOrigen,
                    sub_origen_id_9: '',
                    sub_origen_id_10: '',
                    sub_origen_id_11: '',
                    sub_origen_id_12: '',
                    sub_origen_id_13: '',
                    sub_origen_id_14: '',
                    selectedItemsInfoHolocausto: []
                })
            }

            if(!this.loginUser && !this.cerrarSecion){
                this.actualizarFiltros();
            }
        })
        this.generalForm.get("chkVideotecaCNSJ").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('chkVideotecaCNSJ')?.value == true) {
                this.flagVideoteca = true;

                if (this.generalForm.get('origen')?.value.indexOf(4) < 0) {
                    this.auxOrigen.push(4)
                    this.generalForm.patchValue({
                        origen: this.auxOrigen,
                    })
                }
            } else {
                this.flagVideoteca = false;

                this.auxOrigen = this.auxOrigen.filter((item: any) => item != 4);

                this.allItems = this.allItems.filter((item: any) => item.id != 24);
                this.allItems = this.allItems.filter((item: any) => item.id != 25);
                this.allItems = this.allItems.filter((item: any) => item.id != 26);
                this.allItems = this.allItems.filter((item: any) => item.id != 27);
                this.allItems = this.allItems.filter((item: any) => item.id != 28);
                this.allItems = this.allItems.filter((item: any) => item.id != 29);

                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 24);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 25);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 26);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 27);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 28);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 29);
                this.generalForm.patchValue({
                    origen: this.auxOrigen,
                    sub_origen_id_15: '',
                    sub_origen_id_16: '',
                    sub_origen_id_17: '',
                    sub_origen_id_18: '',
                    sub_origen_id_19: '',
                    sub_origen_id_20: '',
                    selectedItemsInfoVideoteca: []
                })
            }
            if(!this.loginUser && !this.cerrarSecion){
                this.actualizarFiltros();
            }
        })
        
        this.generalForm.get("chkBibliotecaCNSJ").valueChanges.subscribe((origen: any) => {
            if (this.generalForm.get('chkBibliotecaCNSJ')?.value == true) {
                if (this.generalForm.get('origen')?.value.indexOf(2) < 0) {
                    this.auxOrigen.push(2)
                    this.generalForm.patchValue({
                        origen: this.auxOrigen,
                    })
                }
            } else {
                this.auxOrigen = this.auxOrigen.filter((item: any) => item != 2);

                this.allItems = this.allItems.filter((item: any) => item.id != 15);
                this.allItems = this.allItems.filter((item: any) => item.id != 16);
                this.allItems = this.allItems.filter((item: any) => item.id != 17);

                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 15);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 16);
                this.allItemsExtraOrigen = this.allItemsExtraOrigen.filter((item: any) => item.id != 17);
                this.tipoNormaSelect = [];
                this.generalForm.patchValue({
                    origen: this.auxOrigen,
                    sub_origen_id_6: '',
                    sub_origen_id_7: '',
                    sub_origen_id_8: '',
                    selectedItemsBiblioteca: [],
                    ddTipoNorma: this.tipoNormaSelect,
                })
            }
            if(!this.loginUser && !this.cerrarSecion){
                this.actualizarFiltros();
            }
        })
    }

    async onSearch(page: number = 1, limit: number = 10, filters: any = null, object:any = null, url:string = this.UrlRef) {
        this.limit = limit;
        this.temaSendJson = '';
        this.temasSendJson = [];
    
    
        this.activeSearch = false;
        var auxFuenteFormalFull: any;
        auxFuenteFormalFull = "";
        if (this.generalForm.get('ff_numero')?.value != "") {
            auxFuenteFormalFull += "num. " + this.generalForm.get('ff_numero')?.value;
        }

        if (this.generalForm.get('ff_anio')?.value != "") {
            auxFuenteFormalFull += " de " + this.generalForm.get('ff_anio')?.value;
        }

        if (this.generalForm.get('ff_articulo')?.value != "") {
            auxFuenteFormalFull += " art. " + this.generalForm.get('ff_articulo')?.value;
        }


        if (this.generalForm.get('ff_inciso')?.value != "") {
            auxFuenteFormalFull += " inc. " + this.generalForm.get('ff_inciso')?.value;
        }

        if (this.generalForm.get('ff_numeral')?.value != "") {
            auxFuenteFormalFull += " num. " + this.generalForm.get('ff_numeral')?.value;
        }

        if (this.generalForm.get('ff_literal')?.value != "") {
            auxFuenteFormalFull += " lit. " + this.generalForm.get('ff_literal')?.value;
        }

        if (this.generalForm.get('ff_parrafo')?.value != "") {
            auxFuenteFormalFull += " parr. " + this.generalForm.get('ff_parrafo')?.value;
        }

        if (this.generalForm.get('ff_paragrafo')?.value != "") {
            auxFuenteFormalFull += " par. " + this.generalForm.get('ff_paragrafo')?.value;
        }

        /* if (this.fuentesFormalesCheck[0]) {
            this.fuentesFormalesCheck[0] = this.fuentesFormalesCheck[0] + " " + auxFuenteFormalFull;
        } */

        this.textEmpty = false;
        this.textobusqueda = this.generalForm.get('textoBusqueda')?.value;
        this.emptyresults = false;
        this.spinner.show();
        
        if(this.temaTresChecks8.length > 0){
            this.temasSendJson = this.temaTresChecks8;
        }
        else if(this.temaTresChecks6.length > 0){
            this.temasSendJson = this.temaTresChecks6;
        }
        else if(this.temasChecks.length > 0){
            this.temasSendJson = this.temasChecks;
        }
        else if(this.temaTresChecks.length > 0){
            this.temasSendJson = this.temaTresChecks;
        }
        else if(this.temaVocabularioChecks.length > 0){
            this.temasSendJson = this.temaVocabularioChecks;
        }
        
        if(this.generalForm.get('InputTituloHolocausto')?.value != ""){
            this.tituloSendJason = this.generalForm.get('InputTituloHolocausto')?.value; 
        }
        else if(this.generalForm.get('InputTituloVideoteca')?.value != ""){
            this.tituloSendJason = this.generalForm.get('InputTituloVideoteca')?.value;
        }

        if(this.generalForm.get('InputTema17')?.value != ""){
            this.temaSendJson = this.generalForm.get('InputTema17')?.value; 
        }
        else if(this.generalForm.get('InputTema')?.value != ""){
            this.temaSendJson = this.generalForm.get('InputTema')?.value;
        }
        
        else if(this.generalForm.get('InputTema8')?.value != ""){
            this.temaSendJson = this.generalForm.get('InputTema8')?.value;
        }
        else if(this.generalForm.get('InputTema16')?.value != ""){
            this.temaSendJson = this.generalForm.get('InputTema16')?.value;
        }
        else if(this.generalForm.get('InputTema15')?.value != ""){
            this.temaSendJson = this.generalForm.get('InputTema15')?.value;
        }
        else if(this.generalForm.get('InputTemaHolocausto')?.value != ""){
            this.temaSendJson = this.generalForm.get('InputTemaHolocausto')?.value;
        }


        let strJson;
        let seccionTmp = [];
        let subseccionTmp;
        if( this.salaConocimientoCheck.length > 0){
            const salaConocimientoTmp = this.salaConocimientoCheck[0];



            const splitTmp = salaConocimientoTmp.split (",");
            /* console.log("holita" + splitTmp); */
            seccionTmp[0] = splitTmp[0];
            if(splitTmp.length > 1){
                subseccionTmp= splitTmp[1]; 
            }
            
        }
        
        seccionTmp = seccionTmp.concat(this.seccionOptionsCheck);

        //console.log(seccionTmp);
        
        //console.log("holita1" + seccionTmp +" - "+ subseccionTmp );

        if(!object){
            strJson = {
                texto_buscar: this.generalForm.get('textoBusqueda')?.value,
                origen_id: this.generalForm.get('origen')?.value,
                sub_origen_id: this.obtenerId(this.allItems),
                extra_origen_id: this.obtenerId(this.allItemsExtraOrigen),
                corporaciones_multiple: this.corporacionesCheck,
                biblioteca_multiple: [],
                //biblioteca_multiple: this.origenBibliotecaRedCheck,
                tribunales_superiores_multiple: this.tipoTribunalSuperiorCheck,
                consideraciones: this.generalForm.get('InputConcideraciones')?.value,
                asunto: this.generalForm.get('InputAsunto')?.value,
                parte_resolutiva: this.generalForm.get('InputParteResolutiva')?.value,
                entidadgeneradora: this.entidadGeneradoraCheck,
                solo_gacetas_judiciales: this.generalForm.get('chkSoloGacetasAvanzado')?.value,
                temas_multiple: this.temasSendJson,
                /*Filtros HU_03 */
                ponente: filters?.ponentes ? filters?.ponentes : this.ponenciasCheck,
                fuente_formal_multiple: this.fuentesFormalesCheck,
                clase_actuacion_multiple: filters?.claseActuaciones ? filters?.claseActuaciones : this.claseActuacionChecks,
                clase_actuacion: this.generalForm.get('InputClaseDeActuacion')?.value,
                delitos_multiple: filters?.delitos ? filters?.delitos : this.DelitosCheck,
                procedencia_multiple: filters?.procedencias ? filters?.procedencias : this.TipoProcedenciasCheck,
                procedencia: this.generalForm.get('InputProcedencia')?.value,
                tipo_providencia: filters?.tiposProvidencias ? filters?.tiposProvidencias : this.tipoNroProvidenciasCheck,
                categoria_genero: filters?.categoriasGenero ? filters?.categoriasGenero : this.categoriaGenerosCheck,
                sala: filters?.salas ? filters?.salas : this.SalasCheck,
                //sala_conocimiento: this.salaConocimientoCheck,
                decision_multiple: filters?.decisiones ? filters?.decisiones : this.DecisionesCheck,
                magistrado: filters?.magistradosSalvamento ? filters?.magistradosSalvamento : this.MagistradoCheck,
                tipo_sala: filters?.tiposSalas ? filters?.tiposSalas : this.TipoSalasCheck,
                servidores_publicos: this.generalForm.get('InputServidorPublico')?.value,
                start_date: filters?.start_date ? filters?.start_date : this.generalForm.get('dateDesde')?.value,
                end_date: filters?.end_date ? filters?.end_date : this.generalForm.get('dateHasta')?.value,
                /*FUENTE SAMAI - CONSEJO DE ESTADO*/ 
                no_radicado: this.generalForm.get('InputNroRadicacion') ? this.generalForm.get('InputNroRadicacion').value ? this.generalForm.get('InputNroRadicacion')?.value.replace(/[\. ,:-]+/g, "") : "" : "",
                numproceso: this.generalForm.get('InputNroProceso') ? this.generalForm.get('InputNroProceso').value ? this.generalForm.get('InputNroProceso')?.value.replace(/[\. ,:-]+/g, "") : "" : "",
                numero_providencia: this.generalForm.get('InputNroProvidencia') ? this.generalForm.get('InputNroProvidencia').value ? this.generalForm.get('InputNroProvidencia')?.value : "" : "",
                id: this.generalForm.get('InputID') ? this.generalForm.get('InputID').value ? this.generalForm.get('InputID')?.value.replace(/[\. ,:-]+/g, "") : "" : "",
                seccion: seccionTmp,
                fuente_formal: this.generalForm.get('InputFuenteFormal')?.value,
                observaciones: this.generalForm.get('InputObsrvaciones')?.value,
                // fuente_formal: this.auxFuenteFormal,
                fuentesformalesagrupadas: this.auxFuenteFormal, //Samai
                naturalezaproceso: this.generalForm.get('naturalezaProcesoCheck')?.value,//samai
                norma_demandada: this.generalForm.get('InputNormaDemandada')?.value,
                //norma_demandada: this.generalForm.get('InputNormaDemandada')?.value,//Samai
                //normasdemandadasagrupadas: this.generalForm.get('InputNormaDemandada')?.value,//Samai
                nota_relatoria:this.generalForm.get('InputNotaRelatoria')?.value,
                descripcion:this.generalForm.get('InputDireccionInmueble')?.value,
                
                demandante: this.generalForm.get('InputDemandante')?.value,
                actor: this.generalForm.get('InputDemandante')?.value,//Samai
                //tema: this.generalForm.get('InputExtracto')?.value,
                salvamento: this.generalForm.get('InputSalvamento')?.value,  
                problema_juridico: this.generalForm.get('InputProblemaJuridicoText')?.value, //Samai
                tesisagrupadas: this.generalForm.get('InputExtracto')?.value, 
                /*END FUENTE SAMAI - CONSEJO DE ESTADO*/ 
                estado: this.EstadoCheck,
                jurisprudencia_relacionada: this.generalForm.get('InputJurisprudenciaRelacionada')?.value,
                sujetos_procesales: this.generalForm.get('InputSujetosProcesales')?.value,
                //nota_de_relatoria: this.generalForm.get('InputNotaRelatoria')?.value,
                tiene_salvamento: this.generalForm.get('chkTieneSalvamento')?.value,
                salvamento_multiple: this.generalForm.get('ddSalvamento')?.value,
                //magistrado:  this.generalForm.get('ddMagistradoSalvamento')?.value, 
                decision: this.generalForm.get('InputDecision')?.value,
                relevante: this.generalForm.get('chkRelevantes')?.value,
                asunto_sala: this.generalForm.get('chkAsuntoSala')?.value,
                tutelas: this.generalForm.get('chkTutelas')?.value,
                contenga: this.generalForm.get('textoYContenga')?.value[0],
                o_contenga: this.generalForm.get('textoOContenga')?.value[0],
                no_contenga: this.generalForm.get('textoExcluya')?.value[0],
                contenga_jurisprudencia_relacionada: this.generalForm.get('textoYContengaJR')?.value[0],
                o_contenga_jurisprudencia_relacionada: this.generalForm.get('textoOContengaJR')?.value[0],
                no_contenga_jurisprudencia_relacionada: this.generalForm.get('textoExcluyaJR')?.value[0],
                contenga_consideraciones: this.generalForm.get('textoYContengaC')?.value[0],
                o_contenga_consideraciones: this.generalForm.get('textoOContengaC')?.value[0],
                no_contenga_consideraciones: this.generalForm.get('textoExcluyaC')?.value[0],
                contenga_asunto: this.generalForm.get('textoYContengaA')?.value[0],
                o_contenga_asunto: this.generalForm.get('textoOContengaA')?.value[0],
                no_contenga_asunto: this.generalForm.get('textoExcluyaA')?.value[0],
                contenga_tema: this.generalForm.get('textoYContengaT')?.value[0],
                o_contenga_tema: this.generalForm.get('textoOContengaT')?.value[0],
                no_contenga_tema: this.generalForm.get('textoExcluyaT')?.value[0],
                contenga_parte_resolutiva: this.generalForm.get('textoYContengaPR')?.value[0],
                o_contenga_parte_resolutiva: this.generalForm.get('textoOContengaPR')?.value[0],
                no_contenga_parte_resolutiva: this.generalForm.get('textoExcluyaPR')?.value[0],
                contenga_descriptores: this.generalForm.get('textoYContengaD')?.value[0],
                o_contenga_descriptores: this.generalForm.get('textoOContengaD')?.value[0],
                no_contenga_descriptores: this.generalForm.get('textoExcluyaD')?.value[0],
                contenga_norma_demandada: this.generalForm.get('textoYContengaND')?.value[0],
                o_contenga_norma_demandada: this.generalForm.get('textoOContengaND')?.value[0],
                no_contenga_norma_demandada: this.generalForm.get('textoExcluyaND')?.value[0],
                contenga_fuente_formal: this.generalForm.get('textoYContengaFF')?.value[0],
                o_contenga_fuente_formal: this.generalForm.get('textoOContengaFF')?.value[0],
                no_contenga_fuente_formal: this.generalForm.get('textoExcluyaFF')?.value[0],
                contenga_tesisagrupados: this.generalForm.get('textoYContengaE')?.value[0],
                o_contenga_tesisagrupados: this.generalForm.get('textoOContengaE')?.value[0],
                no_contenga_tesisagrupados: this.generalForm.get('textoExcluyaE')?.value[0],

                publicacion: this.auxpublicacion,
                demandado: this.generalForm.get('InputDemandado')?.value,
                //Anexo 16
                tipo_gaceta: this.generalForm.get('TipoGaceta')?.value,
                nombregaceta: this.generalForm.get('InputNombreGaceta')?.value,
                contenidogaceta: this.generalForm.get('InputContenidoGaceta')?.value,
                gacetas_fechadesde: this.generalForm.get('GacetasFechaDesde')?.value,
                gacetas_fechahasta: this.generalForm.get('GacetasFechaHasta')?.value,
                //Anexo 13
                autor: this.generalForm.get('InputAutorVideoteca')?.value,
                titulo: this.tituloSendJason,
                n_registro: this.generalForm.get('InputRegVideoteca')?.value,
                // Anexo 10
                tipomaterialid_multiple: this.origenVideotecaCheck,
                autorcorporativo: this.generalForm.get('InputAutorCorpLYMA')?.value,
                annopublicacion: this.generalForm.get('InputAñoPubLYMA')?.value,
                serie: this.generalForm.get('InputSerieLYMA')?.value,
                isbn: this.generalForm.get('InputISBNLYMA')?.value,
                numerotopograficoclaveautor: this.generalForm.get('InputNumeroTopograficoLYMA')?.value,
                //descriptores: this.generalForm.get('InputNumeroTopograficoLYMA')?.value,
                codigodeweycompleto: this.generalForm.get('InputCodigoSistemaLYMA')?.value,
                //Anexo 11
                isnn: this.generalForm.get('InputISNNRevistas')?.value,
                editorial: this.generalForm.get('InputEditorialRevistas')?.value,
                analiticatitulo: this.generalForm.get('InputTituloAnaliticaRevistas')?.value,
                analiticadescriptor: this.temaTresDescriptivoChecks,
                analiticarestrictor: this.temaTresDescriptivoChecks,
                analiticaautor: this.generalForm.get('InputAutoresAnaliticaRevistas')?.value,
                analiticatema: this.generalForm.get('InputTemaAnaliticaRevistas')?.value,
                //Anexo 12
                numero: this.generalForm.get('InputNumeroNormaNormativa')?.value,
                fechaexpedicion: this.generalForm.get('dateExp')?.value,
                fechafuentepublicacion: this.generalForm.get('datePub')?.value,
                numerofuentepublicacion: this.generalForm.get('InputNumeroFuenteOficialNormativa')?.value,
                annocompendio: this.generalForm.get('InputAñoNormativa')?.value,
                mescompendio: this.generalForm.get('mesFuenteOficial')?.value ? parseInt(this.generalForm.get('mesFuenteOficial')?.value) : '',
                anadesres: this.generalForm.get('InputDescriptoresNormativa')?.value,
                tipo_acto: this.generalForm.get('ddTipoActos')?.value,
                tema: this.temaSendJson,
                fuenteoficial: this.generalForm.get('fuenteoficial')?.value,
                //fuenteoficial_multiple: this.fuenteOficialCheck,
                //Anexo 15
                volumengaceta:this.generalForm.get('VolumenActosAdmin')?.value,
                estrimestralgaceta:this.generalForm.get('EsTrimestralActosAdmin')?.value,
                aniogaceta:this.generalForm.get('AñoGacetaActosAdmin')?.value,
                anioactoadmin:this.generalForm.get('AnnoActosAdmin')?.value,
                ediciongaceta:this.generalForm.get('EdicionActosAdmin')?.value,
                codigoactoadmin:this.generalForm.get('IdActosAdmin')?.value,
                idestrimestralgaceta: this.generalForm.get('NoTrimestreActosAdmin')?.value,
                //Anexo 17
                numero_bol: this.generalForm.get('InputNroBoletin')?.value,
                anno: this.generalForm.get('ff_anio')?.value,
                mes: this.MesesCheck,
                //Anexo 04
                ubicacion_inmueble: this.generalForm.get('InputDepartamentoInmueble')?.value,
                hechos_providencia: this.generalForm.get('InputHechosProvidecia')?.value,
                nombre_predio: this.generalForm.get('InputNombrePredio')?.value,
                cedula_catastral: this.generalForm.get('InputCedulaCastastral')?.value,
                matricula_inmobiliaria: this.generalForm.get('InputMatriculaInmobiliaria')?.value,
                //Anexo 14
                fuente: this.origenBibliotecaRedCheck,
                subseccion: subseccionTmp,
            };
        }else{
            strJson = object;
        }
        
        let objJson = JSON.parse(JSON.stringify(strJson));
        this.elasticService.postBuscar(objJson, page, limit, url).subscribe(
            (estados: JSON) => {
                this.respuesta = estados;
                if (this.respuesta.results.length == 0) {
                    this.emptyresults = true;
                }
                else {
                    this.filter = this.respuesta.dynamic_filters;
                    this.querySearch = this.respuesta.query;
                    this.findResult = this.respuesta;
                    this.activeSearch = true;
                }
                this.spinner.hide();
            });
    }

    //Funciones - métodos Arturo
    public cargarSalas() {
        this.elasticService.getSalasFilter(this.allItems, this.generalForm.get("origen")?.value, this.allItemsExtraOrigen).subscribe(
            (respuesta: any) => {
                this.salas = respuesta.results;
            }
        )
    }

    public cargarDescriptores() {
        /*this.elasticService.getDescriptores().subscribe(
            (respuesta: any) => {
                this.tribunalDespacho = respuesta;
            }
        )*/
        this.elasticService.getSalasFilter(this.allItems, this.generalForm.get("origen")?.value, this.allItemsExtraOrigen).subscribe(
            (respuesta: any) => {
                this.tribunalDespacho = respuesta.results;
            }
        )
    }


    public cargarTemas() {
        this.elasticService.getTemasFilter(this.allItems, this.generalForm.get("origen")?.value, this.allItemsExtraOrigen).subscribe(
            (respuesta: any) => {
                this.tema = respuesta.results;
            }
        )
    }

    public cargarPonente() {
        this.elasticService.getPonentesFilter(this.allItems, this.generalForm.get("origen")?.value, this.allItemsExtraOrigen).subscribe(
            (respuesta: any) => {
                this.ponencia = respuesta.results;
            }
        )
    }

    public cargarEntidadGeneradora() {
        this.elasticService.getEntidadGeneradora().subscribe(
            (respuesta: any) => {
                this.entidadGeneradora = respuesta.results;
            }
        )
        
    }

    public cargarTipoMaterial() {
        this.elasticService.getTipoMaterial().subscribe(
            (respuesta: any) => {
                this.tipoMaterial = respuesta.results;
            }
        )
        
    }
    public cargarSalaConocimiento() {
        this.elasticService.getSalaConocimiento().subscribe(
            (respuesta: any) => {
                this.salaConocimiento = respuesta.results;
            }
        )
    }

    public cargarNaturalezaProceso() {
        this.elasticService.getNaturalezaProceso().subscribe(
            (respuesta: any) => {
                this.naturalezaProceso = respuesta.results;
            }
        )
    }

    public cargarCorporacion() {
        this.elasticService.getCorporaciones().subscribe(
            (respuesta: any) => {
                this.corporaciones = respuesta.results;
            }
        )
    }

    public cargarBibliotecas() {
        this.elasticService.getBibliotecas().subscribe(
            (respuesta: any) => {
                this.origenBibliotecaRed = respuesta;
            }
        )
    }

    public cargarEstado() {
        this.elasticService.getEstado(this.allItems, this.generalForm.get("origen")?.value, this.allItemsExtraOrigen).subscribe(
            (respuesta: any) => {
                this.estado = respuesta.results;
            }
        )
    }

    public cargarSeccion() {
        this.elasticService.getSeccion(this.allItems, this.generalForm.get("origen")?.value, this.allItemsExtraOrigen).subscribe(
            (respuesta: any) => {
                this.seccionOptions = respuesta.results;
            }
        )
    }

    public cargarTipoNorma() {
        this.elasticService.getTipoNorma().subscribe(
            (respuesta: any) => {
                this.tipoNorma = respuesta.results;
            }
        )
    }



    public cargarTipoSala() {
        this.elasticService.getTipossalaFilter(this.allItems, this.generalForm.get("origen")?.value, this.allItemsExtraOrigen).subscribe(
            (respuesta: any) => {
                this.tipoSalas = respuesta.results;
                this.tipoSalasInicial = respuesta.results
            }
        )
    }

    public cargarTipoNroProvidencia() {
        this.elasticService.getTiposprovidenciaFilter(this.allItems, this.generalForm.get("origen")?.value, this.allItemsExtraOrigen).subscribe(
            (respuesta: any) => {
                this.tipoNroProvidencia = respuesta.results;
            }
        )
    }

    public cargarClaseDeActuacion() {
        this.elasticService.getClasesactuacionFilter(this.allItems, this.generalForm.get("origen")?.value, this.allItemsExtraOrigen).subscribe(
            (respuesta: any) => {
                this.claseDeActuacion = respuesta.results;
            }
        )
    }

    public cargarFuentesFormales() {
        this.elasticService.getFuentesformales().subscribe(
            (respuesta: any) => {
                this.fuentesFormales = respuesta.results;
            }
        )
    }

    public cargarTipoProcedencias() {
        this.elasticService.getProcedenciasFilter(this.allItems, this.generalForm.get("origen")?.value, this.allItemsExtraOrigen).subscribe(
            (respuesta: any) => {
                this.tipoProcedencias = respuesta.results;
            }
        )
    }

    public cargarTipoDelitos() {
        this.elasticService.getDelitosFilter(this.allItems, this.generalForm.get("origen")?.value, this.allItemsExtraOrigen).subscribe(
            (respuesta: any) => {
                this.tipoDelitos = respuesta.results;
            }
        )
    }

    public cargarTipoActos() {
        this.elasticService.getTipoActos().subscribe(
            (respuesta: any) => {
                this.tipoActos = respuesta.results;
            }
        )
    }

    public cargarTipoServidoresPublicos() {
        this.elasticService.getTiposprovidencia().subscribe(
            (respuesta: any) => {
                this.servidores_publicos = respuesta.results;
            }
        )
    }

    public cargarTipoFuentesFormales() {
        this.elasticService.getFuentesformales().subscribe(
            (respuesta: any) => {
                this.tipoFuentesFormales = respuesta.results;
                this.tipoFuentesFormalesTemp = respuesta.results;
            }
        )
    }

    public cargarTemaTres(temaTres: any) {
        this.temaTres = [];
        this.elasticService.getTemaTres(temaTres).subscribe(
            (respuesta: any) => {
                this.temaTres = respuesta;
            }
        )
    }

    public cargarTemaTres6(temaTres6: any) {
        this.temaTres6 = [];
        this.elasticService.getTemaTres(temaTres6).subscribe(
            (respuesta: any) => {
                this.temaTres6 = respuesta;
            }
        )
    }

    public cargarTemaTres8(temaTres8: any) {
        this.temaTres8 = [];
        this.elasticService.getTemaTres(temaTres8).subscribe(
            (respuesta: any) => {
                this.temaTres8 = respuesta;
            }
        )
    }

    public cargarTemaTresDescriptivo(temaTres: any) {
        this.temaTres = [];
        this.elasticService.getTemaTres(temaTres).subscribe(
            (respuesta: any) => {
                this.temaTresDescriptivo = respuesta;
            }
        )
    }

    public cargarTemaTresDescriptoresNormativa(temaTres: any) {
        this.temaTresDescriptoresNormativa = [];
        this.elasticService.getTemaTres(temaTres).subscribe(
            (respuesta: any) => {
                this.temaTresDescriptoresNormativa = respuesta;
            }
        )
    }   


    public cargarTemaTresVocabularioControlado15(temaTres: any) {
        this.temaTres = [];
        this.elasticService.getTemaTres(temaTres).subscribe(
            (respuesta: any) => {
                this.temaTresVocabularioControlado15 = respuesta;
            }
        )
    }   
    
    //Funciones - métodos Arturo
    public cargarListParamEnabled() {
        var auxToken = sessionStorage.getItem('token');
        var dropdowns = "Corte%20Suprema%20de%20Justicia";
        var sources = "Altas%20Cortes";
        var look_feel = "CNSJ";

        this.elasticService.getListParamEnabled( dropdowns, sources, look_feel).subscribe(
            (respuesta: any) => {

                (Object.keys(respuesta) as (keyof typeof respuesta)[]).forEach((key, index) => {
                    if(respuesta[key].status == true){
                        this.listParamEnabledArray[respuesta[key].form_control_name] = respuesta[key].form_control_name;
                    }
                });               
            }
        )
    }


    //Funciones - métodos Cristian
    public dropdownMultiSettings = {
        "selectAllText": "Seleccionar todo",
        "unSelectAllText": "Deseleccionar todo",
    }

    //Funciones - métodos Accesibilidad WCAG Cristian

    public showIncExButtoms() {
        if (this.flagIncExButtoms == true)
            this.flagIncExButtoms = false;
        else {
            this.flagIncExButtoms = true;
        }
    }

    public showIncExButtomsT() {
        if (this.flagIncExButtomsT == true)
            this.flagIncExButtomsT = false;
        else {
            this.flagIncExButtomsT = true;
        }
    }

    public showIncExButtomsPR() {
        if (this.flagIncExButtomsPR == true)
            this.flagIncExButtomsPR = false;
        else {
            this.flagIncExButtomsPR = true;
        }
    }

    public showIncExButtomsJR() {
        if (this.flagIncExButtomsJR == true)
            this.flagIncExButtomsJR = false;
        else {
            this.flagIncExButtomsJR = true;
        }
    }

    public showIncExButtomsC() {
        if (this.flagIncExButtomsC == true)
            this.flagIncExButtomsC = false;
        else {
            this.flagIncExButtomsC = true;
        }
    }

    public showIncExButtomsA() {
        if (this.flagIncExButtomsA == true)
            this.flagIncExButtomsA = false;
        else {
            this.flagIncExButtomsA = true;
        }
    }

    public showIncExButtomsD() {
        if (this.flagIncExButtomsD == true)
            this.flagIncExButtomsD = false;
        else {
            this.flagIncExButtomsD = true;
        }
    }

    public showIncExButtomsE() {
        if (this.flagIncExButtomsE == true)
            this.flagIncExButtomsE = false;
        else {
            this.flagIncExButtomsE = true;
        }
    }

    public showIncExButtomsND() {
        if (this.flagIncExButtomsND == true)
            this.flagIncExButtomsND = false;
        else {
            this.flagIncExButtomsND = true;
        }
    }

    public showIncExButtomsFF() {
        if (this.flagIncExButtomsFF == true)
            this.flagIncExButtomsFF = false;
        else {
            this.flagIncExButtomsFF = true;
        }
    }

    checkListas(Lista: any) {

        let respuesta;
        if (Lista === 0) {
            if (this.generalForm.get("textoYContenga").value[0].length <= 3) {
                respuesta = true;
            }
        }
        return respuesta;
    }

    moreAnd1(){
        if ((this.generalForm.get("textoAux1")?.value != '') && (this.generalForm.get("textoCriterio1")?.value == "Y Que Contenga")) {
            this.auxAnd.push(this.generalForm.get("textoAux1")?.value)
            this.flagMoreAnd1 = true;
            this.generalForm.patchValue({
                textoYContenga: [this.auxAnd]
            })
        }
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio1")?.value, 'more');

    }
    moreAnd2(){
        if ((this.generalForm.get("textoAux2")?.value != '') && (this.generalForm.get("textoCriterio2")?.value == "Y Que Contenga")) {
            this.auxAnd.push(this.generalForm.get("textoAux2")?.value)
            this.flagMoreAnd2 = true;
        }
        this.generalForm.patchValue({
            textoYContenga: [this.auxAnd]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio2")?.value, 'more');
    }
    moreAnd3(){
        if ((this.generalForm.get("textoAux3")?.value != '') && (this.generalForm.get("textoCriterio3")?.value == "Y Que Contenga")) {
            this.auxAnd.push(this.generalForm.get("textoAux3")?.value)
            this.flagMoreAnd3 = true;
        }
        this.generalForm.patchValue({
            textoYContenga: [this.auxAnd]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio3")?.value, 'more');
    }
    moreAnd4(){
        if ((this.generalForm.get("textoAux4")?.value != '') && (this.generalForm.get("textoCriterio4")?.value == "Y Que Contenga")) {
            this.auxAnd.push(this.generalForm.get("textoAux4")?.value)
            this.flagMoreAnd4 = true;
        }
        this.generalForm.patchValue({
            textoYContenga: [this.auxAnd]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio4")?.value, 'more');
    }
    moreAnd5(){
        if ((this.generalForm.get("textoAux5")?.value != '') && (this.generalForm.get("textoCriterio5")?.value == "Y Que Contenga")) {
            this.auxAnd.push(this.generalForm.get("textoAux5")?.value)
            this.flagMoreAnd5 = true;
        }
        this.generalForm.patchValue({
            textoYContenga: [this.auxAnd]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio5")?.value, 'more');
    }
    moreAnd6(){
        if ((this.generalForm.get("textoAux6")?.value != '') && (this.generalForm.get("textoCriterio6")?.value == "Y Que Contenga")) {
            this.auxAnd.push(this.generalForm.get("textoAux6")?.value)
            this.flagMoreAnd6 = true;
        }
        this.generalForm.patchValue({
            textoYContenga: [this.auxAnd]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio6")?.value, 'more');
    }
    moreAnd7(){
        if ((this.generalForm.get("textoAux7")?.value != '') && (this.generalForm.get("textoCriterio7")?.value == "Y Que Contenga")) {
            this.auxAnd.push(this.generalForm.get("textoAux7")?.value)
            this.flagMoreAnd7 = true;
        }
        this.generalForm.patchValue({
            textoYContenga: [this.auxAnd]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio7")?.value, 'more');
    }
    moreAnd8(){
        if ((this.generalForm.get("textoAux8")?.value != '') && (this.generalForm.get("textoCriterio8")?.value == "Y Que Contenga")) {
            this.auxAnd.push(this.generalForm.get("textoAux8")?.value)
            this.flagMoreAnd8 = true;
        }
        this.generalForm.patchValue({
            textoYContenga: [this.auxAnd]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio8")?.value, 'more');
    }
    moreAnd9(){
        if ((this.generalForm.get("textoAux9")?.value != '') && (this.generalForm.get("textoCriterio9")?.value == "Y Que Contenga")) {
            this.auxAnd.push(this.generalForm.get("textoAux9")?.value)
            this.flagMoreAnd9 = true;
        }
        this.generalForm.patchValue({
            textoYContenga: [this.auxAnd]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio9")?.value, 'more');
    }

    lessAnd1() {
        if ((this.generalForm.get("textoAux1")?.value != '' && this.generalForm.get("textoCriterio1")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux1: "",
                textoCriterio1: ""
            })
            this.flagMoreAnd1 = false;
        }
        this.auxAnd.pop();
        this.grupoCriterio.pop();
        this.generalForm.patchValue({
            textoYContenga: [this.auxAnd]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio1")?.value, 'less');
    }
    lessAnd2() {
        if ((this.generalForm.get("textoAux2")?.value != '' && this.generalForm.get("textoCriterio2")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux2: "",
                textoCriterio2: ""
            })
            this.flagMoreAnd2 = false;
        }
        this.auxAnd.pop();
        this.grupoCriterio.pop();
        this.generalForm.patchValue({
            textoYContenga: [this.auxAnd]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio2")?.value, 'less');
    }
    lessAnd3() {
        if ((this.generalForm.get("textoAux3")?.value != '' && this.generalForm.get("textoCriterio3")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux3: "",
                textoCriterio3: ""
            })
            this.flagMoreAnd3 = false;
        }
        this.auxAnd.pop();
        this.grupoCriterio.pop();
        this.generalForm.patchValue({
            textoYContenga: [this.auxAnd]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio3")?.value, 'less');
    }
    lessAnd4() {
        if ((this.generalForm.get("textoAux4")?.value != '' && this.generalForm.get("textoCriterio4")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux4: "",
                textoCriterio4: ""
            })
            this.flagMoreAnd4 = false;
        }
        this.auxAnd.pop();
        this.grupoCriterio.pop()
        this.generalForm.patchValue({
            textoYContenga: [this.auxAnd]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio4")?.value, 'less');
    }
    lessAnd5() {
        if ((this.generalForm.get("textoAux5")?.value != '' && this.generalForm.get("textoCriterio5")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux5: "",
                textoCriterio5: ""
            })
            this.flagMoreAnd5 = false;
        }
        this.auxAnd.pop();
        this.grupoCriterio.pop()
        this.generalForm.patchValue({
            textoYContenga: [this.auxAnd]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio5")?.value, 'less');
    }
    lessAnd6() {
        if ((this.generalForm.get("textoAux6")?.value != '' && this.generalForm.get("textoCriterio6")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux6: "",
                textoCriterio6: ""
            })
            this.flagMoreAnd6 = false;
        }
        this.auxAnd.pop();
        this.grupoCriterio.pop()
        this.generalForm.patchValue({
            textoYContenga: [this.auxAnd]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio6")?.value, 'less');
    }
    lessAnd7() {
        if ((this.generalForm.get("textoAux7")?.value != '' && this.generalForm.get("textoCriterio7")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux7: "",
                textoCriterio7: ""
            })
            this.flagMoreAnd7 = false;
        }
        this.auxAnd.pop();
        this.grupoCriterio.pop()
        this.generalForm.patchValue({
            textoYContenga: [this.auxAnd]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio7")?.value, 'less');
    }
    lessAnd8() {
        if ((this.generalForm.get("textoAux8")?.value != '' && this.generalForm.get("textoCriterio8")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux8: "",
                textoCriterio8: ""
            })
            this.flagMoreAnd8 = false;
        }
        this.auxAnd.pop();
        this.grupoCriterio.pop()
        this.generalForm.patchValue({
            textoYContenga: [this.auxAnd]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio8")?.value, 'less');
    }
    lessAnd9() {
        if ((this.generalForm.get("textoAux9")?.value != '' && this.generalForm.get("textoCriterio9")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux9: "",
                textoCriterio9: ""
            })
            this.flagMoreAnd9 = false;
        }
        this.auxAnd.pop();
        this.grupoCriterio.pop()
        this.generalForm.patchValue({
            textoYContenga: [this.auxAnd]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio9")?.value, 'less');
    }

    moreOr1(){
        if ((this.generalForm.get("textoAux1")?.value != '') && (this.generalForm.get("textoCriterio1")?.value == "O Que Contenga")) {
            this.auxOr.push(this.generalForm.get("textoAux1")?.value)
            this.flagMoreOr1 = true;
            this.generalForm.patchValue({
                textoOContenga: [this.auxOr]
            })
        }
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio1")?.value, 'more');
    }
    moreOr2(){
        if ((this.generalForm.get("textoAux2")?.value != '') && (this.generalForm.get("textoCriterio2")?.value == "O Que Contenga")) {
            this.auxOr.push(this.generalForm.get("textoAux2")?.value)
            this.flagMoreOr2 = true;
        }
        this.generalForm.patchValue({
            textoOContenga: [this.auxOr]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio2")?.value, 'more');
    }
    moreOr3(){
        if ((this.generalForm.get("textoAux3")?.value != '') && (this.generalForm.get("textoCriterio3")?.value == "O Que Contenga")) {
            this.auxOr.push(this.generalForm.get("textoAux3")?.value)
            this.flagMoreOr3 = true;
        }
        this.generalForm.patchValue({
            textoOContenga: [this.auxOr]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio3")?.value, 'more');
    }
    moreOr4(){
        if ((this.generalForm.get("textoAux4")?.value != '') && (this.generalForm.get("textoCriterio4")?.value == "O Que Contenga")) {
            this.auxOr.push(this.generalForm.get("textoAux4")?.value)
            this.flagMoreOr4 = true;
        }
        this.generalForm.patchValue({
            textoOContenga: [this.auxOr]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio4")?.value, 'more');
    }
    moreOr5(){
        if ((this.generalForm.get("textoAux5")?.value != '') && (this.generalForm.get("textoCriterio5")?.value == "O Que Contenga")) {
            this.auxOr.push(this.generalForm.get("textoAux5")?.value)
            this.flagMoreOr5 = true;
        }
        this.generalForm.patchValue({
            textoOContenga: [this.auxOr]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio5")?.value, 'more');
    }
    moreOr6(){
        if ((this.generalForm.get("textoAux6")?.value != '') && (this.generalForm.get("textoCriterio6")?.value == "O Que Contenga")) {
            this.auxOr.push(this.generalForm.get("textoAux6")?.value)
            this.flagMoreOr6 = true;
        }
        this.generalForm.patchValue({
            textoOContenga: [this.auxOr]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio6")?.value, 'more');
    }
    moreOr7(){
        if ((this.generalForm.get("textoAux7")?.value != '') && (this.generalForm.get("textoCriterio7")?.value == "O Que Contenga")) {
            this.auxOr.push(this.generalForm.get("textoAux7")?.value)
            this.flagMoreOr7 = true;
        }
        this.generalForm.patchValue({
            textoOContenga: [this.auxOr]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio7")?.value, 'more');
    }
    moreOr8(){
        if ((this.generalForm.get("textoAux8")?.value != '') && (this.generalForm.get("textoCriterio8")?.value == "O Que Contenga")) {
            this.auxOr.push(this.generalForm.get("textoAux8")?.value)
            this.flagMoreOr8 = true;
        }
        this.generalForm.patchValue({
            textoOContenga: [this.auxOr]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio8")?.value, 'more');
    }
    moreOr9(){
        if ((this.generalForm.get("textoAux9")?.value != '') && (this.generalForm.get("textoCriterio9")?.value == "O Que Contenga")) {
            this.auxOr.push(this.generalForm.get("textoAux9")?.value)
            this.flagMoreOr9 = true;
        }
        this.generalForm.patchValue({
            textoOContenga: [this.auxOr]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio9")?.value, 'more');
    }

    lessOr1() {
        if ((this.generalForm.get("textoAux1")?.value != '' && this.generalForm.get("textoCriterio1")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux1: "",
                textoCriterio1: ""
            })
            this.flagMoreOr1 = false;
        }
        this.auxOr.pop();
        this.grupoCriterio.pop();
        this.generalForm.patchValue({
            textoOContenga: [this.auxOr]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio1")?.value, 'less');
    }
    lessOr2() {
        if ((this.generalForm.get("textoAux2")?.value != '' && this.generalForm.get("textoCriterio2")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux2: "",
                textoCriterio2: ""
            })
            this.flagMoreOr2 = false;
        }
        this.auxOr.pop();
        this.grupoCriterio.pop();
        this.generalForm.patchValue({
            textoOContenga: [this.auxOr]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio2")?.value, 'less');
    }
    lessOr3() {
        if ((this.generalForm.get("textoAux3")?.value != '' && this.generalForm.get("textoCriterio3")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux3: "",
                textoCriterio3: ""
            })
            this.flagMoreOr3 = false;
        }
        this.auxOr.pop();
        this.grupoCriterio.pop();
        this.generalForm.patchValue({
            textoOContenga: [this.auxOr]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio3")?.value, 'less');
    }
    lessOr4() {
        if ((this.generalForm.get("textoAux4")?.value != '' && this.generalForm.get("textoCriterio4")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux4: "",
                textoCriterio4: ""
            })
            this.flagMoreOr4 = false;
        }
        this.auxOr.pop();
        this.grupoCriterio.pop()
        this.generalForm.patchValue({
            textoOContenga: [this.auxOr]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio4")?.value, 'less');
    }
    lessOr5() {
        if ((this.generalForm.get("textoAux5")?.value != '' && this.generalForm.get("textoCriterio5")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux5: "",
                textoCriterio5: ""
            })
            this.flagMoreOr5 = false;
        }
        this.auxOr.pop();
        this.grupoCriterio.pop()
        this.generalForm.patchValue({
            textoOContenga: [this.auxOr]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio5")?.value, 'less');
    }
    lessOr6() {
        if ((this.generalForm.get("textoAux6")?.value != '' && this.generalForm.get("textoCriterio6")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux6: "",
                textoCriterio6: ""
            })
            this.flagMoreOr6 = false;
        }
        this.auxOr.pop();
        this.grupoCriterio.pop()
        this.generalForm.patchValue({
            textoOContenga: [this.auxOr]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio6")?.value, 'less');
    }
    lessOr7() {
        if ((this.generalForm.get("textoAux7")?.value != '' && this.generalForm.get("textoCriterio7")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux7: "",
                textoCriterio7: ""
            })
            this.flagMoreOr7 = false;
        }
        this.auxOr.pop();
        this.grupoCriterio.pop()
        this.generalForm.patchValue({
            textoOContenga: [this.auxOr]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio7")?.value, 'less');
    }
    lessOr8() {
        if ((this.generalForm.get("textoAux8")?.value != '' && this.generalForm.get("textoCriterio8")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux8: "",
                textoCriterio8: ""
            })
            this.flagMoreOr8 = false;
        }
        this.auxOr.pop();
        this.grupoCriterio.pop()
        this.generalForm.patchValue({
            textoOContenga: [this.auxOr]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio8")?.value, 'less');
    }
    lessOr9() {
        if ((this.generalForm.get("textoAux9")?.value != '' && this.generalForm.get("textoCriterio9")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux9: "",
                textoCriterio9: ""
            })
            this.flagMoreOr9 = false;
        }
        this.auxOr.pop();
        this.grupoCriterio.pop()
        this.generalForm.patchValue({
            textoOContenga: [this.auxOr]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio9")?.value, 'less');
    }

    moreEx1(){
        if ((this.generalForm.get("textoAux1")?.value != '') && (this.generalForm.get("textoCriterio1")?.value == "Que Excluya")) {
            this.auxEx.push(this.generalForm.get("textoAux1")?.value)
            this.flagMoreEx1 = true;
            this.generalForm.patchValue({
                textoExcluya: [this.auxEx]
            })
        }
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio1")?.value, 'more');
    }
    moreEx2(){
        if ((this.generalForm.get("textoAux2")?.value != '') && (this.generalForm.get("textoCriterio2")?.value == "Que Excluya")) {
            this.auxEx.push(this.generalForm.get("textoAux2")?.value)
            this.flagMoreEx2 = true;
            this.generalForm.patchValue({
                textoExcluya: [this.auxEx]
            })
        }
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio2")?.value, 'more');
    }
    moreEx3(){
        if ((this.generalForm.get("textoAux3")?.value != '') && (this.generalForm.get("textoCriterio3")?.value == "Que Excluya")) {
            this.auxEx.push(this.generalForm.get("textoAux3")?.value)
            this.flagMoreEx3 = true;
        }
        this.generalForm.patchValue({
            textoExcluya: [this.auxEx]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio3")?.value, 'more');
    }
    moreEx4(){
        if ((this.generalForm.get("textoAux4")?.value != '') && (this.generalForm.get("textoCriterio4")?.value == "Que Excluya")) {
            this.auxEx.push(this.generalForm.get("textoAux4")?.value)
            this.flagMoreEx4 = true;
        }
        this.generalForm.patchValue({
            textoExcluya: [this.auxEx]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio4")?.value, 'more');
    }
    moreEx5(){
        if ((this.generalForm.get("textoAux5")?.value != '') && (this.generalForm.get("textoCriterio5")?.value == "Que Excluya")) {
            this.auxEx.push(this.generalForm.get("textoAux5")?.value)
            this.flagMoreEx5 = true;
        }
        this.generalForm.patchValue({
            textoExcluya: [this.auxEx]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio5")?.value, 'more');
    }
    moreEx6(){
        if ((this.generalForm.get("textoAux6")?.value != '') && (this.generalForm.get("textoCriterio6")?.value == "Que Excluya")) {
            this.auxEx.push(this.generalForm.get("textoAux6")?.value)
            this.flagMoreEx6 = true;
        }
        this.generalForm.patchValue({
            textoExcluya: [this.auxEx]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio6")?.value, 'more');
    }
    moreEx7(){
        if ((this.generalForm.get("textoAux7")?.value != '') && (this.generalForm.get("textoCriterio7")?.value == "Que Excluya")) {
            this.auxEx.push(this.generalForm.get("textoAux7")?.value)
            this.flagMoreEx7 = true;
        }
        this.generalForm.patchValue({
            textoExcluya: [this.auxEx]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio7")?.value, 'more');
    }
    moreEx8(){
        if ((this.generalForm.get("textoAux8")?.value != '') && (this.generalForm.get("textoCriterio8")?.value == "Que Excluya")) {
            this.auxEx.push(this.generalForm.get("textoAux8")?.value)
            this.flagMoreEx8 = true;
        }
        this.generalForm.patchValue({
            textoExcluya: [this.auxEx]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio8")?.value, 'more');
    }
    moreEx9(){
        if ((this.generalForm.get("textoAux9")?.value != '') && (this.generalForm.get("textoCriterio9")?.value == "Que Excluya")) {
            this.auxEx.push(this.generalForm.get("textoAux9")?.value)
            this.flagMoreEx9 = true;
        }
        this.generalForm.patchValue({
            textoExcluya: [this.auxEx]
        })
        do {
            this.itemCriteria += 1;
            this.grupoCriterio.push(this.itemCriteria);
        }
        while (this.itemCriteria < 9)

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio9")?.value, 'more');
    }

    lessEx1() {
        if ((this.generalForm.get("textoAux1")?.value != '' && this.generalForm.get("textoCriterio1")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux1: "",
                textoCriterio1: ""
            })
            this.flagMoreEx1 = false;
        }
        this.auxEx.pop();
        this.grupoCriterio.pop();
        this.generalForm.patchValue({
            textoExcluya: [this.auxEx]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio1")?.value, 'less');
    }
    lessEx2() {
        if ((this.generalForm.get("textoAux2")?.value != '' && this.generalForm.get("textoCriterio2")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux2: "",
                textoCriterio2: ""
            })
            this.flagMoreEx2 = false;
        }
        this.auxEx.pop();
        this.grupoCriterio.pop();
        this.generalForm.patchValue({
            textoExcluya: [this.auxEx]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio2")?.value, 'less');
    }
    lessEx3() {
        if ((this.generalForm.get("textoAux3")?.value != '' && this.generalForm.get("textoCriterio3")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux3: "",
                textoCriterio3: ""
            })
            this.flagMoreEx3 = false;
        }
        this.auxEx.pop();
        this.grupoCriterio.pop();
        this.generalForm.patchValue({
            textoExcluya: [this.auxEx]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio3")?.value, 'less');
    }
    lessEx4() {
        if ((this.generalForm.get("textoAux4")?.value != '' && this.generalForm.get("textoCriterio4")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux4: "",
                textoCriterio4: ""
            })
            this.flagMoreEx4 = false;
        }
        this.auxEx.pop();
        this.grupoCriterio.pop()
        this.generalForm.patchValue({
            textoExcluya: [this.auxEx]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio4")?.value, 'less');
    }
    lessEx5() {
        if ((this.generalForm.get("textoAux5")?.value != '' && this.generalForm.get("textoCriterio5")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux5: "",
                textoCriterio5: ""
            })
            this.flagMoreEx5 = false;
        }
        this.auxEx.pop();
        this.grupoCriterio.pop()
        this.generalForm.patchValue({
            textoExcluya: [this.auxEx]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio5")?.value, 'less');
    }
    lessEx6() {
        if ((this.generalForm.get("textoAux6")?.value != '' && this.generalForm.get("textoCriterio6")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux6: "",
                textoCriterio6: ""
            })
            this.flagMoreEx6 = false;
        }
        this.auxEx.pop();
        this.grupoCriterio.pop()
        this.generalForm.patchValue({
            textoExcluya: [this.auxEx]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio6")?.value, 'less');
    }
    lessEx7() {
        if ((this.generalForm.get("textoAux7")?.value != '' && this.generalForm.get("textoCriterio7")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux7: "",
                textoCriterio7: ""
            })
            this.flagMoreEx7 = false;
        }
        this.auxEx.pop();
        this.grupoCriterio.pop()
        this.generalForm.patchValue({
            textoExcluya: [this.auxEx]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio7")?.value, 'less');
    }
    lessEx8() {
        if ((this.generalForm.get("textoAux8")?.value != '' && this.generalForm.get("textoCriterio8")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux8: "",
                textoCriterio8: ""
            })
            this.flagMoreEx8 = false;
        }
        this.auxEx.pop();
        this.grupoCriterio.pop()
        this.generalForm.patchValue({
            textoExcluya: [this.auxEx]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio8")?.value, 'less');
    }
    lessEx9() {
        if ((this.generalForm.get("textoAux9")?.value != '' && this.generalForm.get("textoCriterio9")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux9: "",
                textoCriterio9: ""
            })
            this.flagMoreEx9 = false;
        }
        this.auxEx.pop();
        this.grupoCriterio.pop()
        this.generalForm.patchValue({
            textoExcluya: [this.auxEx]
        })

        this.validarCriteriosAceptados(this.generalForm.get("textoCriterio9")?.value, 'less');
    }

    moreAnd1A(){
        if ((this.generalForm.get("textoAux1A")?.value != '') && (this.generalForm.get("textoCriterio1A")?.value == "Y Que Contenga")) {
            this.auxAndA.push(this.generalForm.get("textoAux1A")?.value)
            this.flagMoreAnd1A = true;
            this.generalForm.patchValue({
                textoYContengaA: [this.auxAndA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio1A")?.value, 'more');
    }

    moreAnd2A(){
        if ((this.generalForm.get("textoAux2A")?.value != '') && (this.generalForm.get("textoCriterio2A")?.value == "Y Que Contenga")) {
            this.auxAndA.push(this.generalForm.get("textoAux2A")?.value)
            this.flagMoreAnd2A = true;
            this.generalForm.patchValue({
                textoYContengaA: [this.auxAndA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio2A")?.value, 'more');
    }

    moreAnd3A(){
        if ((this.generalForm.get("textoAux3A")?.value != '') && (this.generalForm.get("textoCriterio3A")?.value == "Y Que Contenga")) {
            this.auxAndA.push(this.generalForm.get("textoAux3A")?.value)
            this.flagMoreAnd3A = true;
            this.generalForm.patchValue({
                textoYContengaA: [this.auxAndA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio3A")?.value, 'more');
    }

    moreAnd4A(){
        if ((this.generalForm.get("textoAux4A")?.value != '') && (this.generalForm.get("textoCriterio4A")?.value == "Y Que Contenga")) {
            this.auxAndA.push(this.generalForm.get("textoAux4A")?.value)
            this.flagMoreAnd4A = true;
            this.generalForm.patchValue({
                textoYContengaA: [this.auxAndA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio4A")?.value, 'more');
    }

    moreAnd5A(){
        if ((this.generalForm.get("textoAux5A")?.value != '') && (this.generalForm.get("textoCriterio5A")?.value == "Y Que Contenga")) {
            this.auxAndA.push(this.generalForm.get("textoAux5A")?.value)
            this.flagMoreAnd5A = true;
            this.generalForm.patchValue({
                textoYContengaA: [this.auxAndA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio5A")?.value, 'more');
    }

    moreAnd6A(){
        if ((this.generalForm.get("textoAux6A")?.value != '') && (this.generalForm.get("textoCriterio6A")?.value == "Y Que Contenga")) {
            this.auxAndA.push(this.generalForm.get("textoAux6A")?.value)
            this.flagMoreAnd6A = true;
            this.generalForm.patchValue({
                textoYContengaA: [this.auxAndA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio6A")?.value, 'more');
    }

    moreAnd7A(){
        if ((this.generalForm.get("textoAux7A")?.value != '') && (this.generalForm.get("textoCriterio7A")?.value == "Y Que Contenga")) {
            this.auxAndA.push(this.generalForm.get("textoAux7A")?.value)
            this.flagMoreAnd7A = true;
            this.generalForm.patchValue({
                textoYContengaA: [this.auxAndA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio7A")?.value, 'more');
    }

    moreAnd8A(){
        if ((this.generalForm.get("textoAux8A")?.value != '') && (this.generalForm.get("textoCriterio8A")?.value == "Y Que Contenga")) {
            this.auxAndA.push(this.generalForm.get("textoAux8A")?.value)
            this.flagMoreAnd8A = true;
            this.generalForm.patchValue({
                textoYContengaA: [this.auxAndA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio8A")?.value, 'more');
    }

    moreAnd9A(){
        if ((this.generalForm.get("textoAux9A")?.value != '') && (this.generalForm.get("textoCriterio9A")?.value == "Y Que Contenga")) {
            this.auxAndA.push(this.generalForm.get("textoAux9A")?.value)
            this.flagMoreAnd9A = true;
            this.generalForm.patchValue({
                textoYContengaA: [this.auxAndA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio9A")?.value, 'more');
    }

    lessAnd1A() {
        if ((this.generalForm.get("textoAux1A")?.value != '' && this.generalForm.get("textoCriterio1A")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux1A: "",
                textoCriterio1A: ""
            })
            this.flagMoreAnd1A = false;
        }
        this.auxAndA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoYContengaA: [this.auxAndA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio1A")?.value, 'less');
    }

    lessAnd2A() {
        if ((this.generalForm.get("textoAux2A")?.value != '' && this.generalForm.get("textoCriterio2A")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux2A: "",
                textoCriterio2A: ""
            })
            this.flagMoreAnd2A = false;
        }
        this.auxAndA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoYContengaA: [this.auxAndA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio2A")?.value, 'less');
    }

    lessAnd3A() {
        if ((this.generalForm.get("textoAux3A")?.value != '' && this.generalForm.get("textoCriterio3A")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux3A: "",
                textoCriterio3A: ""
            })
            this.flagMoreAnd3A = false;
        }
        this.auxAndA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoYContengaA: [this.auxAndA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio3A")?.value, 'less');
    }

    lessAnd4A() {
        if ((this.generalForm.get("textoAux4A")?.value != '' && this.generalForm.get("textoCriterio4A")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux4A: "",
                textoCriterio4A: ""
            })
            this.flagMoreAnd4A = false;
        }
        this.auxAndA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoYContengaA: [this.auxAndA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio4A")?.value, 'less');
    }

    lessAnd5A() {
        if ((this.generalForm.get("textoAux5A")?.value != '' && this.generalForm.get("textoCriterio5A")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux5A: "",
                textoCriterio5A: ""
            })
            this.flagMoreAnd5A = false;
        }
        this.auxAndA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoYContengaA: [this.auxAndA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio5A")?.value, 'less');
    }

    lessAnd6A() {
        if ((this.generalForm.get("textoAux6A")?.value != '' && this.generalForm.get("textoCriterio6A")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux6A: "",
                textoCriterio6A: ""
            })
            this.flagMoreAnd6A = false;
        }
        this.auxAndA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoYContengaA: [this.auxAndA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio6A")?.value, 'less');
    }

    lessAnd7A() {
        if ((this.generalForm.get("textoAux7A")?.value != '' && this.generalForm.get("textoCriterio7A")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux7A: "",
                textoCriterio7A: ""
            })
            this.flagMoreAnd7A = false;
        }
        this.auxAndA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoYContengaA: [this.auxAndA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio7A")?.value, 'less');
    }

    lessAnd8A() {
        if ((this.generalForm.get("textoAux8A")?.value != '' && this.generalForm.get("textoCriterio8A")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux8A: "",
                textoCriterio8A: ""
            })
            this.flagMoreAnd8A = false;
        }
        this.auxAndA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoYContengaA: [this.auxAndA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio8A")?.value, 'less');
    }

    lessAnd9A() {
        if ((this.generalForm.get("textoAux9A")?.value != '' && this.generalForm.get("textoCriterio9A")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux9A: "",
                textoCriterio9A: ""
            })
            this.flagMoreAnd9A = false;
        }
        this.auxAndA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoYContengaA: [this.auxAndA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio9A")?.value, 'less');
    }

    moreOr1A(){
        if ((this.generalForm.get("textoAux1A")?.value != '') && (this.generalForm.get("textoCriterio1A")?.value == "O Que Contenga")) {
            this.auxOrA.push(this.generalForm.get("textoAux1A")?.value)
            this.flagMoreOr1A = true;
            this.generalForm.patchValue({
                textoOContengaA: [this.auxOrA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio1A")?.value, 'more');
    }

    moreOr2A(){
        if ((this.generalForm.get("textoAux2A")?.value != '') && (this.generalForm.get("textoCriterio2A")?.value == "O Que Contenga")) {
            this.auxOrA.push(this.generalForm.get("textoAux2A")?.value)
            this.flagMoreOr2A = true;
            this.generalForm.patchValue({
                textoOContengaA: [this.auxOrA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio2A")?.value, 'more');
    }

    moreOr3A(){
        if ((this.generalForm.get("textoAux3A")?.value != '') && (this.generalForm.get("textoCriterio3A")?.value == "O Que Contenga")) {
            this.auxOrA.push(this.generalForm.get("textoAux3A")?.value)
            this.flagMoreOr3A = true;
            this.generalForm.patchValue({
                textoOContengaA: [this.auxOrA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio3A")?.value, 'more');
    }

    moreOr4A(){
        if ((this.generalForm.get("textoAux4A")?.value != '') && (this.generalForm.get("textoCriterio4A")?.value == "O Que Contenga")) {
            this.auxOrA.push(this.generalForm.get("textoAux4A")?.value)
            this.flagMoreOr4A = true;
            this.generalForm.patchValue({
                textoOContengaA: [this.auxOrA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio4A")?.value, 'more');
    }

    moreOr5A(){
        if ((this.generalForm.get("textoAux5A")?.value != '') && (this.generalForm.get("textoCriterio5A")?.value == "O Que Contenga")) {
            this.auxOrA.push(this.generalForm.get("textoAux5A")?.value)
            this.flagMoreOr5A = true;
            this.generalForm.patchValue({
                textoOContengaA: [this.auxOrA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio5A")?.value, 'more');
    }

    moreOr6A(){
        if ((this.generalForm.get("textoAux6A")?.value != '') && (this.generalForm.get("textoCriterio6A")?.value == "O Que Contenga")) {
            this.auxOrA.push(this.generalForm.get("textoAux6A")?.value)
            this.flagMoreOr6A = true;
            this.generalForm.patchValue({
                textoOContengaA: [this.auxOrA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio6A")?.value, 'more');
    }

    moreOr7A(){
        if ((this.generalForm.get("textoAux7A")?.value != '') && (this.generalForm.get("textoCriterio7A")?.value == "O Que Contenga")) {
            this.auxOrA.push(this.generalForm.get("textoAux7A")?.value)
            this.flagMoreOr7A = true;
            this.generalForm.patchValue({
                textoOContengaA: [this.auxOrA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio7A")?.value, 'more');
    }

    moreOr8A(){
        if ((this.generalForm.get("textoAux8A")?.value != '') && (this.generalForm.get("textoCriterio8A")?.value == "O Que Contenga")) {
            this.auxOrA.push(this.generalForm.get("textoAux8A")?.value)
            this.flagMoreOr8A = true;
            this.generalForm.patchValue({
                textoOContengaA: [this.auxOrA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio8A")?.value, 'more');
    }

    moreOr9A(){
        if ((this.generalForm.get("textoAux9A")?.value != '') && (this.generalForm.get("textoCriterio9A")?.value == "O Que Contenga")) {
            this.auxOrA.push(this.generalForm.get("textoAux9A")?.value)
            this.flagMoreOr9A = true;
            this.generalForm.patchValue({
                textoOContengaA: [this.auxOrA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio9A")?.value, 'more');
    }

    lessOr1A() {
        if ((this.generalForm.get("textoAux1A")?.value != '' && this.generalForm.get("textoCriterio1A")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux1A: "",
                textoCriterio1A: ""
            })
            this.flagMoreOr1A = false;
        }
        this.auxOrA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoOContengaA: [this.auxOrA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio1A")?.value, 'less');
    }

    lessOr2A() {
        if ((this.generalForm.get("textoAux2A")?.value != '' && this.generalForm.get("textoCriterio2A")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux2A: "",
                textoCriterio2A: ""
            })
            this.flagMoreOr2A = false;
        }
        this.auxOrA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoOContengaA: [this.auxOrA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio2A")?.value, 'less');
    }

    lessOr3A() {
        if ((this.generalForm.get("textoAux3A")?.value != '' && this.generalForm.get("textoCriterio3A")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux3A: "",
                textoCriterio3A: ""
            })
            this.flagMoreOr3A = false;
        }
        this.auxOrA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoOContengaA: [this.auxOrA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio3A")?.value, 'less');
    }

    lessOr4A() {
        if ((this.generalForm.get("textoAux4A")?.value != '' && this.generalForm.get("textoCriterio4A")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux4A: "",
                textoCriterio4A: ""
            })
            this.flagMoreOr4A = false;
        }
        this.auxOrA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoOContengaA: [this.auxOrA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio4A")?.value, 'less');
    }

    lessOr5A() {
        if ((this.generalForm.get("textoAux5A")?.value != '' && this.generalForm.get("textoCriterio5A")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux5A: "",
                textoCriterio5A: ""
            })
            this.flagMoreOr5A = false;
        }
        this.auxOrA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoOContengaA: [this.auxOrA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio5A")?.value, 'less');
    }

    lessOr6A() {
        if ((this.generalForm.get("textoAux6A")?.value != '' && this.generalForm.get("textoCriterio6A")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux6A: "",
                textoCriterio6A: ""
            })
            this.flagMoreOr6A = false;
        }
        this.auxOrA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoOContengaA: [this.auxOrA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio6A")?.value, 'less');
    }

    lessOr7A() {
        if ((this.generalForm.get("textoAux7A")?.value != '' && this.generalForm.get("textoCriterio7A")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux7A: "",
                textoCriterio7A: ""
            })
            this.flagMoreOr7A = false;
        }
        this.auxOrA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoOContengaA: [this.auxOrA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio7A")?.value, 'less');
    }

    lessOr8A() {
        if ((this.generalForm.get("textoAux8A")?.value != '' && this.generalForm.get("textoCriterio8A")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux8A: "",
                textoCriterio8A: ""
            })
            this.flagMoreOr8A = false;
        }
        this.auxOrA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoOContengaA: [this.auxOrA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio8A")?.value, 'less');
    }

    lessOr9A() {
        if ((this.generalForm.get("textoAux9A")?.value != '' && this.generalForm.get("textoCriterio9A")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux9A: "",
                textoCriterio9A: ""
            })
            this.flagMoreOr9A = false;
        }
        this.auxOrA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoOContengaA: [this.auxOrA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio9A")?.value, 'less');
    }

    moreEx1A(){
        if ((this.generalForm.get("textoAux1A")?.value != '') && (this.generalForm.get("textoCriterio1A")?.value == "Que Excluya")) {
            this.auxExA.push(this.generalForm.get("textoAux1A")?.value)
            this.flagMoreEx1A = true;
            this.generalForm.patchValue({
                textoExcluyaA: [this.auxExA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio1A")?.value, 'more');
    }

    moreEx2A(){
        if ((this.generalForm.get("textoAux2A")?.value != '') && (this.generalForm.get("textoCriterio2A")?.value == "Que Excluya")) {
            this.auxExA.push(this.generalForm.get("textoAux2A")?.value)
            this.flagMoreEx2A = true;
            this.generalForm.patchValue({
                textoExcluyaA: [this.auxExA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio2A")?.value, 'more');
    }

    moreEx3A(){
        if ((this.generalForm.get("textoAux3A")?.value != '') && (this.generalForm.get("textoCriterio3A")?.value == "Que Excluya")) {
            this.auxExA.push(this.generalForm.get("textoAux3A")?.value)
            this.flagMoreEx3A = true;
            this.generalForm.patchValue({
                textoExcluyaA: [this.auxExA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio3A")?.value, 'more');
    }

    moreEx4A(){
        if ((this.generalForm.get("textoAux4A")?.value != '') && (this.generalForm.get("textoCriterio4A")?.value == "Que Excluya")) {
            this.auxExA.push(this.generalForm.get("textoAux4A")?.value)
            this.flagMoreEx4A = true;
            this.generalForm.patchValue({
                textoExcluyaA: [this.auxExA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio4A")?.value, 'more');
    }

    moreEx5A(){
        if ((this.generalForm.get("textoAux5A")?.value != '') && (this.generalForm.get("textoCriterio5A")?.value == "Que Excluya")) {
            this.auxExA.push(this.generalForm.get("textoAux5A")?.value)
            this.flagMoreEx5A = true;
            this.generalForm.patchValue({
                textoExcluyaA: [this.auxExA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio5A")?.value, 'more');
    }

    moreEx6A(){
        if ((this.generalForm.get("textoAux6A")?.value != '') && (this.generalForm.get("textoCriterio6A")?.value == "Que Excluya")) {
            this.auxExA.push(this.generalForm.get("textoAux6A")?.value)
            this.flagMoreEx6A = true;
            this.generalForm.patchValue({
                textoExcluyaA: [this.auxExA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio6A")?.value, 'more');
    }

    moreEx7A(){
        if ((this.generalForm.get("textoAux7A")?.value != '') && (this.generalForm.get("textoCriterio7A")?.value == "Que Excluya")) {
            this.auxExA.push(this.generalForm.get("textoAux7A")?.value)
            this.flagMoreEx7A = true;
            this.generalForm.patchValue({
                textoExcluyaA: [this.auxExA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio7A")?.value, 'more');
    }

    moreEx8A(){
        if ((this.generalForm.get("textoAux8A")?.value != '') && (this.generalForm.get("textoCriterio8A")?.value == "Que Excluya")) {
            this.auxExA.push(this.generalForm.get("textoAux8A")?.value)
            this.flagMoreEx8A = true;
            this.generalForm.patchValue({
                textoExcluyaA: [this.auxExA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio8A")?.value, 'more');
    }

    moreEx9A(){
        if ((this.generalForm.get("textoAux9A")?.value != '') && (this.generalForm.get("textoCriterio9A")?.value == "Que Excluya")) {
            this.auxExA.push(this.generalForm.get("textoAux9A")?.value)
            this.flagMoreEx9A = true;
            this.generalForm.patchValue({
                textoExcluyaA: [this.auxExA]
            })
        }
        do {
            this.itemCriteriaA += 1;
            this.grupoCriterioA.push(this.itemCriteriaA);
        }
        while (this.itemCriteriaA < 9)

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio9A")?.value, 'more');
    }

    lessEx1A() {
        if ((this.generalForm.get("textoAux1A")?.value != '' && this.generalForm.get("textoCriterio1A")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux1A: "",
                textoCriterio1A: ""
            })
            this.flagMoreEx1A = false;
        }
        this.auxExA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoExcluyaA: [this.auxExA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio1A")?.value, 'less');
    }

    lessEx2A() {
        if ((this.generalForm.get("textoAux2A")?.value != '' && this.generalForm.get("textoCriterio2A")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux2A: "",
                textoCriterio2A: ""
            })
            this.flagMoreEx2A = false;
        }
        this.auxExA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoExcluyaA: [this.auxExA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio2A")?.value, 'less');
    }

    lessEx3A() {
        if ((this.generalForm.get("textoAux3A")?.value != '' && this.generalForm.get("textoCriterio3A")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux3A: "",
                textoCriterio3A: ""
            })
            this.flagMoreEx3A = false;
        }
        this.auxExA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoExcluyaA: [this.auxExA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio3A")?.value, 'less');
    }

    lessEx4A() {
        if ((this.generalForm.get("textoAux4A")?.value != '' && this.generalForm.get("textoCriterio4A")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux4A: "",
                textoCriterio4A: ""
            })
            this.flagMoreEx4A = false;
        }
        this.auxExA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoExcluyaA: [this.auxExA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio4A")?.value, 'less');
    }

    lessEx5A() {
        if ((this.generalForm.get("textoAux5A")?.value != '' && this.generalForm.get("textoCriterio5A")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux5A: "",
                textoCriterio5A: ""
            })
            this.flagMoreEx5A = false;
        }
        this.auxExA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoExcluyaA: [this.auxExA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio5A")?.value, 'less');
    }

    lessEx6A() {
        if ((this.generalForm.get("textoAux6A")?.value != '' && this.generalForm.get("textoCriterio6A")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux6A: "",
                textoCriterio6A: ""
            })
            this.flagMoreEx6A = false;
        }
        this.auxExA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoExcluyaA: [this.auxExA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio6A")?.value, 'less');
    }

    lessEx7A() {
        if ((this.generalForm.get("textoAux7A")?.value != '' && this.generalForm.get("textoCriterio7A")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux7A: "",
                textoCriterio7A: ""
            })
            this.flagMoreEx7A = false;
        }
        this.auxExA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoExcluyaA: [this.auxExA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio7A")?.value, 'less');
    }

    lessEx8A() {
        if ((this.generalForm.get("textoAux8A")?.value != '' && this.generalForm.get("textoCriterio8A")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux8A: "",
                textoCriterio8A: ""
            })
            this.flagMoreEx8A = false;
        }
        this.auxExA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoExcluyaA: [this.auxExA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio8A")?.value, 'less');
    }

    lessEx9A() {
        if ((this.generalForm.get("textoAux9A")?.value != '' && this.generalForm.get("textoCriterio9A")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux9A: "",
                textoCriterio9A: ""
            })
            this.flagMoreEx9A = false;
        }
        this.auxExA.pop();
        this.grupoCriterioA.pop();
        this.generalForm.patchValue({
            textoExcluyaA: [this.auxExA]
        })

        this.validarCriteriosAceptadosA(this.generalForm.get("textoCriterio9A")?.value, 'less');
    }

    moreAnd1C(){
        if ((this.generalForm.get("textoAux1C")?.value != '') && (this.generalForm.get("textoCriterio1C")?.value == "Y Que Contenga")) {
            this.auxAndC.push(this.generalForm.get("textoAux1C")?.value)
            this.flagMoreAnd1C = true;
            this.generalForm.patchValue({
                textoYContengaC: [this.auxAndC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio1C")?.value, 'more');
    }

    moreAnd2C(){
        if ((this.generalForm.get("textoAux2C")?.value != '') && (this.generalForm.get("textoCriterio2C")?.value == "Y Que Contenga")) {
            this.auxAndC.push(this.generalForm.get("textoAux2C")?.value)
            this.flagMoreAnd2C = true;
            this.generalForm.patchValue({
                textoYContengaC: [this.auxAndC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio2C")?.value, 'more');
    }

    moreAnd3C(){
        if ((this.generalForm.get("textoAux3C")?.value != '') && (this.generalForm.get("textoCriterio3C")?.value == "Y Que Contenga")) {
            this.auxAndC.push(this.generalForm.get("textoAux3C")?.value)
            this.flagMoreAnd3C = true;
            this.generalForm.patchValue({
                textoYContengaC: [this.auxAndC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio3C")?.value, 'more');
    }

    moreAnd4C(){
        if ((this.generalForm.get("textoAux4C")?.value != '') && (this.generalForm.get("textoCriterio4C")?.value == "Y Que Contenga")) {
            this.auxAndC.push(this.generalForm.get("textoAux4C")?.value)
            this.flagMoreAnd4C = true;
            this.generalForm.patchValue({
                textoYContengaC: [this.auxAndC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio4C")?.value, 'more');
    }

    moreAnd5C(){
        if ((this.generalForm.get("textoAux5C")?.value != '') && (this.generalForm.get("textoCriterio5C")?.value == "Y Que Contenga")) {
            this.auxAndC.push(this.generalForm.get("textoAux5C")?.value)
            this.flagMoreAnd5C = true;
            this.generalForm.patchValue({
                textoYContengaC: [this.auxAndC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio5C")?.value, 'more');
    }

    moreAnd6C(){
        if ((this.generalForm.get("textoAux6C")?.value != '') && (this.generalForm.get("textoCriterio6C")?.value == "Y Que Contenga")) {
            this.auxAndC.push(this.generalForm.get("textoAux6C")?.value)
            this.flagMoreAnd6C = true;
            this.generalForm.patchValue({
                textoYContengaC: [this.auxAndC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio6C")?.value, 'more');
    }

    moreAnd7C(){
        if ((this.generalForm.get("textoAux7C")?.value != '') && (this.generalForm.get("textoCriterio7C")?.value == "Y Que Contenga")) {
            this.auxAndC.push(this.generalForm.get("textoAux7C")?.value)
            this.flagMoreAnd7C = true;
            this.generalForm.patchValue({
                textoYContengaC: [this.auxAndC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio7C")?.value, 'more');
    }

    moreAnd8C(){
        if ((this.generalForm.get("textoAux8C")?.value != '') && (this.generalForm.get("textoCriterio8C")?.value == "Y Que Contenga")) {
            this.auxAndC.push(this.generalForm.get("textoAux8C")?.value)
            this.flagMoreAnd8C = true;
            this.generalForm.patchValue({
                textoYContengaC: [this.auxAndC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio8C")?.value, 'more');
    }

    moreAnd9C(){
        if ((this.generalForm.get("textoAux9C")?.value != '') && (this.generalForm.get("textoCriterio9C")?.value == "Y Que Contenga")) {
            this.auxAndC.push(this.generalForm.get("textoAux9C")?.value)
            this.flagMoreAnd9C = true;
            this.generalForm.patchValue({
                textoYContengaC: [this.auxAndC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio9C")?.value, 'more');
    }

    lessAnd1C() {
        if ((this.generalForm.get("textoAux1C")?.value != '' && this.generalForm.get("textoCriterio1C")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux1C: "",
                textoCriterio1C: ""
            })
            this.flagMoreAnd1C = false;
        }
        this.auxAndC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoYContengaC: [this.auxAndC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio1C")?.value, 'less');
    }

    lessAnd2C() {
        if ((this.generalForm.get("textoAux2C")?.value != '' && this.generalForm.get("textoCriterio2C")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux2C: "",
                textoCriterio2C: ""
            })
            this.flagMoreAnd2C = false;
        }
        this.auxAndC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoYContengaC: [this.auxAndC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio2C")?.value, 'less');
    }

    lessAnd3C() {
        if ((this.generalForm.get("textoAux3C")?.value != '' && this.generalForm.get("textoCriterio3C")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux3C: "",
                textoCriterio3C: ""
            })
            this.flagMoreAnd3C = false;
        }
        this.auxAndC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoYContengaC: [this.auxAndC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio3C")?.value, 'less');
    }

    lessAnd4C() {
        if ((this.generalForm.get("textoAux4C")?.value != '' && this.generalForm.get("textoCriterio4C")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux4C: "",
                textoCriterio4C: ""
            })
            this.flagMoreAnd4C = false;
        }
        this.auxAndC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoYContengaC: [this.auxAndC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio4C")?.value, 'less');
    }

    lessAnd5C() {
        if ((this.generalForm.get("textoAux5C")?.value != '' && this.generalForm.get("textoCriterio5C")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux5C: "",
                textoCriterio5C: ""
            })
            this.flagMoreAnd5C = false;
        }
        this.auxAndC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoYContengaC: [this.auxAndC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio5C")?.value, 'less');
    }

    lessAnd6C() {
        if ((this.generalForm.get("textoAux6C")?.value != '' && this.generalForm.get("textoCriterio6C")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux6C: "",
                textoCriterio6C: ""
            })
            this.flagMoreAnd6C = false;
        }
        this.auxAndC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoYContengaC: [this.auxAndC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio6C")?.value, 'less');
    }

    lessAnd7C() {
        if ((this.generalForm.get("textoAux7C")?.value != '' && this.generalForm.get("textoCriterio7C")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux7C: "",
                textoCriterio7C: ""
            })
            this.flagMoreAnd7C = false;
        }
        this.auxAndC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoYContengaC: [this.auxAndC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio7C")?.value, 'less');
    }

    lessAnd8C() {
        if ((this.generalForm.get("textoAux8C")?.value != '' && this.generalForm.get("textoCriterio8C")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux8C: "",
                textoCriterio8C: ""
            })
            this.flagMoreAnd8C = false;
        }
        this.auxAndC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoYContengaC: [this.auxAndC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio8C")?.value, 'less');
    }

    lessAnd9C() {
        if ((this.generalForm.get("textoAux9C")?.value != '' && this.generalForm.get("textoCriterio9C")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux9C: "",
                textoCriterio9C: ""
            })
            this.flagMoreAnd9C = false;
        }
        this.auxAndC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoYContengaC: [this.auxAndC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio9C")?.value, 'less');
    }

    moreOr1C(){
        if ((this.generalForm.get("textoAux1C")?.value != '') && (this.generalForm.get("textoCriterio1C")?.value == "O Que Contenga")) {
            this.auxOrC.push(this.generalForm.get("textoAux1C")?.value)
            this.flagMoreOr1C = true;
            this.generalForm.patchValue({
                textoOContengaC: [this.auxOrC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio1C")?.value, 'more');
    }

    moreOr2C(){
        if ((this.generalForm.get("textoAux2C")?.value != '') && (this.generalForm.get("textoCriterio2C")?.value == "O Que Contenga")) {
            this.auxOrC.push(this.generalForm.get("textoAux2C")?.value)
            this.flagMoreOr2C = true;
            this.generalForm.patchValue({
                textoOContengaC: [this.auxOrC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio2C")?.value, 'more');
    }

    moreOr3C(){
        if ((this.generalForm.get("textoAux3C")?.value != '') && (this.generalForm.get("textoCriterio3C")?.value == "O Que Contenga")) {
            this.auxOrC.push(this.generalForm.get("textoAux3C")?.value)
            this.flagMoreOr3C = true;
            this.generalForm.patchValue({
                textoOContengaC: [this.auxOrC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio3C")?.value, 'more');
    }

    moreOr4C(){
        if ((this.generalForm.get("textoAux4C")?.value != '') && (this.generalForm.get("textoCriterio4C")?.value == "O Que Contenga")) {
            this.auxOrC.push(this.generalForm.get("textoAux4C")?.value)
            this.flagMoreOr4C = true;
            this.generalForm.patchValue({
                textoOContengaC: [this.auxOrC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio4C")?.value, 'more');
    }

    moreOr5C(){
        if ((this.generalForm.get("textoAux5C")?.value != '') && (this.generalForm.get("textoCriterio5C")?.value == "O Que Contenga")) {
            this.auxOrC.push(this.generalForm.get("textoAux5C")?.value)
            this.flagMoreOr5C = true;
            this.generalForm.patchValue({
                textoOContengaC: [this.auxOrC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio5C")?.value, 'more');
    }

    moreOr6C(){
        if ((this.generalForm.get("textoAux6C")?.value != '') && (this.generalForm.get("textoCriterio6C")?.value == "O Que Contenga")) {
            this.auxOrC.push(this.generalForm.get("textoAux6C")?.value)
            this.flagMoreOr6C = true;
            this.generalForm.patchValue({
                textoOContengaC: [this.auxOrC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio6C")?.value, 'more');
    }

    moreOr7C(){
        if ((this.generalForm.get("textoAux7C")?.value != '') && (this.generalForm.get("textoCriterio7C")?.value == "O Que Contenga")) {
            this.auxOrC.push(this.generalForm.get("textoAux7C")?.value)
            this.flagMoreOr7C = true;
            this.generalForm.patchValue({
                textoOContengaC: [this.auxOrC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio7C")?.value, 'more');
    }

    moreOr8C(){
        if ((this.generalForm.get("textoAux8C")?.value != '') && (this.generalForm.get("textoCriterio8C")?.value == "O Que Contenga")) {
            this.auxOrC.push(this.generalForm.get("textoAux8C")?.value)
            this.flagMoreOr8C = true;
            this.generalForm.patchValue({
                textoOContengaC: [this.auxOrC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio8C")?.value, 'more');
    }

    moreOr9C(){
        if ((this.generalForm.get("textoAux9C")?.value != '') && (this.generalForm.get("textoCriterio9C")?.value == "O Que Contenga")) {
            this.auxOrC.push(this.generalForm.get("textoAux9C")?.value)
            this.flagMoreOr9C = true;
            this.generalForm.patchValue({
                textoOContengaC: [this.auxOrC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio9C")?.value, 'more');
    }

    lessOr1C() {
        if ((this.generalForm.get("textoAux1C")?.value != '' && this.generalForm.get("textoCriterio1C")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux1C: "",
                textoCriterio1C: ""
            })
            this.flagMoreOr1C = false;
        }
        this.auxOrC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoOContengaC: [this.auxOrC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio1C")?.value, 'less');
    }

    lessOr2C() {
        if ((this.generalForm.get("textoAux2C")?.value != '' && this.generalForm.get("textoCriterio2C")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux2C: "",
                textoCriterio2C: ""
            })
            this.flagMoreOr2C = false;
        }
        this.auxOrC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoOContengaC: [this.auxOrC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio2C")?.value, 'less');
    }

    lessOr3C() {
        if ((this.generalForm.get("textoAux3C")?.value != '' && this.generalForm.get("textoCriterio3C")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux3C: "",
                textoCriterio3C: ""
            })
            this.flagMoreOr3C = false;
        }
        this.auxOrC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoOContengaC: [this.auxOrC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio3C")?.value, 'less');
    }

    lessOr4C() {
        if ((this.generalForm.get("textoAux4C")?.value != '' && this.generalForm.get("textoCriterio4C")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux4C: "",
                textoCriterio4C: ""
            })
            this.flagMoreOr4C = false;
        }
        this.auxOrC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoOContengaC: [this.auxOrC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio4C")?.value, 'less');
    }

    lessOr5C() {
        if ((this.generalForm.get("textoAux5C")?.value != '' && this.generalForm.get("textoCriterio5C")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux5C: "",
                textoCriterio5C: ""
            })
            this.flagMoreOr5C = false;
        }
        this.auxOrC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoOContengaC: [this.auxOrC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio5C")?.value, 'less');
    }

    lessOr6C() {
        if ((this.generalForm.get("textoAux6C")?.value != '' && this.generalForm.get("textoCriterio6C")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux6C: "",
                textoCriterio6C: ""
            })
            this.flagMoreOr6C = false;
        }
        this.auxOrC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoOContengaC: [this.auxOrC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio6C")?.value, 'less');
    }

    lessOr7C() {
        if ((this.generalForm.get("textoAux7C")?.value != '' && this.generalForm.get("textoCriterio7C")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux7C: "",
                textoCriterio7C: ""
            })
            this.flagMoreOr7C = false;
        }
        this.auxOrC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoOContengaC: [this.auxOrC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio7C")?.value, 'less');
    }

    lessOr8C() {
        if ((this.generalForm.get("textoAux8C")?.value != '' && this.generalForm.get("textoCriterio8C")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux8C: "",
                textoCriterio8C: ""
            })
            this.flagMoreOr8C = false;
        }
        this.auxOrC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoOContengaC: [this.auxOrC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio8C")?.value, 'less');
    }

    lessOr9C() {
        if ((this.generalForm.get("textoAux9C")?.value != '' && this.generalForm.get("textoCriterio9C")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux9C: "",
                textoCriterio9C: ""
            })
            this.flagMoreOr9C = false;
        }
        this.auxOrC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoOContengaC: [this.auxOrC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio9C")?.value, 'less');
    }

    moreEx1C(){
        if ((this.generalForm.get("textoAux1C")?.value != '') && (this.generalForm.get("textoCriterio1C")?.value == "Que Excluya")) {
            this.auxExC.push(this.generalForm.get("textoAux1C")?.value)
            this.flagMoreEx1C = true;
            this.generalForm.patchValue({
                textoExcluyaC: [this.auxExC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio1C")?.value, 'more');
    }

    moreEx2C(){
        if ((this.generalForm.get("textoAux2C")?.value != '') && (this.generalForm.get("textoCriterio2C")?.value == "Que Excluya")) {
            this.auxExC.push(this.generalForm.get("textoAux2C")?.value)
            this.flagMoreEx2C = true;
            this.generalForm.patchValue({
                textoExcluyaC: [this.auxExC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio2C")?.value, 'more');
    }

    moreEx3C(){
        if ((this.generalForm.get("textoAux3C")?.value != '') && (this.generalForm.get("textoCriterio3C")?.value == "Que Excluya")) {
            this.auxExC.push(this.generalForm.get("textoAux3C")?.value)
            this.flagMoreEx3C = true;
            this.generalForm.patchValue({
                textoExcluyaC: [this.auxExC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio3C")?.value, 'more');
    }

    moreEx4C(){
        if ((this.generalForm.get("textoAux4C")?.value != '') && (this.generalForm.get("textoCriterio4C")?.value == "Que Excluya")) {
            this.auxExC.push(this.generalForm.get("textoAux4C")?.value)
            this.flagMoreEx4C = true;
            this.generalForm.patchValue({
                textoExcluyaC: [this.auxExC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio4C")?.value, 'more');
    }

    moreEx5C(){
        if ((this.generalForm.get("textoAux5C")?.value != '') && (this.generalForm.get("textoCriterio5C")?.value == "Que Excluya")) {
            this.auxExC.push(this.generalForm.get("textoAux5C")?.value)
            this.flagMoreEx5C = true;
            this.generalForm.patchValue({
                textoExcluyaC: [this.auxExC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio5C")?.value, 'more');
    }

    moreEx6C(){
        if ((this.generalForm.get("textoAux6C")?.value != '') && (this.generalForm.get("textoCriterio6C")?.value == "Que Excluya")) {
            this.auxExC.push(this.generalForm.get("textoAux6C")?.value)
            this.flagMoreEx6C = true;
            this.generalForm.patchValue({
                textoExcluyaC: [this.auxExC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio6C")?.value, 'more');
    }

    moreEx7C(){
        if ((this.generalForm.get("textoAux7C")?.value != '') && (this.generalForm.get("textoCriterio7C")?.value == "Que Excluya")) {
            this.auxExC.push(this.generalForm.get("textoAux7C")?.value)
            this.flagMoreEx7C = true;
            this.generalForm.patchValue({
                textoExcluyaC: [this.auxExC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio7C")?.value, 'more');
    }

    moreEx8C(){
        if ((this.generalForm.get("textoAux8C")?.value != '') && (this.generalForm.get("textoCriterio8C")?.value == "Que Excluya")) {
            this.auxExC.push(this.generalForm.get("textoAux8C")?.value)
            this.flagMoreEx8C = true;
            this.generalForm.patchValue({
                textoExcluyaC: [this.auxExC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio8C")?.value, 'more');
    }

    moreEx9C(){
        if ((this.generalForm.get("textoAux9C")?.value != '') && (this.generalForm.get("textoCriterio9C")?.value == "Que Excluya")) {
            this.auxExC.push(this.generalForm.get("textoAux9C")?.value)
            this.flagMoreEx9C = true;
            this.generalForm.patchValue({
                textoExcluyaC: [this.auxExC]
            })
        }
        do {
            this.itemCriteriaC += 1;
            this.grupoCriterioC.push(this.itemCriteriaC);
        }
        while (this.itemCriteriaC < 9)

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio9C")?.value, 'more');
    }

    lessEx1C() {
        if ((this.generalForm.get("textoAux1C")?.value != '' && this.generalForm.get("textoCriterio1C")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux1C: "",
                textoCriterio1C: ""
            })
            this.flagMoreEx1C = false;
        }
        this.auxExC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoExcluyaC: [this.auxExC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio1C")?.value, 'less');
    }

    lessEx2C() {
        if ((this.generalForm.get("textoAux2C")?.value != '' && this.generalForm.get("textoCriterio2C")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux2C: "",
                textoCriterio2C: ""
            })
            this.flagMoreEx2C = false;
        }
        this.auxExC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoExcluyaC: [this.auxExC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio2C")?.value, 'less');
    }

    lessEx3C() {
        if ((this.generalForm.get("textoAux3C")?.value != '' && this.generalForm.get("textoCriterio3C")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux3C: "",
                textoCriterio3C: ""
            })
            this.flagMoreEx3C = false;
        }
        this.auxExC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoExcluyaC: [this.auxExC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio3C")?.value, 'less');
    }

    lessEx4C() {
        if ((this.generalForm.get("textoAux4C")?.value != '' && this.generalForm.get("textoCriterio4C")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux4C: "",
                textoCriterio4C: ""
            })
            this.flagMoreEx4C = false;
        }
        this.auxExC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoExcluyaC: [this.auxExC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio4C")?.value, 'less');
    }

    lessEx5C() {
        if ((this.generalForm.get("textoAux5C")?.value != '' && this.generalForm.get("textoCriterio5C")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux5C: "",
                textoCriterio5C: ""
            })
            this.flagMoreEx5C = false;
        }
        this.auxExC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoExcluyaC: [this.auxExC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio5C")?.value, 'less');
    }

    lessEx6C() {
        if ((this.generalForm.get("textoAux6C")?.value != '' && this.generalForm.get("textoCriterio6C")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux6C: "",
                textoCriterio6C: ""
            })
            this.flagMoreEx6C = false;
        }
        this.auxExC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoExcluyaC: [this.auxExC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio6C")?.value, 'less');
    }

    lessEx7C() {
        if ((this.generalForm.get("textoAux7C")?.value != '' && this.generalForm.get("textoCriterio7C")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux7C: "",
                textoCriterio7C: ""
            })
            this.flagMoreEx7C = false;
        }
        this.auxExC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoExcluyaC: [this.auxExC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio7C")?.value, 'less');
    }

    lessEx8C() {
        if ((this.generalForm.get("textoAux8C")?.value != '' && this.generalForm.get("textoCriterio8C")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux8C: "",
                textoCriterio8C: ""
            })
            this.flagMoreEx8C = false;
        }
        this.auxExC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoExcluyaC: [this.auxExC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio8C")?.value, 'less');
    }

    lessEx9C() {
        if ((this.generalForm.get("textoAux9C")?.value != '' && this.generalForm.get("textoCriterio9C")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux9C: "",
                textoCriterio9C: ""
            })
            this.flagMoreEx9C = false;
        }
        this.auxExC.pop();
        this.grupoCriterioC.pop();
        this.generalForm.patchValue({
            textoExcluyaC: [this.auxExC]
        })

        this.validarCriteriosAceptadosC(this.generalForm.get("textoCriterio9C")?.value, 'less');
    }

    moreAnd1D(){
        if ((this.generalForm.get("textoAux1D")?.value != '') && (this.generalForm.get("textoCriterio1D")?.value == "Y Que Contenga")) {
            this.auxAndD.push(this.generalForm.get("textoAux1D")?.value)
            this.flagMoreAnd1D = true;
            this.generalForm.patchValue({
                textoYContengaD: [this.auxAndD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio1D")?.value, 'more');
    }

    moreAnd2D(){
        if ((this.generalForm.get("textoAux2D")?.value != '') && (this.generalForm.get("textoCriterio2D")?.value == "Y Que Contenga")) {
            this.auxAndD.push(this.generalForm.get("textoAux2D")?.value)
            this.flagMoreAnd2D = true;
            this.generalForm.patchValue({
                textoYContengaD: [this.auxAndD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio2D")?.value, 'more');
    }

    moreAnd3D(){
        if ((this.generalForm.get("textoAux3D")?.value != '') && (this.generalForm.get("textoCriterio3D")?.value == "Y Que Contenga")) {
            this.auxAndD.push(this.generalForm.get("textoAux3D")?.value)
            this.flagMoreAnd3D = true;
            this.generalForm.patchValue({
                textoYContengaD: [this.auxAndD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio3D")?.value, 'more');
    }

    moreAnd4D(){
        if ((this.generalForm.get("textoAux4D")?.value != '') && (this.generalForm.get("textoCriterio4D")?.value == "Y Que Contenga")) {
            this.auxAndD.push(this.generalForm.get("textoAux4D")?.value)
            this.flagMoreAnd4D = true;
            this.generalForm.patchValue({
                textoYContengaD: [this.auxAndD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio4D")?.value, 'more');
    }

    moreAnd5D(){
        if ((this.generalForm.get("textoAux5D")?.value != '') && (this.generalForm.get("textoCriterio5D")?.value == "Y Que Contenga")) {
            this.auxAndD.push(this.generalForm.get("textoAux5D")?.value)
            this.flagMoreAnd5D = true;
            this.generalForm.patchValue({
                textoYContengaD: [this.auxAndD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio5D")?.value, 'more');
    }

    moreAnd6D(){
        if ((this.generalForm.get("textoAux6D")?.value != '') && (this.generalForm.get("textoCriterio6D")?.value == "Y Que Contenga")) {
            this.auxAndD.push(this.generalForm.get("textoAux6D")?.value)
            this.flagMoreAnd6D = true;
            this.generalForm.patchValue({
                textoYContengaD: [this.auxAndD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio6D")?.value, 'more');
    }

    moreAnd7D(){
        if ((this.generalForm.get("textoAux7D")?.value != '') && (this.generalForm.get("textoCriterio7D")?.value == "Y Que Contenga")) {
            this.auxAndD.push(this.generalForm.get("textoAux7D")?.value)
            this.flagMoreAnd7D = true;
            this.generalForm.patchValue({
                textoYContengaD: [this.auxAndD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio7D")?.value, 'more');
    }

    moreAnd8D(){
        if ((this.generalForm.get("textoAux8D")?.value != '') && (this.generalForm.get("textoCriterio8D")?.value == "Y Que Contenga")) {
            this.auxAndD.push(this.generalForm.get("textoAux8D")?.value)
            this.flagMoreAnd8D = true;
            this.generalForm.patchValue({
                textoYContengaD: [this.auxAndD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio8D")?.value, 'more');
    }

    moreAnd9D(){
        if ((this.generalForm.get("textoAux9D")?.value != '') && (this.generalForm.get("textoCriterio9D")?.value == "Y Que Contenga")) {
            this.auxAndD.push(this.generalForm.get("textoAux9D")?.value)
            this.flagMoreAnd9D = true;
            this.generalForm.patchValue({
                textoYContengaD: [this.auxAndD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio9D")?.value, 'more');
    }

    lessAnd1D() {
        if ((this.generalForm.get("textoAux1D")?.value != '' && this.generalForm.get("textoCriterio1D")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux1D: "",
                textoCriterio1D: ""
            })
            this.flagMoreAnd1D = false;
        }
        this.auxAndD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoYContengaD: [this.auxAndD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio1D")?.value, 'less');
    }

    lessAnd2D() {
        if ((this.generalForm.get("textoAux2D")?.value != '' && this.generalForm.get("textoCriterio2D")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux2D: "",
                textoCriterio2D: ""
            })
            this.flagMoreAnd2D = false;
        }
        this.auxAndD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoYContengaD: [this.auxAndD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio2D")?.value, 'less');
    }

    lessAnd3D() {
        if ((this.generalForm.get("textoAux3D")?.value != '' && this.generalForm.get("textoCriterio3D")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux3D: "",
                textoCriterio3D: ""
            })
            this.flagMoreAnd3D = false;
        }
        this.auxAndD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoYContengaD: [this.auxAndD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio3D")?.value, 'less');
    }

    lessAnd4D() {
        if ((this.generalForm.get("textoAux4D")?.value != '' && this.generalForm.get("textoCriterio4D")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux4D: "",
                textoCriterio4D: ""
            })
            this.flagMoreAnd4D = false;
        }
        this.auxAndD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoYContengaD: [this.auxAndD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio4D")?.value, 'less');
    }

    lessAnd5D() {
        if ((this.generalForm.get("textoAux5D")?.value != '' && this.generalForm.get("textoCriterio5D")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux5D: "",
                textoCriterio5D: ""
            })
            this.flagMoreAnd5D = false;
        }
        this.auxAndD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoYContengaD: [this.auxAndD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio5D")?.value, 'less');
    }

    lessAnd6D() {
        if ((this.generalForm.get("textoAux6D")?.value != '' && this.generalForm.get("textoCriterio6D")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux6D: "",
                textoCriterio6D: ""
            })
            this.flagMoreAnd6D = false;
        }
        this.auxAndD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoYContengaD: [this.auxAndD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio6D")?.value, 'less');
    }

    lessAnd7D() {
        if ((this.generalForm.get("textoAux7D")?.value != '' && this.generalForm.get("textoCriterio7D")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux7D: "",
                textoCriterio7D: ""
            })
            this.flagMoreAnd7D = false;
        }
        this.auxAndD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoYContengaD: [this.auxAndD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio7D")?.value, 'less');
    }

    lessAnd8D() {
        if ((this.generalForm.get("textoAux8D")?.value != '' && this.generalForm.get("textoCriterio8D")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux8D: "",
                textoCriterio8D: ""
            })
            this.flagMoreAnd8D = false;
        }
        this.auxAndD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoYContengaD: [this.auxAndD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio8D")?.value, 'less');
    }

    lessAnd9D() {
        if ((this.generalForm.get("textoAux9D")?.value != '' && this.generalForm.get("textoCriterio9D")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux9D: "",
                textoCriterio9D: ""
            })
            this.flagMoreAnd9D = false;
        }
        this.auxAndD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoYContengaD: [this.auxAndD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio9D")?.value, 'less');
    }

    moreOr1D(){
        if ((this.generalForm.get("textoAux1D")?.value != '') && (this.generalForm.get("textoCriterio1D")?.value == "O Que Contenga")) {
            this.auxOrD.push(this.generalForm.get("textoAux1D")?.value)
            this.flagMoreOr1D = true;
            this.generalForm.patchValue({
                textoOContengaD: [this.auxOrD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio1D")?.value, 'more');
    }

    moreOr2D(){
        if ((this.generalForm.get("textoAux2D")?.value != '') && (this.generalForm.get("textoCriterio2D")?.value == "O Que Contenga")) {
            this.auxOrD.push(this.generalForm.get("textoAux2D")?.value)
            this.flagMoreOr2D = true;
            this.generalForm.patchValue({
                textoOContengaD: [this.auxOrD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio2D")?.value, 'more');
    }

    moreOr3D(){
        if ((this.generalForm.get("textoAux3D")?.value != '') && (this.generalForm.get("textoCriterio3D")?.value == "O Que Contenga")) {
            this.auxOrD.push(this.generalForm.get("textoAux3D")?.value)
            this.flagMoreOr3D = true;
            this.generalForm.patchValue({
                textoOContengaD: [this.auxOrD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio3D")?.value, 'more');
    }

    moreOr4D(){
        if ((this.generalForm.get("textoAux4D")?.value != '') && (this.generalForm.get("textoCriterio4D")?.value == "O Que Contenga")) {
            this.auxOrD.push(this.generalForm.get("textoAux4D")?.value)
            this.flagMoreOr4D = true;
            this.generalForm.patchValue({
                textoOContengaD: [this.auxOrD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio4D")?.value, 'more');
    }

    moreOr5D(){
        if ((this.generalForm.get("textoAux5D")?.value != '') && (this.generalForm.get("textoCriterio5D")?.value == "O Que Contenga")) {
            this.auxOrD.push(this.generalForm.get("textoAux5D")?.value)
            this.flagMoreOr5D = true;
            this.generalForm.patchValue({
                textoOContengaD: [this.auxOrD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio5D")?.value, 'more');
    }

    moreOr6D(){
        if ((this.generalForm.get("textoAux6D")?.value != '') && (this.generalForm.get("textoCriterio6D")?.value == "O Que Contenga")) {
            this.auxOrD.push(this.generalForm.get("textoAux6D")?.value)
            this.flagMoreOr6D = true;
            this.generalForm.patchValue({
                textoOContengaD: [this.auxOrD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio6D")?.value, 'more');
    }

    moreOr7D(){
        if ((this.generalForm.get("textoAux7D")?.value != '') && (this.generalForm.get("textoCriterio7D")?.value == "O Que Contenga")) {
            this.auxOrD.push(this.generalForm.get("textoAux7D")?.value)
            this.flagMoreOr7D = true;
            this.generalForm.patchValue({
                textoOContengaD: [this.auxOrD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio7D")?.value, 'more');
    }

    moreOr8D(){
        if ((this.generalForm.get("textoAux8D")?.value != '') && (this.generalForm.get("textoCriterio8D")?.value == "O Que Contenga")) {
            this.auxOrD.push(this.generalForm.get("textoAux8D")?.value)
            this.flagMoreOr8D = true;
            this.generalForm.patchValue({
                textoOContengaD: [this.auxOrD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio8D")?.value, 'more');
    }

    moreOr9D(){
        if ((this.generalForm.get("textoAux9D")?.value != '') && (this.generalForm.get("textoCriterio9D")?.value == "O Que Contenga")) {
            this.auxOrD.push(this.generalForm.get("textoAux9D")?.value)
            this.flagMoreOr9D = true;
            this.generalForm.patchValue({
                textoOContengaD: [this.auxOrD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio9D")?.value, 'more');
    }

    lessOr1D() {
        if ((this.generalForm.get("textoAux1D")?.value != '' && this.generalForm.get("textoCriterio1D")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux1D: "",
                textoCriterio1D: ""
            })
            this.flagMoreOr1D = false;
        }
        this.auxOrD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoOContengaD: [this.auxOrD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio1D")?.value, 'less');
    }

    lessOr2D() {
        if ((this.generalForm.get("textoAux2D")?.value != '' && this.generalForm.get("textoCriterio2D")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux2D: "",
                textoCriterio2D: ""
            })
            this.flagMoreOr2D = false;
        }
        this.auxOrD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoOContengaD: [this.auxOrD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio2D")?.value, 'less');
    }

    lessOr3D() {
        if ((this.generalForm.get("textoAux3D")?.value != '' && this.generalForm.get("textoCriterio3D")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux3D: "",
                textoCriterio3D: ""
            })
            this.flagMoreOr3D = false;
        }
        this.auxOrD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoOContengaD: [this.auxOrD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio3D")?.value, 'less');
    }

    lessOr4D() {
        if ((this.generalForm.get("textoAux4D")?.value != '' && this.generalForm.get("textoCriterio4D")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux4D: "",
                textoCriterio4D: ""
            })
            this.flagMoreOr4D = false;
        }
        this.auxOrD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoOContengaD: [this.auxOrD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio4D")?.value, 'less');
    }

    lessOr5D() {
        if ((this.generalForm.get("textoAux5D")?.value != '' && this.generalForm.get("textoCriterio5D")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux5D: "",
                textoCriterio5D: ""
            })
            this.flagMoreOr5D = false;
        }
        this.auxOrD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoOContengaD: [this.auxOrD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio5D")?.value, 'less');
    }

    lessOr6D() {
        if ((this.generalForm.get("textoAux6D")?.value != '' && this.generalForm.get("textoCriterio6D")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux6D: "",
                textoCriterio6D: ""
            })
            this.flagMoreOr6D = false;
        }
        this.auxOrD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoOContengaD: [this.auxOrD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio6D")?.value, 'less');
    }

    lessOr7D() {
        if ((this.generalForm.get("textoAux7D")?.value != '' && this.generalForm.get("textoCriterio7D")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux7D: "",
                textoCriterio7D: ""
            })
            this.flagMoreOr7D = false;
        }
        this.auxOrD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoOContengaD: [this.auxOrD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio7D")?.value, 'less');
    }

    lessOr8D() {
        if ((this.generalForm.get("textoAux8D")?.value != '' && this.generalForm.get("textoCriterio8D")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux8D: "",
                textoCriterio8D: ""
            })
            this.flagMoreOr8D = false;
        }
        this.auxOrD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoOContengaD: [this.auxOrD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio8D")?.value, 'less');
    }

    lessOr9D() {
        if ((this.generalForm.get("textoAux9D")?.value != '' && this.generalForm.get("textoCriterio9D")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux9D: "",
                textoCriterio9D: ""
            })
            this.flagMoreOr9D = false;
        }
        this.auxOrD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoOContengaD: [this.auxOrD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio9D")?.value, 'less');
    }

    moreEx1D(){
        if ((this.generalForm.get("textoAux1D")?.value != '') && (this.generalForm.get("textoCriterio1D")?.value == "Que Excluya")) {
            this.auxExD.push(this.generalForm.get("textoAux1D")?.value)
            this.flagMoreEx1D = true;
            this.generalForm.patchValue({
                textoExcluyaD: [this.auxExD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio1D")?.value, 'more');
    }

    moreEx2D(){
        if ((this.generalForm.get("textoAux2D")?.value != '') && (this.generalForm.get("textoCriterio2D")?.value == "Que Excluya")) {
            this.auxExD.push(this.generalForm.get("textoAux2D")?.value)
            this.flagMoreEx2D = true;
            this.generalForm.patchValue({
                textoExcluyaD: [this.auxExD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio2D")?.value, 'more');
    }

    moreEx3D(){
        if ((this.generalForm.get("textoAux3D")?.value != '') && (this.generalForm.get("textoCriterio3D")?.value == "Que Excluya")) {
            this.auxExD.push(this.generalForm.get("textoAux3D")?.value)
            this.flagMoreEx3D = true;
            this.generalForm.patchValue({
                textoExcluyaD: [this.auxExD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio3D")?.value, 'more');
    }

    moreEx4D(){
        if ((this.generalForm.get("textoAux4D")?.value != '') && (this.generalForm.get("textoCriterio4D")?.value == "Que Excluya")) {
            this.auxExD.push(this.generalForm.get("textoAux4D")?.value)
            this.flagMoreEx4D = true;
            this.generalForm.patchValue({
                textoExcluyaD: [this.auxExD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio4D")?.value, 'more');
    }

    moreEx5D(){
        if ((this.generalForm.get("textoAux5D")?.value != '') && (this.generalForm.get("textoCriterio5D")?.value == "Que Excluya")) {
            this.auxExD.push(this.generalForm.get("textoAux5D")?.value)
            this.flagMoreEx5D = true;
            this.generalForm.patchValue({
                textoExcluyaD: [this.auxExD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio5D")?.value, 'more');
    }

    moreEx6D(){
        if ((this.generalForm.get("textoAux6D")?.value != '') && (this.generalForm.get("textoCriterio6D")?.value == "Que Excluya")) {
            this.auxExD.push(this.generalForm.get("textoAux6D")?.value)
            this.flagMoreEx6D = true;
            this.generalForm.patchValue({
                textoExcluyaD: [this.auxExD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio6D")?.value, 'more');
    }

    moreEx7D(){
        if ((this.generalForm.get("textoAux7D")?.value != '') && (this.generalForm.get("textoCriterio7D")?.value == "Que Excluya")) {
            this.auxExD.push(this.generalForm.get("textoAux7D")?.value)
            this.flagMoreEx7D = true;
            this.generalForm.patchValue({
                textoExcluyaD: [this.auxExD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio7D")?.value, 'more');
    }

    moreEx8D(){
        if ((this.generalForm.get("textoAux8D")?.value != '') && (this.generalForm.get("textoCriterio8D")?.value == "Que Excluya")) {
            this.auxExD.push(this.generalForm.get("textoAux8D")?.value)
            this.flagMoreEx8D = true;
            this.generalForm.patchValue({
                textoExcluyaD: [this.auxExD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio8D")?.value, 'more');
    }

    moreEx9D(){
        if ((this.generalForm.get("textoAux9D")?.value != '') && (this.generalForm.get("textoCriterio9D")?.value == "Que Excluya")) {
            this.auxExD.push(this.generalForm.get("textoAux9D")?.value)
            this.flagMoreEx9D = true;
            this.generalForm.patchValue({
                textoExcluyaD: [this.auxExD]
            })
        }
        do {
            this.itemCriteriaD += 1;
            this.grupoCriterioD.push(this.itemCriteriaD);
        }
        while (this.itemCriteriaD < 9)

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio9D")?.value, 'more');
    }

    lessEx1D() {
        if ((this.generalForm.get("textoAux1D")?.value != '' && this.generalForm.get("textoCriterio1D")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux1D: "",
                textoCriterio1D: ""
            })
            this.flagMoreEx1D = false;
        }
        this.auxExD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoExcluyaD: [this.auxExD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio1D")?.value, 'less');
    }

    lessEx2D() {
        if ((this.generalForm.get("textoAux2D")?.value != '' && this.generalForm.get("textoCriterio2D")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux2D: "",
                textoCriterio2D: ""
            })
            this.flagMoreEx2D = false;
        }
        this.auxExD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoExcluyaD: [this.auxExD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio2D")?.value, 'less');
    }

    lessEx3D() {
        if ((this.generalForm.get("textoAux3D")?.value != '' && this.generalForm.get("textoCriterio3D")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux3D: "",
                textoCriterio3D: ""
            })
            this.flagMoreEx3D = false;
        }
        this.auxExD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoExcluyaD: [this.auxExD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio3D")?.value, 'less');
    }

    lessEx4D() {
        if ((this.generalForm.get("textoAux4D")?.value != '' && this.generalForm.get("textoCriterio4D")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux4D: "",
                textoCriterio4D: ""
            })
            this.flagMoreEx4D = false;
        }
        this.auxExD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoExcluyaD: [this.auxExD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio4D")?.value, 'less');
    }

    lessEx5D() {
        if ((this.generalForm.get("textoAux5D")?.value != '' && this.generalForm.get("textoCriterio5D")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux5D: "",
                textoCriterio5D: ""
            })
            this.flagMoreEx5D = false;
        }
        this.auxExD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoExcluyaD: [this.auxExD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio5D")?.value, 'less');
    }

    lessEx6D() {
        if ((this.generalForm.get("textoAux6D")?.value != '' && this.generalForm.get("textoCriterio6D")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux6D: "",
                textoCriterio6D: ""
            })
            this.flagMoreEx6D = false;
        }
        this.auxExD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoExcluyaD: [this.auxExD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio6D")?.value, 'less');
    }

    lessEx7D() {
        if ((this.generalForm.get("textoAux7D")?.value != '' && this.generalForm.get("textoCriterio7D")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux7D: "",
                textoCriterio7D: ""
            })
            this.flagMoreEx7D = false;
        }
        this.auxExD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoExcluyaD: [this.auxExD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio7D")?.value, 'less');
    }

    lessEx8D() {
        if ((this.generalForm.get("textoAux8D")?.value != '' && this.generalForm.get("textoCriterio8D")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux8D: "",
                textoCriterio8D: ""
            })
            this.flagMoreEx8D = false;
        }
        this.auxExD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoExcluyaD: [this.auxExD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio8D")?.value, 'less');
    }

    lessEx9D() {
        if ((this.generalForm.get("textoAux9D")?.value != '' && this.generalForm.get("textoCriterio9D")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux9D: "",
                textoCriterio9D: ""
            })
            this.flagMoreEx9D = false;
        }
        this.auxExD.pop();
        this.grupoCriterioD.pop();
        this.generalForm.patchValue({
            textoExcluyaD: [this.auxExD]
        })

        this.validarCriteriosAceptadosD(this.generalForm.get("textoCriterio9D")?.value, 'less');
    }

    moreAnd1PR(){
        if ((this.generalForm.get("textoAux1PR")?.value != '') && (this.generalForm.get("textoCriterio1PR")?.value == "Y Que Contenga")) {
            this.auxAndPR.push(this.generalForm.get("textoAux1PR")?.value)
            this.flagMoreAnd1PR = true;
            this.generalForm.patchValue({
                textoYContengaPR: [this.auxAndPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio1PR")?.value, 'more');
    }

    moreAnd2PR(){
        if ((this.generalForm.get("textoAux2PR")?.value != '') && (this.generalForm.get("textoCriterio2PR")?.value == "Y Que Contenga")) {
            this.auxAndPR.push(this.generalForm.get("textoAux2PR")?.value)
            this.flagMoreAnd2PR = true;
            this.generalForm.patchValue({
                textoYContengaPR: [this.auxAndPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio2PR")?.value, 'more');
    }

    moreAnd3PR(){
        if ((this.generalForm.get("textoAux3PR")?.value != '') && (this.generalForm.get("textoCriterio3PR")?.value == "Y Que Contenga")) {
            this.auxAndPR.push(this.generalForm.get("textoAux3PR")?.value)
            this.flagMoreAnd3PR = true;
            this.generalForm.patchValue({
                textoYContengaPR: [this.auxAndPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio3PR")?.value, 'more');
    }

    moreAnd4PR(){
        if ((this.generalForm.get("textoAux4PR")?.value != '') && (this.generalForm.get("textoCriterio4PR")?.value == "Y Que Contenga")) {
            this.auxAndPR.push(this.generalForm.get("textoAux4PR")?.value)
            this.flagMoreAnd4PR = true;
            this.generalForm.patchValue({
                textoYContengaPR: [this.auxAndPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio4PR")?.value, 'more');
    }

    moreAnd5PR(){
        if ((this.generalForm.get("textoAux5PR")?.value != '') && (this.generalForm.get("textoCriterio5PR")?.value == "Y Que Contenga")) {
            this.auxAndPR.push(this.generalForm.get("textoAux5PR")?.value)
            this.flagMoreAnd5PR = true;
            this.generalForm.patchValue({
                textoYContengaPR: [this.auxAndPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio5PR")?.value, 'more');
    }

    moreAnd6PR(){
        if ((this.generalForm.get("textoAux6PR")?.value != '') && (this.generalForm.get("textoCriterio6PR")?.value == "Y Que Contenga")) {
            this.auxAndPR.push(this.generalForm.get("textoAux6PR")?.value)
            this.flagMoreAnd6PR = true;
            this.generalForm.patchValue({
                textoYContengaPR: [this.auxAndPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio6PR")?.value, 'more');
    }

    moreAnd7PR(){
        if ((this.generalForm.get("textoAux7PR")?.value != '') && (this.generalForm.get("textoCriterio7PR")?.value == "Y Que Contenga")) {
            this.auxAndPR.push(this.generalForm.get("textoAux7PR")?.value)
            this.flagMoreAnd7PR = true;
            this.generalForm.patchValue({
                textoYContengaPR: [this.auxAndPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio7PR")?.value, 'more');
    }

    moreAnd8PR(){
        if ((this.generalForm.get("textoAux8PR")?.value != '') && (this.generalForm.get("textoCriterio8PR")?.value == "Y Que Contenga")) {
            this.auxAndPR.push(this.generalForm.get("textoAux8PR")?.value)
            this.flagMoreAnd8PR = true;
            this.generalForm.patchValue({
                textoYContengaPR: [this.auxAndPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio8PR")?.value, 'more');
    }

    moreAnd9PR(){
        if ((this.generalForm.get("textoAux9PR")?.value != '') && (this.generalForm.get("textoCriterio9PR")?.value == "Y Que Contenga")) {
            this.auxAndPR.push(this.generalForm.get("textoAux9PR")?.value)
            this.flagMoreAnd9PR = true;
            this.generalForm.patchValue({
                textoYContengaPR: [this.auxAndPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio9PR")?.value, 'more');
    }

    lessAnd1PR() {
        if ((this.generalForm.get("textoAux1PR")?.value != '' && this.generalForm.get("textoCriterio1PR")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux1PR: "",
                textoCriterio1PR: ""
            })
            this.flagMoreAnd1PR = false;
        }
        this.auxAndPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoYContengaPR: [this.auxAndPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio1PR")?.value, 'less');
    }

    lessAnd2PR() {
        if ((this.generalForm.get("textoAux2PR")?.value != '' && this.generalForm.get("textoCriterio2PR")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux2PR: "",
                textoCriterio2PR: ""
            })
            this.flagMoreAnd2PR = false;
        }
        this.auxAndPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoYContengaPR: [this.auxAndPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio2PR")?.value, 'less');
    }

    lessAnd3PR() {
        if ((this.generalForm.get("textoAux3PR")?.value != '' && this.generalForm.get("textoCriterio3PR")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux3PR: "",
                textoCriterio3PR: ""
            })
            this.flagMoreAnd3PR = false;
        }
        this.auxAndPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoYContengaPR: [this.auxAndPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio3PR")?.value, 'less');
    }

    lessAnd4PR() {
        if ((this.generalForm.get("textoAux4PR")?.value != '' && this.generalForm.get("textoCriterio4PR")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux4PR: "",
                textoCriterio4PR: ""
            })
            this.flagMoreAnd4PR = false;
        }
        this.auxAndPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoYContengaPR: [this.auxAndPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio4PR")?.value, 'less');
    }

    lessAnd5PR() {
        if ((this.generalForm.get("textoAux5PR")?.value != '' && this.generalForm.get("textoCriterio5PR")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux5PR: "",
                textoCriterio5PR: ""
            })
            this.flagMoreAnd5PR = false;
        }
        this.auxAndPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoYContengaPR: [this.auxAndPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio5PR")?.value, 'less');
    }

    lessAnd6PR() {
        if ((this.generalForm.get("textoAux6PR")?.value != '' && this.generalForm.get("textoCriterio6PR")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux6PR: "",
                textoCriterio6PR: ""
            })
            this.flagMoreAnd6PR = false;
        }
        this.auxAndPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoYContengaPR: [this.auxAndPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio6PR")?.value, 'less');
    }

    lessAnd7PR() {
        if ((this.generalForm.get("textoAux7PR")?.value != '' && this.generalForm.get("textoCriterio7PR")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux7PR: "",
                textoCriterio7PR: ""
            })
            this.flagMoreAnd7PR = false;
        }
        this.auxAndPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoYContengaPR: [this.auxAndPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio7PR")?.value, 'less');
    }

    lessAnd8PR() {
        if ((this.generalForm.get("textoAux8PR")?.value != '' && this.generalForm.get("textoCriterio8PR")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux8PR: "",
                textoCriterio8PR: ""
            })
            this.flagMoreAnd8PR = false;
        }
        this.auxAndPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoYContengaPR: [this.auxAndPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio8PR")?.value, 'less');
    }

    lessAnd9PR() {
        if ((this.generalForm.get("textoAux9PR")?.value != '' && this.generalForm.get("textoCriterio9PR")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux9PR: "",
                textoCriterio9PR: ""
            })
            this.flagMoreAnd9PR = false;
        }
        this.auxAndPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoYContengaPR: [this.auxAndPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio9PR")?.value, 'less');
    }

    moreOr1PR(){
        if ((this.generalForm.get("textoAux1PR")?.value != '') && (this.generalForm.get("textoCriterio1PR")?.value == "O Que Contenga")) {
            this.auxOrPR.push(this.generalForm.get("textoAux1PR")?.value)
            this.flagMoreOr1PR = true;
            this.generalForm.patchValue({
                textoOContengaPR: [this.auxOrPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio1PR")?.value, 'more');
    }

    moreOr2PR(){
        if ((this.generalForm.get("textoAux2PR")?.value != '') && (this.generalForm.get("textoCriterio2PR")?.value == "O Que Contenga")) {
            this.auxOrPR.push(this.generalForm.get("textoAux2PR")?.value)
            this.flagMoreOr2PR = true;
            this.generalForm.patchValue({
                textoOContengaPR: [this.auxOrPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio2PR")?.value, 'more');
    }

    moreOr3PR(){
        if ((this.generalForm.get("textoAux3PR")?.value != '') && (this.generalForm.get("textoCriterio3PR")?.value == "O Que Contenga")) {
            this.auxOrPR.push(this.generalForm.get("textoAux3PR")?.value)
            this.flagMoreOr3PR = true;
            this.generalForm.patchValue({
                textoOContengaPR: [this.auxOrPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio3PR")?.value, 'more');
    }

    moreOr4PR(){
        if ((this.generalForm.get("textoAux4PR")?.value != '') && (this.generalForm.get("textoCriterio4PR")?.value == "O Que Contenga")) {
            this.auxOrPR.push(this.generalForm.get("textoAux4PR")?.value)
            this.flagMoreOr4PR = true;
            this.generalForm.patchValue({
                textoOContengaPR: [this.auxOrPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio4PR")?.value, 'more');
    }

    moreOr5PR(){
        if ((this.generalForm.get("textoAux5PR")?.value != '') && (this.generalForm.get("textoCriterio5PR")?.value == "O Que Contenga")) {
            this.auxOrPR.push(this.generalForm.get("textoAux5PR")?.value)
            this.flagMoreOr5PR = true;
            this.generalForm.patchValue({
                textoOContengaPR: [this.auxOrPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio5PR")?.value, 'more');
    }

    moreOr6PR(){
        if ((this.generalForm.get("textoAux6PR")?.value != '') && (this.generalForm.get("textoCriterio6PR")?.value == "O Que Contenga")) {
            this.auxOrPR.push(this.generalForm.get("textoAux6PR")?.value)
            this.flagMoreOr6PR = true;
            this.generalForm.patchValue({
                textoOContengaPR: [this.auxOrPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio6PR")?.value, 'more');
    }

    moreOr7PR(){
        if ((this.generalForm.get("textoAux7PR")?.value != '') && (this.generalForm.get("textoCriterio7PR")?.value == "O Que Contenga")) {
            this.auxOrPR.push(this.generalForm.get("textoAux7PR")?.value)
            this.flagMoreOr7PR = true;
            this.generalForm.patchValue({
                textoOContengaPR: [this.auxOrPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio7PR")?.value, 'more');
    }

    moreOr8PR(){
        if ((this.generalForm.get("textoAux8PR")?.value != '') && (this.generalForm.get("textoCriterio8PR")?.value == "O Que Contenga")) {
            this.auxOrPR.push(this.generalForm.get("textoAux8PR")?.value)
            this.flagMoreOr8PR = true;
            this.generalForm.patchValue({
                textoOContengaPR: [this.auxOrPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio8PR")?.value, 'more');
    }

    moreOr9PR(){
        if ((this.generalForm.get("textoAux9PR")?.value != '') && (this.generalForm.get("textoCriterio9PR")?.value == "O Que Contenga")) {
            this.auxOrPR.push(this.generalForm.get("textoAux9PR")?.value)
            this.flagMoreOr9PR = true;
            this.generalForm.patchValue({
                textoOContengaPR: [this.auxOrPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio9PR")?.value, 'more');
    }

    lessOr1PR() {
        if ((this.generalForm.get("textoAux1PR")?.value != '' && this.generalForm.get("textoCriterio1PR")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux1PR: "",
                textoCriterio1PR: ""
            })
            this.flagMoreOr1PR = false;
        }
        this.auxOrPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoOContengaPR: [this.auxOrPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio1PR")?.value, 'less');
    }

    lessOr2PR() {
        if ((this.generalForm.get("textoAux2PR")?.value != '' && this.generalForm.get("textoCriterio2PR")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux2PR: "",
                textoCriterio2PR: ""
            })
            this.flagMoreOr2PR = false;
        }
        this.auxOrPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoOContengaPR: [this.auxOrPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio2PR")?.value, 'less');
    }

    lessOr3PR() {
        if ((this.generalForm.get("textoAux3PR")?.value != '' && this.generalForm.get("textoCriterio3PR")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux3PR: "",
                textoCriterio3PR: ""
            })
            this.flagMoreOr3PR = false;
        }
        this.auxOrPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoOContengaPR: [this.auxOrPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio3PR")?.value, 'less');
    }

    lessOr4PR() {
        if ((this.generalForm.get("textoAux4PR")?.value != '' && this.generalForm.get("textoCriterio4PR")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux4PR: "",
                textoCriterio4PR: ""
            })
            this.flagMoreOr4PR = false;
        }
        this.auxOrPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoOContengaPR: [this.auxOrPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio4PR")?.value, 'less');
    }

    lessOr5PR() {
        if ((this.generalForm.get("textoAux5PR")?.value != '' && this.generalForm.get("textoCriterio5PR")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux5PR: "",
                textoCriterio5PR: ""
            })
            this.flagMoreOr5PR = false;
        }
        this.auxOrPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoOContengaPR: [this.auxOrPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio5PR")?.value, 'less');
    }

    lessOr6PR() {
        if ((this.generalForm.get("textoAux6PR")?.value != '' && this.generalForm.get("textoCriterio6PR")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux6PR: "",
                textoCriterio6PR: ""
            })
            this.flagMoreOr6PR = false;
        }
        this.auxOrPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoOContengaPR: [this.auxOrPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio6PR")?.value, 'less');
    }

    lessOr7PR() {
        if ((this.generalForm.get("textoAux7PR")?.value != '' && this.generalForm.get("textoCriterio7PR")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux7PR: "",
                textoCriterio7PR: ""
            })
            this.flagMoreOr7PR = false;
        }
        this.auxOrPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoOContengaPR: [this.auxOrPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio7PR")?.value, 'less');
    }

    lessOr8PR() {
        if ((this.generalForm.get("textoAux8PR")?.value != '' && this.generalForm.get("textoCriterio8PR")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux8PR: "",
                textoCriterio8PR: ""
            })
            this.flagMoreOr8PR = false;
        }
        this.auxOrPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoOContengaPR: [this.auxOrPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio8PR")?.value, 'less');
    }

    lessOr9PR() {
        if ((this.generalForm.get("textoAux9PR")?.value != '' && this.generalForm.get("textoCriterio9PR")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux9PR: "",
                textoCriterio9PR: ""
            })
            this.flagMoreOr9PR = false;
        }
        this.auxOrPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoOContengaPR: [this.auxOrPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio9PR")?.value, 'less');
    }

    moreEx1PR(){
        if ((this.generalForm.get("textoAux1PR")?.value != '') && (this.generalForm.get("textoCriterio1PR")?.value == "Que Excluya")) {
            this.auxExPR.push(this.generalForm.get("textoAux1PR")?.value)
            this.flagMoreEx1PR = true;
            this.generalForm.patchValue({
                textoExcluyaPR: [this.auxExPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio1PR")?.value, 'more');
    }

    moreEx2PR(){
        if ((this.generalForm.get("textoAux2PR")?.value != '') && (this.generalForm.get("textoCriterio2PR")?.value == "Que Excluya")) {
            this.auxExPR.push(this.generalForm.get("textoAux2PR")?.value)
            this.flagMoreEx2PR = true;
            this.generalForm.patchValue({
                textoExcluyaPR: [this.auxExPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio2PR")?.value, 'more');
    }

    moreEx3PR(){
        if ((this.generalForm.get("textoAux3PR")?.value != '') && (this.generalForm.get("textoCriterio3PR")?.value == "Que Excluya")) {
            this.auxExPR.push(this.generalForm.get("textoAux3PR")?.value)
            this.flagMoreEx3PR = true;
            this.generalForm.patchValue({
                textoExcluyaPR: [this.auxExPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio3PR")?.value, 'more');
    }

    moreEx4PR(){
        if ((this.generalForm.get("textoAux4PR")?.value != '') && (this.generalForm.get("textoCriterio4PR")?.value == "Que Excluya")) {
            this.auxExPR.push(this.generalForm.get("textoAux4PR")?.value)
            this.flagMoreEx4PR = true;
            this.generalForm.patchValue({
                textoExcluyaPR: [this.auxExPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio4PR")?.value, 'more');
    }

    moreEx5PR(){
        if ((this.generalForm.get("textoAux5PR")?.value != '') && (this.generalForm.get("textoCriterio5PR")?.value == "Que Excluya")) {
            this.auxExPR.push(this.generalForm.get("textoAux5PR")?.value)
            this.flagMoreEx5PR = true;
            this.generalForm.patchValue({
                textoExcluyaPR: [this.auxExPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio5PR")?.value, 'more');
    }

    moreEx6PR(){
        if ((this.generalForm.get("textoAux6PR")?.value != '') && (this.generalForm.get("textoCriterio6PR")?.value == "Que Excluya")) {
            this.auxExPR.push(this.generalForm.get("textoAux6PR")?.value)
            this.flagMoreEx6PR = true;
            this.generalForm.patchValue({
                textoExcluyaPR: [this.auxExPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio6PR")?.value, 'more');
    }

    moreEx7PR(){
        if ((this.generalForm.get("textoAux7PR")?.value != '') && (this.generalForm.get("textoCriterio7PR")?.value == "Que Excluya")) {
            this.auxExPR.push(this.generalForm.get("textoAux7PR")?.value)
            this.flagMoreEx7PR = true;
            this.generalForm.patchValue({
                textoExcluyaPR: [this.auxExPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio7PR")?.value, 'more');
    }

    moreEx8PR(){
        if ((this.generalForm.get("textoAux8PR")?.value != '') && (this.generalForm.get("textoCriterio8PR")?.value == "Que Excluya")) {
            this.auxExPR.push(this.generalForm.get("textoAux8PR")?.value)
            this.flagMoreEx8PR = true;
            this.generalForm.patchValue({
                textoExcluyaPR: [this.auxExPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio8PR")?.value, 'more');
    }

    moreEx9PR(){
        if ((this.generalForm.get("textoAux9PR")?.value != '') && (this.generalForm.get("textoCriterio9PR")?.value == "Que Excluya")) {
            this.auxExPR.push(this.generalForm.get("textoAux9PR")?.value)
            this.flagMoreEx9PR = true;
            this.generalForm.patchValue({
                textoExcluyaPR: [this.auxExPR]
            })
        }
        do {
            this.itemCriteriaPR += 1;
            this.grupoCriterioPR.push(this.itemCriteriaPR);
        }
        while (this.itemCriteriaPR < 9)

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio9PR")?.value, 'more');
    }

    lessEx1PR() {
        if ((this.generalForm.get("textoAux1PR")?.value != '' && this.generalForm.get("textoCriterio1PR")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux1PR: "",
                textoCriterio1PR: ""
            })
            this.flagMoreEx1PR = false;
        }
        this.auxExPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoExcluyaPR: [this.auxExPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio1PR")?.value, 'less');
    }

    lessEx2PR() {
        if ((this.generalForm.get("textoAux2PR")?.value != '' && this.generalForm.get("textoCriterio2PR")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux2PR: "",
                textoCriterio2PR: ""
            })
            this.flagMoreEx2PR = false;
        }
        this.auxExPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoExcluyaPR: [this.auxExPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio2PR")?.value, 'less');
    }

    lessEx3PR() {
        if ((this.generalForm.get("textoAux3PR")?.value != '' && this.generalForm.get("textoCriterio3PR")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux3PR: "",
                textoCriterio3PR: ""
            })
            this.flagMoreEx3PR = false;
        }
        this.auxExPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoExcluyaPR: [this.auxExPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio3PR")?.value, 'less');
    }

    lessEx4PR() {
        if ((this.generalForm.get("textoAux4PR")?.value != '' && this.generalForm.get("textoCriterio4PR")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux4PR: "",
                textoCriterio4PR: ""
            })
            this.flagMoreEx4PR = false;
        }
        this.auxExPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoExcluyaPR: [this.auxExPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio4PR")?.value, 'less');
    }

    lessEx5PR() {
        if ((this.generalForm.get("textoAux5PR")?.value != '' && this.generalForm.get("textoCriterio5PR")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux5PR: "",
                textoCriterio5PR: ""
            })
            this.flagMoreEx5PR = false;
        }
        this.auxExPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoExcluyaPR: [this.auxExPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio5PR")?.value, 'less');
    }

    lessEx6PR() {
        if ((this.generalForm.get("textoAux6PR")?.value != '' && this.generalForm.get("textoCriterio6PR")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux6PR: "",
                textoCriterio6PR: ""
            })
            this.flagMoreEx6PR = false;
        }
        this.auxExPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoExcluyaPR: [this.auxExPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio6PR")?.value, 'less');
    }

    lessEx7PR() {
        if ((this.generalForm.get("textoAux7PR")?.value != '' && this.generalForm.get("textoCriterio7PR")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux7PR: "",
                textoCriterio7PR: ""
            })
            this.flagMoreEx7PR = false;
        }
        this.auxExPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoExcluyaPR: [this.auxExPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio7PR")?.value, 'less');
    }

    lessEx8PR() {
        if ((this.generalForm.get("textoAux8PR")?.value != '' && this.generalForm.get("textoCriterio8PR")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux8PR: "",
                textoCriterio8PR: ""
            })
            this.flagMoreEx8PR = false;
        }
        this.auxExPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoExcluyaPR: [this.auxExPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio8PR")?.value, 'less');
    }

    lessEx9PR() {
        if ((this.generalForm.get("textoAux9PR")?.value != '' && this.generalForm.get("textoCriterio9PR")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux9PR: "",
                textoCriterio9PR: ""
            })
            this.flagMoreEx9PR = false;
        }
        this.auxExPR.pop();
        this.grupoCriterioPR.pop();
        this.generalForm.patchValue({
            textoExcluyaPR: [this.auxExPR]
        })

        this.validarCriteriosAceptadosPR(this.generalForm.get("textoCriterio9PR")?.value, 'less');
    }

    moreAnd1T(){
        if ((this.generalForm.get("textoAux1T")?.value != '') && (this.generalForm.get("textoCriterio1T")?.value == "Y Que Contenga")) {
            this.auxAndT.push(this.generalForm.get("textoAux1T")?.value)
            this.flagMoreAnd1T = true;
            this.generalForm.patchValue({
                textoYContengaT: [this.auxAndT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio1T")?.value, 'more');
    }

    moreAnd2T(){
        if ((this.generalForm.get("textoAux2T")?.value != '') && (this.generalForm.get("textoCriterio2T")?.value == "Y Que Contenga")) {
            this.auxAndT.push(this.generalForm.get("textoAux2T")?.value)
            this.flagMoreAnd2T = true;
            this.generalForm.patchValue({
                textoYContengaT: [this.auxAndT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio2T")?.value, 'more');
    }

    moreAnd3T(){
        if ((this.generalForm.get("textoAux3T")?.value != '') && (this.generalForm.get("textoCriterio3T")?.value == "Y Que Contenga")) {
            this.auxAndT.push(this.generalForm.get("textoAux3T")?.value)
            this.flagMoreAnd3T = true;
            this.generalForm.patchValue({
                textoYContengaT: [this.auxAndT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio3T")?.value, 'more');
    }

    moreAnd4T(){
        if ((this.generalForm.get("textoAux4T")?.value != '') && (this.generalForm.get("textoCriterio4T")?.value == "Y Que Contenga")) {
            this.auxAndT.push(this.generalForm.get("textoAux4T")?.value)
            this.flagMoreAnd4T = true;
            this.generalForm.patchValue({
                textoYContengaT: [this.auxAndT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio4T")?.value, 'more');
    }

    moreAnd5T(){
        if ((this.generalForm.get("textoAux5T")?.value != '') && (this.generalForm.get("textoCriterio5T")?.value == "Y Que Contenga")) {
            this.auxAndT.push(this.generalForm.get("textoAux5T")?.value)
            this.flagMoreAnd5T = true;
            this.generalForm.patchValue({
                textoYContengaT: [this.auxAndT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio5T")?.value, 'more');
    }

    moreAnd6T(){
        if ((this.generalForm.get("textoAux6T")?.value != '') && (this.generalForm.get("textoCriterio6T")?.value == "Y Que Contenga")) {
            this.auxAndT.push(this.generalForm.get("textoAux6T")?.value)
            this.flagMoreAnd6T = true;
            this.generalForm.patchValue({
                textoYContengaT: [this.auxAndT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio6T")?.value, 'more');
    }

    moreAnd7T(){
        if ((this.generalForm.get("textoAux7T")?.value != '') && (this.generalForm.get("textoCriterio7T")?.value == "Y Que Contenga")) {
            this.auxAndT.push(this.generalForm.get("textoAux7T")?.value)
            this.flagMoreAnd7T = true;
            this.generalForm.patchValue({
                textoYContengaT: [this.auxAndT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio7T")?.value, 'more');
    }

    moreAnd8T(){
        if ((this.generalForm.get("textoAux8T")?.value != '') && (this.generalForm.get("textoCriterio8T")?.value == "Y Que Contenga")) {
            this.auxAndT.push(this.generalForm.get("textoAux8T")?.value)
            this.flagMoreAnd8T = true;
            this.generalForm.patchValue({
                textoYContengaT: [this.auxAndT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio8T")?.value, 'more');
    }

    moreAnd9T(){
        if ((this.generalForm.get("textoAux9T")?.value != '') && (this.generalForm.get("textoCriterio9T")?.value == "Y Que Contenga")) {
            this.auxAndT.push(this.generalForm.get("textoAux9T")?.value)
            this.flagMoreAnd9T = true;
            this.generalForm.patchValue({
                textoYContengaT: [this.auxAndT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio9T")?.value, 'more');
    }

    lessAnd1T() {
        if ((this.generalForm.get("textoAux1T")?.value != '' && this.generalForm.get("textoCriterio1T")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux1T: "",
                textoCriterio1T: ""
            })
            this.flagMoreAnd1T = false;
        }
        this.auxAndT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoYContengaT: [this.auxAndT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio1T")?.value, 'less');
    }

    lessAnd2T() {
        if ((this.generalForm.get("textoAux2T")?.value != '' && this.generalForm.get("textoCriterio2T")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux2T: "",
                textoCriterio2T: ""
            })
            this.flagMoreAnd2T = false;
        }
        this.auxAndT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoYContengaT: [this.auxAndT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio2T")?.value, 'less');
    }

    lessAnd3T() {
        if ((this.generalForm.get("textoAux3T")?.value != '' && this.generalForm.get("textoCriterio3T")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux3T: "",
                textoCriterio3T: ""
            })
            this.flagMoreAnd3T = false;
        }
        this.auxAndT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoYContengaT: [this.auxAndT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio3T")?.value, 'less');
    }

    lessAnd4T() {
        if ((this.generalForm.get("textoAux4T")?.value != '' && this.generalForm.get("textoCriterio4T")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux4T: "",
                textoCriterio4T: ""
            })
            this.flagMoreAnd4T = false;
        }
        this.auxAndT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoYContengaT: [this.auxAndT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio4T")?.value, 'less');
    }

    lessAnd5T() {
        if ((this.generalForm.get("textoAux5T")?.value != '' && this.generalForm.get("textoCriterio5T")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux5T: "",
                textoCriterio5T: ""
            })
            this.flagMoreAnd5T = false;
        }
        this.auxAndT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoYContengaT: [this.auxAndT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio5T")?.value, 'less');
    }

    lessAnd6T() {
        if ((this.generalForm.get("textoAux6T")?.value != '' && this.generalForm.get("textoCriterio6T")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux6T: "",
                textoCriterio6T: ""
            })
            this.flagMoreAnd6T = false;
        }
        this.auxAndT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoYContengaT: [this.auxAndT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio6T")?.value, 'less');
    }

    lessAnd7T() {
        if ((this.generalForm.get("textoAux7T")?.value != '' && this.generalForm.get("textoCriterio7T")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux7T: "",
                textoCriterio7T: ""
            })
            this.flagMoreAnd7T = false;
        }
        this.auxAndT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoYContengaT: [this.auxAndT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio7T")?.value, 'less');
    }

    lessAnd8T() {
        if ((this.generalForm.get("textoAux8T")?.value != '' && this.generalForm.get("textoCriterio8T")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux8T: "",
                textoCriterio8T: ""
            })
            this.flagMoreAnd8T = false;
        }
        this.auxAndT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoYContengaT: [this.auxAndT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio8T")?.value, 'less');
    }

    lessAnd9T() {
        if ((this.generalForm.get("textoAux9T")?.value != '' && this.generalForm.get("textoCriterio9T")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux9T: "",
                textoCriterio9T: ""
            })
            this.flagMoreAnd9T = false;
        }
        this.auxAndT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoYContengaT: [this.auxAndT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio9T")?.value, 'less');
    }

    moreOr1T(){
        if ((this.generalForm.get("textoAux1T")?.value != '') && (this.generalForm.get("textoCriterio1T")?.value == "O Que Contenga")) {
            this.auxOrT.push(this.generalForm.get("textoAux1T")?.value)
            this.flagMoreOr1T = true;
            this.generalForm.patchValue({
                textoOContengaT: [this.auxOrT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio1T")?.value, 'more');
    }

    moreOr2T(){
        if ((this.generalForm.get("textoAux2T")?.value != '') && (this.generalForm.get("textoCriterio2T")?.value == "O Que Contenga")) {
            this.auxOrT.push(this.generalForm.get("textoAux2T")?.value)
            this.flagMoreOr2T = true;
            this.generalForm.patchValue({
                textoOContengaT: [this.auxOrT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio2T")?.value, 'more');
    }

    moreOr3T(){
        if ((this.generalForm.get("textoAux3T")?.value != '') && (this.generalForm.get("textoCriterio3T")?.value == "O Que Contenga")) {
            this.auxOrT.push(this.generalForm.get("textoAux3T")?.value)
            this.flagMoreOr3T = true;
            this.generalForm.patchValue({
                textoOContengaT: [this.auxOrT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio3T")?.value, 'more');
    }

    moreOr4T(){
        if ((this.generalForm.get("textoAux4T")?.value != '') && (this.generalForm.get("textoCriterio4T")?.value == "O Que Contenga")) {
            this.auxOrT.push(this.generalForm.get("textoAux4T")?.value)
            this.flagMoreOr4T = true;
            this.generalForm.patchValue({
                textoOContengaT: [this.auxOrT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio4T")?.value, 'more');
    }

    moreOr5T(){
        if ((this.generalForm.get("textoAux5T")?.value != '') && (this.generalForm.get("textoCriterio5T")?.value == "O Que Contenga")) {
            this.auxOrT.push(this.generalForm.get("textoAux5T")?.value)
            this.flagMoreOr5T = true;
            this.generalForm.patchValue({
                textoOContengaT: [this.auxOrT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio5T")?.value, 'more');
    }

    moreOr6T(){
        if ((this.generalForm.get("textoAux6T")?.value != '') && (this.generalForm.get("textoCriterio6T")?.value == "O Que Contenga")) {
            this.auxOrT.push(this.generalForm.get("textoAux6T")?.value)
            this.flagMoreOr6T = true;
            this.generalForm.patchValue({
                textoOContengaT: [this.auxOrT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio6T")?.value, 'more');
    }

    moreOr7T(){
        if ((this.generalForm.get("textoAux7T")?.value != '') && (this.generalForm.get("textoCriterio7T")?.value == "O Que Contenga")) {
            this.auxOrT.push(this.generalForm.get("textoAux7T")?.value)
            this.flagMoreOr7T = true;
            this.generalForm.patchValue({
                textoOContengaT: [this.auxOrT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio7T")?.value, 'more');
    }

    moreOr8T(){
        if ((this.generalForm.get("textoAux8T")?.value != '') && (this.generalForm.get("textoCriterio8T")?.value == "O Que Contenga")) {
            this.auxOrT.push(this.generalForm.get("textoAux8T")?.value)
            this.flagMoreOr8T = true;
            this.generalForm.patchValue({
                textoOContengaT: [this.auxOrT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio8T")?.value, 'more');
    }

    moreOr9T(){
        if ((this.generalForm.get("textoAux9T")?.value != '') && (this.generalForm.get("textoCriterio9T")?.value == "O Que Contenga")) {
            this.auxOrT.push(this.generalForm.get("textoAux9T")?.value)
            this.flagMoreOr9T = true;
            this.generalForm.patchValue({
                textoOContengaT: [this.auxOrT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio9T")?.value, 'more');
    }

    lessOr1T() {
        if ((this.generalForm.get("textoAux1T")?.value != '' && this.generalForm.get("textoCriterio1T")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux1T: "",
                textoCriterio1T: ""
            })
            this.flagMoreOr1T = false;
        }
        this.auxOrT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoOContengaT: [this.auxOrT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio1T")?.value, 'less');
    }

    lessOr2T() {
        if ((this.generalForm.get("textoAux2T")?.value != '' && this.generalForm.get("textoCriterio2T")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux2T: "",
                textoCriterio2T: ""
            })
            this.flagMoreOr2T = false;
        }
        this.auxOrT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoOContengaT: [this.auxOrT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio2T")?.value, 'less');
    }

    lessOr3T() {
        if ((this.generalForm.get("textoAux3T")?.value != '' && this.generalForm.get("textoCriterio3T")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux3T: "",
                textoCriterio3T: ""
            })
            this.flagMoreOr3T = false;
        }
        this.auxOrT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoOContengaT: [this.auxOrT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio3T")?.value, 'less');
    }

    lessOr4T() {
        if ((this.generalForm.get("textoAux4T")?.value != '' && this.generalForm.get("textoCriterio4T")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux4T: "",
                textoCriterio4T: ""
            })
            this.flagMoreOr4T = false;
        }
        this.auxOrT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoOContengaT: [this.auxOrT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio4T")?.value, 'less');
    }

    lessOr5T() {
        if ((this.generalForm.get("textoAux5T")?.value != '' && this.generalForm.get("textoCriterio5T")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux5T: "",
                textoCriterio5T: ""
            })
            this.flagMoreOr5T = false;
        }
        this.auxOrT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoOContengaT: [this.auxOrT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio5T")?.value, 'less');
    }

    lessOr6T() {
        if ((this.generalForm.get("textoAux6T")?.value != '' && this.generalForm.get("textoCriterio6T")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux6T: "",
                textoCriterio6T: ""
            })
            this.flagMoreOr6T = false;
        }
        this.auxOrT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoOContengaT: [this.auxOrT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio6T")?.value, 'less');
    }

    lessOr7T() {
        if ((this.generalForm.get("textoAux7T")?.value != '' && this.generalForm.get("textoCriterio7T")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux7T: "",
                textoCriterio7T: ""
            })
            this.flagMoreOr7T = false;
        }
        this.auxOrT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoOContengaT: [this.auxOrT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio7T")?.value, 'less');
    }

    lessOr8T() {
        if ((this.generalForm.get("textoAux8T")?.value != '' && this.generalForm.get("textoCriterio8T")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux8T: "",
                textoCriterio8T: ""
            })
            this.flagMoreOr8T = false;
        }
        this.auxOrT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoOContengaT: [this.auxOrT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio8T")?.value, 'less');
    }

    lessOr9T() {
        if ((this.generalForm.get("textoAux9T")?.value != '' && this.generalForm.get("textoCriterio9T")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux9T: "",
                textoCriterio9T: ""
            })
            this.flagMoreOr9T = false;
        }
        this.auxOrT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoOContengaT: [this.auxOrT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio9T")?.value, 'less');
    }

    moreEx1T(){
        if ((this.generalForm.get("textoAux1T")?.value != '') && (this.generalForm.get("textoCriterio1T")?.value == "Que Excluya")) {
            this.auxExT.push(this.generalForm.get("textoAux1T")?.value)
            this.flagMoreEx1T = true;
            this.generalForm.patchValue({
                textoExcluyaT: [this.auxExT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio1T")?.value, 'more');
    }

    moreEx2T(){
        if ((this.generalForm.get("textoAux2T")?.value != '') && (this.generalForm.get("textoCriterio2T")?.value == "Que Excluya")) {
            this.auxExT.push(this.generalForm.get("textoAux2T")?.value)
            this.flagMoreEx2T = true;
            this.generalForm.patchValue({
                textoExcluyaT: [this.auxExT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio2T")?.value, 'more');
    }

    moreEx3T(){
        if ((this.generalForm.get("textoAux3T")?.value != '') && (this.generalForm.get("textoCriterio3T")?.value == "Que Excluya")) {
            this.auxExT.push(this.generalForm.get("textoAux3T")?.value)
            this.flagMoreEx3T = true;
            this.generalForm.patchValue({
                textoExcluyaT: [this.auxExT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio3T")?.value, 'more');
    }

    moreEx4T(){
        if ((this.generalForm.get("textoAux4T")?.value != '') && (this.generalForm.get("textoCriterio4T")?.value == "Que Excluya")) {
            this.auxExT.push(this.generalForm.get("textoAux4T")?.value)
            this.flagMoreEx4T = true;
            this.generalForm.patchValue({
                textoExcluyaT: [this.auxExT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio4T")?.value, 'more');
    }

    moreEx5T(){
        if ((this.generalForm.get("textoAux5T")?.value != '') && (this.generalForm.get("textoCriterio5T")?.value == "Que Excluya")) {
            this.auxExT.push(this.generalForm.get("textoAux5T")?.value)
            this.flagMoreEx5T = true;
            this.generalForm.patchValue({
                textoExcluyaT: [this.auxExT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio5T")?.value, 'more');
    }

    moreEx6T(){
        if ((this.generalForm.get("textoAux6T")?.value != '') && (this.generalForm.get("textoCriterio6T")?.value == "Que Excluya")) {
            this.auxExT.push(this.generalForm.get("textoAux6T")?.value)
            this.flagMoreEx6T = true;
            this.generalForm.patchValue({
                textoExcluyaT: [this.auxExT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio6T")?.value, 'more');
    }

    moreEx7T(){
        if ((this.generalForm.get("textoAux7T")?.value != '') && (this.generalForm.get("textoCriterio7T")?.value == "Que Excluya")) {
            this.auxExT.push(this.generalForm.get("textoAux7T")?.value)
            this.flagMoreEx7T = true;
            this.generalForm.patchValue({
                textoExcluyaT: [this.auxExT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio7T")?.value, 'more');
    }

    moreEx8T(){
        if ((this.generalForm.get("textoAux8T")?.value != '') && (this.generalForm.get("textoCriterio8T")?.value == "Que Excluya")) {
            this.auxExT.push(this.generalForm.get("textoAux8T")?.value)
            this.flagMoreEx8T = true;
            this.generalForm.patchValue({
                textoExcluyaT: [this.auxExT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio8T")?.value, 'more');
    }

    moreEx9T(){
        if ((this.generalForm.get("textoAux9T")?.value != '') && (this.generalForm.get("textoCriterio9T")?.value == "Que Excluya")) {
            this.auxExT.push(this.generalForm.get("textoAux9T")?.value)
            this.flagMoreEx9T = true;
            this.generalForm.patchValue({
                textoExcluyaT: [this.auxExT]
            })
        }
        do {
            this.itemCriteriaT += 1;
            this.grupoCriterioT.push(this.itemCriteriaT);
        }
        while (this.itemCriteriaT < 9)

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio9T")?.value, 'more');
    }

    lessEx1T() {
        if ((this.generalForm.get("textoAux1T")?.value != '' && this.generalForm.get("textoCriterio1T")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux1T: "",
                textoCriterio1T: ""
            })
            this.flagMoreEx1T = false;
        }
        this.auxExT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoExcluyaT: [this.auxExT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio1T")?.value, 'less');
    }

    lessEx2T() {
        if ((this.generalForm.get("textoAux2T")?.value != '' && this.generalForm.get("textoCriterio2T")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux2T: "",
                textoCriterio2T: ""
            })
            this.flagMoreEx2T = false;
        }
        this.auxExT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoExcluyaT: [this.auxExT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio2T")?.value, 'less');
    }

    lessEx3T() {
        if ((this.generalForm.get("textoAux3T")?.value != '' && this.generalForm.get("textoCriterio3T")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux3T: "",
                textoCriterio3T: ""
            })
            this.flagMoreEx3T = false;
        }
        this.auxExT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoExcluyaT: [this.auxExT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio3T")?.value, 'less');
    }

    lessEx4T() {
        if ((this.generalForm.get("textoAux4T")?.value != '' && this.generalForm.get("textoCriterio4T")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux4T: "",
                textoCriterio4T: ""
            })
            this.flagMoreEx4T = false;
        }
        this.auxExT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoExcluyaT: [this.auxExT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio4T")?.value, 'less');
    }

    lessEx5T() {
        if ((this.generalForm.get("textoAux5T")?.value != '' && this.generalForm.get("textoCriterio5T")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux5T: "",
                textoCriterio5T: ""
            })
            this.flagMoreEx5T = false;
        }
        this.auxExT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoExcluyaT: [this.auxExT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio5T")?.value, 'less');
    }

    lessEx6T() {
        if ((this.generalForm.get("textoAux6T")?.value != '' && this.generalForm.get("textoCriterio6T")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux6T: "",
                textoCriterio6T: ""
            })
            this.flagMoreEx6T = false;
        }
        this.auxExT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoExcluyaT: [this.auxExT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio6T")?.value, 'less');
    }

    lessEx7T() {
        if ((this.generalForm.get("textoAux7T")?.value != '' && this.generalForm.get("textoCriterio7T")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux7T: "",
                textoCriterio7T: ""
            })
            this.flagMoreEx7T = false;
        }
        this.auxExT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoExcluyaT: [this.auxExT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio7T")?.value, 'less');
    }

    lessEx8T() {
        if ((this.generalForm.get("textoAux8T")?.value != '' && this.generalForm.get("textoCriterio8T")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux8T: "",
                textoCriterio8T: ""
            })
            this.flagMoreEx8T = false;
        }
        this.auxExT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoExcluyaT: [this.auxExT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio8T")?.value, 'less');
    }

    lessEx9T() {
        if ((this.generalForm.get("textoAux9T")?.value != '' && this.generalForm.get("textoCriterio9T")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux9T: "",
                textoCriterio9T: ""
            })
            this.flagMoreEx9T = false;
        }
        this.auxExT.pop();
        this.grupoCriterioT.pop();
        this.generalForm.patchValue({
            textoExcluyaT: [this.auxExT]
        })

        this.validarCriteriosAceptadosT(this.generalForm.get("textoCriterio9T")?.value, 'less');
    }

    moreAnd1JR(){
        if ((this.generalForm.get("textoAux1JR")?.value != '') && (this.generalForm.get("textoCriterio1JR")?.value == "Y Que Contenga")) {
            this.auxAndJR.push(this.generalForm.get("textoAux1JR")?.value)
            this.flagMoreAnd1JR = true;
            this.generalForm.patchValue({
                textoYContengaJR: [this.auxAndJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio1JR")?.value, 'more');
    }

    moreAnd2JR(){
        if ((this.generalForm.get("textoAux2JR")?.value != '') && (this.generalForm.get("textoCriterio2JR")?.value == "Y Que Contenga")) {
            this.auxAndJR.push(this.generalForm.get("textoAux2JR")?.value)
            this.flagMoreAnd2JR = true;
            this.generalForm.patchValue({
                textoYContengaJR: [this.auxAndJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio2JR")?.value, 'more');
    }

    moreAnd3JR(){
        if ((this.generalForm.get("textoAux3JR")?.value != '') && (this.generalForm.get("textoCriterio3JR")?.value == "Y Que Contenga")) {
            this.auxAndJR.push(this.generalForm.get("textoAux3JR")?.value)
            this.flagMoreAnd3JR = true;
            this.generalForm.patchValue({
                textoYContengaJR: [this.auxAndJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio3JR")?.value, 'more');
    }

    moreAnd4JR(){
        if ((this.generalForm.get("textoAux4JR")?.value != '') && (this.generalForm.get("textoCriterio4JR")?.value == "Y Que Contenga")) {
            this.auxAndJR.push(this.generalForm.get("textoAux4JR")?.value)
            this.flagMoreAnd4JR = true;
            this.generalForm.patchValue({
                textoYContengaJR: [this.auxAndJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio4JR")?.value, 'more');
    }

    moreAnd5JR(){
        if ((this.generalForm.get("textoAux5JR")?.value != '') && (this.generalForm.get("textoCriterio5JR")?.value == "Y Que Contenga")) {
            this.auxAndJR.push(this.generalForm.get("textoAux5JR")?.value)
            this.flagMoreAnd5JR = true;
            this.generalForm.patchValue({
                textoYContengaJR: [this.auxAndJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio5JR")?.value, 'more');
    }

    moreAnd6JR(){
        if ((this.generalForm.get("textoAux6JR")?.value != '') && (this.generalForm.get("textoCriterio6JR")?.value == "Y Que Contenga")) {
            this.auxAndJR.push(this.generalForm.get("textoAux6JR")?.value)
            this.flagMoreAnd6JR = true;
            this.generalForm.patchValue({
                textoYContengaJR: [this.auxAndJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio6JR")?.value, 'more');
    }

    moreAnd7JR(){
        if ((this.generalForm.get("textoAux7JR")?.value != '') && (this.generalForm.get("textoCriterio7JR")?.value == "Y Que Contenga")) {
            this.auxAndJR.push(this.generalForm.get("textoAux7JR")?.value)
            this.flagMoreAnd7JR = true;
            this.generalForm.patchValue({
                textoYContengaJR: [this.auxAndJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio7JR")?.value, 'more');
    }

    moreAnd8JR(){
        if ((this.generalForm.get("textoAux8JR")?.value != '') && (this.generalForm.get("textoCriterio8JR")?.value == "Y Que Contenga")) {
            this.auxAndJR.push(this.generalForm.get("textoAux8JR")?.value)
            this.flagMoreAnd8JR = true;
            this.generalForm.patchValue({
                textoYContengaJR: [this.auxAndJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio8JR")?.value, 'more');
    }

    moreAnd9JR(){
        if ((this.generalForm.get("textoAux9JR")?.value != '') && (this.generalForm.get("textoCriterio9JR")?.value == "Y Que Contenga")) {
            this.auxAndJR.push(this.generalForm.get("textoAux9JR")?.value)
            this.flagMoreAnd9JR = true;
            this.generalForm.patchValue({
                textoYContengaJR: [this.auxAndJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio9JR")?.value, 'more');
    }

    lessAnd1JR() {
        if ((this.generalForm.get("textoAux1JR")?.value != '' && this.generalForm.get("textoCriterio1JR")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux1JR: "",
                textoCriterio1JR: ""
            })
            this.flagMoreAnd1JR = false;
        }
        this.auxAndJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoYContengaJR: [this.auxAndJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio1JR")?.value, 'less');
    }

    lessAnd2JR() {
        if ((this.generalForm.get("textoAux2JR")?.value != '' && this.generalForm.get("textoCriterio2JR")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux2JR: "",
                textoCriterio2JR: ""
            })
            this.flagMoreAnd2JR = false;
        }
        this.auxAndJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoYContengaJR: [this.auxAndJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio2JR")?.value, 'less');
    }

    lessAnd3JR() {
        if ((this.generalForm.get("textoAux3JR")?.value != '' && this.generalForm.get("textoCriterio3JR")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux3JR: "",
                textoCriterio3JR: ""
            })
            this.flagMoreAnd3JR = false;
        }
        this.auxAndJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoYContengaJR: [this.auxAndJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio3JR")?.value, 'less');
    }

    lessAnd4JR() {
        if ((this.generalForm.get("textoAux4JR")?.value != '' && this.generalForm.get("textoCriterio4JR")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux4JR: "",
                textoCriterio4JR: ""
            })
            this.flagMoreAnd4JR = false;
        }
        this.auxAndJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoYContengaJR: [this.auxAndJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio4JR")?.value, 'less');
    }

    lessAnd5JR() {
        if ((this.generalForm.get("textoAux5JR")?.value != '' && this.generalForm.get("textoCriterio5JR")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux5JR: "",
                textoCriterio5JR: ""
            })
            this.flagMoreAnd5JR = false;
        }
        this.auxAndJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoYContengaJR: [this.auxAndJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio5JR")?.value, 'less');
    }

    lessAnd6JR() {
        if ((this.generalForm.get("textoAux6JR")?.value != '' && this.generalForm.get("textoCriterio6JR")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux6JR: "",
                textoCriterio6JR: ""
            })
            this.flagMoreAnd6JR = false;
        }
        this.auxAndJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoYContengaJR: [this.auxAndJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio6JR")?.value, 'less');
    }

    lessAnd7JR() {
        if ((this.generalForm.get("textoAux7JR")?.value != '' && this.generalForm.get("textoCriterio7JR")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux7JR: "",
                textoCriterio7JR: ""
            })
            this.flagMoreAnd7JR = false;
        }
        this.auxAndJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoYContengaJR: [this.auxAndJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio7JR")?.value, 'less');
    }

    lessAnd8JR() {
        if ((this.generalForm.get("textoAux8JR")?.value != '' && this.generalForm.get("textoCriterio8JR")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux8JR: "",
                textoCriterio8JR: ""
            })
            this.flagMoreAnd8JR = false;
        }
        this.auxAndJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoYContengaJR: [this.auxAndJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio8JR")?.value, 'less');
    }

    lessAnd9JR() {
        if ((this.generalForm.get("textoAux9JR")?.value != '' && this.generalForm.get("textoCriterio9JR")?.value == "Y Que Contenga")) {
            this.generalForm.patchValue({
                textoAux9JR: "",
                textoCriterio9JR: ""
            })
            this.flagMoreAnd9JR = false;
        }
        this.auxAndJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoYContengaJR: [this.auxAndJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio9JR")?.value, 'less');
    }

    moreOr1JR(){
        if ((this.generalForm.get("textoAux1JR")?.value != '') && (this.generalForm.get("textoCriterio1JR")?.value == "O Que Contenga")) {
            this.auxOrJR.push(this.generalForm.get("textoAux1JR")?.value)
            this.flagMoreOr1JR = true;
            this.generalForm.patchValue({
                textoOContengaJR: [this.auxOrJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio1JR")?.value, 'more');
    }

    moreOr2JR(){
        if ((this.generalForm.get("textoAux2JR")?.value != '') && (this.generalForm.get("textoCriterio2JR")?.value == "O Que Contenga")) {
            this.auxOrJR.push(this.generalForm.get("textoAux2JR")?.value)
            this.flagMoreOr2JR = true;
            this.generalForm.patchValue({
                textoOContengaJR: [this.auxOrJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio2JR")?.value, 'more');
    }

    moreOr3JR(){
        if ((this.generalForm.get("textoAux3JR")?.value != '') && (this.generalForm.get("textoCriterio3JR")?.value == "O Que Contenga")) {
            this.auxOrJR.push(this.generalForm.get("textoAux3JR")?.value)
            this.flagMoreOr3JR = true;
            this.generalForm.patchValue({
                textoOContengaJR: [this.auxOrJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio3JR")?.value, 'more');
    }

    moreOr4JR(){
        if ((this.generalForm.get("textoAux4JR")?.value != '') && (this.generalForm.get("textoCriterio4JR")?.value == "O Que Contenga")) {
            this.auxOrJR.push(this.generalForm.get("textoAux4JR")?.value)
            this.flagMoreOr4JR = true;
            this.generalForm.patchValue({
                textoOContengaJR: [this.auxOrJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio4JR")?.value, 'more');
    }

    moreOr5JR(){
        if ((this.generalForm.get("textoAux5JR")?.value != '') && (this.generalForm.get("textoCriterio5JR")?.value == "O Que Contenga")) {
            this.auxOrJR.push(this.generalForm.get("textoAux5JR")?.value)
            this.flagMoreOr5JR = true;
            this.generalForm.patchValue({
                textoOContengaJR: [this.auxOrJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio5JR")?.value, 'more');
    }

    moreOr6JR(){
        if ((this.generalForm.get("textoAux6JR")?.value != '') && (this.generalForm.get("textoCriterio6JR")?.value == "O Que Contenga")) {
            this.auxOrJR.push(this.generalForm.get("textoAux6JR")?.value)
            this.flagMoreOr6JR = true;
            this.generalForm.patchValue({
                textoOContengaJR: [this.auxOrJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio6JR")?.value, 'more');
    }

    moreOr7JR(){
        if ((this.generalForm.get("textoAux7JR")?.value != '') && (this.generalForm.get("textoCriterio7JR")?.value == "O Que Contenga")) {
            this.auxOrJR.push(this.generalForm.get("textoAux7JR")?.value)
            this.flagMoreOr7JR = true;
            this.generalForm.patchValue({
                textoOContengaJR: [this.auxOrJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio7JR")?.value, 'more');
    }

    moreOr8JR(){
        if ((this.generalForm.get("textoAux8JR")?.value != '') && (this.generalForm.get("textoCriterio8JR")?.value == "O Que Contenga")) {
            this.auxOrJR.push(this.generalForm.get("textoAux8JR")?.value)
            this.flagMoreOr8JR = true;
            this.generalForm.patchValue({
                textoOContengaJR: [this.auxOrJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio8JR")?.value, 'more');
    }

    moreOr9JR(){
        if ((this.generalForm.get("textoAux9JR")?.value != '') && (this.generalForm.get("textoCriterio9JR")?.value == "O Que Contenga")) {
            this.auxOrJR.push(this.generalForm.get("textoAux9JR")?.value)
            this.flagMoreOr9JR = true;
            this.generalForm.patchValue({
                textoOContengaJR: [this.auxOrJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio9JR")?.value, 'more');
    }

    lessOr1JR() {
        if ((this.generalForm.get("textoAux1JR")?.value != '' && this.generalForm.get("textoCriterio1JR")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux1JR: "",
                textoCriterio1JR: ""
            })
            this.flagMoreOr1JR = false;
        }
        this.auxOrJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoOContengaJR: [this.auxOrJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio1JR")?.value, 'less');
    }

    lessOr2JR() {
        if ((this.generalForm.get("textoAux2JR")?.value != '' && this.generalForm.get("textoCriterio2JR")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux2JR: "",
                textoCriterio2JR: ""
            })
            this.flagMoreOr2JR = false;
        }
        this.auxOrJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoOContengaJR: [this.auxOrJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio2JR")?.value, 'less');
    }

    lessOr3JR() {
        if ((this.generalForm.get("textoAux3JR")?.value != '' && this.generalForm.get("textoCriterio3JR")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux3JR: "",
                textoCriterio3JR: ""
            })
            this.flagMoreOr3JR = false;
        }
        this.auxOrJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoOContengaJR: [this.auxOrJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio3JR")?.value, 'less');
    }

    lessOr4JR() {
        if ((this.generalForm.get("textoAux4JR")?.value != '' && this.generalForm.get("textoCriterio4JR")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux4JR: "",
                textoCriterio4JR: ""
            })
            this.flagMoreOr4JR = false;
        }
        this.auxOrJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoOContengaJR: [this.auxOrJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio4JR")?.value, 'less');
    }

    lessOr5JR() {
        if ((this.generalForm.get("textoAux5JR")?.value != '' && this.generalForm.get("textoCriterio5JR")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux5JR: "",
                textoCriterio5JR: ""
            })
            this.flagMoreOr5JR = false;
        }
        this.auxOrJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoOContengaJR: [this.auxOrJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio5JR")?.value, 'less');
    }

    lessOr6JR() {
        if ((this.generalForm.get("textoAux6JR")?.value != '' && this.generalForm.get("textoCriterio6JR")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux6JR: "",
                textoCriterio6JR: ""
            })
            this.flagMoreOr6JR = false;
        }
        this.auxOrJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoOContengaJR: [this.auxOrJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio6JR")?.value, 'less');
    }

    lessOr7JR() {
        if ((this.generalForm.get("textoAux7JR")?.value != '' && this.generalForm.get("textoCriterio7JR")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux7JR: "",
                textoCriterio7JR: ""
            })
            this.flagMoreOr7JR = false;
        }
        this.auxOrJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoOContengaJR: [this.auxOrJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio7JR")?.value, 'less');
    }

    lessOr8JR() {
        if ((this.generalForm.get("textoAux8JR")?.value != '' && this.generalForm.get("textoCriterio8JR")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux8JR: "",
                textoCriterio8JR: ""
            })
            this.flagMoreOr8JR = false;
        }
        this.auxOrJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoOContengaJR: [this.auxOrJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio8JR")?.value, 'less');
    }

    lessOr9JR() {
        if ((this.generalForm.get("textoAux9JR")?.value != '' && this.generalForm.get("textoCriterio9JR")?.value == "O Que Contenga")) {
            this.generalForm.patchValue({
                textoAux9JR: "",
                textoCriterio9JR: ""
            })
            this.flagMoreOr9JR = false;
        }
        this.auxOrJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoOContengaJR: [this.auxOrJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio9JR")?.value, 'less');
    }

    moreEx1JR(){
        if ((this.generalForm.get("textoAux1JR")?.value != '') && (this.generalForm.get("textoCriterio1JR")?.value == "Que Excluya")) {
            this.auxExJR.push(this.generalForm.get("textoAux1JR")?.value)
            this.flagMoreEx1JR = true;
            this.generalForm.patchValue({
                textoExcluyaJR: [this.auxExJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio1JR")?.value, 'more');
    }

    moreEx2JR(){
        if ((this.generalForm.get("textoAux2JR")?.value != '') && (this.generalForm.get("textoCriterio2JR")?.value == "Que Excluya")) {
            this.auxExJR.push(this.generalForm.get("textoAux2JR")?.value)
            this.flagMoreEx2JR = true;
            this.generalForm.patchValue({
                textoExcluyaJR: [this.auxExJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio2JR")?.value, 'more');
    }

    moreEx3JR(){
        if ((this.generalForm.get("textoAux3JR")?.value != '') && (this.generalForm.get("textoCriterio3JR")?.value == "Que Excluya")) {
            this.auxExJR.push(this.generalForm.get("textoAux3JR")?.value)
            this.flagMoreEx3JR = true;
            this.generalForm.patchValue({
                textoExcluyaJR: [this.auxExJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio3JR")?.value, 'more');
    }

    moreEx4JR(){
        if ((this.generalForm.get("textoAux4JR")?.value != '') && (this.generalForm.get("textoCriterio4JR")?.value == "Que Excluya")) {
            this.auxExJR.push(this.generalForm.get("textoAux4JR")?.value)
            this.flagMoreEx4JR = true;
            this.generalForm.patchValue({
                textoExcluyaJR: [this.auxExJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio4JR")?.value, 'more');
    }

    moreEx5JR(){
        if ((this.generalForm.get("textoAux5JR")?.value != '') && (this.generalForm.get("textoCriterio5JR")?.value == "Que Excluya")) {
            this.auxExJR.push(this.generalForm.get("textoAux5JR")?.value)
            this.flagMoreEx5JR = true;
            this.generalForm.patchValue({
                textoExcluyaJR: [this.auxExJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio5JR")?.value, 'more');
    }

    moreEx6JR(){
        if ((this.generalForm.get("textoAux6JR")?.value != '') && (this.generalForm.get("textoCriterio6JR")?.value == "Que Excluya")) {
            this.auxExJR.push(this.generalForm.get("textoAux6JR")?.value)
            this.flagMoreEx6JR = true;
            this.generalForm.patchValue({
                textoExcluyaJR: [this.auxExJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio6JR")?.value, 'more');
    }

    moreEx7JR(){
        if ((this.generalForm.get("textoAux7JR")?.value != '') && (this.generalForm.get("textoCriterio7JR")?.value == "Que Excluya")) {
            this.auxExJR.push(this.generalForm.get("textoAux7JR")?.value)
            this.flagMoreEx7JR = true;
            this.generalForm.patchValue({
                textoExcluyaJR: [this.auxExJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio7JR")?.value, 'more');
    }

    moreEx8JR(){
        if ((this.generalForm.get("textoAux8JR")?.value != '') && (this.generalForm.get("textoCriterio8JR")?.value == "Que Excluya")) {
            this.auxExJR.push(this.generalForm.get("textoAux8JR")?.value)
            this.flagMoreEx8JR = true;
            this.generalForm.patchValue({
                textoExcluyaJR: [this.auxExJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio8JR")?.value, 'more');
    }

    moreEx9JR(){
        if ((this.generalForm.get("textoAux9JR")?.value != '') && (this.generalForm.get("textoCriterio9JR")?.value == "Que Excluya")) {
            this.auxExJR.push(this.generalForm.get("textoAux9JR")?.value)
            this.flagMoreEx9JR = true;
            this.generalForm.patchValue({
                textoExcluyaJR: [this.auxExJR]
            })
        }
        do {
            this.itemCriteriaJR += 1;
            this.grupoCriterioJR.push(this.itemCriteriaJR);
        }
        while (this.itemCriteriaJR < 9)

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio9JR")?.value, 'more');
    }

    lessEx1JR() {
        if ((this.generalForm.get("textoAux1JR")?.value != '' && this.generalForm.get("textoCriterio1JR")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux1JR: "",
                textoCriterio1JR: ""
            })
            this.flagMoreEx1JR = false;
        }
        this.auxExJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoExcluyaJR: [this.auxExJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio1JR")?.value, 'less');
    }

    lessEx2JR() {
        if ((this.generalForm.get("textoAux2JR")?.value != '' && this.generalForm.get("textoCriterio2JR")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux2JR: "",
                textoCriterio2JR: ""
            })
            this.flagMoreEx2JR = false;
        }
        this.auxExJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoExcluyaJR: [this.auxExJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio2JR")?.value, 'less');
    }

    lessEx3JR() {
        if ((this.generalForm.get("textoAux3JR")?.value != '' && this.generalForm.get("textoCriterio3JR")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux3JR: "",
                textoCriterio3JR: ""
            })
            this.flagMoreEx3JR = false;
        }
        this.auxExJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoExcluyaJR: [this.auxExJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio3JR")?.value, 'less');
    }

    lessEx4JR() {
        if ((this.generalForm.get("textoAux4JR")?.value != '' && this.generalForm.get("textoCriterio4JR")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux4JR: "",
                textoCriterio4JR: ""
            })
            this.flagMoreEx4JR = false;
        }
        this.auxExJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoExcluyaJR: [this.auxExJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio4JR")?.value, 'less');
    }

    lessEx5JR() {
        if ((this.generalForm.get("textoAux5JR")?.value != '' && this.generalForm.get("textoCriterio5JR")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux5JR: "",
                textoCriterio5JR: ""
            })
            this.flagMoreEx5JR = false;
        }
        this.auxExJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoExcluyaJR: [this.auxExJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio5JR")?.value, 'less');
    }

    lessEx6JR() {
        if ((this.generalForm.get("textoAux6JR")?.value != '' && this.generalForm.get("textoCriterio6JR")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux6JR: "",
                textoCriterio6JR: ""
            })
            this.flagMoreEx6JR = false;
        }
        this.auxExJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoExcluyaJR: [this.auxExJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio6JR")?.value, 'less');
    }

    lessEx7JR() {
        if ((this.generalForm.get("textoAux7JR")?.value != '' && this.generalForm.get("textoCriterio7JR")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux7JR: "",
                textoCriterio7JR: ""
            })
            this.flagMoreEx7JR = false;
        }
        this.auxExJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoExcluyaJR: [this.auxExJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio7JR")?.value, 'less');
    }

    lessEx8JR() {
        if ((this.generalForm.get("textoAux8JR")?.value != '' && this.generalForm.get("textoCriterio8JR")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux8JR: "",
                textoCriterio8JR: ""
            })
            this.flagMoreEx8JR = false;
        }
        this.auxExJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoExcluyaJR: [this.auxExJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio8JR")?.value, 'less');
    }

    lessEx9JR() {
        if ((this.generalForm.get("textoAux9JR")?.value != '' && this.generalForm.get("textoCriterio9JR")?.value == "Que Excluya")) {
            this.generalForm.patchValue({
                textoAux9JR: "",
                textoCriterio9JR: ""
            })
            this.flagMoreEx9JR = false;
        }
        this.auxExJR.pop();
        this.grupoCriterioJR.pop();
        this.generalForm.patchValue({
            textoExcluyaJR: [this.auxExJR]
        })

        this.validarCriteriosAceptadosJR(this.generalForm.get("textoCriterio9JR")?.value, 'less');
    }
    


    //Funciones - métodos Arturo
    public cargarCategoriaGenero() {
        this.elasticService.getCategoriaGeneroFilter(this.allItems, this.generalForm.get("origen")?.value, this.allItemsExtraOrigen).subscribe(
            (respuesta: any) => {
                this.categoriaGenero = respuesta.results;
            }
        )
    }

    public cargarOrigenes() {
        this.elasticService.getOrigenesFilter(this.allItems, this.generalForm.get("origen")?.value, this.allItemsExtraOrigen).subscribe(
            (respuesta: any) => {
                //this.origenVideoteca = respuesta.results;
            }
        )
    }

    public cargarSalvamento() {
        this.elasticService.getSalvamento().subscribe(
            (respuesta: any) => {
                this.salvamento = respuesta.results;
            }
        )
    }
    public cargarDecision() {
        this.elasticService.getDecisionFilter(this.allItems, this.generalForm.get("origen")?.value, this.allItemsExtraOrigen).subscribe(
            (respuesta: any) => {
                this.decision = respuesta.results;
            }
        )
    }
    public cargarMagistradoSalvamento() {
        this.elasticService.getMagistradoSalvamentoFilter(this.allItems, this.generalForm.get("origen")?.value, this.allItemsExtraOrigen).subscribe(
            (respuesta: any) => {
                this.magistradoSalvamento = respuesta.results;
                this.magistradosInicial = respuesta.results;
            }
        )
    }

    public cargarTribunalesSuperiores() {
        this.elasticService.getTribunalesSuperiores().subscribe(
            (respuesta: any) => {
                this.tribunalSuperior = respuesta.results;
            }
        )
    }

    public cargarTribunalAdmin() {
        this.elasticService.getTribunalAdmin().subscribe(
            (respuesta: any) => {
                this.tribunalAdministrativo = respuesta.results;
            }
        )
    }

    public cargarOrigenBiblioteca() {
        this.elasticService.getFuenteVideoteca().subscribe(
            (respuesta: any) => {
                this.fuenteBiblioteca = respuesta.results;
            }
        )
    }

    modalChange(): void {
        this.flagModal_ff = this.change(this.flagModal_ff);
    }

    public change(validate: boolean): boolean {
        if (validate == true) {
            return false;
        } else {
            return true;
        }
    }

    public modalChangeDelitos(): void {
        this.flagModalDelitos = this.change(this.flagModalDelitos);
    }

    public modalChangeTemas(): void {
        this.flagModalTemas = this.change(this.flagModalTemas);
    }

    public modalChangeTemasVocabulario6(): void {
        var temaTres = this.generalForm.get("InputTema6")?.value;
        temaTres = temaTres ? temaTres : '';
        if (temaTres == '') {
            this.vocabularioControladoErrorType = '6';
        } else {
            this.cargarTemaTres6(temaTres);
            this.flagModalTemasVocabulario6 = this.change(this.flagModalTemasVocabulario6);
            this.vocabularioControladoErrorType = '';
        }
    }

    public modalChangeTemasVocabulario8(): void {
        var temaTres = this.generalForm.get("InputTema8")?.value;
        temaTres = temaTres ? temaTres : '';
        if (temaTres == '') {
            this.vocabularioControladoErrorType = '8';
        } else {
            this.cargarTemaTres8(temaTres);
            this.flagModalTemasVocabulario8 = this.change(this.flagModalTemasVocabulario8);
            this.vocabularioControladoErrorType = '';
        }

    }

    public modalChangeTemasVocabulario16(): void {
        var temaTres = this.generalForm.get("InputTema16")?.value;
        temaTres = temaTres ? temaTres : '';
        if (temaTres == '') {
            this.vocabularioControladoErrorType = '16';
        } else {
            this.cargarTemaTres(temaTres);
            this.flagModalTemasVocabulario = this.change(this.flagModalTemasVocabulario);
            this.vocabularioControladoErrorType = '';
        }

    }

    public modalChangeTemasVocabulario15(): void {
        var temaTres = this.generalForm.get("InputTema15")?.value;
        temaTres = temaTres ? temaTres : '';
        if (temaTres == '') {
            this.vocabularioControladoErrorType = '15';
        } else {
            this.cargarTemaTresVocabularioControlado15(temaTres);
            this.flagModalTemasVocabulario = this.change(this.flagModalTemasVocabulario);
            this.vocabularioControladoErrorType = '';
        }
    }


    public modalChangeTemasVocabularioControlado15(): void {
        var temaTres = this.generalForm.get("InputTema15")?.value;
        temaTres = temaTres ? temaTres : '';
        if (temaTres == '') {
            this.vocabularioControladoErrorType = '15';
        } else {
            this.cargarTemaTresVocabularioControlado15(temaTres);
            this.flagModalTemasVocabularioControlado15 = this.change(this.flagModalTemasVocabularioControlado15);
            this.vocabularioControladoErrorType = '';
        }
    }



    public modalChangeTemasVocabulario15Descrip(): void {
        var temaTres = this.generalForm.get("InputTema15Descrip")?.value;
        temaTres = temaTres ? temaTres : '';
        if (temaTres == '') {
            this.vocabularioControladoErrorType = '15Descrip';
        } else {
            this.cargarTemaTresDescriptivo(temaTres);
            this.flagModalTemasVocabularioDescriptivo = this.change(this.flagModalTemasVocabularioDescriptivo);
            this.vocabularioControladoErrorType = '';
        }
    }



    public modalChangeTemasVocabulario17(): void {
        var temaTres = this.generalForm.get("InputTema17")?.value;
        temaTres = temaTres ? temaTres : '';
        if (temaTres == '') {
            this.vocabularioControladoErrorType = '17';
        } else {
            this.cargarTemaTres(temaTres);
            this.flagModalTemasVocabulario = this.change(this.flagModalTemasVocabulario);
            this.vocabularioControladoErrorType = '';
        }
    }


    public modalChangeTemasVocabularioDesAnaliticaRevistas(): void {
        var temaTres = this.generalForm.get("InputDescriptoresAnaliticaRevistas")?.value;
        temaTres = temaTres ? temaTres : '';
        if (temaTres == '') {
            this.vocabularioControladoErrorType = '16DesAnalit';
        } else {
            this.cargarTemaTres(temaTres);
            this.flagModalTemasVocabulario = this.change(this.flagModalTemasVocabulario);
            this.vocabularioControladoErrorType = '';
        }
    }


    modalChangeTemasVocabularioTemaAnalitica(): void {
        var temaTres = this.generalForm.get("InputTemaAnaliticaRevistas")?.value;
        temaTres = temaTres ? temaTres : '';
        if (temaTres == '') {
            this.vocabularioControladoErrorType = '16DesAnalitSimple';
        } else {
            this.cargarTemaTres(temaTres);
            this.flagModalTemasVocabulario = this.change(this.flagModalTemasVocabulario);
            this.vocabularioControladoErrorType = '';
        }

    }

    public clearErrorTemasVocabulario() {
        this.vocabularioControladoErrorType = '';
    }

    public modalChangeVocabularioDescriptivoShowHidden(): void {
        this.flagModalTemasVocabularioDescriptivo = this.change(this.flagModalTemasVocabularioDescriptivo);
        this.vocabularioControladoErrorType = ''
    }

    public modalChangeVocabularioDescriptivoNormativaShowHidden(): void {
        this.flagModalTemasVocabularioDescriptivoNormativa = this.change(this.flagModalTemasVocabularioDescriptivoNormativa);
        this.vocabularioControladoErrorType = ''
    }
    
    public modalChangeVocabularioShowHidden(): void {
        this.flagModalTemasVocabulario = this.change(this.flagModalTemasVocabulario);
        this.vocabularioControladoErrorType = ''
    }

    public modalChangeVocabulario6ShowHidden(): void {
        this.flagModalTemasVocabulario6 = this.change(this.flagModalTemasVocabulario6);
        this.vocabularioControladoErrorType = ''
    }

    public modalChangeVocabulario8ShowHidden(): void {
        this.flagModalTemasVocabulario8 = this.change(this.flagModalTemasVocabulario8);
        this.vocabularioControladoErrorType = ''
    }


    public modalChangeVocabularioShowHiddenDescriptoresNormativaShowHidden(): void {
        this.flagModalTemasVocabularioDescriptoresNormativa = this.change(this.flagModalTemasVocabularioDescriptoresNormativa);
        this.vocabularioControladoErrorType = ''
    }

    public modalChangeVocabularioControlado15ShowHidden(): void {
        this.flagModalTemasVocabularioControlado15 = this.change(this.flagModalTemasVocabularioControlado15);
        this.vocabularioControladoErrorType = ''
    }
    

    public modalChangeTemasVocabulario(): void {

        var temaTres = this.generalForm.get("InputDescriptoresNormativa")?.value;
        temaTres = temaTres ? temaTres : '';
        if (temaTres == '') {
            this.vocabularioControladoErrorType = '15DescripNor';
        } else {
            this.cargarTemaTres(temaTres);
            this.flagModalTemasVocabulario = this.change(this.flagModalTemasVocabulario);
            this.vocabularioControladoErrorType = '';
        }
    }

    public modalChangeTemasVocabularioDescriptoresNormativa(): void {

        var temaTres = this.generalForm.get("InputDescriptoresNormativa")?.value;
        temaTres = temaTres ? temaTres : '';
        if (temaTres == '') {
            this.vocabularioControladoErrorType = '15DescripNor';
        } else {
            this.cargarTemaTresDescriptoresNormativa(temaTres);
            this.flagModalTemasVocabularioDescriptoresNormativa = this.change(this.flagModalTemasVocabularioDescriptoresNormativa);
            this.vocabularioControladoErrorType = '';
        }
    }



    public selectFuenteFormal(value: string): void {
        this.auxFuenteFormal = value;
        this.fuentesFormalesCheck[0] = value;
    }

    public chageComponent(newComponent: string) {
        this.showComponents = newComponent;
    }

    public changeUser(newUser: any) {
        this.authenticated_user = newUser;
    }

    public limpiarCampos() {
        this.MesesCheck = [],
        this.temasChecks = [],
        this.temaTresChecks8 = [],
        this.temaTresChecks6 = [],
        this.temaTresChecks = [],
        this.temaVocabularioChecks = [],
        this.completoYQueContenga = 0;
        this.completoOQueContenga = 0;
        this.completoQueExcluya = 0;
        this.allItems = [{ id: 6, texto: "Corte Suprema de Justicia" }]
        this.allItemsExtraOrigen = [{ id: 6, texto: "Corte Suprema de Justicia" }]
        this.generalForm.patchValue({
            textoBusqueda: '', mesFuenteOficial:'', chkVideotecaCNSJ: false, chkBibliotecaCNSJ: false, chkHolocaustoCNSJ: false, chkJurisprudencia: true, selectedItems: [{ id: 6, texto: "Corte Suprema de Justicia" }], selectedItemsCE: [{ id: 8, texto: "Consejo de Estado" }], consejoDeEstado: "Consejo de Estado",
            selectedItemsCC: [{ id: 7, texto: "Corte Constitucional" }], selectedItemsCNDJ: [{ id: 9, texto: "Comisión Nacional de Disciplina Judicial" }], ddlAltasCortes: ['Corte Suprema de Justicia'], origen: [[1]], subOrigen: [6],
            chkActosAdministrativos: false, selectedItemsTribunales: [], selectedItemsActos: [], selectedItemsBiblioteca: [], selectedItemsInfoHolocausto: [], selectedItemsInfoVideoteca: [], selectedItemsSeccion: [], selectedItemsInfo: [], selectedItemsOrigenVideoteca: [],
            selectedItemsBibliotecaRedLYMA: [], selectedItemsTipoMaterialLYMA: [], tipoDeMaterial: [], InputTituloLYMA: [], InputAutorCorpLYMA: [], InputAñoPubLYMA: [], InputSerieLYMA: [], InputISBNLYMA: [], InputNumeroTopograficoLYMA: [],
            InputCodigoSistemaLYMA: [], InputISNNRevistas: [], InputEditorialRevistas: [], InputTituloAnaliticaRevistas: [], InputDescriptoresAnaliticaRevistas: [], InputAutoresAnaliticaRevistas: [],
            InputTemaAnaliticaRevistas: [], InputNumeroNormaNormativa: [], InputNumeroRadicacion: [], dateExp: '', datePub: '', InputAñoNormativa: [], InputMesNormativa: [], InputDescriptoresNormativa: [], InputConjuez: [],
            InputNumeroFuenteOficialNormativa: [], InputExtracto: [], chkSoloGacetas: false, chkBoletinesJurisprudenciales: false, chkSoloGacetasAvanzado: false, chkComisionGenero: false, ddTipoActo: '', ddTribunales: '', selectedItemsTipoGaceta: [], ddSeccion: '', textoCriterio1: '', textoCriterio2: '',
            textoCriterio3: '', textoCriterio4: '', textoCriterio5: '', textoCriterio6: '', textoCriterio7: '', textoCriterio8: '', textoCriterio9: '', textoAux1: '', textoAux2: '', textoAux3: '', textoAux4: '', textoAux5: '',
            textoAux6: '', textoAux7: '', textoAux8: '', textoAux9: '', textoYContenga: '', textoOContenga: '', textoExcluya: '', textoCriterio1T: '', textoCriterio2T: '', textoCriterio3T: '', textoCriterio4T: '', textoCriterio5T: '',
            textoCriterio6T: '', textoCriterio7T: '', textoCriterio8T: '', textoCriterio9T: '', textoAux1T: '', textoAux2T: '', textoAux3T: '', textoAux4T: '', textoAux5T: '', textoAux6T: '', textoAux7T: '', textoAux8T: '', textoAux9T: '',
            textoYContengaT: '', textoOContengaT: '', textoExcluyaT: '', textoCriterio1PR: '', textoCriterio2PR: '', textoCriterio3PR: '', textoCriterio4PR: '', textoCriterio5PR: '', textoCriterio6PR: '', textoCriterio7PR: '',
            textoCriterio8PR: '', textoCriterio9PR: '', textoAux1PR: '', textoAux2PR: '', textoAux3PR: '', textoAux4PR: '', textoAux5PR: '', textoAux6PR: '', textoAux7PR: '', textoAux8PR: '', textoAux9PR: '', textoYContengaPR: '',
            textoOContengaPR: '', textoExcluyaPR: '', textoCriterio1JR: '', textoCriterio2JR: '', textoCriterio3JR: '', textoCriterio4JR: '', textoCriterio5JR: '', textoCriterio6JR: '', textoCriterio7JR: '', textoCriterio8JR: '',
            textoCriterio9JR: '', textoAux1JR: '', textoAux2JR: '', textoAux3JR: '', textoAux4JR: '', textoAux5JR: '', textoAux6JR: '', textoAux7JR: '', textoAux8JR: '', textoAux9JR: '', textoYContengaJR: '', textoOContengaJR: '',
            textoExcluyaJR: '', textoCriterio1C: '', textoCriterio2C: '', textoCriterio3C: '', textoCriterio4C: '', textoCriterio5C: '', textoCriterio6C: '', textoCriterio7C: '', textoCriterio8C: '', textoCriterio9C: '',
            textoAux1C: '', textoAux2C: '', textoAux3C: '', textoAux4C: '', textoAux5C: '', textoAux6C: '', textoAux7C: '', textoAux8C: '', textoAux9C: '', textoYContengaC: '', textoOContengaC: '', textoExcluyaC: '', textoCriterio1A: '',
            textoCriterio2A: '', textoCriterio3A: '', textoCriterio4A: '', textoCriterio5A: '', textoCriterio6A: '', textoCriterio7A: '', textoCriterio8A: '', textoCriterio9A: '', textoAux1A: '', textoAux2A: '', textoAux3A: '',
            textoAux4A: '', textoAux5A: '', textoAux6A: '', textoAux7A: '', textoAux8A: '', textoAux9A: '', textoYContengaA: '', textoOContengaA: '', textoExcluyaA: '', InputNombreGaceta: '', InputDemandante: '',
            InputDemandado: '', InputNormaDemandada: '', InputContenidoGaceta: '', InputProcedencia: '', añoDesdeGaceta: 1886, añoDesdeGaceta2: 1886, GacetasFechaDesde: '', GacetasFechaDesde2: '', añoHastaGaceta: 2022, GacetasFechaHasta: '', TipoGaceta: [],
            InputTema: "", InputTema17: "",InputTema8: "", InputTema16: "", InputTema15: "", ddTemas: '', ddPonencia: [], ddCorporaciones: [], ddEstado: [], InputConcideraciones: '', InputAsunto: '', InputParteResolutiva: '', InputDecision: '', ddServidorPublicos: [], InputClaseDeActuacion: [],
            ddClaseActuacion: [], ActosAdmin: '', AnnoActosAdmin: '', AñoPubActosAdmin: '', IdActosAdmin: '', EdicionActosAdmin: '', VolumenActosAdmin: '', NoTrimestreActosAdmin: '', AñoGacetaActosAdmin: '', RegxPagActosAdmin: '',
            EsTrimestralActosAdmin: '', ddSalas: [], ddTipoSalas: [], chkAsuntoSala: false, chkTutelas: false, chkRelevantes: false, dateDesde: '', dateHasta: '', InputSustentoNormativo: "", InputNroProceso: "", InputNroBoletin: "", ddTipoNroProvidencia: [],
            InputClaseActuacion: '', InputNroProvidencia: "", InputID: '', ddFuentesFormales: '', InputJurisprudenciaRelacionada: '', ddProcedencia: [], ddDelitos: '', ddCategoriaGenero: '', ddSalvamento: '',
            ddDecision: '', ddMagistradoSalvamento: '', ddTribunalAdministrativo: '', InputSujetosProcesales: '', InputTesis: '', InputNoActa: '', InputSubseccion: '', InputSeccion: '', InputObsrvaciones: '', ddServidoresPublicos: '', InputServidorPublico: '', InputNotaRelatoria: '', chkTieneSalvamento: '', InputSalvamento: '', InputMagistrado: '',
            chkGenero: false, InputCategoriaGenero: '', InputCategoriaDecision: '', InputRegVideoteca: '', InputJurisdiccionVideoteca: '', InputAutorVideoteca: '', InputAñoVideoteca: '', InputTituloVideoteca: '',
            InputTituloHolocausto: '', InputTemaHolocausto: '', InputSearchFuenteFormal: '', InputFuenteFormal: '', InputDelitos: '', sub_origen_id_21: '',
            sub_origen_id_1: 6, sub_origen_id_2: '', sub_origen_id_3: '', sub_origen_id_4: '', sub_origen_id_5: '', sub_origen_id_6: '', sub_origen_id_7: '', sub_origen_id_8: '', sub_origen_id_9: '', sub_origen_id_10: '', sub_origen_id_11: '', sub_origen_id_12: '', sub_origen_id_13: '', sub_origen_id_14: '', sub_origen_id_15: '', sub_origen_id_16: '', sub_origen_id_17: '', sub_origen_id_18: '', sub_origen_id_19: '', sub_origen_id_20: '', sub_origen_id_22: '',
            selectedItemsJurisGenero: [], ddTipoActos: [], ddNaturalezaProceso: [],
            InputHechosProvidecia: '', InputProblemaJuridicoText: '', InputNombrePredio: '', InputCedulaCastastral: '', InputMatriculaInmobiliaria: '', InputDepartamentoInmueble: '', selectedItemsDepartamentoInmueble: [], selectedItemsCiudadInmueble: [], selectedItemsMunicipioInmueble: [],
            selectedItemsCorregimientoInmueble: [], selectedItemsVeredaInmueble: [], selectedItemsBarrioInmueble: [], InputDireccionInmueble: '', selectedItemsTribunalSuperior: [], selectedItemsTribunalDespacho: [], selectedItemsTribunalAdministrativo: [],
            ddTemaTres8: [],  ff_anio: '', mes: [], ddFuenteOficial: [], ddEntidadGeneradora: [],ddtribunalesCE: [],

            temaTresChecks8: [], temaTresChecks6: [], temasChecks: [], temaTresChecks: [],temaVocabularioChecks: [],
        })


        if (document.location.href == "https://csj-apigatewayfront.azurewebsites.net/?p=CNSJ" || document.location.href == "https://csjprifront-pre.azurewebsites.net/?p=CNSJ") {
            this.generalForm.patchValue({
                selectedItems: [], subOrigen: [], sub_origen_id_1: '',
            })
        }
        if (document.location.href == "https://csj-apigatewayfront.azurewebsites.net/?p=CNDJ" || document.location.href == "https://csjprifront-pre.azurewebsites.net/?p=CNDJ") {
            this.generalForm.patchValue({
                sub_origen_id_1: '', sub_origen_id_4: 9, subOrigen: [],
            })
        }
        if (document.location.href == "https://csj-apigatewayfront.azurewebsites.net/?p=CC" || document.location.href == "https://csjprifront-pre.azurewebsites.net/?p=CC") {
            this.generalForm.patchValue({
                sub_origen_id_1: '', sub_origen_id_3: 7, subOrigen: [],
            })
        }

        if (this.UrlRef == "CE") {
            this.generalForm.patchValue({
                sub_origen_id_1: '',
                sub_origen_id_2: '',
                sub_origen_id_3: '',
                sub_origen_id_4: '',
                sub_origen_id_5: '',
                subOrigen: [8],
                selectedItems: [{ id: 8, texto: "Consejo de Estado" }]
            })
            this.generalForm.get("consejoDeEstado").valueChanges.subscribe((origen: any) => {
                if (this.generalForm.get('consejoDeEstado')?.value == 'Consejo de Estado') {
                    this.generalForm.patchValue({
                        sub_origen_id_2: 8,
                    })
                }
                else if (this.generalForm.get('consejoDeEstado')?.value == '') {
                    this.generalForm.patchValue({
                        sub_origen_id_2: 8,
                    })
                }
            })
            this.auxSubOrigen = this.auxSubOrigen.filter((id: any) => id != 6);
            this.generalForm.patchValue({
                subOrigen: this.auxSubOrigen
            })
            this.allItems = [{ id: 8, texto: "Consejo de Estado" }];
            this.allItemsExtraOrigen = [{ id: 8, texto: "Consejo de Estado" }];
        }
        if (this.UrlRef == "CNSJ") {
            this.generalForm.patchValue({
                sub_origen_id_1: '',
                sub_origen_id_2: '',
                sub_origen_id_3: '',
                sub_origen_id_4: '',
                sub_origen_id_5: '',
                subOrigen: [],
                selectedItems: [],
                chkJurisprudencia: false
            })
            this.allItems = [];
            this.allItemsExtraOrigen = [];
            this.flagItems1 = false;
        }
        if (this.UrlRef == "CC") {
            this.generalForm.patchValue({
                sub_origen_id_1: '',
                sub_origen_id_2: '',
                sub_origen_id_3: 7,
                sub_origen_id_4: '',
                sub_origen_id_5: '',
                subOrigen: [7],
                selectedItems: [{ id: 7, texto: "Corte Constitucional" }]
            })
            this.auxSubOrigen = this.auxSubOrigen.filter((id: any) => id != 6);
            this.generalForm.patchValue({
                subOrigen: this.auxSubOrigen
            })
            this.allItems = [{ id: 7, texto: "Corte Constitucional" }];
            this.allItemsExtraOrigen = [{ id: 7, texto: "Corte Constitucional" }];
        }
        if (this.UrlRef == "CNDJ") {
            this.generalForm.patchValue({
                sub_origen_id_1: '',
                sub_origen_id_2: '',
                sub_origen_id_3: '',
                sub_origen_id_4: 9,
                sub_origen_id_5: '',
                subOrigen: [9],
                selectedItems: [{ id: 9, texto: "Comisión Nacional de Disciplina Judicial" }]
            })
            this.auxSubOrigen = this.auxSubOrigen.filter((id: any) => id != 6);
            this.generalForm.patchValue({
                subOrigen: this.auxSubOrigen
            })
            this.allItems = [{ id: 9, texto: "Comisión Nacional de Disciplina Judicial" }];
            this.allItemsExtraOrigen = [{ id: 9, texto: "Comisión Nacional de Disciplina Judicial" }];
        }

        this.tipoTribunalAdministrativo = []; this.tipoTribunalSuperior = [];
        this.TipoProcedencias = []; this.Procedencias = []; this.DelitosCheck = []; this.MagistradoCheck = []; this.DecisionesCheck = []; this.SalasCheck = []; this.TipoSalasCheck = []; this.fuentesFormales = []; this.fuentesFormalesCheck = [];
        this.auxTipoGaceta = []; this.flagIncExButtoms = true; this.grupoCriterio = []; this.seccion = []; this.tipoNormaSelect = [];
        this.flagMoreAnd1 = false; this.flagMoreOr1 = false; this.flagMoreEx1 = false; this.flagMoreAnd2 = false; this.flagMoreOr2 = false; this.flagMoreEx2 = false; this.flagMoreAnd3 = false; this.flagMoreOr3 = false; this.flagMoreEx3 = false; this.flagMoreAnd4 = false;
        this.flagMoreOr4 = false; this.flagMoreEx4 = false; this.flagMoreAnd5 = false; this.flagMoreOr5 = false; this.flagMoreEx5 = false; this.flagMoreAnd6 = false; this.flagMoreOr6 = false; this.flagMoreEx6 = false; this.flagMoreAnd7 = false; this.flagMoreOr7 = false;
        this.flagMoreEx7 = false; this.flagMoreAnd8 = false; this.flagMoreOr8 = false; this.flagMoreEx8 = false; this.flagMoreAnd9 = false; this.flagMoreOr9 = false; this.flagMoreEx9 = false; this.flagMoreAndT = false; this.flagMoreOrT = false; this.flagMoreExT = false;
        this.flagIncExButtomsT = true; this.grupoCriterioT = []; this.flagMoreAnd1T = false; this.flagMoreOr1T = false; this.flagMoreEx1T = false; this.flagMoreAnd2T = false; this.flagMoreOr2T = false; this.flagMoreEx2T = false; this.flagMoreAnd3T = false;
        this.flagMoreOr3T = false; this.flagMoreEx3T = false; this.flagMoreAnd4T = false; this.flagMoreOr4T = false; this.flagMoreEx4T = false; this.flagMoreAnd5T = false; this.flagMoreOr5T = false; this.flagMoreEx5T = false; this.flagMoreAnd6T = false;
        this.flagMoreOr6T = false; this.flagMoreEx6T = false; this.flagMoreAnd7T = false; this.flagMoreOr7T = false; this.flagMoreEx7T = false; this.flagMoreAnd8T = false; this.flagMoreOr8T = false; this.flagMoreEx8T = false; this.flagMoreAnd9T = false;
        this.flagMoreOr9T = false; this.flagMoreEx9T = false; this.flagMoreAndPR = false; this.flagMoreOrPR = false; this.flagMoreExPR = false; this.flagIncExButtomsPR = true; this.grupoCriterioPR = []; this.flagMoreAnd1PR = false; this.flagMoreOr1PR = false;
        this.flagMoreEx1PR = false; this.flagMoreAnd2PR = false; this.flagMoreOr2PR = false; this.flagMoreEx2PR = false; this.flagMoreAnd3PR = false; this.flagMoreOr3PR = false; this.flagMoreEx3PR = false; this.flagMoreAnd4PR = false; this.flagMoreOr4PR = false;
        this.flagMoreEx4PR = false; this.flagMoreAnd5PR = false; this.flagMoreOr5PR = false; this.flagMoreEx5PR = false; this.flagMoreAnd6PR = false; this.flagMoreOr6PR = false; this.flagMoreEx6PR = false; this.flagMoreAnd7PR = false; this.flagMoreOr7PR = false;
        this.flagMoreEx7PR = false; this.flagMoreAnd8PR = false; this.flagMoreOr8PR = false; this.flagMoreEx8PR = false; this.flagMoreAnd9PR = false; this.flagMoreOr9PR = false; this.flagMoreEx9PR = false; this.flagMoreAndJR = false; this.flagMoreOrJR = false;
        this.flagMoreExJR = false; this.flagIncExButtomsJR = true; this.grupoCriterioJR = []; this.flagMoreAnd1JR = false; this.flagMoreOr1JR = false; this.flagMoreEx1JR = false; this.flagMoreAnd2JR = false; this.flagMoreOr2JR = false; this.flagMoreEx2JR = false;
        this.flagMoreAnd3JR = false; this.flagMoreOr3JR = false; this.flagMoreEx3JR = false; this.flagMoreAnd4JR = false; this.flagMoreOr4JR = false; this.flagMoreEx4JR = false; this.flagMoreAnd5JR = false; this.flagMoreOr5JR = false; this.flagMoreEx5JR = false;
        this.flagMoreAnd6JR = false; this.flagMoreOr6JR = false; this.flagMoreEx6JR = false; this.flagMoreAnd7JR = false; this.flagMoreOr7JR = false; this.flagMoreEx7JR = false; this.flagMoreAnd8JR = false; this.flagMoreOr8JR = false; this.flagMoreEx8JR = false;
        this.flagMoreAnd9JR = false; this.flagMoreOr9JR = false; this.flagMoreEx9JR = false; this.flagMoreAndC = false; this.flagMoreOrC = false; this.flagMoreExC = false; this.flagIncExButtomsC = true; this.grupoCriterioC = []; this.flagMoreAnd1C = false;
        this.flagMoreOr1C = false; this.flagMoreEx1C = false; this.flagMoreAnd2C = false; this.flagMoreOr2C = false; this.flagMoreEx2C = false; this.flagMoreAnd3C = false; this.flagMoreOr3C = false; this.flagMoreEx3C = false; this.flagMoreAnd4C = false;
        this.flagMoreOr4C = false; this.flagMoreEx4C = false; this.flagMoreAnd5C = false; this.flagMoreOr5C = false; this.flagMoreEx5C = false; this.flagMoreAnd6C = false; this.flagMoreOr6C = false; this.flagMoreEx6C = false; this.flagMoreAnd7C = false;
        this.flagMoreOr7C = false; this.flagMoreEx7C = false; this.flagMoreAnd8C = false; this.flagMoreOr8C = false; this.flagMoreEx8C = false; this.flagMoreAnd9C = false; this.flagMoreOr9C = false; this.flagMoreEx9C = false; this.flagMoreAndA = false;
        this.flagMoreOrA = false; this.flagMoreExA = false; this.flagIncExButtomsA = true; this.grupoCriterioA = []; this.flagMoreAnd1A = false; this.flagMoreOr1A = false; this.flagMoreEx1A = false; this.flagMoreAnd2A = false; this.flagMoreOr2A = false;
        this.flagMoreEx2A = false; this.flagMoreAnd3A = false; this.flagMoreOr3A = false; this.flagMoreEx3A = false; this.flagMoreAnd4A = false; this.flagMoreOr4A = false; this.flagMoreEx4A = false; this.flagMoreAnd5A = false; this.flagMoreOr5A = false;
        this.flagMoreEx5A = false; this.flagMoreAnd6A = false; this.flagMoreOr6A = false; this.flagMoreEx6A = false; this.flagMoreAnd7A = false; this.flagMoreOr7A = false; this.flagMoreEx7A = false; this.flagMoreAnd8A = false; this.flagMoreOr8A = false;
        this.flagMoreEx8A = false; this.flagMoreAnd9A = false; this.flagMoreOr9A = false; this.flagMoreEx9A = false; this.flagMoreAndA = false;
        this.flagMoreOrD = false; this.flagMoreExD = false; this.flagIncExButtomsD = true; this.grupoCriterioD = []; this.flagMoreAnd1A = false; this.flagMoreOr1A = false; this.flagMoreEx1A = false; this.flagMoreAnd2A = false; this.flagMoreOr2A = false;
        this.flagMoreEx2A = false; this.flagMoreAnd3A = false; this.flagMoreOr3A = false; this.flagMoreEx3A = false; this.flagMoreAnd4A = false; this.flagMoreOr4A = false; this.flagMoreEx4A = false; this.flagMoreAnd5A = false; this.flagMoreOr5A = false;
        this.flagMoreEx5A = false; this.flagMoreAnd6A = false; this.flagMoreOr6A = false; this.flagMoreEx6A = false; this.flagMoreAnd7A = false; this.flagMoreOr7A = false; this.flagMoreEx7A = false; this.flagMoreAnd8A = false; this.flagMoreOr8A = false;
        this.flagMoreEx8A = false; this.flagMoreAnd9A = false; this.flagMoreOr9A = false; this.flagMoreEx9A = false;
    }

    public limpiarFiltros() {
        this.generalForm.patchValue({
            InputTituloLYMA: [], InputAutorCorpLYMA: [], InputAñoPubLYMA: [], InputSerieLYMA: [], InputISBNLYMA: [], InputNumeroTopograficoLYMA: [],
            InputCodigoSistemaLYMA: [], InputISNNRevistas: [], InputEditorialRevistas: [], InputTituloAnaliticaRevistas: [], InputDescriptoresAnaliticaRevistas: [], InputAutoresAnaliticaRevistas: [],
            InputTemaAnaliticaRevistas: [], InputNumeroNormaNormativa: [], InputNumeroRadicacion: [], dateExp: '', datePub: '', InputAñoNormativa: [], InputMesNormativa: [], InputDescriptoresNormativa: [], InputConjuez: [],
            InputNumeroFuenteOficialNormativa: [], InputExtracto: [], chkSoloGacetasAvanzado: false, selectedItemsTipoGaceta: [], ddSeccion: '', textoCriterio1T: '', textoCriterio2T: '', textoCriterio3T: '', textoCriterio4T: '', textoCriterio5T: '',
            textoCriterio6T: '', textoCriterio7T: '', textoCriterio8T: '', textoCriterio9T: '', textoAux1T: '', textoAux2T: '', textoAux3T: '', textoAux4T: '', textoAux5T: '', textoAux6T: '', textoAux7T: '', textoAux8T: '', textoAux9T: '',
            textoYContengaT: '', textoOContengaT: '', textoExcluyaT: '', textoCriterio1PR: '', textoCriterio2PR: '', textoCriterio3PR: '', textoCriterio4PR: '', textoCriterio5PR: '', textoCriterio6PR: '', textoCriterio7PR: '',
            textoCriterio8PR: '', textoCriterio9PR: '', textoAux1PR: '', textoAux2PR: '', textoAux3PR: '', textoAux4PR: '', textoAux5PR: '', textoAux6PR: '', textoAux7PR: '', textoAux8PR: '', textoAux9PR: '', textoYContengaPR: '',
            textoOContengaPR: '', textoExcluyaPR: '', textoCriterio1JR: '', textoCriterio2JR: '', textoCriterio3JR: '', textoCriterio4JR: '', textoCriterio5JR: '', textoCriterio6JR: '', textoCriterio7JR: '', textoCriterio8JR: '',
            textoCriterio9JR: '', textoAux1JR: '', textoAux2JR: '', textoAux3JR: '', textoAux4JR: '', textoAux5JR: '', textoAux6JR: '', textoAux7JR: '', textoAux8JR: '', textoAux9JR: '', textoYContengaJR: '', textoOContengaJR: '',
            textoExcluyaJR: '', textoCriterio1C: '', textoCriterio2C: '', textoCriterio3C: '', textoCriterio4C: '', textoCriterio5C: '', textoCriterio6C: '', textoCriterio7C: '', textoCriterio8C: '', textoCriterio9C: '',
            textoAux1C: '', textoAux2C: '', textoAux3C: '', textoAux4C: '', textoAux5C: '', textoAux6C: '', textoAux7C: '', textoAux8C: '', textoAux9C: '', textoYContengaC: '', textoOContengaC: '', textoExcluyaC: '', textoCriterio1A: '',
            textoCriterio2A: '', textoCriterio3A: '', textoCriterio4A: '', textoCriterio5A: '', textoCriterio6A: '', textoCriterio7A: '', textoCriterio8A: '', textoCriterio9A: '', textoAux1A: '', textoAux2A: '', textoAux3A: '',
            textoAux4A: '', textoAux5A: '', textoAux6A: '', textoAux7A: '', textoAux8A: '', textoAux9A: '', textoYContengaA: '', textoOContengaA: '', textoExcluyaA: '', InputNombreGaceta: '', InputDemandante: '',
            InputDemandado: '', InputNormaDemandada: '', InputContenidoGaceta: '', InputProcedencia: '', añoDesdeGaceta: 1886, añoDesdeGaceta2: 1886, GacetasFechaDesde: '', GacetasFechaDesde2: '', añoHastaGaceta: 2022, GacetasFechaHasta: '', TipoGaceta: [],
            InputTema: "", InputTema17: "", InputTema8: "", InputTema16: "", InputTema15: "", ddTemas: '', ddPonencia: [], ddCorporaciones: [], ddEstado: [], InputConcideraciones: '', InputAsunto: '', InputParteResolutiva: '', InputDecision: '', ddServidorPublicos: [], InputClaseDeActuacion: [],
            ddClaseActuacion: [], ActosAdmin: '', AnnoActosAdmin: '', AñoPubActosAdmin: '', IdActosAdmin: '', EdicionActosAdmin: '', VolumenActosAdmin: '', NoTrimestreActosAdmin: '', AñoGacetaActosAdmin: '', RegxPagActosAdmin: '',
            EsTrimestralActosAdmin: '', ddSalas: [], ddTipoSalas: [], chkAsuntoSala: false, chkTutelas: false, chkRelevantes: false, dateDesde: '', dateHasta: '', InputSustentoNormativo: "", InputNroProceso: "", InputNroBoletin: "", ddTipoNroProvidencia: [],
            InputClaseActuacion: '', InputNroProvidencia: "", InputID: '', ddFuentesFormales: '', InputJurisprudenciaRelacionada: '', ddProcedencia: [], ddDelitos: '', ddCategoriaGenero: '', ddSalvamento: '',
            ddDecision: '', ddMagistradoSalvamento: '', ddTribunalAdministrativo: '', InputSujetosProcesales: '', InputTesis: '', InputNoActa: '', InputSubseccion: '', InputSeccion: '', InputObsrvaciones: '', ddServidoresPublicos: '', InputServidorPublico: '', InputNotaRelatoria: '', chkTieneSalvamento: '', InputSalvamento: '', InputMagistrado: '',
            chkGenero: false, InputCategoriaGenero: '', InputCategoriaDecision: '', InputRegVideoteca: '', InputJurisdiccionVideoteca: '', InputAutorVideoteca: '', InputAñoVideoteca: '', InputTituloVideoteca: '',
            InputTituloHolocausto: '', InputTemaHolocausto: '', InputSearchFuenteFormal: '', InputFuenteFormal: '', InputDelitos: '', selectedItemsJurisGenero: [], ddTipoActos: [],  ddNaturalezaProceso: [],
            InputHechosProvidecia: '', InputProblemaJuridicoText: '', InputNombrePredio: '', InputCedulaCastastral: '', InputMatriculaInmobiliaria: '', InputDepartamentoInmueble: '', selectedItemsDepartamentoInmueble: [], selectedItemsCiudadInmueble: [], selectedItemsMunicipioInmueble: [],
            selectedItemsCorregimientoInmueble: [], selectedItemsVeredaInmueble: [], selectedItemsBarrioInmueble: [], InputDireccionInmueble: '', selectedItemsTribunalSuperior: [], selectedItemsTribunalDespacho: [], selectedItemsTribunalAdministrativo: [], ddFuenteOficial: [], ddEntidadGeneradora: [],
        })
        this.tipoTribunalAdministrativo = []; this.tipoTribunalSuperior = [];
        this.TipoProcedencias = []; this.Procedencias = []; this.DelitosCheck = []; this.MagistradoCheck = []; this.DecisionesCheck = []; this.SalasCheck = []; this.TipoSalasCheck = []; this.fuentesFormales = []; this.fuentesFormalesCheck = [];
        this.auxTipoGaceta = []; this.flagIncExButtoms = true; this.seccion = [];
        this.flagMoreAndT = false; this.flagMoreOrT = false; this.flagMoreExT = false;
        this.flagIncExButtomsT = true; this.grupoCriterioT = []; this.flagMoreAnd1T = false; this.flagMoreOr1T = false; this.flagMoreEx1T = false; this.flagMoreAnd2T = false; this.flagMoreOr2T = false; this.flagMoreEx2T = false; this.flagMoreAnd3T = false;
        this.flagMoreOr3T = false; this.flagMoreEx3T = false; this.flagMoreAnd4T = false; this.flagMoreOr4T = false; this.flagMoreEx4T = false; this.flagMoreAnd5T = false; this.flagMoreOr5T = false; this.flagMoreEx5T = false; this.flagMoreAnd6T = false;
        this.flagMoreOr6T = false; this.flagMoreEx6T = false; this.flagMoreAnd7T = false; this.flagMoreOr7T = false; this.flagMoreEx7T = false; this.flagMoreAnd8T = false; this.flagMoreOr8T = false; this.flagMoreEx8T = false; this.flagMoreAnd9T = false;
        this.flagMoreOr9T = false; this.flagMoreEx9T = false; this.flagMoreAndPR = false; this.flagMoreOrPR = false; this.flagMoreExPR = false; this.flagIncExButtomsPR = true; this.grupoCriterioPR = []; this.flagMoreAnd1PR = false; this.flagMoreOr1PR = false;
        this.flagMoreEx1PR = false; this.flagMoreAnd2PR = false; this.flagMoreOr2PR = false; this.flagMoreEx2PR = false; this.flagMoreAnd3PR = false; this.flagMoreOr3PR = false; this.flagMoreEx3PR = false; this.flagMoreAnd4PR = false; this.flagMoreOr4PR = false;
        this.flagMoreEx4PR = false; this.flagMoreAnd5PR = false; this.flagMoreOr5PR = false; this.flagMoreEx5PR = false; this.flagMoreAnd6PR = false; this.flagMoreOr6PR = false; this.flagMoreEx6PR = false; this.flagMoreAnd7PR = false; this.flagMoreOr7PR = false;
        this.flagMoreEx7PR = false; this.flagMoreAnd8PR = false; this.flagMoreOr8PR = false; this.flagMoreEx8PR = false; this.flagMoreAnd9PR = false; this.flagMoreOr9PR = false; this.flagMoreEx9PR = false; this.flagMoreAndJR = false; this.flagMoreOrJR = false;
        this.flagMoreExJR = false; this.flagIncExButtomsJR = true; this.grupoCriterioJR = []; this.flagMoreAnd1JR = false; this.flagMoreOr1JR = false; this.flagMoreEx1JR = false; this.flagMoreAnd2JR = false; this.flagMoreOr2JR = false; this.flagMoreEx2JR = false;
        this.flagMoreAnd3JR = false; this.flagMoreOr3JR = false; this.flagMoreEx3JR = false; this.flagMoreAnd4JR = false; this.flagMoreOr4JR = false; this.flagMoreEx4JR = false; this.flagMoreAnd5JR = false; this.flagMoreOr5JR = false; this.flagMoreEx5JR = false;
        this.flagMoreAnd6JR = false; this.flagMoreOr6JR = false; this.flagMoreEx6JR = false; this.flagMoreAnd7JR = false; this.flagMoreOr7JR = false; this.flagMoreEx7JR = false; this.flagMoreAnd8JR = false; this.flagMoreOr8JR = false; this.flagMoreEx8JR = false;
        this.flagMoreAnd9JR = false; this.flagMoreOr9JR = false; this.flagMoreEx9JR = false; this.flagMoreAndC = false; this.flagMoreOrC = false; this.flagMoreExC = false; this.flagIncExButtomsC = true; this.grupoCriterioC = []; this.flagMoreAnd1C = false;
        this.flagMoreOr1C = false; this.flagMoreEx1C = false; this.flagMoreAnd2C = false; this.flagMoreOr2C = false; this.flagMoreEx2C = false; this.flagMoreAnd3C = false; this.flagMoreOr3C = false; this.flagMoreEx3C = false; this.flagMoreAnd4C = false;
        this.flagMoreOr4C = false; this.flagMoreEx4C = false; this.flagMoreAnd5C = false; this.flagMoreOr5C = false; this.flagMoreEx5C = false; this.flagMoreAnd6C = false; this.flagMoreOr6C = false; this.flagMoreEx6C = false; this.flagMoreAnd7C = false;
        this.flagMoreOr7C = false; this.flagMoreEx7C = false; this.flagMoreAnd8C = false; this.flagMoreOr8C = false; this.flagMoreEx8C = false; this.flagMoreAnd9C = false; this.flagMoreOr9C = false; this.flagMoreEx9C = false; this.flagMoreAndA = false;
        this.flagMoreOrA = false; this.flagMoreExA = false; this.flagIncExButtomsA = true; this.grupoCriterioA = []; this.flagMoreAnd1A = false; this.flagMoreOr1A = false; this.flagMoreEx1A = false; this.flagMoreAnd2A = false; this.flagMoreOr2A = false;
        this.flagMoreEx2A = false; this.flagMoreAnd3A = false; this.flagMoreOr3A = false; this.flagMoreEx3A = false; this.flagMoreAnd4A = false; this.flagMoreOr4A = false; this.flagMoreEx4A = false; this.flagMoreAnd5A = false; this.flagMoreOr5A = false;
        this.flagMoreEx5A = false; this.flagMoreAnd6A = false; this.flagMoreOr6A = false; this.flagMoreEx6A = false; this.flagMoreAnd7A = false; this.flagMoreOr7A = false; this.flagMoreEx7A = false; this.flagMoreAnd8A = false; this.flagMoreOr8A = false;
        this.flagMoreEx8A = false; this.flagMoreAnd9A = false; this.flagMoreOr9A = false; this.flagMoreEx9A = false; this.flagMoreAndA = false;
        this.flagMoreOrD = false; this.flagMoreExD = false; this.flagIncExButtomsD = true; this.grupoCriterioD = []; this.flagMoreAnd1A = false; this.flagMoreOr1A = false; this.flagMoreEx1A = false; this.flagMoreAnd2A = false; this.flagMoreOr2A = false;
        this.flagMoreEx2A = false; this.flagMoreAnd3A = false; this.flagMoreOr3A = false; this.flagMoreEx3A = false; this.flagMoreAnd4A = false; this.flagMoreOr4A = false; this.flagMoreEx4A = false; this.flagMoreAnd5A = false; this.flagMoreOr5A = false;
        this.flagMoreEx5A = false; this.flagMoreAnd6A = false; this.flagMoreOr6A = false; this.flagMoreEx6A = false; this.flagMoreAnd7A = false; this.flagMoreOr7A = false; this.flagMoreEx7A = false; this.flagMoreAnd8A = false; this.flagMoreOr8A = false;
        this.flagMoreEx8A = false; this.flagMoreAnd9A = false; this.flagMoreOr9A = false; this.flagMoreEx9A = false;
    }

    @HostListener('document:click')
    clickout() {
        this.flagShowHistoricoBusqueda = false;
    }

    keyPressSearchField(event: any) {
        if (event.target.value.length > 2) {
            const Datapost: BusquedaHistoricoModel = {
                texto: event.target.value
            };

            this.elasticService.postSearchHistorial(JSON.parse(JSON.stringify(Datapost))).subscribe((Response: any) => {
                this.historicoBusquedaList = Response;
                this.flagShowHistoricoBusqueda = false;
                //this.modal_confirm = true;
                if (this.historicoBusquedaList.length > 0) {
                    //setTimeout(() => this.flagShowHistoricoBusqueda = true, 3000)
                    this.flagShowHistoricoBusqueda = true;
                }

                //this.flagShowHistoricoBusqueda = true;
            })
        }
        else {
            this.flagShowHistoricoBusqueda = false;
        }

    }

    selectDataHistoricoBusqueda(text: any) {
        this.generalForm.get("textoBusqueda").setValue(text);
        this.flagShowHistoricoBusqueda = false;
    }

    obtenerId(array: any[]): number[] {
        let filter: number[] = [];

        array.forEach(element => {
            filter.push(element.id);
        });

        filter = [... new Set(filter)];

        return filter;
    }


    numberOnly(event: any): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        console.log("charCode", charCode);
        
        if (charCode < 31) {
            return true;
        }else if(charCode > 47 && charCode < 58){
            return true;
        }else if(charCode > 95 && charCode < 106){
            return true;
        }
        return false;
    }

    calculateAPLength(){
        this.APLength = this.generalForm.get('ff_anio')?.value.length
        if(this.APLength > 3){
            this.errorInput = true;
            return false;
        }
        return true;
    }

    calculateNRLength(){
        this.APLength = this.generalForm.get('InputNumeroRadicacion')?.value.length
        if(this.APLength > 50){
            this.errorInput = true;
            return false;
        }
        return true;
    }

    calculateNLength(){
        this.APLength = this.generalForm.get('InputAñoNormativa')?.value.length
        if(this.APLength > 3){
            this.errorInput = true;
            return false;
        }
        return true;
    }

    validateAPLength(){
        this.errorInput = false;
        this.calculateAPLength();
    }
    validateNRLength(){
        this.errorInput = false;
        this.calculateNRLength();
    }
    validateNLength(){
        this.errorInput = false;
        this.calculateNLength();
    }

    validarCriteriosAceptados(criterio:string, action:string){
        if(action == 'more'){
            this.criterioAux.push(criterio);
            
            if(criterio == 'Y Que Contenga'){
                if(this.completoYQueContenga != 3){
                    this.completoYQueContenga ++;
                }
            }else if(criterio == 'O Que Contenga'){
                if(this.completoOQueContenga != 3){
                    this.completoOQueContenga ++;
                }
            }else if(criterio == 'Que Excluya'){
                if(this.completoQueExcluya != 3){
                    this.completoQueExcluya ++;
                }
            }   
        }else{
            const criterioRemove = this.criterioAux.pop();
            
            if(criterioRemove == 'Y Que Contenga'){
                if(this.completoYQueContenga > 0){
                    this.completoYQueContenga --;
                }
            }else if(criterioRemove == 'O Que Contenga'){
                if(this.completoOQueContenga > 0){
                    this.completoOQueContenga --;
                }
            }else if(criterioRemove == 'Que Excluya'){
                if(this.completoQueExcluya > 0){
                    this.completoQueExcluya --;
                }
            }   
        }
        
        /* console.log('this.criterioAux', this.criterioAux); */
        
        /* console.log('completoYQueContenga', this.completoYQueContenga);
        console.log('completoOQueContenga', this.completoOQueContenga);
        console.log('completoQueExcluya', this.completoQueExcluya); */
        
        if(this.completoYQueContenga == 3){
            this.criterios = this.criterios.filter(crit=> crit.texto !== 'Y Que Contenga')
        }else{
            const existCriterio = this.criterios.find(crit=> crit.texto == 'Y Que Contenga');
            if(!existCriterio){
                this.criterios.push({id:1, texto:'Y Que Contenga'})
            }
        }
        
        if(this.completoOQueContenga == 3){
            this.criterios = this.criterios.filter(crit=> crit.texto !== 'O Que Contenga')
        }else{
            const existCriterio = this.criterios.find(crit=> crit.texto == 'O Que Contenga');
            if(!existCriterio){
                this.criterios.push({id:2, texto:'O Que Contenga'})
            }
        }
        
        if(this.completoQueExcluya == 3){
            this.criterios = this.criterios.filter(crit=> crit.texto !== 'Que Excluya')
        }else{
            const existCriterio = this.criterios.find(crit=> crit.texto == 'Que Excluya');
            if(!existCriterio){
                this.criterios.push({id:3, texto:'Que Excluya'})
            }
        }
        /* console.log('this.criterios', this.criterios); */  
    }

    validarCriteriosAceptadosT(criterio:string, action:string){
        if(action == 'more'){
            this.criterioAuxT.push(criterio);
            
            if(criterio == 'Y Que Contenga'){
                if(this.completoYQueContengaT != 3){
                    this.completoYQueContengaT ++;
                }
            }else if(criterio == 'O Que Contenga'){
                if(this.completoOQueContengaT != 3){
                    this.completoOQueContengaT ++;
                }
            }else if(criterio == 'Que Excluya'){
                if(this.completoQueExcluyaT != 3){
                    this.completoQueExcluyaT ++;
                }
            }   
        }else{
            const criterioRemove = this.criterioAuxT.pop();
            
            if(criterioRemove == 'Y Que Contenga'){
                if(this.completoYQueContengaT > 0){
                    this.completoYQueContengaT --;
                }
            }else if(criterioRemove == 'O Que Contenga'){
                if(this.completoOQueContengaT > 0){
                    this.completoOQueContengaT --;
                }
            }else if(criterioRemove == 'Que Excluya'){
                if(this.completoQueExcluyaT > 0){
                    this.completoQueExcluyaT --;
                }
            }   
        }
        
        /* console.log('this.criterioAuxT', this.criterioAuxT); */
        
        /* console.log('completoYQueContengaT', this.completoYQueContengaT);
        console.log('completoOQueContengaT', this.completoOQueContengaT);
        console.log('completoQueExcluyaT', this.completoQueExcluyaT); */
        
        if(this.completoYQueContengaT == 3){
            this.criteriosT = this.criteriosT.filter(crit=> crit.texto !== 'Y Que Contenga')
        }else{
            const existCriterio = this.criteriosT.find(crit=> crit.texto == 'Y Que Contenga');
            if(!existCriterio){
                this.criteriosT.push({id:1, texto:'Y Que Contenga'})
            }
        }
        
        if(this.completoOQueContengaT == 3){
            this.criteriosT = this.criteriosT.filter(crit=> crit.texto !== 'O Que Contenga')
        }else{
            const existCriterio = this.criteriosT.find(crit=> crit.texto == 'O Que Contenga');
            if(!existCriterio){
                this.criteriosT.push({id:2, texto:'O Que Contenga'})
            }
        }
        
        if(this.completoQueExcluyaT == 3){
            this.criteriosT = this.criteriosT.filter(crit=> crit.texto !== 'Que Excluya')
        }else{
            const existCriterio = this.criteriosT.find(crit=> crit.texto == 'Que Excluya');
            if(!existCriterio){
                this.criteriosT.push({id:3, texto:'Que Excluya'})
            }
        }
        /* console.log('this.criteriosT', this.criteriosT); */  
    }

    validarCriteriosAceptadosA(criterio:string, action:string){
        if(action == 'more'){
            this.criterioAuxA.push(criterio);
            
            if(criterio == 'Y Que Contenga'){
                if(this.completoYQueContengaA != 3){
                    this.completoYQueContengaA ++;
                }
            }else if(criterio == 'O Que Contenga'){
                if(this.completoOQueContengaA != 3){
                    this.completoOQueContengaA ++;
                }
            }else if(criterio == 'Que Excluya'){
                if(this.completoQueExcluyaA != 3){
                    this.completoQueExcluyaA ++;
                }
            }   
        }else{
            const criterioRemove = this.criterioAuxA.pop();
            
            if(criterioRemove == 'Y Que Contenga'){
                if(this.completoYQueContengaA > 0){
                    this.completoYQueContengaA --;
                }
            }else if(criterioRemove == 'O Que Contenga'){
                if(this.completoOQueContengaA > 0){
                    this.completoOQueContengaA --;
                }
            }else if(criterioRemove == 'Que Excluya'){
                if(this.completoQueExcluyaA > 0){
                    this.completoQueExcluyaA --;
                }
            }   
        }
        
        /* console.log('this.criterioAuxA', this.criterioAuxA); */
        
        /* console.log('completoYQueContengaA', this.completoYQueContengaA);
        console.log('completoOQueContengaA', this.completoOQueContengaA);
        console.log('completoQueExcluyaA', this.completoQueExcluyaA); */
        
        if(this.completoYQueContengaA == 3){
            this.criteriosA = this.criteriosA.filter(crit=> crit.texto !== 'Y Que Contenga')
        }else{
            const existCriterio = this.criteriosA.find(crit=> crit.texto == 'Y Que Contenga');
            if(!existCriterio){
                this.criteriosA.push({id:1, texto:'Y Que Contenga'})
            }
        }
        
        if(this.completoOQueContengaA == 3){
            this.criteriosA = this.criteriosA.filter(crit=> crit.texto !== 'O Que Contenga')
        }else{
            const existCriterio = this.criteriosA.find(crit=> crit.texto == 'O Que Contenga');
            if(!existCriterio){
                this.criteriosA.push({id:2, texto:'O Que Contenga'})
            }
        }
        
        if(this.completoQueExcluyaA == 3){
            this.criteriosA = this.criteriosA.filter(crit=> crit.texto !== 'Que Excluya')
        }else{
            const existCriterio = this.criteriosA.find(crit=> crit.texto == 'Que Excluya');
            if(!existCriterio){
                this.criteriosA.push({id:3, texto:'Que Excluya'})
            }
        }
        /* console.log('this.criteriosA', this.criteriosA); */  
    }

    validarCriteriosAceptadosC(criterio:string, action:string){
        if(action == 'more'){
            this.criterioAuxC.push(criterio);
            
            if(criterio == 'Y Que Contenga'){
                if(this.completoYQueContengaC != 3){
                    this.completoYQueContengaC ++;
                }
            }else if(criterio == 'O Que Contenga'){
                if(this.completoOQueContengaC != 3){
                    this.completoOQueContengaC ++;
                }
            }else if(criterio == 'Que Excluya'){
                if(this.completoQueExcluyaC != 3){
                    this.completoQueExcluyaC ++;
                }
            }   
        }else{
            const criterioRemove = this.criterioAuxC.pop();
            
            if(criterioRemove == 'Y Que Contenga'){
                if(this.completoYQueContengaC > 0){
                    this.completoYQueContengaC --;
                }
            }else if(criterioRemove == 'O Que Contenga'){
                if(this.completoOQueContengaC > 0){
                    this.completoOQueContengaC --;
                }
            }else if(criterioRemove == 'Que Excluya'){
                if(this.completoQueExcluyaC > 0){
                    this.completoQueExcluyaC --;
                }
            }   
        }
        
        /* console.log('this.criterioAuxC', this.criterioAuxC); */
        
        /* console.log('completoYQueContengaC', this.completoYQueContengaC);
        console.log('completoOQueContengaC', this.completoOQueContengaC);
        console.log('completoQueExcluyaC', this.completoQueExcluyaC); */
        
        if(this.completoYQueContengaC == 3){
            this.criteriosC = this.criteriosC.filter(crit=> crit.texto !== 'Y Que Contenga')
        }else{
            const existCriterio = this.criteriosC.find(crit=> crit.texto == 'Y Que Contenga');
            if(!existCriterio){
                this.criteriosC.push({id:1, texto:'Y Que Contenga'})
            }
        }
        
        if(this.completoOQueContengaC == 3){
            this.criteriosC = this.criteriosC.filter(crit=> crit.texto !== 'O Que Contenga')
        }else{
            const existCriterio = this.criteriosC.find(crit=> crit.texto == 'O Que Contenga');
            if(!existCriterio){
                this.criteriosC.push({id:2, texto:'O Que Contenga'})
            }
        }
        
        if(this.completoQueExcluyaC == 3){
            this.criteriosC = this.criteriosC.filter(crit=> crit.texto !== 'Que Excluya')
        }else{
            const existCriterio = this.criteriosC.find(crit=> crit.texto == 'Que Excluya');
            if(!existCriterio){
                this.criteriosC.push({id:3, texto:'Que Excluya'})
            }
        }
        /* console.log('this.criteriosC', this.criteriosC); */  
    }

    validarCriteriosAceptadosD(criterio:string, action:string){
        if(action == 'more'){
            this.criterioAuxD.push(criterio);
            
            if(criterio == 'Y Que Contenga'){
                if(this.completoYQueContengaD != 3){
                    this.completoYQueContengaD ++;
                }
            }else if(criterio == 'O Que Contenga'){
                if(this.completoOQueContengaD != 3){
                    this.completoOQueContengaD ++;
                }
            }else if(criterio == 'Que Excluya'){
                if(this.completoQueExcluyaD != 3){
                    this.completoQueExcluyaD ++;
                }
            }   
        }else{
            const criterioRemove = this.criterioAuxD.pop();
            
            if(criterioRemove == 'Y Que Contenga'){
                if(this.completoYQueContengaD > 0){
                    this.completoYQueContengaD --;
                }
            }else if(criterioRemove == 'O Que Contenga'){
                if(this.completoOQueContengaD > 0){
                    this.completoOQueContengaD --;
                }
            }else if(criterioRemove == 'Que Excluya'){
                if(this.completoQueExcluyaD > 0){
                    this.completoQueExcluyaD --;
                }
            }   
        }
        
        /* console.log('this.criterioAuxD', this.criterioAuxD); */
        
        /* console.log('completoYQueContengaD', this.completoYQueContengaD);
        console.log('completoOQueContengaD', this.completoOQueContengaD);
        console.log('completoQueExcluyaD', this.completoQueExcluyaD); */
        
        if(this.completoYQueContengaD == 3){
            this.criteriosD = this.criteriosD.filter(crit=> crit.texto !== 'Y Que Contenga')
        }else{
            const existCriterio = this.criteriosD.find(crit=> crit.texto == 'Y Que Contenga');
            if(!existCriterio){
                this.criteriosD.push({id:1, texto:'Y Que Contenga'})
            }
        }
        
        if(this.completoOQueContengaD == 3){
            this.criteriosD = this.criteriosD.filter(crit=> crit.texto !== 'O Que Contenga')
        }else{
            const existCriterio = this.criteriosD.find(crit=> crit.texto == 'O Que Contenga');
            if(!existCriterio){
                this.criteriosD.push({id:2, texto:'O Que Contenga'})
            }
        }
        
        if(this.completoQueExcluyaD == 3){
            this.criteriosD = this.criteriosD.filter(crit=> crit.texto !== 'Que Excluya')
        }else{
            const existCriterio = this.criteriosD.find(crit=> crit.texto == 'Que Excluya');
            if(!existCriterio){
                this.criteriosD.push({id:3, texto:'Que Excluya'})
            }
        }
        /* console.log('this.criteriosD', this.criteriosD); */  
    }

    validarCriteriosAceptadosJR(criterio:string, action:string){
        if(action == 'more'){
            this.criterioAuxJR.push(criterio);
            
            if(criterio == 'Y Que Contenga'){
                if(this.completoYQueContengaJR != 3){
                    this.completoYQueContengaJR ++;
                }
            }else if(criterio == 'O Que Contenga'){
                if(this.completoOQueContengaJR != 3){
                    this.completoOQueContengaJR ++;
                }
            }else if(criterio == 'Que Excluya'){
                if(this.completoQueExcluyaJR != 3){
                    this.completoQueExcluyaJR ++;
                }
            }   
        }else{
            const criterioRemove = this.criterioAuxJR.pop();
            
            if(criterioRemove == 'Y Que Contenga'){
                if(this.completoYQueContengaJR > 0){
                    this.completoYQueContengaJR --;
                }
            }else if(criterioRemove == 'O Que Contenga'){
                if(this.completoOQueContengaJR > 0){
                    this.completoOQueContengaJR --;
                }
            }else if(criterioRemove == 'Que Excluya'){
                if(this.completoQueExcluyaJR > 0){
                    this.completoQueExcluyaJR --;
                }
            }   
        }
        
        /* console.log('this.criterioAuxJR', this.criterioAuxJR); */
        
        /* console.log('completoYQueContengaJR', this.completoYQueContengaJR);
        console.log('completoOQueContengaJR', this.completoOQueContengaJR);
        console.log('completoQueExcluyaJR', this.completoQueExcluyaJR); */
        
        if(this.completoYQueContengaJR == 3){
            this.criteriosJR = this.criteriosJR.filter(crit=> crit.texto !== 'Y Que Contenga')
        }else{
            const existCriterio = this.criteriosJR.find(crit=> crit.texto == 'Y Que Contenga');
            if(!existCriterio){
                this.criteriosJR.push({id:1, texto:'Y Que Contenga'})
            }
        }
        
        if(this.completoOQueContengaJR == 3){
            this.criteriosJR = this.criteriosJR.filter(crit=> crit.texto !== 'O Que Contenga')
        }else{
            const existCriterio = this.criteriosJR.find(crit=> crit.texto == 'O Que Contenga');
            if(!existCriterio){
                this.criteriosJR.push({id:2, texto:'O Que Contenga'})
            }
        }
        
        if(this.completoQueExcluyaJR == 3){
            this.criteriosJR = this.criteriosJR.filter(crit=> crit.texto !== 'Que Excluya')
        }else{
            const existCriterio = this.criteriosJR.find(crit=> crit.texto == 'Que Excluya');
            if(!existCriterio){
                this.criteriosJR.push({id:3, texto:'Que Excluya'})
            }
        }
        /* console.log('this.criteriosJR', this.criteriosJR); */  
    }

    validarCriteriosAceptadosPR(criterio:string, action:string){
        if(action == 'more'){
            this.criterioAuxPR.push(criterio);
            
            if(criterio == 'Y Que Contenga'){
                if(this.completoYQueContengaPR != 3){
                    this.completoYQueContengaPR ++;
                }
            }else if(criterio == 'O Que Contenga'){
                if(this.completoOQueContengaPR != 3){
                    this.completoOQueContengaPR ++;
                }
            }else if(criterio == 'Que Excluya'){
                if(this.completoQueExcluyaPR != 3){
                    this.completoQueExcluyaPR ++;
                }
            }   
        }else{
            const criterioRemove = this.criterioAuxPR.pop();
            
            if(criterioRemove == 'Y Que Contenga'){
                if(this.completoYQueContengaPR > 0){
                    this.completoYQueContengaPR --;
                }
            }else if(criterioRemove == 'O Que Contenga'){
                if(this.completoOQueContengaPR > 0){
                    this.completoOQueContengaPR --;
                }
            }else if(criterioRemove == 'Que Excluya'){
                if(this.completoQueExcluyaPR > 0){
                    this.completoQueExcluyaPR --;
                }
            }   
        }
        
        /* console.log('this.criterioAuxPR', this.criterioAuxPR); */
        
        /* console.log('completoYQueContengaPR', this.completoYQueContengaPR);
        console.log('completoOQueContengaPR', this.completoOQueContengaPR);
        console.log('completoQueExcluyaPR', this.completoQueExcluyaPR); */
        
        if(this.completoYQueContengaPR == 3){
            this.criteriosPR = this.criteriosPR.filter(crit=> crit.texto !== 'Y Que Contenga')
        }else{
            const existCriterio = this.criteriosPR.find(crit=> crit.texto == 'Y Que Contenga');
            if(!existCriterio){
                this.criteriosPR.push({id:1, texto:'Y Que Contenga'})
            }
        }
        
        if(this.completoOQueContengaPR == 3){
            this.criteriosPR = this.criteriosPR.filter(crit=> crit.texto !== 'O Que Contenga')
        }else{
            const existCriterio = this.criteriosPR.find(crit=> crit.texto == 'O Que Contenga');
            if(!existCriterio){
                this.criteriosPR.push({id:2, texto:'O Que Contenga'})
            }
        }
        
        if(this.completoQueExcluyaPR == 3){
            this.criteriosPR = this.criteriosPR.filter(crit=> crit.texto !== 'Que Excluya')
        }else{
            const existCriterio = this.criteriosPR.find(crit=> crit.texto == 'Que Excluya');
            if(!existCriterio){
                this.criteriosPR.push({id:3, texto:'Que Excluya'})
            }
        }
        /* console.log('this.criteriosPR', this.criteriosPR); */  
    }

    filterFuenteFormal(event:any, type:any){

        this.tipoFuentesFormales = this.tipoFuentesFormalesTemp;
        
        if(type == 'numero' || this.numeroFuenteFormal){
            if(type == 'numero' && event.target.value){
                this.numeroFuenteFormal = 'num. ' + event.target.value; 
            }else if(type == 'numero' && !event.target.value){
                this.numeroFuenteFormal = ''; 
            }

            if(this.numeroFuenteFormal){
                this.tipoFuentesFormales = this.tipoFuentesFormales.filter((fuente:any) => fuente.value.toLowerCase().includes(this.numeroFuenteFormal));
            }
        }
        if(type == 'anio' || this.anioFuenteFormal){
            if(type == 'anio' && event.target.value){
                this.anioFuenteFormal = 'de ' + event.target.value; 
            }else if(type == 'anio' && !event.target.value){
                this.anioFuenteFormal = ''; 
            }

            if(this.anioFuenteFormal){
                this.tipoFuentesFormales = this.tipoFuentesFormales.filter((fuente:any) => fuente.value.toLowerCase().includes(this.anioFuenteFormal));
            }
        }
        if(type == 'articulo' || this.articuloFuenteFormal){
            if(type == 'articulo' && event.target.value){
                this.articuloFuenteFormal = 'art. ' + event.target.value; 
            }else if(type == 'articulo' && !event.target.value){
                this.articuloFuenteFormal = ''; 
            }

            if(this.articuloFuenteFormal){
                this.tipoFuentesFormales = this.tipoFuentesFormales.filter((fuente:any) => fuente.value.toLowerCase().includes(this.articuloFuenteFormal));
            }
        }
        if(type == 'inciso' || this.incisoFuenteFormal){
            if(type == 'inciso' && event.target.value){
                this.incisoFuenteFormal = 'inc. ' + event.target.value; 
            }else if(type == 'inciso' && !event.target.value){
                this.incisoFuenteFormal = ''; 
            }

            if(this.incisoFuenteFormal){
                this.tipoFuentesFormales = this.tipoFuentesFormales.filter((fuente:any) => fuente.value.toLowerCase().includes(this.incisoFuenteFormal));
            }
        }
        if(type == 'literal' || this.literalFuenteFormal){
            if(type == 'literal' && event.target.value){
                this.literalFuenteFormal = 'lit. ' + event.target.value; 
            }else if(type == 'literal' && !event.target.value){
                this.literalFuenteFormal = ''; 
            }

            if(this.literalFuenteFormal){
                this.tipoFuentesFormales = this.tipoFuentesFormales.filter((fuente:any) => fuente.value.toLowerCase().includes(this.literalFuenteFormal));
            }
        }
        if(type == 'numeral' || this.numeralFuenteFormal){
            if(type == 'numeral' && event.target.value){
                this.numeralFuenteFormal = 'numeral ' + event.target.value; 
            }else if(type == 'numeral' && !event.target.value){
                this.numeralFuenteFormal = ''; 
            }

            if(this.numeralFuenteFormal){
                this.tipoFuentesFormales = this.tipoFuentesFormales.filter((fuente:any) => fuente.value.toLowerCase().includes(this.numeralFuenteFormal));
            }
        }
        if(type == 'paragrafo' || this.paragrafoFuenteFormal){
            if(type == 'paragrafo' && event.target.value){
                this.paragrafoFuenteFormal = 'par. ' + event.target.value; 
            }else if(type == 'paragrafo' && !event.target.value){
                this.paragrafoFuenteFormal = ''; 
            }

            if(this.paragrafoFuenteFormal){
                this.tipoFuentesFormales = this.tipoFuentesFormales.filter((fuente:any) => fuente.value.toLowerCase().includes(this.paragrafoFuenteFormal));
            }
        }
        if(type == 'parrafo' || this.parrafoFuenteFormal){
            if(type == 'parrafo' && event.target.value){
                this.parrafoFuenteFormal = 'parr. ' + event.target.value; 
            }else if(type == 'parrafo' && !event.target.value){
                this.parrafoFuenteFormal = ''; 
            }

            if(this.parrafoFuenteFormal){
                this.tipoFuentesFormales = this.tipoFuentesFormales.filter((fuente:any) => fuente.value.toLowerCase().includes(this.parrafoFuenteFormal));
            }
        } 
    }

    transformUrlDasboard() { 
        return this.sanitized.bypassSecurityTrustUrl(this.domainDashboard);
    }

    transformUrlLogAudit(){
        return this.sanitized.bypassSecurityTrustUrl(this.domainLogAudit);
    }

    validText(text: string){
        let count = 0;
        for (let i = 0; i < text.length; i++) {
            if(text[i] == '"'){
                count = count + 1;
            }
        }
        if(count > 2){
           this.flagTextoValido = true;
        }else{
            this.flagTextoValido = false;
        }

        console.log(this.flagTextoValido);
    }
}

