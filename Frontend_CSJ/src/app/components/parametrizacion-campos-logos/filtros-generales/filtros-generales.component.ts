import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ElasticService } from 'src/services/elastic.service';
import { NgxSpinnerService } from "ngx-spinner";
import { DOCUMENT } from '@angular/common';
import { FilterModel } from 'src/app/models/filter-model';
import { IfStmt } from '@angular/compiler';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-filtros-generales',
  templateUrl: './filtros-generales.component.html',
  styleUrls: ['./filtros-generales.component.css']
})
export class FiltrosGeneralesComponent implements OnInit {

  public generalForm: FormGroup;
  resultConsult:any;
  chckSeccion: String;
  dropdownSettings: any = {};
  dropdownSettingsTribunales: any = {};
  dropdownSettingsBiblioteca: any = {};
  dropdownSettingsInfoHolocausto: any = {};
  dropdownSettingsInfoVideoteca: any = {};
  dropdownSettingsInfo: any = {};
  dropdownSettingsActos: any = {};
  altasCortes: Array<any> = [];
  tribunales: Array<any> = [];
  biblioteca: Array<any> = [];
  logos: Array<any> = [];
  tipoInformacionHolocausto: Array<any> = [];
  tipoInformacionVideoteca: Array<any> = [];
  tipoInformacionActosAdmin: Array<any> = [];
  tipoInformacionHV: Array<any> = [];
  tipoInformacionVA: Array<any> = [];
  tipoInformacionHA: Array<any> = [];
  tipoInformacion: Array<any> = [];
  auxNoDataFilterText: any = "La b?squeda no trajo resultados.";
  auxOrigen: any = [];
  auxSubOrigenID: any;
  auxTribunales: any = [];
  auxActosAdmin: any = [];
  flagActos_1: boolean = false;
  flagActos_2: boolean = false;
  flagActos_3: boolean = false;
  flagActos_4: boolean = false;
  flagActos_5: boolean = false;
  flagActos_6: boolean = false;
  flagTribunales_1: boolean = false;
  flagTribunales_2: boolean = false;
  flagTribunales_3: boolean = false;
  flagHolocausto: boolean = false;
  flagVideoteca: boolean = false;
  flagAdmin: boolean = false;
  public sub_origen: number[] = [];

  toolTipLength: number = 0;
  toolTipInput: string = "";
  errorInput: boolean = false;
  
  flagModalEditar: boolean = false;
  public verticalMenu: boolean= false;
  showTable: boolean = false;

  showFilterAdvancedFlag: boolean = true;
  paramToolTips:Array<any> = [];

  historicoCantidad:any = 0;
  historicoRegistrosPagina:any = 10;
  historicoPaginaTotal = 0;
  historicoPaginaActual = 1;

  historicoPaginaConteo = 0;
  historicoPaginaArray:Array<any> = [];
  registrosPorPaginaHistoricoSelect:number = 0;
  textoBusquedaOrderAsc:boolean;
  textoBusquedaOrderLabel: String="Asc";
  fechaOrder:boolean;
  fechaLabel:String="Asc";
  textobusqueda: string="";
  currentPage: number = 0;
 
  nameSearch: string="";

  internalId:string="";




  constructor(private appComponent: AppComponent,
    private elasticService: ElasticService,
    public formBuilder: FormBuilder,
    private spinner: NgxSpinnerService) { }
    


  ngOnInit(): void {
    this.generalForm = this.formBuilder.group({ 
      registrosPorPaginaHistoricoSelect:this.historicoRegistrosPagina,

      nameSearch:'',
      toolTipInput:'',
      chckSeccion: [''],
      chkSoloGacetas: [false],
      ddlAltasCortes: [''],
      ddlBiblioteca: [''], 
      ddlFuenteInformacion: [''],
      sub_origen_id_1: 6,
      sub_origen_id_2: '',
      sub_origen_id_3: '', 
      sub_origen_id_4: '', 
      sub_origen_id_5: '',
      sub_origen_id_6: '', 
      sub_origen_id_7: '', 
      sub_origen_id_8: '', 
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
      sub_origen_id_21: '',
      selectedItems: [[{ id: 6, texto: "Corte Suprema de Justicia" }]],
      selectedItemsBiblioteca: [],
      selectedItemsTribunales: [],
      selectedItemsInfoHolocausto: [],
      selectedItemsInfoVideoteca: [],
      selectedItemsTipoGaceta: [],
      selectedItemsSeccion: [],
      selectedItemsInfo: [],
      selectedItemsActos: [],
      })
    
      this.tribunales = [
        { id: 1, texto: "Tribunales Superiores" },
        { id: 2, texto: "Tribunales Administrativos" },
        { id: 3, texto: "Restitución de Tierras" },
      ]
    
      this.altasCortes = [
        { id: 6, texto: "Corte Suprema de Justicia" },
        { id: 8, texto: "Consejo de Estado" },
        { id: 7, texto: "Corte Constitucional" },
        { id: 9, texto: "Comisión Nacional de Disciplina Judicial" },
        { id: 10, texto: "Sala Disciplinaria (1992 - 2020)" },
      ]
    
      this.biblioteca = [
        { id: 17, texto: "Normativa", titulo: "" },
        { id: 15, texto: "Libros y medios audiovisuales", titulo: "" },
        { id: 16, texto: "Revistas", titulo: "" },
        { id: 3, texto: "Holocausto", titulo: "Consulte aqu? informaci?n relacionada con los hechos del Palacio de Justicia" },
        { id: 4, texto: "Videoteca", titulo: "Consulte material audiovisual de la Rama Judicial" },
        { id: 40, texto: "Actos Administrativos", titulo: "Consulte acuerdos, circulares, resoluciones y gaceta, expedidos por el Consejo Superior de la Judicatura" },
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
        { id: 26, texto: "Audiencias P?blicas" },
        { id: 29, texto: "Audios" },
        { id: 27, texto: "Fotografías" },
        { id: 28, texto: "Publicaciones" },
        { id: 25, texto: "Videoconferencias" },
        { id: 24, texto: "Videos" },
      ]
    
      this.tipoInformacionActosAdmin = [
        { id: 1, texto: "Acuerdo" },
        { id: 2, texto: "Circular" },
        { id: 3, texto: "Resolución de Sala" },
        { id: 4, texto: "Resolución de Presidencia" },
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
    
      this.tipoInformacionActosAdmin = [
        { id: 1, texto: "Acuerdo" },
        { id: 2, texto: "Circular" },
        { id: 3, texto: "Resolución de Sala" },
        { id: 4, texto: "Resolución de Presidencia" },
        { id: 5, texto: "Gacetas" },
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
        { id: 27, texto: "Fotograf?as" },
        { id: 28, texto: "Publicaciones" },
        { id: 25, texto: "Videoconferencias" },
        { id: 24, texto: "Videos" },
        { id: 40, texto: "Acuerdo" },
        { id: 41, texto: "Circular" },
        { id: 42, texto: "Resolución de Sala" },
        { id: 43, texto: "Resolución de Presidencia" },
        { id: 44, texto: "Gacetas" },
      ]
    
      this.dropdownSettings = {
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
    
      /** Configuracion Select Actos Admin */
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
    
      this.getParamToolTips(this.historicoRegistrosPagina , this.historicoPaginaActual);
      this.alimentarPaginaArray();


  }

  public changeComponent(newComponent:string):void{
    this.verticalMenu = false;
    this.appComponent.chageComponent(newComponent);
  }

  modalEditar(toolTipInputDefault:string = "", internal_id:string = ""): void{

    this.internalId = internal_id;
    
    this.flagModalEditar = !this.flagModalEditar;
    this.generalForm.get('toolTipInput').setValue(toolTipInputDefault);
    //this.form.controls['dept'].setValue(selected.id);

    this.toolTipLength = this.generalForm.get('toolTipInput')?.value.length;
    
  }

  toggleShowTable(): void {
    this.showTable = !this.showTable;
}

public cargarLogos(logos:any) {
  this.elasticService.getLogos(logos).subscribe(
    (respuesta: any) => {
      this.logos = respuesta.results;
    }
  )
}

public dropdownMultiSettings = {
  "selectAllText": "Seleccionar todo",
  "unSelectAllText": "Deseleccionar todo",
}

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
}

onItemDeSelect(item: any) {
  if (item.id == 6) {
    this.auxSubOrigenID = ''
    this.generalForm.patchValue({
      sub_origen_id_1: '',
      extra_origen_id: [''],
      chkSoloGacetas: false
    })
  }
  if (item.id == 8) {
    this.auxSubOrigenID = item.id;
    this.generalForm.patchValue({
      sub_origen_id_2: ''
    })
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
}

onSelectAll(items: any) {
  this.generalForm.patchValue({
    sub_origen_id_1: 6,
    sub_origen_id_2: 8,
    sub_origen_id_3: 7,
    sub_origen_id_4: 9,
    sub_origen_id_5: 10,
  })
}

public onDeSelectAll() {
  this.generalForm.get("selectedItems").valueChanges.subscribe((origen: any) => {
    if (this.generalForm.get('selectedItems')?.value.length == 0) {
      this.generalForm.patchValue({
        sub_origen_id_1: '',
        sub_origen_id_2: '',
        sub_origen_id_3: '',
        sub_origen_id_4: '',
        sub_origen_id_5: ''
      })

      this.generalForm.patchValue({
        extra_origen_id: [],
        chkSoloGacetas: false
      })
    }
  })
  this.generalForm.get("selectedItemsCSJ").valueChanges.subscribe((origen: any) => {
    if (this.generalForm.get('selectedItemsCSJ')?.value.length == 0) {
      this.generalForm.patchValue({
        sub_origen_id_1: '',
        sub_origen_id_2: '',
        sub_origen_id_3: '',
        sub_origen_id_4: '',
        sub_origen_id_5: ''
      })
    }
  })
}

onItemSelectTribunales(item: any) {
  if (item.id == 1) {
    this.flagTribunales_1 = true
    this.auxTribunales.push(item.texto)
    this.generalForm.patchValue({
      ddTribunales: this.auxTribunales
    })
  }
  if (item.id == 2) {
    this.flagTribunales_2 = true
    this.auxTribunales.push(item.texto)
    this.generalForm.patchValue({
      ddTribunales: this.auxTribunales
    })
  }
  if (item.id == 3) {
    this.flagTribunales_3 = true
    this.auxTribunales.push(item.texto)
    this.generalForm.patchValue({
      ddTribunales: this.auxTribunales
    })
  }
}

onItemDeSelectTribunales(item: any) {
  if (item.id == 1) {
    this.flagTribunales_1 = false
    this.auxTribunales = this.auxTribunales.filter((id: any) => id != 1);
    this.generalForm.patchValue({
      ddTribunales: this.auxTribunales
    })
  }
  if (item.id == 2) {
    this.flagTribunales_2 = false
    this.auxTribunales = this.auxTribunales.filter((id: any) => id != 2);
    this.generalForm.patchValue({
      ddTribunales: this.auxTribunales
    })
  }
  if (item.id == 3) {
    this.flagTribunales_3 = false
    this.auxTribunales = this.auxTribunales.filter((id: any) => id != 3);
    this.generalForm.patchValue({
      ddTribunales: this.auxTribunales
    })
  }
} 
onSelectAllTribunales(items: any) {
  this.flagTribunales_1 = true
  this.flagTribunales_2 = true
  this.flagTribunales_3 = true
  for (const iterator of items) {
    this.auxTribunales.push(iterator.texto)
  }
  this.generalForm.patchValue({
    ddTribunales: this.auxTribunales
  })
}
public onDeSelectAllTribunales() { 
  this.flagTribunales_1 = false
  this.flagTribunales_2 = false
  this.flagTribunales_3 = false
  this.generalForm.get("selectedItemsTribunales").valueChanges.subscribe((origen: any) => {
    if (this.generalForm.get('selectedItemsTribunales')?.value.length == 0) {
      this.auxTribunales = [];
      this.generalForm.patchValue({
        ddTribunales: this.auxTribunales
      })
    }
  })
}

onItemSelectBiblioteca(item: any) {
  if (item.id == 17) {
    this.auxSubOrigenID = item.id;
    this.generalForm.patchValue({
      sub_origen_id_6: this.auxSubOrigenID
    })
  }
  if (item.id == 15) {
    this.auxSubOrigenID = item.id;
    this.generalForm.patchValue({
      sub_origen_id_7: this.auxSubOrigenID
    })
  }
  if (item.id == 16) {
    this.auxSubOrigenID = item.id;
    this.generalForm.patchValue({
      sub_origen_id_8: this.auxSubOrigenID
    })
  }
  if (item.id == 3) {
    this.flagHolocausto = true;
    this.auxOrigen.push(1)
    this.auxOrigen.push(3)
    this.generalForm.patchValue({
      origen: this.auxOrigen
    })

  }
  if (item.id == 3) {
    this.flagHolocausto = true;
    this.auxOrigen.push(3)
    this.generalForm.patchValue({
      origen: this.auxOrigen
    })

  }
  if (item.id == 4) {
    this.flagVideoteca = true;
    this.auxOrigen.push(1)
    this.auxOrigen.push(4)
    this.generalForm.patchValue({
      origen: this.auxOrigen
    })
  }
  if (item.id == 4) {
    this.flagVideoteca = true;
    this.auxOrigen.push(4)
    this.generalForm.patchValue({
      origen: this.auxOrigen
    })
  }
  if (item.id == 40) {
    this.auxSubOrigenID = item.id;
    this.generalForm.patchValue({
      sub_origen_id_21: this.auxSubOrigenID
    })
  }
  //this.cargarTemaTres();
}

onItemDeSelectBiblioteca(item: any) {
  if (item.id == 17) {
    this.auxSubOrigenID = item.id;
    this.generalForm.patchValue({
      sub_origen_id_6: ''
    })
  }
  if (item.id == 15) {
    this.auxSubOrigenID = item.id;
    this.generalForm.patchValue({
      sub_origen_id_7: ''
    })
  }
  if (item.id == 16) {
    this.auxSubOrigenID = item.id;
    this.generalForm.patchValue({
      sub_origen_id_8: ''
    })
  }
  if (item.id == 3) {
    this.flagHolocausto = false;
    // this.auxOrigen.pop()
    this.auxOrigen = this.auxOrigen.filter((id: any) => id != 3);
    this.generalForm.patchValue({
      origen: this.auxOrigen
    })

  }
  if (item.id == 4) {
    this.flagVideoteca = false;
    this.auxOrigen = this.auxOrigen.filter((id: any) => id != 4);
    this.generalForm.patchValue({
      origen: this.auxOrigen
    })
  }
  if (item.id == 40) {
    this.auxSubOrigenID = item.id;
    this.generalForm.patchValue({
      sub_origen_id_21: ''
    })
  }
  //this.cargarTemaTres();
}

onSelectAllBiblioteca(items: any) {
  this.auxOrigen.push(1)
  this.auxOrigen.push(3)
  this.auxOrigen.push(4)
  this.generalForm.patchValue({
    sub_origen_id_6: 17,
    sub_origen_id_7: 15,
    sub_origen_id_8: 16,
    sub_origen_id_9: 18,
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
    sub_origen_id_21: 40,
    origen: this.auxOrigen
  })
  //this.cargarTemaTres();
}

public onDeSelectAllBiblioteca() {

  this.generalForm.get("selectedItemsBiblioteca").valueChanges.subscribe((origen: any) => {
    if (this.generalForm.get('selectedItemsBiblioteca')?.value.length == 0) {
      this.auxOrigen = this.auxOrigen.filter((id: any) => id != 4);
      this.auxOrigen = this.auxOrigen.filter((id: any) => id != 3);
      this.generalForm.patchValue({
        sub_origen_id_6: '',
        sub_origen_id_7: '',
        sub_origen_id_8: '',
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
        sub_origen_id_21: '',
        origen: this.auxOrigen,
      })
    }
  })
  //this.cargarTemaTres();
}

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

onItemSelectActos(item: any) { 
  if (item.id == 1) {
    this.flagActos_1 = true;
    this.auxActosAdmin.push(item.texto)
    this.generalForm.patchValue({
      ddTipoActos: this.auxActosAdmin
    })
  }
  if (item.id == 2) {
    this.flagActos_2 = true;
    this.auxActosAdmin.push(item.texto)
    this.generalForm.patchValue({
      ddTipoActos: this.auxActosAdmin
    })
  }
  if (item.id == 3) {
    this.flagActos_3 = true;
    this.auxActosAdmin.push(item.texto)
    this.generalForm.patchValue({
      ddTipoActos: this.auxActosAdmin
    })
  }
  if (item.id == 4) {
    this.flagActos_4 = true;
    this.auxActosAdmin.push(item.texto)
    this.generalForm.patchValue({
      ddTipoActos: this.auxActosAdmin
    })
  }
  if (item.id == 5) {
    this.flagActos_5 = true;
    this.auxActosAdmin.push(item.texto)
    this.generalForm.patchValue({
      ddTipoActos: this.auxActosAdmin
    })
  }
}

onItemDeSelectActos(item: any) {
  if (item.id == 1) {
    this.flagActos_1 = false;
    this.auxActosAdmin = this.auxActosAdmin.filter((id: any) => id != 1);
    this.generalForm.patchValue({
      ddTipoActos: this.auxActosAdmin
    })
  }
  if (item.id == 2) {
    this.flagActos_2 = false;
    this.auxActosAdmin = this.auxActosAdmin.filter((id: any) => id != 2);
    this.generalForm.patchValue({
      ddTipoActos: this.auxActosAdmin
    })
  }
  if (item.id == 3) {
    this.flagActos_3 = false;
    this.auxActosAdmin = this.auxActosAdmin.filter((id: any) => id != 3);
    this.generalForm.patchValue({
      ddTipoActos: this.auxActosAdmin
    })
  }
  if (item.id == 4) {
    this.flagActos_4 = false;
    this.auxActosAdmin = this.auxActosAdmin.filter((id: any) => id != 4);
    this.generalForm.patchValue({
      ddTipoActos: this.auxActosAdmin
    })
  }
  if (item.id == 5) {
    this.flagActos_5 = false;
    this.auxActosAdmin = this.auxActosAdmin.filter((id: any) => id != 5);
    this.generalForm.patchValue({
      ddTipoActos: this.auxActosAdmin
    })
  }
} 
onSelectAllActos(items: any) {
  this.flagActos_6 = true;
  for (const iterator of items) {
    this.auxActosAdmin.push(iterator.texto)
  }
  this.generalForm.patchValue({
    ddTipoActos: this.auxActosAdmin
  })
}
public onDeSelectAllActos() {
  this.flagActos_6 = false;
  this.generalForm.get("selectedItemsActos").valueChanges.subscribe((origen: any) => {
    if (this.generalForm.get('selectedItemsActos')?.value.length == 0) {
      this.auxActosAdmin = [];
      this.generalForm.patchValue({
        ddTipoActos: this.auxActosAdmin
      })
    }
  })
}

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

}

public onDeSelectAllHolocausto() {

this.generalForm.get("selectedItemsInfoHolocausto").valueChanges.subscribe((origen: any) => {
  if (this.generalForm.get('selectedItemsInfoHolocausto')?.value.length == 0) {
    this.generalForm.patchValue({
      sub_origen_id_9: '',
      sub_origen_id_10: '',
      sub_origen_id_11: '',
      sub_origen_id_12: '',
      sub_origen_id_13: '',
      sub_origen_id_14: '',
    })
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
    }
  })
}
/** Fin Eventos MultiSelect Videoteca */

calculateToolTipLength(){ 
  this.toolTipLength = this.generalForm.get('toolTipInput')?.value.length;
  if(this.toolTipLength > 200){
    this.errorInput =  true;
  }
}

validateToolTipLength(){
  this.errorInput =  false;
  this.calculateToolTipLength();
}

showFilterAvanced(){
  this.showFilterAdvancedFlag = !this.showFilterAdvancedFlag;
}

alimentarPaginaArray(){
  this.historicoPaginaConteo = 0;
  this.historicoPaginaArray = [];
  while (this.historicoPaginaConteo < this.historicoPaginaTotal)  {      
    this.historicoPaginaConteo++;
    this.historicoPaginaArray.push(this.historicoPaginaConteo); 
    
  }
  this.historicoPaginaConteo = Math.ceil(this.historicoPaginaConteo);
}

public getParamToolTips(cantidadPorPagina:number , historicoPaginaActual:number) {
  var auxToken = sessionStorage.getItem('token');
  var nameSearchTmp = this.generalForm.get('nameSearch')?.value;
  var tipoFiltro = "g";
  this.elasticService.getParamLogos(auxToken , this.historicoRegistrosPagina , this.historicoPaginaActual , nameSearchTmp , tipoFiltro).subscribe(
      (respuesta: any) => {
          this.resultConsult = respuesta;
          this.historicoCantidad  = respuesta.total_records;
          this.historicoPaginaTotal  = (respuesta.total_records / this.historicoRegistrosPagina);
          this.historicoPaginaTotal  = Math.ceil(this.historicoPaginaTotal );
          this.alimentarPaginaArray();
          this.paramToolTips = respuesta.results.sort((a:any, b:any) => (a.campo < b.campo) ? -1 : 1);
          this.currentPage = historicoPaginaActual;
      }
  )
}

changePaginadoFiltroGeneralBusqueda(pagina:number=1){
  this.historicoPaginaActual = pagina;
  this.historicoRegistrosPagina = this.generalForm.get('registrosPorPaginaHistoricoSelect')?.value;
  if(pagina <= this.historicoPaginaTotal && pagina > 0 ){
    this.getParamToolTips(this.historicoRegistrosPagina , this.historicoPaginaActual);
  }
}


searchFiltroGeneralBusqueda(){
  this.historicoPaginaActual = 1;
  this.historicoRegistrosPagina = this.generalForm.get('registrosPorPaginaHistoricoSelect')?.value;
  this.getParamToolTips(this.historicoRegistrosPagina , this.historicoPaginaActual);
}

updateDataByIdInternalId(){
  if(this.internalId != ""){
    var auxToken = sessionStorage.getItem('token');
    var toolTipInput = this.generalForm.get('toolTipInput')?.value;

    //let jsonString = '{ "tooltip": "' + toolTipInput +'"}';
    let jsonString = '{ "tooltip": "' + toolTipInput +'" ,  "internal_id": "' + this.internalId +'"}';


    let json = JSON.parse(jsonString) ;

    this.elasticService.putParamLogos(auxToken, this.internalId, json).subscribe(
      (respuesta: any) => {
        this.flagModalEditar = false;
        this.changePaginadoFiltroGeneralBusqueda(this.historicoPaginaActual);
      });

  }

}

}
