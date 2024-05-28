import { Component, OnInit } from '@angular/core';
import { ElasticService } from 'src/services/elastic.service';
import { FormGroup, FormBuilder } from "@angular/forms";
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-historial-busqueda',
  templateUrl: './historial-busqueda.component.html',
  styleUrls: ['./historial-busqueda.component.css']
})
export class HistorialBusquedaComponent implements OnInit {

  public generalForm: FormGroup;
  resultConsult:any;
  auxToken:string = "";
  historicoListTable:Array<any> = [];
  historicoCantidad:any = 0;
  historicoRegistrosPagina:any = 30;
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
  
  constructor(
    public formBuilder: FormBuilder,
    private elasticService: ElasticService,
    private appComponent: AppComponent) { }

    ngOnInit() {
      this.generalForm = this.formBuilder.group({
        textoBusqueda: [''],
        registrosPorPaginaHistoricoSelect:this.historicoRegistrosPagina,
      });

    this.getHistorialBusquedaUser(this.historicoRegistrosPagina , this.historicoPaginaActual);
    this.alimentarPaginaArray();
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
  
  getHistorialBusquedaUser(cantidadPorPagina:number , historicoPaginaActual:number) {
    this.auxToken = sessionStorage.getItem('token');

    this.elasticService.getHistorialBusquedaUser(this.auxToken , cantidadPorPagina , historicoPaginaActual ).subscribe(
      (res: any) => {
        this.resultConsult = res;
        
        //this.historicoListTable = res.results;
        this.historicoCantidad  = res.total_records;
        this.historicoPaginaTotal  = (res.total_records / this.historicoRegistrosPagina);
        this.historicoPaginaTotal  = Math.ceil(this.historicoPaginaTotal );
        this.alimentarPaginaArray();
        //this.historicoListTable = 
        var tmpResults = res.results.sort((a:any, b:any) => (a.busqueda.fecha_creacion < b.busqueda.fecha_creacion) ? -1 : 1);
        this.currentPage = historicoPaginaActual;


        tmpResults.forEach((element: any) => {
          //filter.push(element.id);
          //var re = /,/gi; 
          
          
          var filtroItemTmp:Array<any> = [];
          var filtroItem = element.filtro.split(","); 
          filtroItem.forEach((elementFiltro: any) => {
            
            var itemTmp = elementFiltro.split(":"); 
            if(itemTmp[0].trim() != "texto_buscar" && itemTmp[0].trim() != "" ){
              filtroItemTmp.push({id: itemTmp[0], text:itemTmp[1]});
            }
            
          });
          element.filtro = filtroItemTmp;
          this.historicoListTable.push(element);
        });


      }
    )    
  }



  changePaginadoHistoricoBusqueda(pagina:number=1){
    this.historicoPaginaActual = pagina;
    this.historicoRegistrosPagina = this.generalForm.get("registrosPorPaginaHistoricoSelect")?.value;
    
    if(pagina <= this.historicoPaginaTotal && pagina > 0 ){
      this.getHistorialBusquedaUser(this.historicoRegistrosPagina , this.historicoPaginaActual);
    }
  }

  filtroOpciones(){
  this.textoBusquedaOrderAsc = !this.textoBusquedaOrderAsc;
  if(this.textoBusquedaOrderAsc){
    this.historicoListTable = this.historicoListTable.sort((a:any, b:any) => (a.busqueda.texto_buscar < b.busqueda.texto_buscar) ? -1 : 1);
    this.textoBusquedaOrderLabel = 'Asc';
  }else{
    this.historicoListTable = this.historicoListTable.sort((a:any, b:any) => (a.busqueda.texto_buscar > b.busqueda.texto_buscar) ? -1 : 1);
    this.textoBusquedaOrderLabel = 'Desc';
  }

  }

  filtroFechas(){
  this.fechaOrder = !this.fechaOrder;
  if(this.fechaOrder){
  this.historicoListTable = this.historicoListTable.sort((a:any, b:any) => (a.fecha_creacion < b.fecha_creacion) ? -1 : 1);
  this.fechaLabel = 'Asc';
}else{
  this.historicoListTable = this.historicoListTable.sort((a:any, b:any) => (a.fecha_creacion > b.fecha_creacion) ? -1 : 1);
  this.fechaLabel = 'Desc';
  }
}

public changeComponent(newComponent:string):void{
  this.appComponent.chageComponent(newComponent);
}

  public switchToComponentBusqueda(opcionBusqueda:string):void{
    //this.generalForm.get("textoBusqueda").setValue(text);

    sessionStorage.setItem('textoBusqueda', opcionBusqueda);
    this.appComponent.textobusqueda = opcionBusqueda;

    this.appComponent.onSearch();

    this.changeComponent('principal');

    //this.generalForm.get("textoBusqueda").setValue(opcionBusqueda);
  }

  public realizarConsulta(busqueda:any){

    console.log(busqueda)
    this.appComponent.onSearch(1, 10, null, busqueda);
    this.appComponent.chageComponent('principal');
  }
}
 