import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import {userModel} from '../../models/user-model'
import { ElasticService } from '../../../services/elastic.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {

  resultConsult:any;
  users:userModel[];
  pages:number = 0;
  page:number = 1;
  limit:number = 10;
  roles:any = "";
  username:string = "";
  full_name:string = "";
  busquedaValida:boolean = true;
  dropdownPages:boolean = false;
  full_name_valid:boolean = true;
  reodernarName:boolean =false;
  reodernarUsername:boolean = false;

  constructor(public appComponent: AppComponent, private services: ElasticService) { }

  ngOnInit(): void {
    this.services.getUsers(this.page, this.limit, this.roles, this.full_name, this.username).subscribe(result => {
      this.resultConsult = result;
      this.users = this.resultConsult.results;
      this.users = this.sort_ascent(this.users,"username");
    })

    this.services.getRoles().subscribe(result => {
    })
  }

  public changeComponent(newComponent:string):void{
    this.appComponent.chageComponent(newComponent);
  }

  public buscar(){
      if(this.roles || this.full_name || this.username){
        if(!this.roles && !this.username && this.full_name.length > 3){
          this.busquedaValida = true;
          this.full_name_valid = true;
          this.services.getUsers(this.page, this.limit, this.roles, this.full_name, this.username).subscribe(result => {
            this.resultConsult = result;
            this.users = this.resultConsult.results;
          })
        }else if(this.roles || this.username){
          this.busquedaValida = true;
          this.full_name_valid = true;
          this.services.getUsers(this.page, this.limit, this.roles, this.full_name, this.username).subscribe(result => {
            this.resultConsult = result;
            this.users = this.resultConsult.results;
          })
        }else{
          this.busquedaValida = true;
          this.full_name_valid = false;
        }
        
      }else if(!this.roles && !this.full_name && !this.username){
        this.busquedaValida = false;
        this.full_name_valid = true;
      }
    
  }

  public bucarPagina(page: number, limit: number){
    this.dropdownPages = false;
    this.page = page;
    this.limit = limit;
    this.services.getUsers(this.page, this.limit, this.roles, this.full_name, this.username).subscribe(result => {
      this.resultConsult = result;
      this.users = this.resultConsult.results;
    })
  }

  public  limpiarFiltros(){
    this.roles = "";
    this.username = "";
    this.full_name = "";
    this.services.getUsers(this.page, this.limit, this.roles, this.full_name, this.username).subscribe(result => {
      this.resultConsult = result;
      this.users = this.resultConsult.results;
    })
  }

  public editarUsuario(usuario:userModel){
    this.changeComponent('editUser');
    this.appComponent.usuarioEditarSeleccionado = usuario;
  }

  public reordearColumnas(columna:string){
    if(columna == "full_name"){
      if(this.reodernarName){
        this.reodernarName = false;
        this.users = this.sort_ascent(this.users, columna);
      }else{
        this.reodernarName = true;
        this.users = this.sort_decent(this.users, columna);
      }
    }else if(columna == "username"){
      if(this.reodernarUsername){
        this.reodernarUsername = false;
        this.users = this.sort_ascent(this.users, columna);
      }else{
        this.reodernarUsername = true;
        this.users = this.sort_decent(this.users, columna);
      }
    }
  }

  sort_ascent(obj: any, by: any) {
    let response;
    response = obj.reverse(function (a: any, b: any) {
      if (a[by] < b[by]) {
        return -1;
      } else if (a[by] > b[by]) {
        return 1;
      } else {
        return 0;
      }
    });
    return response;
  };

  sort_decent(obj: any, by: any) {
    let response;
    response = obj.sort(function (a: any, b: any) {
      if (a[by] < b[by]) {
        return -1;
      } else if (a[by] > b[by]) {
        return 1;
      } else {
        return 0;
      }
    });
    return response;
  };
}
