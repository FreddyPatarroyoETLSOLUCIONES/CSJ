import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-operadores-logicos-c',
  templateUrl: './operadores-logicos-c.component.html',
  styleUrls: ['./operadores-logicos-c.component.css']
})
export class OperadoresLogicosCComponent implements OnInit {

  public shared: any;
  public generalForm: FormGroup;

  constructor( private AppComponent: AppComponent, public formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.shared = this.AppComponent;
    this.generalForm = new FormGroup({
      textoAux1C: new FormControl(),
      textoCriterio1C: new FormControl(),
      textoAux2C: new FormControl(),
      textoCriterio2C: new FormControl(),
      textoAux3C: new FormControl(),
      textoCriterio3C: new FormControl(),
      textoAux4C: new FormControl(),
      textoCriterio4C: new FormControl(),
      textoAux5C: new FormControl(),
      textoCriterio5C: new FormControl(),
      textoAux6C: new FormControl(),
      textoCriterio6C: new FormControl(),
      textoAux7C: new FormControl(),
      textoCriterio7C: new FormControl(),
      textoAux8C: new FormControl(),
      textoCriterio8C: new FormControl(),
      textoAux9C: new FormControl(),
      textoCriterio9C: new FormControl(),
    })
    
    // inicial criterio 1
    if(this.shared.generalForm.get("textoAux1C")?.value){
      this.generalForm.patchValue({
        textoAux1C: this.shared.generalForm.get("textoAux1C")?.value ? this.shared.generalForm.get("textoAux1C")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio1C")?.value){
      this.generalForm.patchValue({
        textoCriterio1C: this.shared.generalForm.get("textoCriterio1C")?.value ? this.shared.generalForm.get("textoCriterio1C")?.value : ''
      })
    }

    // inicial criterio 2
    if(this.shared.generalForm.get("textoAux2C")?.value){
      this.generalForm.patchValue({
        textoAux2C: this.shared.generalForm.get("textoAux2C")?.value ? this.shared.generalForm.get("textoAux2C")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio2C")?.value){
      this.generalForm.patchValue({
        textoCriterio2C: this.shared.generalForm.get("textoCriterio2C")?.value ? this.shared.generalForm.get("textoCriterio2C")?.value : ''
      })
    }

    // inicial criterio 3
    if(this.shared.generalForm.get("textoAux3C")?.value){
      this.generalForm.patchValue({
        textoAux3C: this.shared.generalForm.get("textoAux3C")?.value ? this.shared.generalForm.get("textoAux3C")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio3C")?.value){
      this.generalForm.patchValue({
        textoCriterio3C: this.shared.generalForm.get("textoCriterio3C")?.value ? this.shared.generalForm.get("textoCriterio3C")?.value : ''
      })
    }

    // inicial criterio 4
    if(this.shared.generalForm.get("textoAux4C")?.value){
      this.generalForm.patchValue({
        textoAux4C: this.shared.generalForm.get("textoAux4C")?.value ? this.shared.generalForm.get("textoAux4C")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio4C")?.value){
      this.generalForm.patchValue({
        textoCriterio4C: this.shared.generalForm.get("textoCriterio4C")?.value ? this.shared.generalForm.get("textoCriterio4C")?.value : ''
      })
    }

    // inicial criterio 5
    if(this.shared.generalForm.get("textoAux5C")?.value){
      this.generalForm.patchValue({
        textoAux5C: this.shared.generalForm.get("textoAux5C")?.value ? this.shared.generalForm.get("textoAux5C")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio5C")?.value){
      this.generalForm.patchValue({
        textoCriterio5C: this.shared.generalForm.get("textoCriterio5C")?.value ? this.shared.generalForm.get("textoCriterio5C")?.value : ''
      })
    }

    // inicial criterio 6
    if(this.shared.generalForm.get("textoAux6C")?.value){
      this.generalForm.patchValue({
        textoAux6C: this.shared.generalForm.get("textoAux6C")?.value ? this.shared.generalForm.get("textoAux6C")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio6C")?.value){
      this.generalForm.patchValue({
        textoCriterio6C: this.shared.generalForm.get("textoCriterio6C")?.value ? this.shared.generalForm.get("textoCriterio6C")?.value : ''
      })
    }

    // inicial criterio 7
    if(this.shared.generalForm.get("textoAux7C")?.value){
      this.generalForm.patchValue({
        textoAux7C: this.shared.generalForm.get("textoAux7C")?.value ? this.shared.generalForm.get("textoAux7C")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio7C")?.value){
      this.generalForm.patchValue({
        textoCriterio7C: this.shared.generalForm.get("textoCriterio7C")?.value ? this.shared.generalForm.get("textoCriterio7C")?.value : ''
      })
    }

    // inicial criterio 8
    if(this.shared.generalForm.get("textoAux8C")?.value){
      this.generalForm.patchValue({
        textoAux8C: this.shared.generalForm.get("textoAux8C")?.value ? this.shared.generalForm.get("textoAux8C")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio8C")?.value){
      this.generalForm.patchValue({
        textoCriterio8C: this.shared.generalForm.get("textoCriterio8C")?.value ? this.shared.generalForm.get("textoCriterio8C")?.value : ''
      })
    }

    // inicial criterio 9
    if(this.shared.generalForm.get("textoAux9C")?.value){
      this.generalForm.patchValue({
        textoAux9C: this.shared.generalForm.get("textoAux9C")?.value ? this.shared.generalForm.get("textoAux9C")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio9C")?.value){
      this.generalForm.patchValue({
        textoCriterio9C: this.shared.generalForm.get("textoCriterio9C")?.value ? this.shared.generalForm.get("textoCriterio9C")?.value : ''
      })
    }

    // criterio 1
    this.generalForm.get("textoAux1C").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux1C: this.generalForm.get("textoAux1C")?.value ? this.generalForm.get("textoAux1C")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio1C").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio1C: this.generalForm.get("textoCriterio1C")?.value ? this.generalForm.get("textoCriterio1C")?.value : ''
      })
    })

    // criterio 2
    this.generalForm.get("textoAux2C").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux2C: this.generalForm.get("textoAux2C")?.value ? this.generalForm.get("textoAux2C")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio2C").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio2C: this.generalForm.get("textoCriterio2C")?.value ? this.generalForm.get("textoCriterio2C")?.value : ''
      })
    })

    // criterio 3
    this.generalForm.get("textoAux3C").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux3C: this.generalForm.get("textoAux3C")?.value ? this.generalForm.get("textoAux3C")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio3C").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio3C: this.generalForm.get("textoCriterio3C")?.value ? this.generalForm.get("textoCriterio3C")?.value : ''
      })
    })

    // criterio 4
    this.generalForm.get("textoAux4C").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux4C: this.generalForm.get("textoAux4C")?.value ? this.generalForm.get("textoAux4C")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio4C").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio4C: this.generalForm.get("textoCriterio4C")?.value ? this.generalForm.get("textoCriterio4C")?.value : ''
      })
    })

    // criterio 5
    this.generalForm.get("textoAux5C").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux5C: this.generalForm.get("textoAux5C")?.value ? this.generalForm.get("textoAux5C")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio5C").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio5C: this.generalForm.get("textoCriterio5C")?.value ? this.generalForm.get("textoCriterio5C")?.value : ''
      })
    })

    // criterio 6
    this.generalForm.get("textoAux6C").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux6C: this.generalForm.get("textoAux6C")?.value ? this.generalForm.get("textoAux6C")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio6C").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio6C: this.generalForm.get("textoCriterio6C")?.value ? this.generalForm.get("textoCriterio6C")?.value : ''
      })
    })

    // criterio 7
    this.generalForm.get("textoAux7C").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux7C: this.generalForm.get("textoAux7C")?.value ? this.generalForm.get("textoAux7C")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio7C").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio7C: this.generalForm.get("textoCriterio7C")?.value ? this.generalForm.get("textoCriterio7C")?.value : ''
      })
    })

    // criterio 8
    this.generalForm.get("textoAux8C").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux8C: this.generalForm.get("textoAux8C")?.value ? this.generalForm.get("textoAux8C")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio8C").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio8C: this.generalForm.get("textoCriterio8C")?.value ? this.generalForm.get("textoCriterio8C")?.value : ''
      })
    })

    // criterio 9
    this.generalForm.get("textoAux9C").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux9C: this.generalForm.get("textoAux9C")?.value ? this.generalForm.get("textoAux9C")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio9C").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio9C: this.generalForm.get("textoCriterio9C")?.value ? this.generalForm.get("textoCriterio9C")?.value : ''
      })
    })
  }

  lessAnd1C(){
    if ((this.generalForm.get("textoAux1C")?.value != '' && this.generalForm.get("textoCriterio1C")?.value == "Y Que Contenga")) {
      this.generalForm.patchValue({
          textoAux1C: "",
          textoCriterio1C: ""
      })
    }
  }

  lessAnd2C() {
    if ((this.generalForm.get("textoAux2C")?.value != '' && this.generalForm.get("textoCriterio2C")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux2C: "",
            textoCriterio2C: ""
        })
    }
  }

  lessAnd3C() {
    if ((this.generalForm.get("textoAux3C")?.value != '' && this.generalForm.get("textoCriterio3C")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux3C: "",
            textoCriterio3C: ""
        })
    }
  }

  lessAnd4C() {
    if ((this.generalForm.get("textoAux4C")?.value != '' && this.generalForm.get("textoCriterio4C")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux4C: "",
            textoCriterio4C: ""
        })
    }
  }

  lessAnd5C() {
    if ((this.generalForm.get("textoAux5C")?.value != '' && this.generalForm.get("textoCriterio5C")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux5C: "",
            textoCriterio5C: ""
        })
    }
  }

  lessAnd6C() {
    if ((this.generalForm.get("textoAux6C")?.value != '' && this.generalForm.get("textoCriterio6C")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux6C: "",
            textoCriterio6C: ""
        })
    }
  }

  lessAnd7C() {
    if ((this.generalForm.get("textoAux7C")?.value != '' && this.generalForm.get("textoCriterio7C")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux7C: "",
            textoCriterio7C: ""
        })
    }  
  }

  lessAnd8C() {
    if ((this.generalForm.get("textoAux8C")?.value != '' && this.generalForm.get("textoCriterio8C")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux8C: "",
            textoCriterio8C: ""
        })
    }  
  }

  lessAnd9C() {
    if ((this.generalForm.get("textoAux9C")?.value != '' && this.generalForm.get("textoCriterio9C")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux9C: "",
            textoCriterio9C: ""
        })
    }
  }

  lessOr1C() {
    if ((this.generalForm.get("textoAux1C")?.value != '' && this.generalForm.get("textoCriterio1C")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux1C: "",
            textoCriterio1C: ""
        })
    }
  }

  lessOr2C() {
      if ((this.generalForm.get("textoAux2C")?.value != '' && this.generalForm.get("textoCriterio2C")?.value == "O Que Contenga")) {
          this.generalForm.patchValue({
              textoAux2C: "",
              textoCriterio2C: ""
          })
      }
  }

  lessOr3C() {
    if ((this.generalForm.get("textoAux3C")?.value != '' && this.generalForm.get("textoCriterio3C")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux3C: "",
            textoCriterio3C: ""
        })
    }
  }

  lessOr4C() {
    if ((this.generalForm.get("textoAux4C")?.value != '' && this.generalForm.get("textoCriterio4C")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux4C: "",
            textoCriterio4C: ""
        })
    }
  }

  lessOr5C() {
    if ((this.generalForm.get("textoAux5C")?.value != '' && this.generalForm.get("textoCriterio5C")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux5C: "",
            textoCriterio5C: ""
        })
    }
  }

  lessOr6C() {
    if ((this.generalForm.get("textoAux6C")?.value != '' && this.generalForm.get("textoCriterio6C")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux6C: "",
            textoCriterio6C: ""
        })
    }
  }

  lessOr7C() {
    if ((this.generalForm.get("textoAux7C")?.value != '' && this.generalForm.get("textoCriterio7C")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux7C: "",
            textoCriterio7C: ""
        })
    }
  }

  lessOr8C() {
    if ((this.generalForm.get("textoAux8C")?.value != '' && this.generalForm.get("textoCriterio8C")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux8C: "",
            textoCriterio8C: ""
        })
    }
  }

  lessOr9C() {
    if ((this.generalForm.get("textoAux9C")?.value != '' && this.generalForm.get("textoCriterio9C")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux9C: "",
            textoCriterio9C: ""
        })
    }
  }

  lessEx1C() {
    if ((this.generalForm.get("textoAux1C")?.value != '' && this.generalForm.get("textoCriterio1C")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux1C: "",
            textoCriterio1C: ""
        })
    }
  }

  lessEx2C() {
    if ((this.generalForm.get("textoAux2C")?.value != '' && this.generalForm.get("textoCriterio2C")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux2C: "",
            textoCriterio2C: ""
        })
    }
  }

  lessEx3C() {
    if ((this.generalForm.get("textoAux3C")?.value != '' && this.generalForm.get("textoCriterio3C")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux3C: "",
            textoCriterio3C: ""
        })
    }
  }

  lessEx4C() {
    if ((this.generalForm.get("textoAux4C")?.value != '' && this.generalForm.get("textoCriterio4C")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux4C: "",
            textoCriterio4C: ""
        })
    }
  }

  lessEx5C() {
    if ((this.generalForm.get("textoAux5C")?.value != '' && this.generalForm.get("textoCriterio5C")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux5C: "",
            textoCriterio5C: ""
        })
    }
  }

  lessEx6C() {
    if ((this.generalForm.get("textoAux6C")?.value != '' && this.generalForm.get("textoCriterio6C")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux6C: "",
            textoCriterio6C: ""
        })
    }
  }

  lessEx7C() {
    if ((this.generalForm.get("textoAux7C")?.value != '' && this.generalForm.get("textoCriterio7C")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux7C: "",
            textoCriterio7C: ""
        })
    }
  }

  lessEx8C() {
    if ((this.generalForm.get("textoAux8C")?.value != '' && this.generalForm.get("textoCriterio8C")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux8C: "",
            textoCriterio8C: ""
        })
    }
  }

  lessEx9C() {
    if ((this.generalForm.get("textoAux9C")?.value != '' && this.generalForm.get("textoCriterio9C")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux9C: "",
            textoCriterio9C: ""
        })
    }
  }
}
