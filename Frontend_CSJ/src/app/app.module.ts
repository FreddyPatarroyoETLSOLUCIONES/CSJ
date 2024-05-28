import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ResultsComponent } from './components/results/results.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { SatisfactionSurveyComponent } from './components/results/satisfaction-survey/satisfaction-survey.component';
import { FilterComponent } from './components/results/filter/filter.component';
import { CalificarResultadosComponent } from './components/results/calificar-resultados/calificar-resultados.component';

//import { FilterPipe } from './filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { FilterPipe } from './pipes/filter.pipe'; // -> imported filter pipe
import { HighlightDirective } from './directives/highlight.directive';
import { RecaptchaComponent } from './recaptcha/recaptcha.component'; // ->  imported directive
import { AuthenticateUserComponent } from './components/authenticate-user/authenticate-user.component';
import { MenuComponent } from './components/header/menu/menu.component';
import { UsersManagementComponent } from './components/users-management/users-management.component';
import { EditUserComponent } from './components/users-management/edit-user/edit-user.component';
import { HistorialBusquedaComponent } from './components/historial-busqueda/historial-busqueda.component';
import { ParametrizacionCamposLogosComponent } from './components/parametrizacion-campos-logos/parametrizacion-campos-logos.component';
import { ActualizarLogoComponent } from './components/parametrizacion-campos-logos/actualizar-logo/actualizar-logo.component';
import { FiltrosAvanzadosComponent } from './components/parametrizacion-campos-logos/filtros-avanzados/filtros-avanzados.component';
import { FiltrosGeneralesComponent } from './components/parametrizacion-campos-logos/filtros-generales/filtros-generales.component';
import { DeleteUserComponent } from './components/users-management/delete-user/delete-user.component';
import { ActiveUserComponent } from './components/users-management/active-user/active-user.component';
import { OperadoresLogicosJrComponent } from './components/operadores-logicos/operadores-logicos-jr/operadores-logicos-jr.component';
import { OperadoresLogicosPrComponent } from './components/operadores-logicos/operadores-logicos-pr/operadores-logicos-pr.component';
import { OperadoresLogicosTComponent } from './components/operadores-logicos/operadores-logicos-t/operadores-logicos-t.component';
import { OperadoresLogicosCComponent } from './components/operadores-logicos/operadores-logicos-c/operadores-logicos-c.component';
import { OperadoresLogicosAComponent } from './components/operadores-logicos/operadores-logicos-a/operadores-logicos-a.component';
import { OperadoresLogicosDComponent } from './components/operadores-logicos/operadores-logicos-d/operadores-logicos-d.component';
import { SafePipe } from './pipes/safe.pipe'; // ->  imported directive


@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    HighlightDirective, 

    HeaderComponent,
    FooterComponent,
    ResultsComponent,
    SatisfactionSurveyComponent,
    FilterComponent,
    CalificarResultadosComponent,
    AuthenticateUserComponent,
    MenuComponent,
    UsersManagementComponent,
    EditUserComponent,
    HistorialBusquedaComponent,
    RecaptchaComponent,
    ParametrizacionCamposLogosComponent,
    ActualizarLogoComponent,
    FiltrosAvanzadosComponent,
    FiltrosGeneralesComponent,
    DeleteUserComponent,
    ActiveUserComponent,
    OperadoresLogicosJrComponent,
    OperadoresLogicosPrComponent,
    OperadoresLogicosTComponent,
    OperadoresLogicosCComponent,
    OperadoresLogicosAComponent,
    OperadoresLogicosDComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [
    DatePipe,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




