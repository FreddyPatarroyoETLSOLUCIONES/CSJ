import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { userModel } from '../../../models/user-model'
import { ElasticService } from '../../../../services/elastic.service';
import { HelpersService } from '../../../../services/helpers.service'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Input() usuario!: userModel;
  validateAdmin: boolean = false;
  validateAdminFuncional: boolean = false;
  validateInterUser: boolean = false;
  copiaRoles: string[] = [];
  copiaUsuarioActivo: boolean;
  validateEditUser: boolean = false;
  userEdited: boolean = false;
  validarNuevosRoles: boolean = false;
  validarCambiosEstado: boolean = false;
  mensaje: string = "";

  constructor(private appComponent: AppComponent, private elasticService: ElasticService, public helpersService:HelpersService) { }

  ngOnInit(): void {
    if (this.usuario.roles) {
      this.validateAdmin = this.usuario.roles.includes("administrador");
      this.validateAdminFuncional = this.usuario.roles.includes("administrador_funcional");
      this.validateInterUser = this.usuario.roles.includes("usuario_interno")
      this.copiaRoles = this.usuario.roles;
      this.copiaUsuarioActivo = this.usuario.is_active;
    }
  }

  public changeComponent(newComponent: string): void {
    this.appComponent.chageComponent(newComponent);
  }

  public agregarNuevoRol(rol: string): void {
    let roleTemp: string[] = [];
    if (rol == "usuario_interno") {
      if (this.usuario.roles) {
        if (this.usuario.roles.includes(rol)) {
          this.validateInterUser = false
          this.usuario.roles = this.usuario.roles.filter(rolTemp => rolTemp != rol);
        } else {
          this.validateInterUser = true
          roleTemp.push(rol)
          this.usuario.roles = this.usuario.roles.concat(roleTemp);
        }
      } else {
        this.validateInterUser = true
        roleTemp.push(rol)
        this.usuario.roles = roleTemp;
      }

    } else if (rol == "administrador") {
      if (this.usuario.roles) {
        if (this.usuario.roles.includes(rol)) {
          this.validateAdmin = false
          this.usuario.roles = this.usuario.roles.filter(rolTemp => rolTemp != rol);
        } else {
          this.validateAdmin = true;
          roleTemp.push(rol)
          this.usuario.roles = this.usuario.roles.concat(roleTemp);
        }
      } else {
        this.validateAdmin = true
        roleTemp.push(rol)
        this.usuario.roles = roleTemp;
      }
    } else if (rol == "administrador_funcional") {
      if (this.usuario.roles) {
        if (this.usuario.roles.includes(rol)) {
          this.validateAdminFuncional = false;
          this.usuario.roles = this.usuario.roles.filter(rolTemp => rolTemp != rol);
        } else {
          this.validateAdminFuncional = true;
          roleTemp.push(rol)
          this.usuario.roles = this.usuario.roles.concat(roleTemp);
        }
      } else {
        this.validateAdminFuncional = true
        roleTemp.push(rol)
        this.usuario.roles = roleTemp;
      }
    }

    this.validarCambioRoles();

  }

  public abrirModal(): void {
    if(this.usuario.is_active == false){
      this.helpersService.changeModalDelete();
    }else if(this.usuario.is_active == true){
      this.helpersService.changeModalActive();
    }
  }

  public cambioEstado(): void {

    if (this.usuario.is_active !== this.copiaUsuarioActivo) {
      this.validarCambiosEstado = true;
    } else {
      this.validarCambiosEstado = false;
      this.usuario.observations = ''
      this.validateEditUser = false
    }

    if (this.usuario.is_active == false) {
      this.usuario.roles = this.copiaRoles;
      this.validateAdmin = this.usuario.roles.includes("administrador");
      this.validateAdminFuncional = this.usuario.roles.includes("administrador_funcional");
      this.validateInterUser = this.usuario.roles.includes("usuario_interno")
    }
  
    this.validarCambioRoles();
  }

  public editarUsuario() {
    if (this.usuario.roles.length == 0 || !this.usuario.roles) {
      this.validateEditUser = true;
      this.mensaje = "Debe seleccionar por lo menos un rol para el usuario"
    } else if (this.validarNuevosRoles || this.validarCambiosEstado) {
      if (!this.usuario.observations) {
        this.validateEditUser = true;
        this.mensaje = "Debe justificar el cambios que se le realizó al usuario"
      } else {
        this.validateEditUser = false;
        this.usuario.email = this.usuario?.email ? this.usuario.email : "example@gmail.com";
        
        this.elasticService.putUser(this.usuario.id, this.usuario).subscribe(result => {
          this.userEdited = true;
          this.mensaje = "Se ha actualizado la información en el sistema"
          setTimeout(() => this.changeComponent('administradorUsuarios'), 3000)
        })

      }
    } else {
      this.validateEditUser = false;
      this.usuario.email = this.usuario?.email ? this.usuario.email : "example@gmail.com";

      this.elasticService.putUser(this.usuario.id, this.usuario).subscribe(result => {
        this.userEdited = true;
        this.mensaje = "Se ha actualizado la información en el sistema"
        setTimeout(() => this.changeComponent('administradorUsuarios'), 3000)
      })
    }

  }

  validarCambioRoles():void {
    if (this.usuario.roles.length != this.copiaRoles.length) {
      this.validarNuevosRoles = true;
    } else {
      var encuentra = false;
      for (var i = 0; i < this.usuario.roles.length; i++) {
        encuentra = false;
        for (var j = 0; j < this.copiaRoles.length; j++) {
          if (this.usuario.roles[i] == this.copiaRoles[j]) {
            encuentra = true;
            break;
          }
        }
        if (!encuentra) {
          this.validarNuevosRoles = true;
          break;
        }
      }
      if (encuentra) {
        this.validarNuevosRoles = false;
        this.usuario.observations = ''
        this.validateEditUser = false
      }
    }
  }

}
