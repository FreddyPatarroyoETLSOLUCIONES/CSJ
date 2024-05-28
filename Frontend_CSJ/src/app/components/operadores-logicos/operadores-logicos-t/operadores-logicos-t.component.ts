import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-operadores-logicos-t',
  templateUrl: './operadores-logicos-t.component.html',
  styleUrls: ['./operadores-logicos-t.component.css']
})
export class OperadoresLogicosTComponent implements OnInit {
  
  public shared: any;
  public generalForm: FormGroup;
  
  constructor( private AppComponent: AppComponent, public formBuilder: FormBuilder ) { }
  
  ngOnInit(): void {
    this.shared = this.AppComponent;
    this.generalForm =  new FormGroup({
      textoAux1T: new FormControl(),
      textoCriterio1T: new FormControl(),
      textoAux2T: new FormControl(),
      textoCriterio2T: new FormControl(),
      textoAux3T: new FormControl(),
      textoCriterio3T: new FormControl(),
      textoAux4T: new FormControl(),
      textoCriterio4T: new FormControl(),
      textoAux5T: new FormControl(),
      textoCriterio5T: new FormControl(),
      textoAux6T: new FormControl(),
      textoCriterio6T: new FormControl(),
      textoAux7T: new FormControl(),
      textoCriterio7T: new FormControl(),
      textoAux8T: new FormControl(),
      textoCriterio8T: new FormControl(),
      textoAux9T: new FormControl(),
      textoCriterio9T: new FormControl(),
    })
    
    // inicial criterio 1
    if(this.shared.generalForm.get("textoAux1T")?.value){
      this.generalForm.patchValue({
        textoAux1T: this.shared.generalForm.get("textoAux1T")?.value ? this.shared.generalForm.get("textoAux1T")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio1T")?.value){
      this.generalForm.patchValue({
        textoCriterio1T: this.shared.generalForm.get("textoCriterio1T")?.value ? this.shared.generalForm.get("textoCriterio1T")?.value : ''
      })
    }

    // inicial criterio 2
    if(this.shared.generalForm.get("textoAux2T")?.value){
      this.generalForm.patchValue({
        textoAux2T: this.shared.generalForm.get("textoAux2T")?.value ? this.shared.generalForm.get("textoAux2T")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio2T")?.value){
      this.generalForm.patchValue({
        textoCriterio2T: this.shared.generalForm.get("textoCriterio2T")?.value ? this.shared.generalForm.get("textoCriterio2T")?.value : ''
      })
    }

    // inicial criterio 3
    if(this.shared.generalForm.get("textoAux3T")?.value){
      this.generalForm.patchValue({
        textoAux3T: this.shared.generalForm.get("textoAux3T")?.value ? this.shared.generalForm.get("textoAux3T")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio3T")?.value){
      this.generalForm.patchValue({
        textoCriterio3T: this.shared.generalForm.get("textoCriterio3T")?.value ? this.shared.generalForm.get("textoCriterio3T")?.value : ''
      })
    }

    // inicial criterio 4
    if(this.shared.generalForm.get("textoAux4T")?.value){
      this.generalForm.patchValue({
        textoAux4T: this.shared.generalForm.get("textoAux4T")?.value ? this.shared.generalForm.get("textoAux4T")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio4T")?.value){
      this.generalForm.patchValue({
        textoCriterio4T: this.shared.generalForm.get("textoCriterio4T")?.value ? this.shared.generalForm.get("textoCriterio4T")?.value : ''
      })
    }

    // inicial criterio 5
    if(this.shared.generalForm.get("textoAux5T")?.value){
      this.generalForm.patchValue({
        textoAux5T: this.shared.generalForm.get("textoAux5T")?.value ? this.shared.generalForm.get("textoAux5T")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio5T")?.value){
      this.generalForm.patchValue({
        textoCriterio5T: this.shared.generalForm.get("textoCriterio5T")?.value ? this.shared.generalForm.get("textoCriterio5T")?.value : ''
      })
    }

    // inicial criterio 6
    if(this.shared.generalForm.get("textoAux6T")?.value){
      this.generalForm.patchValue({
        textoAux6T: this.shared.generalForm.get("textoAux6T")?.value ? this.shared.generalForm.get("textoAux6T")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio6T")?.value){
      this.generalForm.patchValue({
        textoCriterio6T: this.shared.generalForm.get("textoCriterio6T")?.value ? this.shared.generalForm.get("textoCriterio6T")?.value : ''
      })
    }

    // inicial criterio 7
    if(this.shared.generalForm.get("textoAux7T")?.value){
      this.generalForm.patchValue({
        textoAux7T: this.shared.generalForm.get("textoAux7T")?.value ? this.shared.generalForm.get("textoAux7T")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio7T")?.value){
      this.generalForm.patchValue({
        textoCriterio7T: this.shared.generalForm.get("textoCriterio7T")?.value ? this.shared.generalForm.get("textoCriterio7T")?.value : ''
      })
    }

    // inicial criterio 8
    if(this.shared.generalForm.get("textoAux8T")?.value){
      this.generalForm.patchValue({
        textoAux8T: this.shared.generalForm.get("textoAux8T")?.value ? this.shared.generalForm.get("textoAux8T")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio8T")?.value){
      this.generalForm.patchValue({
        textoCriterio8T: this.shared.generalForm.get("textoCriterio8T")?.value ? this.shared.generalForm.get("textoCriterio8T")?.value : ''
      })
    }

    // inicial criterio 9
    if(this.shared.generalForm.get("textoAux9T")?.value){
      this.generalForm.patchValue({
        textoAux9T: this.shared.generalForm.get("textoAux9T")?.value ? this.shared.generalForm.get("textoAux9T")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio9T")?.value){
      this.generalForm.patchValue({
        textoCriterio9T: this.shared.generalForm.get("textoCriterio9T")?.value ? this.shared.generalForm.get("textoCriterio9T")?.value : ''
      })
    }

    // criterio 1
    this.generalForm.get("textoAux1T").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux1T: this.generalForm.get("textoAux1T")?.value ? this.generalForm.get("textoAux1T")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio1T").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio1T: this.generalForm.get("textoCriterio1T")?.value ? this.generalForm.get("textoCriterio1T")?.value : ''
      })
    })

    // criterio 2
    this.generalForm.get("textoAux2T").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux2T: this.generalForm.get("textoAux2T")?.value ? this.generalForm.get("textoAux2T")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio2T").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio2T: this.generalForm.get("textoCriterio2T")?.value ? this.generalForm.get("textoCriterio2T")?.value : ''
      })
    })

    // criterio 3
    this.generalForm.get("textoAux3T").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux3T: this.generalForm.get("textoAux3T")?.value ? this.generalForm.get("textoAux3T")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio3T").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio3T: this.generalForm.get("textoCriterio3T")?.value ? this.generalForm.get("textoCriterio3T")?.value : ''
      })
    })

    // criterio 4
    this.generalForm.get("textoAux4T").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux4T: this.generalForm.get("textoAux4T")?.value ? this.generalForm.get("textoAux4T")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio4T").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio4T: this.generalForm.get("textoCriterio4T")?.value ? this.generalForm.get("textoCriterio4T")?.value : ''
      })
    })

    // criterio 5
    this.generalForm.get("textoAux5T").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux5T: this.generalForm.get("textoAux5T")?.value ? this.generalForm.get("textoAux5T")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio5T").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio5T: this.generalForm.get("textoCriterio5T")?.value ? this.generalForm.get("textoCriterio5T")?.value : ''
      })
    })

    // criterio 6
    this.generalForm.get("textoAux6T").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux6T: this.generalForm.get("textoAux6T")?.value ? this.generalForm.get("textoAux6T")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio6T").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio6T: this.generalForm.get("textoCriterio6T")?.value ? this.generalForm.get("textoCriterio6T")?.value : ''
      })
    })

    // criterio 7
    this.generalForm.get("textoAux7T").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux7T: this.generalForm.get("textoAux7T")?.value ? this.generalForm.get("textoAux7T")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio7T").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio7T: this.generalForm.get("textoCriterio7T")?.value ? this.generalForm.get("textoCriterio7T")?.value : ''
      })
    })

    // criterio 8
    this.generalForm.get("textoAux8T").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux8T: this.generalForm.get("textoAux8T")?.value ? this.generalForm.get("textoAux8T")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio8T").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio8T: this.generalForm.get("textoCriterio8T")?.value ? this.generalForm.get("textoCriterio8T")?.value : ''
      })
    })

    // criterio 9
    this.generalForm.get("textoAux9T").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux9T: this.generalForm.get("textoAux9T")?.value ? this.generalForm.get("textoAux9T")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio9T").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio9T: this.generalForm.get("textoCriterio9T")?.value ? this.generalForm.get("textoCriterio9T")?.value : ''
      })
    })
  }

  lessAnd1T(){
    if ((this.generalForm.get("textoAux1T")?.value != '' && this.generalForm.get("textoCriterio1T")?.value == "Y Que Contenga")) {
      this.generalForm.patchValue({
          textoAux1T: "",
          textoCriterio1T: ""
      })
    }
  }

  lessAnd2T() {
    if ((this.generalForm.get("textoAux2T")?.value != '' && this.generalForm.get("textoCriterio2T")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux2T: "",
            textoCriterio2T: ""
        })
    }
  }

  lessAnd3T() {
    if ((this.generalForm.get("textoAux3T")?.value != '' && this.generalForm.get("textoCriterio3T")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux3T: "",
            textoCriterio3T: ""
        })
    }
  }

  lessAnd4T() {
    if ((this.generalForm.get("textoAux4T")?.value != '' && this.generalForm.get("textoCriterio4T")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux4T: "",
            textoCriterio4T: ""
        })
    }
  }

  lessAnd5T() {
    if ((this.generalForm.get("textoAux5T")?.value != '' && this.generalForm.get("textoCriterio5T")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux5T: "",
            textoCriterio5T: ""
        })
    }
  }

  lessAnd6T() {
    if ((this.generalForm.get("textoAux6T")?.value != '' && this.generalForm.get("textoCriterio6T")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux6T: "",
            textoCriterio6T: ""
        })
    }
  }

  lessAnd7T() {
    if ((this.generalForm.get("textoAux7T")?.value != '' && this.generalForm.get("textoCriterio7T")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux7T: "",
            textoCriterio7T: ""
        })
    }  
  }

  lessAnd8T() {
    if ((this.generalForm.get("textoAux8T")?.value != '' && this.generalForm.get("textoCriterio8T")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux8T: "",
            textoCriterio8T: ""
        })
    }  
  }

  lessAnd9T() {
    if ((this.generalForm.get("textoAux9T")?.value != '' && this.generalForm.get("textoCriterio9T")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux9T: "",
            textoCriterio9T: ""
        })
    }
  }

  lessOr1T() {
    if ((this.generalForm.get("textoAux1T")?.value != '' && this.generalForm.get("textoCriterio1T")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux1T: "",
            textoCriterio1T: ""
        })
    }
  }

  lessOr2T() {
      if ((this.generalForm.get("textoAux2T")?.value != '' && this.generalForm.get("textoCriterio2T")?.value == "O Que Contenga")) {
          this.generalForm.patchValue({
              textoAux2T: "",
              textoCriterio2T: ""
          })
      }
  }

  lessOr3T() {
    if ((this.generalForm.get("textoAux3T")?.value != '' && this.generalForm.get("textoCriterio3T")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux3T: "",
            textoCriterio3T: ""
        })
    }
  }

  lessOr4T() {
    if ((this.generalForm.get("textoAux4T")?.value != '' && this.generalForm.get("textoCriterio4T")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux4T: "",
            textoCriterio4T: ""
        })
    }
  }

  lessOr5T() {
    if ((this.generalForm.get("textoAux5T")?.value != '' && this.generalForm.get("textoCriterio5T")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux5T: "",
            textoCriterio5T: ""
        })
    }
  }

  lessOr6T() {
    if ((this.generalForm.get("textoAux6T")?.value != '' && this.generalForm.get("textoCriterio6T")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux6T: "",
            textoCriterio6T: ""
        })
    }
  }

  lessOr7T() {
    if ((this.generalForm.get("textoAux7T")?.value != '' && this.generalForm.get("textoCriterio7T")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux7T: "",
            textoCriterio7T: ""
        })
    }
  }

  lessOr8T() {
    if ((this.generalForm.get("textoAux8T")?.value != '' && this.generalForm.get("textoCriterio8T")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux8T: "",
            textoCriterio8T: ""
        })
    }
  }

  lessOr9T() {
    if ((this.generalForm.get("textoAux9T")?.value != '' && this.generalForm.get("textoCriterio9T")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux9T: "",
            textoCriterio9T: ""
        })
    }
  }

  lessEx1T() {
    if ((this.generalForm.get("textoAux1T")?.value != '' && this.generalForm.get("textoCriterio1T")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux1T: "",
            textoCriterio1T: ""
        })
    }
  }

  lessEx2T() {
    if ((this.generalForm.get("textoAux2T")?.value != '' && this.generalForm.get("textoCriterio2T")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux2T: "",
            textoCriterio2T: ""
        })
    }
  }

  lessEx3T() {
    if ((this.generalForm.get("textoAux3T")?.value != '' && this.generalForm.get("textoCriterio3T")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux3T: "",
            textoCriterio3T: ""
        })
    }
  }

  lessEx4T() {
    if ((this.generalForm.get("textoAux4T")?.value != '' && this.generalForm.get("textoCriterio4T")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux4T: "",
            textoCriterio4T: ""
        })
    }
  }

  lessEx5T() {
    if ((this.generalForm.get("textoAux5T")?.value != '' && this.generalForm.get("textoCriterio5T")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux5T: "",
            textoCriterio5T: ""
        })
    }
  }

  lessEx6T() {
    if ((this.generalForm.get("textoAux6T")?.value != '' && this.generalForm.get("textoCriterio6T")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux6T: "",
            textoCriterio6T: ""
        })
    }
  }

  lessEx7T() {
    if ((this.generalForm.get("textoAux7T")?.value != '' && this.generalForm.get("textoCriterio7T")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux7T: "",
            textoCriterio7T: ""
        })
    }
  }

  lessEx8T() {
    if ((this.generalForm.get("textoAux8T")?.value != '' && this.generalForm.get("textoCriterio8T")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux8T: "",
            textoCriterio8T: ""
        })
    }
  }

  lessEx9T() {
    if ((this.generalForm.get("textoAux9T")?.value != '' && this.generalForm.get("textoCriterio9T")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux9T: "",
            textoCriterio9T: ""
        })
    }
  }
}
