import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-operadores-logicos-d',
  templateUrl: './operadores-logicos-d.component.html',
  styleUrls: ['./operadores-logicos-d.component.css']
})
export class OperadoresLogicosDComponent implements OnInit {

  public shared: any;
  public generalForm: FormGroup;

  constructor( private AppComponent: AppComponent, public formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.shared = this.AppComponent;
    this.generalForm = new FormGroup({
      textoAux1D: new FormControl(),
      textoCriterio1D: new FormControl(),
      textoAux2D: new FormControl(),
      textoCriterio2D: new FormControl(),
      textoAux3D: new FormControl(),
      textoCriterio3D: new FormControl(),
      textoAux4D: new FormControl(),
      textoCriterio4D: new FormControl(),
      textoAux5D: new FormControl(),
      textoCriterio5D: new FormControl(),
      textoAux6D: new FormControl(),
      textoCriterio6D: new FormControl(),
      textoAux7D: new FormControl(),
      textoCriterio7D: new FormControl(),
      textoAux8D: new FormControl(),
      textoCriterio8D: new FormControl(),
      textoAux9D: new FormControl(),
      textoCriterio9D: new FormControl(),
    })
    
    // inicial criterio 1
    if(this.shared.generalForm.get("textoAux1D")?.value){
      this.generalForm.patchValue({
        textoAux1D: this.shared.generalForm.get("textoAux1D")?.value ? this.shared.generalForm.get("textoAux1D")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio1D")?.value){
      this.generalForm.patchValue({
        textoCriterio1D: this.shared.generalForm.get("textoCriterio1D")?.value ? this.shared.generalForm.get("textoCriterio1D")?.value : ''
      })
    }

    // inicial criterio 2
    if(this.shared.generalForm.get("textoAux2D")?.value){
      this.generalForm.patchValue({
        textoAux2D: this.shared.generalForm.get("textoAux2D")?.value ? this.shared.generalForm.get("textoAux2D")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio2D")?.value){
      this.generalForm.patchValue({
        textoCriterio2D: this.shared.generalForm.get("textoCriterio2D")?.value ? this.shared.generalForm.get("textoCriterio2D")?.value : ''
      })
    }

    // inicial criterio 3
    if(this.shared.generalForm.get("textoAux3D")?.value){
      this.generalForm.patchValue({
        textoAux3D: this.shared.generalForm.get("textoAux3D")?.value ? this.shared.generalForm.get("textoAux3D")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio3D")?.value){
      this.generalForm.patchValue({
        textoCriterio3D: this.shared.generalForm.get("textoCriterio3D")?.value ? this.shared.generalForm.get("textoCriterio3D")?.value : ''
      })
    }

    // inicial criterio 4
    if(this.shared.generalForm.get("textoAux4D")?.value){
      this.generalForm.patchValue({
        textoAux4D: this.shared.generalForm.get("textoAux4D")?.value ? this.shared.generalForm.get("textoAux4D")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio4D")?.value){
      this.generalForm.patchValue({
        textoCriterio4D: this.shared.generalForm.get("textoCriterio4D")?.value ? this.shared.generalForm.get("textoCriterio4D")?.value : ''
      })
    }

    // inicial criterio 5
    if(this.shared.generalForm.get("textoAux5D")?.value){
      this.generalForm.patchValue({
        textoAux5D: this.shared.generalForm.get("textoAux5D")?.value ? this.shared.generalForm.get("textoAux5D")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio5D")?.value){
      this.generalForm.patchValue({
        textoCriterio5D: this.shared.generalForm.get("textoCriterio5D")?.value ? this.shared.generalForm.get("textoCriterio5D")?.value : ''
      })
    }

    // inicial criterio 6
    if(this.shared.generalForm.get("textoAux6D")?.value){
      this.generalForm.patchValue({
        textoAux6D: this.shared.generalForm.get("textoAux6D")?.value ? this.shared.generalForm.get("textoAux6D")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio6D")?.value){
      this.generalForm.patchValue({
        textoCriterio6D: this.shared.generalForm.get("textoCriterio6D")?.value ? this.shared.generalForm.get("textoCriterio6D")?.value : ''
      })
    }

    // inicial criterio 7
    if(this.shared.generalForm.get("textoAux7D")?.value){
      this.generalForm.patchValue({
        textoAux7D: this.shared.generalForm.get("textoAux7D")?.value ? this.shared.generalForm.get("textoAux7D")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio7D")?.value){
      this.generalForm.patchValue({
        textoCriterio7D: this.shared.generalForm.get("textoCriterio7D")?.value ? this.shared.generalForm.get("textoCriterio7D")?.value : ''
      })
    }

    // inicial criterio 8
    if(this.shared.generalForm.get("textoAux8D")?.value){
      this.generalForm.patchValue({
        textoAux8D: this.shared.generalForm.get("textoAux8D")?.value ? this.shared.generalForm.get("textoAux8D")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio8D")?.value){
      this.generalForm.patchValue({
        textoCriterio8D: this.shared.generalForm.get("textoCriterio8D")?.value ? this.shared.generalForm.get("textoCriterio8D")?.value : ''
      })
    }

    // inicial criterio 9
    if(this.shared.generalForm.get("textoAux9D")?.value){
      this.generalForm.patchValue({
        textoAux9D: this.shared.generalForm.get("textoAux9D")?.value ? this.shared.generalForm.get("textoAux9D")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio9D")?.value){
      this.generalForm.patchValue({
        textoCriterio9D: this.shared.generalForm.get("textoCriterio9D")?.value ? this.shared.generalForm.get("textoCriterio9D")?.value : ''
      })
    }

    // criterio 1
    this.generalForm.get("textoAux1D").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux1D: this.generalForm.get("textoAux1D")?.value ? this.generalForm.get("textoAux1D")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio1D").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio1D: this.generalForm.get("textoCriterio1D")?.value ? this.generalForm.get("textoCriterio1D")?.value : ''
      })
    })

    // criterio 2
    this.generalForm.get("textoAux2D").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux2D: this.generalForm.get("textoAux2D")?.value ? this.generalForm.get("textoAux2D")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio2D").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio2D: this.generalForm.get("textoCriterio2D")?.value ? this.generalForm.get("textoCriterio2D")?.value : ''
      })
    })

    // criterio 3
    this.generalForm.get("textoAux3D").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux3D: this.generalForm.get("textoAux3D")?.value ? this.generalForm.get("textoAux3D")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio3D").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio3D: this.generalForm.get("textoCriterio3D")?.value ? this.generalForm.get("textoCriterio3D")?.value : ''
      })
    })

    // criterio 4
    this.generalForm.get("textoAux4D").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux4D: this.generalForm.get("textoAux4D")?.value ? this.generalForm.get("textoAux4D")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio4D").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio4D: this.generalForm.get("textoCriterio4D")?.value ? this.generalForm.get("textoCriterio4D")?.value : ''
      })
    })

    // criterio 5
    this.generalForm.get("textoAux5D").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux5D: this.generalForm.get("textoAux5D")?.value ? this.generalForm.get("textoAux5D")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio5D").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio5D: this.generalForm.get("textoCriterio5D")?.value ? this.generalForm.get("textoCriterio5D")?.value : ''
      })
    })

    // criterio 6
    this.generalForm.get("textoAux6D").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux6D: this.generalForm.get("textoAux6D")?.value ? this.generalForm.get("textoAux6D")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio6D").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio6D: this.generalForm.get("textoCriterio6D")?.value ? this.generalForm.get("textoCriterio6D")?.value : ''
      })
    })

    // criterio 7
    this.generalForm.get("textoAux7D").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux7D: this.generalForm.get("textoAux7D")?.value ? this.generalForm.get("textoAux7D")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio7D").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio7D: this.generalForm.get("textoCriterio7D")?.value ? this.generalForm.get("textoCriterio7D")?.value : ''
      })
    })

    // criterio 8
    this.generalForm.get("textoAux8D").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux8D: this.generalForm.get("textoAux8D")?.value ? this.generalForm.get("textoAux8D")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio8D").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio8D: this.generalForm.get("textoCriterio8D")?.value ? this.generalForm.get("textoCriterio8D")?.value : ''
      })
    })

    // criterio 9
    this.generalForm.get("textoAux9D").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux9D: this.generalForm.get("textoAux9D")?.value ? this.generalForm.get("textoAux9D")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio9D").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio9D: this.generalForm.get("textoCriterio9D")?.value ? this.generalForm.get("textoCriterio9D")?.value : ''
      })
    })
  }

  lessAnd1D(){
    if ((this.generalForm.get("textoAux1D")?.value != '' && this.generalForm.get("textoCriterio1D")?.value == "Y Que Contenga")) {
      this.generalForm.patchValue({
          textoAux1D: "",
          textoCriterio1D: ""
      })
    }
  }

  lessAnd2D() {
    if ((this.generalForm.get("textoAux2D")?.value != '' && this.generalForm.get("textoCriterio2D")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux2D: "",
            textoCriterio2D: ""
        })
    }
  }

  lessAnd3D() {
    if ((this.generalForm.get("textoAux3D")?.value != '' && this.generalForm.get("textoCriterio3D")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux3D: "",
            textoCriterio3D: ""
        })
    }
  }

  lessAnd4D() {
    if ((this.generalForm.get("textoAux4D")?.value != '' && this.generalForm.get("textoCriterio4D")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux4D: "",
            textoCriterio4D: ""
        })
    }
  }

  lessAnd5D() {
    if ((this.generalForm.get("textoAux5D")?.value != '' && this.generalForm.get("textoCriterio5D")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux5D: "",
            textoCriterio5D: ""
        })
    }
  }

  lessAnd6D() {
    if ((this.generalForm.get("textoAux6D")?.value != '' && this.generalForm.get("textoCriterio6D")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux6D: "",
            textoCriterio6D: ""
        })
    }
  }

  lessAnd7D() {
    if ((this.generalForm.get("textoAux7D")?.value != '' && this.generalForm.get("textoCriterio7D")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux7D: "",
            textoCriterio7D: ""
        })
    }  
  }

  lessAnd8D() {
    if ((this.generalForm.get("textoAux8D")?.value != '' && this.generalForm.get("textoCriterio8D")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux8D: "",
            textoCriterio8D: ""
        })
    }  
  }

  lessAnd9D() {
    if ((this.generalForm.get("textoAux9D")?.value != '' && this.generalForm.get("textoCriterio9D")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux9D: "",
            textoCriterio9D: ""
        })
    }
  }

  lessOr1D() {
    if ((this.generalForm.get("textoAux1D")?.value != '' && this.generalForm.get("textoCriterio1D")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux1D: "",
            textoCriterio1D: ""
        })
    }
  }

  lessOr2D() {
      if ((this.generalForm.get("textoAux2D")?.value != '' && this.generalForm.get("textoCriterio2D")?.value == "O Que Contenga")) {
          this.generalForm.patchValue({
              textoAux2D: "",
              textoCriterio2D: ""
          })
      }
  }

  lessOr3D() {
    if ((this.generalForm.get("textoAux3D")?.value != '' && this.generalForm.get("textoCriterio3D")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux3D: "",
            textoCriterio3D: ""
        })
    }
  }

  lessOr4D() {
    if ((this.generalForm.get("textoAux4D")?.value != '' && this.generalForm.get("textoCriterio4D")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux4D: "",
            textoCriterio4D: ""
        })
    }
  }

  lessOr5D() {
    if ((this.generalForm.get("textoAux5D")?.value != '' && this.generalForm.get("textoCriterio5D")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux5D: "",
            textoCriterio5D: ""
        })
    }
  }

  lessOr6D() {
    if ((this.generalForm.get("textoAux6D")?.value != '' && this.generalForm.get("textoCriterio6D")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux6D: "",
            textoCriterio6D: ""
        })
    }
  }

  lessOr7D() {
    if ((this.generalForm.get("textoAux7D")?.value != '' && this.generalForm.get("textoCriterio7D")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux7D: "",
            textoCriterio7D: ""
        })
    }
  }

  lessOr8D() {
    if ((this.generalForm.get("textoAux8D")?.value != '' && this.generalForm.get("textoCriterio8D")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux8D: "",
            textoCriterio8D: ""
        })
    }
  }

  lessOr9D() {
    if ((this.generalForm.get("textoAux9D")?.value != '' && this.generalForm.get("textoCriterio9D")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux9D: "",
            textoCriterio9D: ""
        })
    }
  }

  lessEx1D() {
    if ((this.generalForm.get("textoAux1D")?.value != '' && this.generalForm.get("textoCriterio1D")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux1D: "",
            textoCriterio1D: ""
        })
    }
  }

  lessEx2D() {
    if ((this.generalForm.get("textoAux2D")?.value != '' && this.generalForm.get("textoCriterio2D")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux2D: "",
            textoCriterio2D: ""
        })
    }
  }

  lessEx3D() {
    if ((this.generalForm.get("textoAux3D")?.value != '' && this.generalForm.get("textoCriterio3D")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux3D: "",
            textoCriterio3D: ""
        })
    }
  }

  lessEx4D() {
    if ((this.generalForm.get("textoAux4D")?.value != '' && this.generalForm.get("textoCriterio4D")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux4D: "",
            textoCriterio4D: ""
        })
    }
  }

  lessEx5D() {
    if ((this.generalForm.get("textoAux5D")?.value != '' && this.generalForm.get("textoCriterio5D")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux5D: "",
            textoCriterio5D: ""
        })
    }
  }

  lessEx6D() {
    if ((this.generalForm.get("textoAux6D")?.value != '' && this.generalForm.get("textoCriterio6D")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux6D: "",
            textoCriterio6D: ""
        })
    }
  }

  lessEx7D() {
    if ((this.generalForm.get("textoAux7D")?.value != '' && this.generalForm.get("textoCriterio7D")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux7D: "",
            textoCriterio7D: ""
        })
    }
  }

  lessEx8D() {
    if ((this.generalForm.get("textoAux8D")?.value != '' && this.generalForm.get("textoCriterio8D")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux8D: "",
            textoCriterio8D: ""
        })
    }
  }

  lessEx9D() {
    if ((this.generalForm.get("textoAux9D")?.value != '' && this.generalForm.get("textoCriterio9D")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux9D: "",
            textoCriterio9D: ""
        })
    }
  }
}
