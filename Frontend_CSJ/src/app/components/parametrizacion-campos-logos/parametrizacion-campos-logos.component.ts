import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-parametrizacion-campos-logos',
  templateUrl: './parametrizacion-campos-logos.component.html',
  styleUrls: ['./parametrizacion-campos-logos.component.css']
})
export class ParametrizacionCamposLogosComponent implements OnInit {

  constructor(private appComponent: AppComponent) { }
  public showComponents = "paramatrizacion-filtro-general";

  ngOnInit(): void {}

  public changeComponent(newComponent:string):void{
    this.showComponents = newComponent;
  }
}



