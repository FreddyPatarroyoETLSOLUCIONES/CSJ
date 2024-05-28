import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.css']
})
export class RecaptchaComponent implements OnInit {


  @Input() UrlRef:string
  token: string|undefined;
  recaptchaValidation:boolean = false;
  corporationArray: any;
  corporationColor: any;
  corporationFontColor: any;
  urlRef: string="";
  constructor(private route: ActivatedRoute) {
    this.token = undefined;
  }
  
  ngOnInit(): void {
    
    /*this.route.paramMap.subscribe(params => {
      UrlRefTmp = params.get('p');
    });*/


    var UrlRefTmp = document.location.href?.split("?");

    if(1 in UrlRefTmp){
      UrlRefTmp = UrlRefTmp[1]?.split("=");
      this.urlRef = UrlRefTmp[1]?.toUpperCase();
      this.corporationFontColor = "white";

    }
    else{
      this.corporationFontColor = "blank";
      this.corporationColor =  "";
    }

    interface  ICorporation{
      [index: string]: string;
    }
    this.corporationArray = {} as ICorporation;
    
    this.corporationArray[""] = "#FFAB00";
    this.corporationArray["CC"] = "#C11F3D";

    this.corporationArray["CSJ"] = "#FFAB00";
    this.corporationArray["CE"] = "#3366CC";

    this.corporationArray["CNDJ"] = "#0B986A";
    this.corporationArray["CNSJ"] = "#007367";

    this.corporationColor = this.corporationArray[this.urlRef];
    
    console.log("corporationColor:"+this.corporationColor);

  }

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      
      return;
    }
    else{
      
      this.recaptchaValidation = true;
      sessionStorage.setItem('recaptchaValidation_'+this.urlRef, this.recaptchaValidation.toString());
      window.location.reload();

    }

  }

}
