import { Component, OnInit } from '@angular/core';
import { JsonLogosEdit } from 'src/app/models/jsonLogosEdit.model';

import { FilterModel } from 'src/app/models/filter-model';
import { ElasticService } from 'src/services/elastic.service';

import { HttpErrorResponse } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';




@Component({
  selector: 'app-actualizar-logo',
  templateUrl: './actualizar-logo.component.html',
  styleUrls: ['./actualizar-logo.component.css']
})
export class ActualizarLogoComponent implements OnInit {

  flagModalEditar: boolean = false;
  logos: Array<any> = [];

  saveLogoRes: any;

  auxToken:any;
  imageSrc: string = '';
  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imgBase64:string = ''; 
  idCorporation:string = ''; 
  nameCorporation:string = ''; 
  fileImg:File;

  fileImgName:string = ''; 
  messaggeError:string = ''; 
  errorImg:boolean = true;
  constructor(
    private elasticService: ElasticService) { }

  ngOnInit(): void {
    
    this.cargarLogos( );
  }

  public modalEditar(id:string = "" , nameCorporation:string = "" ): void{
    this.idCorporation = id;
    this.nameCorporation = nameCorporation;
    this.flagModalEditar = !this.flagModalEditar;

    this.imageSrc= "";
    this.fileImgName = "";
    this.errorImg = false;


  }

  public cargarLogos( ) {
    this.auxToken = sessionStorage.getItem('token');
    this.elasticService.getLogos(this.auxToken).subscribe(
      (respuesta: any) => {
        this.logos = respuesta;
      }
    )
  }


  public uploadLogo( ) {
    this.auxToken = sessionStorage.getItem('token');
    this.elasticService.getLogos(this.auxToken).subscribe(
      (respuesta: any) => {
        this.logos = respuesta;
      }
    )
  }  

  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e:any) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }

  handleImageLoad() {
    this.imageLoaded = true;
  }

  handleInputChange(e:any) {
    this.errorImg = false;
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    this.fileImg = e.target.files[0];
    this.fileImgName = e.target.files[0].name;

    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      this.errorImg = true;
      this.messaggeError =  'Formato invalido, suba una imagen.';
      return;
    }

    this.loaded = false;

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e:any) {
    var reader = e.target;
    this.imgBase64 = reader.result;


    this.imageSrc = reader.result;
    this.loaded = true;
  }

  _setActive() {

  }

  _setInactive() {

  }

  cancel() {
    this.imageSrc = 'null';
  }

  saveLogo(){

    this.auxToken = sessionStorage.getItem('token');

    this.elasticService.editLogos(this.auxToken , this.idCorporation , this.fileImg).subscribe(
      (respuesta: any) => {
        this.saveLogoRes = respuesta;
        this.flagModalEditar = !this.flagModalEditar;
        this.cargarLogos();
      }, (e: HttpErrorResponse) => {
        this.messaggeError = e.error.non_field_errors[0];
        this.errorImg = true;
      }
    )
  }
}
