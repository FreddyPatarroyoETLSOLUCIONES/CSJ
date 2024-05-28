import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import {FilterModel} from 'src/app/models/filter-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private appComponent: AppComponent, private formBuilder: FormBuilder) { }

  public modal_filter:boolean = false;
  public selection:string = "";
  public checkPonente:boolean = false;
  public checkFecha:boolean = false;
  public checkProvidencia:boolean = false;
  public checkFuenteFormal:boolean = false;
  public checkClaseActuacion:boolean = false;
  public checkDelitos:boolean = false;
  public checkProcedencia:boolean = false;
  public checkCategoriaGenero:boolean = false;
  public checkDecision:boolean = false;
  public checkSala:boolean = false;
  public checkMagistradoSalvamento:boolean = false;
  public checkTipoSala:boolean = false;
 
  public filter:FilterModel = new FilterModel();
  public querySearch:any = {};
  public findResult:any = {};

  public filterForm: FormGroup;
 
  public selectionFilters:any = {
    ponentes:[],
    start_date:"",
    end_date:"",
    tiposProvidencias:[],
    fuentesFormales:[],
    claseActuaciones:[],
    delitos:[],
    procedencias:[],
    categoriasGenero:[],
    decisiones:[],
    salas:[],
    magistradosSalvamento:[],
    tiposSalas:[]
  };

  ngOnInit(): void {
    this.filter = this.appComponent.filter;
    this.querySearch = this.appComponent.querySearch;
    this.findResult = this.appComponent.findResult;
  
    this.filterForm = this.formBuilder.group({
      ponente: [],
      fecha:[],
      tiposProvidencia:[],
      fuenteFormal:[],
      claseActuacion:[],
      delito:[],
      procedencia:[],
      categoriaGenero:[],
      sala:[],
      decision:[],
      magistradoSalvamento:[],
      tipoSala:[]
    });

    this.selectionFilters.ponentes = this.querySearch?.params?.ponente ? this.querySearch?.params?.ponente : [];
    this.selectionFilters.start_date = this.querySearch?.params?.start_date ? this.querySearch?.params?.start_date : "";
    this.selectionFilters.end_date = this.querySearch?.params?.end_date ? this.querySearch?.params?.end_date : "";
    this.selectionFilters.tiposProvidencias = this.querySearch?.params?.tipo_providencia ? this.querySearch?.params?.tipo_providencia : [];
    this.selectionFilters.fuentesFormales = this.querySearch?.params?.fuente_formal_multiple ?  this.querySearch?.params?.fuente_formal_multiple : [];
    this.selectionFilters.claseActuaciones = this.querySearch?.params?.clase_actuacion_multiple ? this.querySearch?.params?.clase_actuacion_multiple : [];
    this.selectionFilters.delitos = this.querySearch?.params?.delitos_multiple ? this.querySearch?.params?.delitos_multiple : [];
    this.selectionFilters.procedencias = this.querySearch?.params?.procedencia_multiple ? this.querySearch?.params?.procedencia_multiple : [];
    this.selectionFilters.categoriasGenero = this.querySearch?.params?.categoria_genero ? this.querySearch?.params?.categoria_genero : [];
    this.selectionFilters.decisiones = this.querySearch?.params?.decision_multiple ? this.querySearch?.params?.decision_multiple : [];
    this.selectionFilters.salas = this.querySearch?.params?.sala ? this.querySearch?.params?.sala : [];
    this.selectionFilters.magistradosSalvamento = this.querySearch?.params?.magistrado ? this.querySearch?.params?.magistrado : [];
    this.selectionFilters.tiposSalas = this.querySearch?.params?.tipo_sala ? this.querySearch?.params?.tipo_sala : [];
  }

  public changeModelFilter():void {
    if(this.modal_filter == true) {
      this.modal_filter = false;
    }else{
      this.modal_filter = true;
    }
  }

  public changeFilter(value:string):void {
    this.selection = value;
    switch (this.selection) {
      case "Ponente":
        this.checkPonente = this.change(this.checkPonente);
        break;

      case "Fecha":
      this.checkFecha = this.change(this.checkFecha);
      break;

    case "Providencia":
      this.checkProvidencia = this.change(this.checkProvidencia);
      break;
      
      case "FuenteFormal":
        this.checkFuenteFormal = this.change(this.checkFuenteFormal);
        break;

      case "ClasesActuacion":
        this.checkClaseActuacion = this.change(this.checkClaseActuacion);
        break;

      case "Delitos":
        this.checkDelitos = this.change(this.checkDelitos);
        break;

      case "Procedencia":
        this.checkProcedencia = this.change(this.checkProcedencia);
        break;

      case "CategoriaGenero":
        this.checkCategoriaGenero = this.change(this.checkCategoriaGenero);
        break;

      case "salas":
        this.checkSala = this.change(this.checkSala);
        break;

      case "decisiones":
        this.checkDecision = this.change(this.checkDecision);
        break;

      case "magistradosSalvamento":
        this.checkMagistradoSalvamento = this.change(this.checkMagistradoSalvamento);
        break;

      case "tiposSala":
          this.checkTipoSala = this.change(this.checkTipoSala);
          break;
    
      default:
        break;
    }
  }

  public change(validate:boolean):boolean {
    if(validate == true) {
      return false;
    }else{
      return true;
    }
  }

  public changeSelectedPonente(result:string):void {
    this.selectionFilters.ponentes = this.changeSelected(result, this.selectionFilters.ponentes);
    this.appComponent.onSearch(1, this.findResult.query.params.size, this.selectionFilters);
  }

  public changeSelectedFecha(result:string):void {
    this.selectionFilters.start_date = result.substring(0,4).toString().concat("-01-01");
    this.selectionFilters.end_date = result.substring(0,4).toString().concat("-12-31");
    this.appComponent.onSearch(1, this.findResult.query.params.size, this.selectionFilters);
  }

  public changeSelectedTiposProvidencia(result:string):void {
    this.selectionFilters.tiposProvidencias = this.changeSelected(result, this.selectionFilters.tiposProvidencias);
    this.appComponent.onSearch(1, this.findResult.query.params.size, this.selectionFilters);
  }

  public changeSelectedFuentesFormales(result:string):void {
    this.selectionFilters.fuentesFormales = this.changeSelected(result, this.selectionFilters.fuentesFormales);
    this.appComponent.onSearch(1, this.findResult.query.params.size, this.selectionFilters);
  }

  public changeSelectedClaseActuaciones(result:string):void {
    this.selectionFilters.claseActuaciones = this.changeSelected(result, this.selectionFilters.claseActuaciones);
    this.appComponent.onSearch(1, this.findResult.query.params.size, this.selectionFilters);
  }

  public changeSelectedDelitos(result:string):void {
    this.selectionFilters.delitos = this.changeSelected(result, this.selectionFilters.delitos);
    this.appComponent.onSearch(1, this.findResult.query.params.size, this.selectionFilters);
  }

  public changeSelectedProcedencias(result:string):void {
    this.selectionFilters.procedencias = this.changeSelected(result, this.selectionFilters.procedencias);
    this.appComponent.onSearch(1, this.findResult.query.params.size, this.selectionFilters);
  }

  public changeSelectedCategoriasGenero(result:string):void {
    this.selectionFilters.categoriasGenero = this.changeSelected(result, this.selectionFilters.categoriasGenero);
    this.appComponent.onSearch(1, this.findResult.query.params.size, this.selectionFilters);
   }

  public changeSelectedSalas(result:string):void {
   this.selectionFilters.salas = this.changeSelected(result, this.selectionFilters.salas);
   this.appComponent.onSearch(1, this.findResult.query.params.size, this.selectionFilters);
  }

  public changeSelectedDecisiones(result:string):void {
    this.selectionFilters.decisiones = this.changeSelected(result, this.selectionFilters.decisiones);
    this.appComponent.onSearch(1, this.findResult.query.params.size, this.selectionFilters);
   }

   public changeSelectedMagistradosSalvamento(result:string):void {
    this.selectionFilters.magistradosSalvamento = this.changeSelected(result, this.selectionFilters.magistradosSalvamento);
    this.appComponent.onSearch(1, this.findResult.query.params.size, this.selectionFilters);
   }
 
   public changeSelectedTiposSalas(result:string):void {
    this.selectionFilters.tiposSalas = this.changeSelected(result, this.selectionFilters.tiposSalas);
    this.appComponent.onSearch(1, this.findResult.query.params.size, this.selectionFilters);
   }

  public changeSelected(value:string, list:string[]):any[] {
    list = [];
    list.push(value);
    console.log(list);
    return list;
  }

}
