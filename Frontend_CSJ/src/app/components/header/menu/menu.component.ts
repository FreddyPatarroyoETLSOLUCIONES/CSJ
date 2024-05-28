import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public showComponents = "";
  public userLogin:any = {
    refresh:'',
    access:'',
    roles:[],
    username:''
  };

  public permisosAdministrador:boolean = false;
  public permisosUsuarioInterno:boolean = false;
  public permisosAdministradorFuncional:boolean = false;

  public verticalMenu: boolean= false;
  public historialSearch:any = this.appComponent.historial_search;
  public userDataLogin:any = this.appComponent.authenticated_user;

  constructor(private appComponent: AppComponent) { }

  ngOnInit(): void {
    if(this.userDataLogin.roles && this.userDataLogin.roles.length > 0) {
      this.permisosAdministrador = this.userDataLogin.roles.includes("administrador");
      this.permisosAdministradorFuncional = this.userDataLogin.roles.includes("administrador_funcional");
      this.permisosUsuarioInterno = this.userDataLogin.roles.includes("usuario_interno")
    }
  }

  public changeComponent(newComponent:string):void{
    this.verticalMenu = false;
    this.appComponent.chageComponent(newComponent);
  }

  public openLogin():void {
    this.appComponent.loginUser = true;
  }

  public closeSesion():void {
    this.appComponent.cerrarSecion = true;
    this.appComponent.changeUser(this.userLogin);
    this.userDataLogin = this.appComponent.authenticated_user;
    this.changeComponent("principal");
    this.appComponent.limpiarCampos();
    this.appComponent.activeSearch = false;
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('token');
    this.appComponent.cerrarSecion = false;
  }

  showVerticalMenu(){
    this.verticalMenu = this.verticalMenu ? false : true;
  }

  openHistorialSearch(){
    this.historialSearch = this.historialSearch;
  }

}
