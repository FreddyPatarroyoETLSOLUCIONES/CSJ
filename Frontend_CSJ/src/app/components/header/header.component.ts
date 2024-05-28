import { AppComponent } from 'src/app/app.component';
import { Component, Input, OnInit } from '@angular/core';
import { ElasticService } from 'src/services/elastic.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public showComponents = "";
  public userLogin:any = {
    refresh:'',
    access:'',
    rol:'',
    username:''
  };

  logoImg:string='';
  logoName:string='';
  corporationArray: any;

  public userDataLogin:any = this.appComponent.authenticated_user;

  @Input() UrlRef:string
  // @Input() altaCorte:number;
  // @Input() altaCorte2:number;
  // @Input() altaCorte3:number;
  // @Input() altaCorte4:number;
  // @Input() altaCorte5:number;



  constructor(
    private appComponent: AppComponent,
    private elasticService: ElasticService
    
    ) { }
  

  ngOnInit(): void {
    var UrlRefTmp = this.UrlRef ? this.UrlRef : "";
    interface  ICorporation{
      [index: string]: string;
    }
    this.corporationArray = {} as ICorporation;
    
    this.corporationArray[""] = "corte_suprema_justicia";
    this.corporationArray["CC"] = "corte_constitucional";

    this.corporationArray["CSJ"] = "consejo_superior_judicatura";
    this.corporationArray["CE"] = "consejo_estado";

    this.corporationArray["CNDJ"] = "comision_nacional_disciplina_judicial";
    this.corporationArray["CNSJ"] = "consejo_superior_judicatura";

    var corporationTmp = this.corporationArray[UrlRefTmp];


    this.getParamLogoById(corporationTmp);
  }

  public changeComponent(newComponent:string):void{
    this.appComponent.chageComponent(newComponent);
  }

  public openLogin():void {
    this.appComponent.loginUser = true;
  }


  public getParamLogoById(idLogo:string){

    var auxToken = sessionStorage.getItem('token');
    this.elasticService.getParamLogoById(auxToken, idLogo).subscribe(
      (respuesta: any) => {
        this.logoImg = respuesta.image_base64;
        this.logoName = respuesta.name;
    });
  }

}
