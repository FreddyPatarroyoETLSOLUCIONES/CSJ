import { Component, OnInit } from '@angular/core';
import { postCalificacionModel } from 'src/app/models/postcalificacion-model';
import { ElasticService } from 'src/services/elastic.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-calificar-resultados',
  templateUrl: './calificar-resultados.component.html'
})
export class CalificarResultadosComponent implements OnInit {

  classchecked = "rate-star checked";
  classunchecked = "rate-star";
  rates = {
    rate1: this.classunchecked,
    rate2: this.classunchecked,
    rate3: this.classunchecked,
    rate4: this.classunchecked,
    rate5: this.classunchecked,
  }
  confirmacion: string;
  modal_confirm = false;
  flagsent = false;

  constructor(private services: ElasticService, private appComponent: AppComponent) { }

  querySearch: any = this.appComponent.querySearch;
  totalRecords: any = this.appComponent.findResult.total_records;
  consultar: any;

  ngOnInit(): void {

    const { from, ...noFrom } = this.appComponent.querySearch.params;
    this.consultar = noFrom;

    this.rates = sessionStorage.getItem('calificacion') ? JSON.parse(sessionStorage.getItem('calificacion')) : this.rates

    if (!sessionStorage.getItem('consulta')) {
      sessionStorage.setItem("consulta", JSON.stringify(this.consultar));
    } else {
      let nuevaConsulta: string = JSON.stringify(this.consultar);
      let consultaAnterior: string = sessionStorage.getItem('consulta');
      if (nuevaConsulta == consultaAnterior) {
        if(this.rates.rate1 !== "rate-star" || this.rates.rate2 !== "rate-star" || this.rates.rate3 !== "rate-star" || 
          this.rates.rate4 !== "rate-star" || this.rates.rate5 !== "rate-star"){
          this.flagsent = true;
        }else{
          this.flagsent = false;
        } 
      } else {
        sessionStorage.setItem("consulta", JSON.stringify(this.consultar));
        sessionStorage.removeItem("calificacion");
        this.rates = {
          rate1: this.classunchecked,
          rate2: this.classunchecked,
          rate3: this.classunchecked,
          rate4: this.classunchecked,
          rate5: this.classunchecked,
        }
        this.flagsent = false;
      }
    }
  }

  validateQualification(){
    if (!sessionStorage.getItem('consulta')) {
      sessionStorage.setItem("consulta", JSON.stringify(this.consultar));
    } else {
      let nuevaConsulta: string = JSON.stringify(this.consultar);
      let consultaAnterior: string = sessionStorage.getItem('consulta');
      if (nuevaConsulta == consultaAnterior) {
        if(this.rates.rate1 !== "rate-star" || this.rates.rate2 !== "rate-star" || this.rates.rate3 !== "rate-star" || 
          this.rates.rate4 !== "rate-star" || this.rates.rate5 !== "rate-star"){
          this.flagsent = true;
        }else{
          this.flagsent = false;
        } 
      } else {
        sessionStorage.setItem("consulta", JSON.stringify(this.consultar));
        sessionStorage.removeItem("calificacion");
        this.rates = {
          rate1: this.classunchecked,
          rate2: this.classunchecked,
          rate3: this.classunchecked,
          rate4: this.classunchecked,
          rate5: this.classunchecked,
        }
        this.flagsent = false;
      }
    }
  }

  setRate(rate: number) {
    if (!this.flagsent) {
      switch (rate) {
        case 1:
          this.rates.rate1 = this.classchecked;
          this.postRate(1);
          sessionStorage.setItem('calificacion', JSON.stringify(this.rates));
          break;
        case 2:
          this.rates.rate1 = this.classchecked;
          this.rates.rate2 = this.classchecked;
          this.postRate(2);
          sessionStorage.setItem('calificacion', JSON.stringify(this.rates));
          break;
        case 3:
          this.rates.rate1 = this.classchecked;
          this.rates.rate2 = this.classchecked;
          this.rates.rate3 = this.classchecked;
          this.postRate(3);
          sessionStorage.setItem('calificacion', JSON.stringify(this.rates));
          break;
        case 4:
          this.rates.rate1 = this.classchecked;
          this.rates.rate2 = this.classchecked;
          this.rates.rate3 = this.classchecked;
          this.rates.rate4 = this.classchecked;
          this.postRate(4);
          sessionStorage.setItem('calificacion', JSON.stringify(this.rates));
          break;
        case 5:
          this.rates.rate1 = this.classchecked;
          this.rates.rate2 = this.classchecked;
          this.rates.rate3 = this.classchecked;
          this.rates.rate4 = this.classchecked;
          this.rates.rate5 = this.classchecked;
          this.postRate(5);
          sessionStorage.setItem('calificacion', JSON.stringify(this.rates));
          break;
      }
    }
  }

  postRate(rate: number) {

    this.validateQualification();

    const Datapost: postCalificacionModel = {
      query: this.querySearch,
      puntaje: rate,
      total_records: this.totalRecords
    };

    this.services.postCalificarResultados(JSON.parse(JSON.stringify(Datapost))).subscribe((Response: any) => {
      this.confirmacion = Response.message;
      this.modal_confirm = true;
      setTimeout(() => this.modalChangeCofirmate(), 3000)
    })
  }

  modalChangeCofirmate(): void {
    if (this.modal_confirm == false) {
      this.modal_confirm = true;
    } else {
      this.modal_confirm = false;
    }
  }
} 
