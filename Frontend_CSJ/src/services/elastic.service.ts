import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import {SatisfactionSurveyModel} from '../app/models/satisfaction-survey-model';
import { videoModel } from 'src/app/models/videos';
import { CalificarResultado } from 'src/app/models/PostCalificacionResultado';


@Injectable({
  providedIn: 'root'
})
export class ElasticService {


  constructor(private http: HttpClient) { }

  private getElasticBase(){
    return environment.elastic.replace("/elastic", "");

  }

  getDemandantes(page: number){
    return this.http.get<JSON>(`${environment.elastic}/demandantes=page=${page}`);
  }

  getDemandados(){
    return this.http.get<JSON>(`${environment.elastic}/demandados`);
  }

  getTipoActos(){
    return this.http.get<JSON>(`${environment.elastic}/tipo-acto`);
  }
  
  getTipoNorma(){
    return this.http.get<JSON>(`${environment.elastic}/tipo-norma`);
    // /_search
  }

  /*getSeccion(){
    return this.http.get<JSON>(`${environment.elastic}/seccion`);
  }*/

  
  getSeccion(filters_sub_origen:any[], origen:any[], filters_extra_origen:any[]){

     let sub_origen:any=[];

    let extra_origen:any[] = [];

    filters_sub_origen.forEach(element => {
      sub_origen.push(element.id);
    });

    filters_extra_origen.forEach(element => {
      extra_origen.push(element.id);
    });
    return this.http.get<JSON>(`${environment.elastic}/seccion?origen=${origen}&sub_origen=${sub_origen}&extra_origen=${extra_origen}`);
  }

  getDelitos(){
    return this.http.get<JSON>(`${environment.elastic}/delitos`);
  }

  getSalaConocimiento(){
    return this.http.get<JSON>(`${environment.elastic}/sala-conocimiento`);
  }

  getNaturalezaProceso(){
    return this.http.get<JSON>(`${environment.elastic}/naturaleza-proceso`);
  }

  getDelitosFilter(filters_sub_origen:any[], origen:any[], filters_extra_origen:any[]){
    let sub_origen:any=[];

    let extra_origen:any[] = [];

    filters_sub_origen.forEach(element => {
      sub_origen.push(element.id);
    });

    filters_extra_origen.forEach(element => {
      extra_origen.push(element.id);
    });

    return this.http.get<JSON>(`${environment.elastic}/delitos?origen=${origen}&sub_origen=${sub_origen}&extra_origen=${extra_origen}`);
  }

  getProcedencias(){
    return this.http.get<JSON>(`${environment.elastic}/procedencias`);
  }

  getProcedenciasFilter(filters_sub_origen:any[], origen:any[], filters_extra_origen:any[]){
    let sub_origen:any=[];

    let extra_origen:any[] = [];

    filters_sub_origen.forEach(element => {
      sub_origen.push(element.id);
    });

    filters_extra_origen.forEach(element => {
      extra_origen.push(element.id);
    });

    return this.http.get<JSON>(`${environment.elastic}/procedencias?origen=${origen}&sub_origen=${sub_origen}&extra_origen=${extra_origen}`);
  }

  getFuentesformales(){
    return this.http.get<JSON>(`${environment.elastic}/fuentes_formales`);
  }

  getClasesactuacion(){
    return this.http.get<JSON>(`${environment.elastic}/clases_actuacion`);
  }

  getClasesactuacionFilter(filters_sub_origen:any[], origen:any[], filters_extra_origen:any[]){
    let sub_origen:any=[];

    let extra_origen:any[] = [];

    filters_sub_origen.forEach(element => {
      sub_origen.push(element.id);
    });

    filters_extra_origen.forEach(element => {
      extra_origen.push(element.id);
    });
    return this.http.get<JSON>(`${environment.elastic}/clases_actuacion?origen=${origen}&sub_origen=${sub_origen}&extra_origen=${extra_origen}`);
  }

  /*_______________ servicios faltantes____________________*/

  getTiposprovidencia(){
    return this.http.get<JSON>(`${environment.elastic}/tipos_providencia`);
  }

  getTiposprovidenciaFilter(filters_sub_origen:any[], origen:any[], filters_extra_origen:any[] ){
    let sub_origen:any=[];

    let extra_origen:any[] = [];

    filters_sub_origen.forEach(element => {
      sub_origen.push(element.id);
    });

    filters_extra_origen.forEach(element => {
      extra_origen.push(element.id);
    });
    return this.http.get<JSON>(`${environment.elastic}/tipos_providencia?origen=${origen}&sub_origen=${sub_origen}&extra_origen=${extra_origen}`);
  }

  getTipossala(){
    return this.http.get<JSON>(`${environment.elastic}/tipos_sala`);
  }

  getTipossalaFilter(filters_sub_origen:any[], origen:any[], filters_extra_origen:any[]){
    let sub_origen:any=[];

    let extra_origen:any[] = [];

    filters_sub_origen.forEach(element => {
      sub_origen.push(element.id);
    });

    filters_extra_origen.forEach(element => {
      extra_origen.push(element.id);
    });
    return this.http.get<JSON>(`${environment.elastic}/tipos_sala?origen=${origen}&sub_origen=${sub_origen}&extra_origen=${extra_origen}`);
  }

  getSalas(){
    return this.http.get<JSON>(`${environment.elastic}/salas`);
  }

  getSalasFilter(filters_sub_origen:any[], origen:any[], filters_extra_origen:any[]){
    let sub_origen:any=[];

    let extra_origen:any[] = [];

    filters_sub_origen.forEach(element => {
      sub_origen.push(element.id);
    });

    filters_extra_origen.forEach(element => {
      extra_origen.push(element.id);
    });

    return this.http.get<JSON>(`${environment.elastic}/salas?origen=${origen}&sub_origen=${sub_origen}&extra_origen=${extra_origen}`);
  }

  getPonentes(){
    return this.http.get<JSON>(`${environment.elastic}/ponentes`);
  }

  getEntidadGeneradora(){
    return this.http.get<JSON>(`${environment.elastic}/entidad-generadora`)
   };


  getPonentesFilter(filters_sub_origen:any[], origen:any[], filters_extra_origen:any[]){
    let sub_origen:any=[];

    let extra_origen:any[] = [];

    filters_sub_origen.forEach(element => {
      sub_origen.push(element.id);
    });

    filters_extra_origen.forEach(element => {
      extra_origen.push(element.id);
    });
    
    return this.http.get<JSON>(`${environment.elastic}/ponentes?origen=${origen}&sub_origen=${sub_origen}&extra_origen=${extra_origen}`);
  }

  getEstado(filters_sub_origen:any[], origen:any[], filters_extra_origen:any[]){
    let sub_origen:any=[];

    let extra_origen:any[] = [];

    filters_sub_origen.forEach(element => {
      sub_origen.push(element.id);
    });

    filters_extra_origen.forEach(element => {
      extra_origen.push(element.id);
    });
    return this.http.get<JSON>(`${environment.elastic}/estado?origen=${origen}&sub_origen=${sub_origen}&extra_origen=${extra_origen}`);
  }

  getCorporaciones(){
    return this.http.get<JSON>(`${environment.elastic}/corporacion-genero`);
  }

  getBibliotecas(){
    return this.http.get<JSON>(`${environment.elastic}/bibliotecas`);
  }

  getTemasFilter(filters_sub_origen:any[], origen:any[], filters_extra_origen:any[]){
    let sub_origen:any=[];

    let extra_origen:any[] = [];

    filters_sub_origen.forEach(element => {
      sub_origen.push(element.id);
    });

    filters_extra_origen.forEach(element => {
      extra_origen.push(element.id);
    });

    return this.http.get<JSON>(`${environment.elastic}/temas?origen=${origen}&sub_origen=${sub_origen}&extra_origen=${extra_origen}`);
  }

  getOrigenes(){
    return this.http.get<JSON>(`${environment.elastic}/origenes`);
  }

  getOrigenesFilter(filters_sub_origen:any[], origen:any[], filters_extra_origen:any[]){
    let sub_origen:any=[];

    let extra_origen:any[] = [];

    filters_sub_origen.forEach(element => {
      sub_origen.push(element.id);
    });

    filters_extra_origen.forEach(element => {
      extra_origen.push(element.id);
    });

    return this.http.get<JSON>(`${environment.elastic}/origenes?origen=${origen}&sub_origen=${sub_origen}&extra_origen=${extra_origen}`);
  }

  getCategoriaGenero(){
    return this.http.get<JSON>(`${environment.elastic}/categoria_genero`)
  }

  getCategoriaGeneroFilter(filters_sub_origen:any[], origen:any[], filters_extra_origen:any[]){
    let sub_origen:any=[];

    let extra_origen:any[] = [];

    filters_sub_origen.forEach(element => {
      sub_origen.push(element.id);
    });

    filters_extra_origen.forEach(element => {
      extra_origen.push(element.id);
    });

    return this.http.get<JSON>(`${environment.elastic}/categoria_genero?origen=${origen}&sub_origen=${sub_origen}&extra_origen=${extra_origen}`);
  }

  getSalvamento(){
    return this.http.get<JSON>(`${environment.elastic}/salvamento`)
  }

  getDecision(){
    return this.http.get<JSON>(`${environment.elastic}/decision`)
  }

  getDecisionFilter(filters_sub_origen:any[], origen:any[], filters_extra_origen:any[]){
    let sub_origen:any=[];

    let extra_origen:any[] = [];

    filters_sub_origen.forEach(element => {
      sub_origen.push(element.id);
    });

    filters_extra_origen.forEach(element => {
      extra_origen.push(element.id);
    });
    return this.http.get<JSON>(`${environment.elastic}/decision?origen=${origen}&sub_origen=${sub_origen}&extra_origen=${extra_origen}`);
  }

  getMagistradoSalvamento(){
    return this.http.get<JSON>(`${environment.elastic}/magistrado_salvamento`)
  }

  getTribunalAdmin(){
    return this.http.get<JSON>(`${environment.elastic}/tribunales-administrativos`)
  }

  getTribunalesSuperiores(){
    return this.http.get<JSON>(`${environment.elastic}/tribunal-superior`)
  }

  getFuenteVideoteca(){
    return this.http.get<JSON>(`${environment.elastic}/videotecas`)
  }

  getLogos(token: string ){
    const headers = new HttpHeaders({ 'Authorization': 'Bearer '+token});
    return this.http.get<JSON>(`${this.getElasticBase()}/admin/logos` , { headers : headers} )
  }

  getTemaTres(value:any){
    return this.http.get<JSON>(`${this.getElasticBase()}/tema-tres/busqueda?value=`+value)
  }

  getMagistradoSalvamentoFilter(filters_sub_origen:any[], origen:any[], filters_extra_origen:any[]){
    let sub_origen:any=[];

    let extra_origen:any[] = [];

    filters_sub_origen.forEach(element => {
      sub_origen.push(element.id);
    });

    filters_extra_origen.forEach(element => {
      extra_origen.push(element.id);
    });
    return this.http.get<JSON>(`${environment.elastic}/magistrado_salvamento?origen=${origen}&sub_origen=${sub_origen}&extra_origen=${extra_origen}`);
  }

  getFile(url: string){
    if(sessionStorage.getItem('token')){
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token')});
      return this.http.get<JSON>(`${environment.elastic}/download-file${url}`, { headers : headers});
    }
    return this.http.get<JSON>(`${environment.elastic}/download-file${url}`);
  }

  getReport(reportes: JSON, origen: string) {

    if(sessionStorage.getItem('token')){
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token')});
      return this.http.post<Blob>(`${environment.elastic}/card-report-download?corporation=${origen}`, reportes, {headers: headers, responseType: 'blob' as 'json'});
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post<Blob>(`${environment.elastic}/card-report-download?corporation=${origen}`, reportes, {headers: headers, responseType: 'blob' as 'json'});
  }

  postBuscar(busqueda: JSON, page: number, limit: number, origen: string){

    if(sessionStorage.getItem('token')){
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token')});
    
      let origenMinuscula = '';
    
      if(origen){
        origenMinuscula = origen.toLowerCase();
      }
      return this.http.post<JSON>(`${environment.elastic}/buscar?page=`+ page + `&limit=` + limit + `&origen=` + origenMinuscula, busqueda, { headers : headers});
    }

    let origenMinuscula = '';
    
    if(origen){
      origenMinuscula = origen.toLowerCase();
    }
    return this.http.post<JSON>(`${environment.elastic}/buscar?page=`+ page + `&limit=` + limit + `&origen=` + origenMinuscula, busqueda);
  }

  postSatisfactionSurvey(satisfactionSurvey:SatisfactionSurveyModel):Observable<SatisfactionSurveyModel>{
    if(sessionStorage.getItem('token')){
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token')});
      return this.http.post<SatisfactionSurveyModel>(`${this.getElasticBase()}/survey/submit-pull-responses`, satisfactionSurvey, { headers : headers,responseType  : 'blob' as 'json'});
    }else{
      const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
      return this.http.post<SatisfactionSurveyModel>(`${this.getElasticBase()}/survey/submit-pull-responses`, satisfactionSurvey, { headers : headers,responseType : 'blob' as 'json'});
    }
  }

  postCalificarResultados(postcalificacion:JSON){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post<JSON>(`${environment.elastic}/calificar-query`, postcalificacion, { headers : headers,responseType : 'json'});
  }

  postAutenticacionUser(user:JSON):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post<JSON>(`${this.getElasticBase()}/accounts/login/`, user, { headers : headers,responseType : 'json'}).pipe(
      catchError(error =>{
        
        if(error.status === 401 || error.status === 400){
          return throwError(error);
        }
        return throwError(error);
      })
    );
  }

  getUsers(page:number, limit:number, roles:any, full_name:string, username:string):Observable<any>{
    return this.http.get<JSON>(`${this.getElasticBase()}/accounts/usuarios?page=${page}&roles=${roles}&full_name=${full_name}&username=${username}&limit=${limit}`);
  }

  putUser(id:any, user:any):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token')});
    return this.http.put<JSON>(`${this.getElasticBase()}/accounts/usuario/${id}`,user, { headers : headers});
  }

  getHistorialBusqueda(id:any, user:any):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token')});
    return this.http.put<JSON>(`${this.getElasticBase()}/accounts/usuario/${id}`,user, { headers : headers});
  }

  getHistorialBusquedaUser(token: string , cantidadPorPagina:number , historicoPaginaActual:number){
    const headers = new HttpHeaders({ 'Authorization': 'Bearer '+token});
    return this.http.get<JSON>(`${environment.elastic}/historial-usuario?page=`+historicoPaginaActual+`&limit=`+cantidadPorPagina , { headers : headers} );
  }

  getRoles():Observable<any>{
    return this.http.get<JSON>(`${this.getElasticBase()}/accounts/roles`);
  }

  postSearchHistorial(postJson:JSON){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<JSON>(`${environment.elastic}/autocompletar`, postJson, { headers : headers,responseType : 'json'});
  }

  postLog(funcionalidad: string, accion: string, json_resultado: any, json_valor_inicial: any, id_registro: any) {
    const payload = {
      funcionalidad,
      accion,
      json_resultado,
      json_valor_inicial,
      id_registro
    }

    if(sessionStorage.getItem('token')){
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token')});
      return this.http.post<JSON>(`${environment.elastic}/log`, payload, { headers : headers,responseType : 'json'});
    }else{
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.post<JSON>(`${environment.elastic}/log`, payload, { headers : headers,responseType : 'json'});
    }

  }

  editLogos(token: string , corporation: string , image_file:File){

    var formData: any = new FormData();
    formData.append('image', image_file);

    const headers = new HttpHeaders(
      {
        'Authorization': 'Bearer '+token
      });
    return this.http.put(this.getElasticBase()+'/admin/logos/'+corporation , formData , { headers : headers} )
  }


  getDescriptores():Observable<any>{
    return this.http.get<JSON>(this.getElasticBase()+`/elastic/descriptores`);
  }

  getTipoMaterial():Observable<any>{
    return this.http.get<JSON>(`${environment.elastic}/tipo-material-libro`);
  }


  getParam():Observable<any>{
    return this.http.get<JSON>(this.getElasticBase()+`/elastic/descriptores`);
  }

  postVideo(video:videoModel):Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Observable<any>>(`${environment.elastic}/download-video`,video, { headers : headers,responseType : 'json'});
  }
  
  getParamLogos(token: string , cantidadPorPagina:number , historicoPaginaActual:number , nameSearch:string , tipoFiltro:string){
    const headers = new HttpHeaders(
      {
        'Authorization': 'Bearer '+token
      });
    return this.http.get(this.getElasticBase()+'/admin/campos-admin?page='+historicoPaginaActual+'&limit='+cantidadPorPagina+'&campo='+nameSearch+'&tipo_filtro='+tipoFiltro , { headers : headers} )
  }


  putParamLogos(token: string , internal_id:string, jsonData:JSON){
    const headers = new HttpHeaders(
      {
        'Authorization': 'Bearer '+token
      });
    return this.http.put(this.getElasticBase()+'/admin/campos-admin/'+internal_id , jsonData,  { headers : headers} )
  }

  putParamLogosStatus(token: string , internal_id:string, jsonData:JSON){
    const headers = new HttpHeaders(
      {
        'Authorization': 'Bearer '+token
      });
    return this.http.put(this.getElasticBase()+'/admin/campos-admin/'+internal_id , jsonData,  { headers : headers} )
  }


  getParamLogoById(token: string , idLogo:string){
    const headers = new HttpHeaders(
      {
        'Authorization': 'Bearer '+token
      });

    return this.http.get(this.getElasticBase()+'/admin/logo/'+idLogo );
  }

  getListParamEnabled(dropdowns:string , sources:string , look_feel:string ){

    //return this.http.get(this.getElasticBase()+'/admin/campos-admin?dropdowns={'+dropdowns+'}&sources={'+sources+'}&look_feel={'+look_feel+'}' ,  { headers : headers} );
    return this.http.get(this.getElasticBase()+'/admin/campos-public?page=1&limit=1000&sources={'+sources+'}');

  }

  getListParamEnabledAvancedFilter(token: string , dropdowns:string , sources:string , look_feel:string ){
    const headers = new HttpHeaders(
      {
        'Authorization': 'Bearer '+token
      });

      var dropdownsUrl = dropdowns != "" ? dropdowns+"={'+dropdowns+'}" : "";
      var dropdownsUrl = dropdowns != "" ? sources+"={'+sources+'}" : "";
      var dropdownsUrl = dropdowns != "" ? dropdowns+"={'+dropdowns+'}" : "";


    return this.http.get(this.getElasticBase()+'/admin/campos-admin?dropdowns={'+dropdowns+'}&sources={'+sources+'}&look_feel={'+look_feel+'}' ,  { headers : headers} );
  }

  postCalificarResultado(calificarResultado: CalificarResultado): Observable<any>{
    if(sessionStorage.getItem('token')){
      console.log('servicio con token',calificarResultado);
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token')});
      return this.http.post<SatisfactionSurveyModel>(`${environment.elastic}/calificar-resultados`, calificarResultado, { headers : headers,responseType  : 'json'});
    }else{
      console.log('servicio sin token',calificarResultado);
      const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
      return this.http.post<SatisfactionSurveyModel>(`${environment.elastic}/calificar-resultados`, calificarResultado, { headers : headers,responseType : 'json'});
    }
  }

  getPointResult(): Observable<SatisfactionSurveyModel>{
    return this.http.get<any>(`${this.getElasticBase()}/admin/score`);
  }

  getDomain(): Observable<any>{
    return this.http.get<any>(`${this.getElasticBase()}/admin/app-settings`);
  }
}
