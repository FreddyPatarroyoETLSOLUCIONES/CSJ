import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ElasticService } from 'src/services/elastic.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-authenticate-user',
  templateUrl: './authenticate-user.component.html',
  styleUrls: ['./authenticate-user.component.css']
})
export class AuthenticateUserComponent implements OnInit {

  user={
    username:"",
    password:"",
    recaptcha:"",
  }
  confirm_check:boolean = false;
  loginUser!:boolean;
  form_validation:boolean = false;
  mensaje:string;
  type:string = "password";

  constructor(private appComponent: AppComponent, private elasticService:ElasticService) {

   }

  ngOnInit(): void {
    this.loginUser = this.appComponent.loginUser;
    this.appComponent.limpiarCampos();
    this.appComponent.activeSearch = false;
  }

  closeLogin():void {
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('token');
    this.appComponent.loginUser=false;
  }

  changeType():void {
    if(this.type=="password"){
      this.type = "text";
    }else{
      this.type = "password";
    }
  }

  login():void {
    //if(this.user.username == "" || this.user.password == "" || !this.confirm_check || !this.user.recaptcha){
    if(this.user.username == "" || this.user.password == "" || !this.confirm_check ){
    //if(this.user.username == "" || this.user.password == "" || !this.confirm_check){
      this.form_validation = true;
      this.mensaje="Debe ingresar todos los campos obligatorios"
    }else if(this.user.username.length > 50){
      this.form_validation = true;
      this.mensaje="El nombre de usuario no puede tener mas de 50 caracteres"
    }else if(this.user.password.length > 50){
      this.form_validation = true;
      this.mensaje="El contraseña no puede tener mas de 50 caracteres"
    }else{
      this.form_validation = false;
      this.mensaje=""
      this.elasticService.postAutenticacionUser(JSON.parse(JSON.stringify(this.user))).subscribe(
      response=>{
        sessionStorage.setItem('usuario', JSON.stringify(response));
        sessionStorage.setItem('token', response.access);
        this.appComponent.changeUser(response);
        this.appComponent.loginUser=false;
      },
      error=>{
        if(error?.error?.error){
          if(error.error.error === "Usuario y/o contraseña incorrecta"){
            this.form_validation = true;
            this.mensaje="El nombre de usuario o la contraseña están mal diligenciado "
            this.user.recaptcha = ""
          }
          else if(error?.error?.error === "ReCaptcha no válido"){
            this.form_validation = true;
            this.mensaje="recaptcha no es valido"
            this.user.recaptcha = ""
          }
          else if(error?.error?.error === "Usuario y/o contraseña incorrecta - {'recaptcha': [ErrorDetail(string='This field is required.', code='required')]}"){
            this.form_validation = true;
            this.mensaje="recaptcha no es valido"
            this.user.recaptcha = ""
          }
        }
      }
      );
    }
  }

}
