import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-operadores-logicos-a',
  templateUrl: './operadores-logicos-a.component.html',
  styleUrls: ['./operadores-logicos-a.component.css']
})
export class OperadoresLogicosAComponent implements OnInit {

  public shared: any;
  public generalForm: FormGroup;

  constructor( private AppComponent: AppComponent, public formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.shared = this.AppComponent;
    
    this.generalForm = new FormGroup({
      textoAux1A: new FormControl(),
      textoCriterio1A: new FormControl(),
      textoAux2A: new FormControl(),
      textoCriterio2A: new FormControl(),
      textoAux3A: new FormControl(),
      textoCriterio3A: new FormControl(),
      textoAux4A: new FormControl(),
      textoCriterio4A: new FormControl(),
      textoAux5A: new FormControl(),
      textoCriterio5A: new FormControl(),
      textoAux6A: new FormControl(),
      textoCriterio6A: new FormControl(),
      textoAux7A: new FormControl(),
      textoCriterio7A: new FormControl(),
      textoAux8A: new FormControl(),
      textoCriterio8A: new FormControl(),
      textoAux9A: new FormControl(),
      textoCriterio9A: new FormControl(),
    })
    
    // inicial criterio 1
    if(this.shared.generalForm.get("textoAux1A")?.value){
      this.generalForm.patchValue({
        textoAux1A: this.shared.generalForm.get("textoAux1A")?.value ? this.shared.generalForm.get("textoAux1A")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio1A")?.value){
      this.generalForm.patchValue({
        textoCriterio1A: this.shared.generalForm.get("textoCriterio1A")?.value ? this.shared.generalForm.get("textoCriterio1A")?.value : ''
      })
    }

    // inicial criterio 2
    if(this.shared.generalForm.get("textoAux2A")?.value){
      this.generalForm.patchValue({
        textoAux2A: this.shared.generalForm.get("textoAux2A")?.value ? this.shared.generalForm.get("textoAux2A")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio2A")?.value){
      this.generalForm.patchValue({
        textoCriterio2A: this.shared.generalForm.get("textoCriterio2A")?.value ? this.shared.generalForm.get("textoCriterio2A")?.value : ''
      })
    }

    // inicial criterio 3
    if(this.shared.generalForm.get("textoAux3A")?.value){
      this.generalForm.patchValue({
        textoAux3A: this.shared.generalForm.get("textoAux3A")?.value ? this.shared.generalForm.get("textoAux3A")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio3A")?.value){
      this.generalForm.patchValue({
        textoCriterio3A: this.shared.generalForm.get("textoCriterio3A")?.value ? this.shared.generalForm.get("textoCriterio3A")?.value : ''
      })
    }

    // inicial criterio 4
    if(this.shared.generalForm.get("textoAux4A")?.value){
      this.generalForm.patchValue({
        textoAux4A: this.shared.generalForm.get("textoAux4A")?.value ? this.shared.generalForm.get("textoAux4A")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio4A")?.value){
      this.generalForm.patchValue({
        textoCriterio4A: this.shared.generalForm.get("textoCriterio4A")?.value ? this.shared.generalForm.get("textoCriterio4A")?.value : ''
      })
    }

    // inicial criterio 5
    if(this.shared.generalForm.get("textoAux5A")?.value){
      this.generalForm.patchValue({
        textoAux5A: this.shared.generalForm.get("textoAux5A")?.value ? this.shared.generalForm.get("textoAux5A")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio5A")?.value){
      this.generalForm.patchValue({
        textoCriterio5A: this.shared.generalForm.get("textoCriterio5A")?.value ? this.shared.generalForm.get("textoCriterio5A")?.value : ''
      })
    }

    // inicial criterio 6
    if(this.shared.generalForm.get("textoAux6A")?.value){
      this.generalForm.patchValue({
        textoAux6A: this.shared.generalForm.get("textoAux6A")?.value ? this.shared.generalForm.get("textoAux6A")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio6A")?.value){
      this.generalForm.patchValue({
        textoCriterio6A: this.shared.generalForm.get("textoCriterio6A")?.value ? this.shared.generalForm.get("textoCriterio6A")?.value : ''
      })
    }

    // inicial criterio 7
    if(this.shared.generalForm.get("textoAux7A")?.value){
      this.generalForm.patchValue({
        textoAux7A: this.shared.generalForm.get("textoAux7A")?.value ? this.shared.generalForm.get("textoAux7A")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio7A")?.value){
      this.generalForm.patchValue({
        textoCriterio7A: this.shared.generalForm.get("textoCriterio7A")?.value ? this.shared.generalForm.get("textoCriterio7A")?.value : ''
      })
    }

    // inicial criterio 8
    if(this.shared.generalForm.get("textoAux8A")?.value){
      this.generalForm.patchValue({
        textoAux8A: this.shared.generalForm.get("textoAux8A")?.value ? this.shared.generalForm.get("textoAux8A")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio8A")?.value){
      this.generalForm.patchValue({
        textoCriterio8A: this.shared.generalForm.get("textoCriterio8A")?.value ? this.shared.generalForm.get("textoCriterio8A")?.value : ''
      })
    }

    // inicial criterio 9
    if(this.shared.generalForm.get("textoAux9A")?.value){
      this.generalForm.patchValue({
        textoAux9A: this.shared.generalForm.get("textoAux9A")?.value ? this.shared.generalForm.get("textoAux9A")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio9A")?.value){
      this.generalForm.patchValue({
        textoCriterio9A: this.shared.generalForm.get("textoCriterio9A")?.value ? this.shared.generalForm.get("textoCriterio9A")?.value : ''
      })
    }

    // criterio 1
    this.generalForm.get("textoAux1A").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux1A: this.generalForm.get("textoAux1A")?.value ? this.generalForm.get("textoAux1A")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio1A").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio1A: this.generalForm.get("textoCriterio1A")?.value ? this.generalForm.get("textoCriterio1A")?.value : ''
      })
    })

    // criterio 2
    this.generalForm.get("textoAux2A").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux2A: this.generalForm.get("textoAux2A")?.value ? this.generalForm.get("textoAux2A")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio2A").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio2A: this.generalForm.get("textoCriterio2A")?.value ? this.generalForm.get("textoCriterio2A")?.value : ''
      })
    })

    // criterio 3
    this.generalForm.get("textoAux3A").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux3A: this.generalForm.get("textoAux3A")?.value ? this.generalForm.get("textoAux3A")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio3A").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio3A: this.generalForm.get("textoCriterio3A")?.value ? this.generalForm.get("textoCriterio3A")?.value : ''
      })
    })

    // criterio 4
    this.generalForm.get("textoAux4A").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux4A: this.generalForm.get("textoAux4A")?.value ? this.generalForm.get("textoAux4A")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio4A").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio4A: this.generalForm.get("textoCriterio4A")?.value ? this.generalForm.get("textoCriterio4A")?.value : ''
      })
    })

    // criterio 5
    this.generalForm.get("textoAux5A").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux5A: this.generalForm.get("textoAux5A")?.value ? this.generalForm.get("textoAux5A")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio5A").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio5A: this.generalForm.get("textoCriterio5A")?.value ? this.generalForm.get("textoCriterio5A")?.value : ''
      })
    })

    // criterio 6
    this.generalForm.get("textoAux6A").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux6A: this.generalForm.get("textoAux6A")?.value ? this.generalForm.get("textoAux6A")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio6A").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio6A: this.generalForm.get("textoCriterio6A")?.value ? this.generalForm.get("textoCriterio6A")?.value : ''
      })
    })

    // criterio 7
    this.generalForm.get("textoAux7A").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux7A: this.generalForm.get("textoAux7A")?.value ? this.generalForm.get("textoAux7A")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio7A").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio7A: this.generalForm.get("textoCriterio7A")?.value ? this.generalForm.get("textoCriterio7A")?.value : ''
      })
    })

    // criterio 8
    this.generalForm.get("textoAux8A").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux8A: this.generalForm.get("textoAux8A")?.value ? this.generalForm.get("textoAux8A")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio8A").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio8A: this.generalForm.get("textoCriterio8A")?.value ? this.generalForm.get("textoCriterio8A")?.value : ''
      })
    })

    // criterio 9
    this.generalForm.get("textoAux9A").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux9A: this.generalForm.get("textoAux9A")?.value ? this.generalForm.get("textoAux9A")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio9A").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio9A: this.generalForm.get("textoCriterio9A")?.value ? this.generalForm.get("textoCriterio9A")?.value : ''
      })
    })
  }

  lessAnd1A(){
    if ((this.generalForm.get("textoAux1A")?.value != '' && this.generalForm.get("textoCriterio1A")?.value == "Y Que Contenga")) {
      this.generalForm.patchValue({
          textoAux1A: "",
          textoCriterio1A: ""
      })
    }
  }

  lessAnd2A() {
    if ((this.generalForm.get("textoAux2A")?.value != '' && this.generalForm.get("textoCriterio2A")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux2A: "",
            textoCriterio2A: ""
        })
    }
  }

lessAnd3A() {
    if ((this.generalForm.get("textoAux3A")?.value != '' && this.generalForm.get("textoCriterio3A")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux3A: "",
            textoCriterio3A: ""
        })
    }
  }

lessAnd4A() {
    if ((this.generalForm.get("textoAux4A")?.value != '' && this.generalForm.get("textoCriterio4A")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux4A: "",
            textoCriterio4A: ""
        })
    }
  }

lessAnd5A() {
    if ((this.generalForm.get("textoAux5A")?.value != '' && this.generalForm.get("textoCriterio5A")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux5A: "",
            textoCriterio5A: ""
        })
    }
  }

lessAnd6A() {
    if ((this.generalForm.get("textoAux6A")?.value != '' && this.generalForm.get("textoCriterio6A")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux6A: "",
            textoCriterio6A: ""
        })
    }
  }

lessAnd7A() {
    if ((this.generalForm.get("textoAux7A")?.value != '' && this.generalForm.get("textoCriterio7A")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux7A: "",
            textoCriterio7A: ""
        })
    }  
  }

lessAnd8A() {
    if ((this.generalForm.get("textoAux8A")?.value != '' && this.generalForm.get("textoCriterio8A")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux8A: "",
            textoCriterio8A: ""
        })
    }  
  }

lessAnd9A() {
    if ((this.generalForm.get("textoAux9A")?.value != '' && this.generalForm.get("textoCriterio9A")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux9A: "",
            textoCriterio9A: ""
        })
    }
  }

  lessOr1A() {
    if ((this.generalForm.get("textoAux1A")?.value != '' && this.generalForm.get("textoCriterio1A")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux1A: "",
            textoCriterio1A: ""
        })
    }
  }

  lessOr2A() {
      if ((this.generalForm.get("textoAux2A")?.value != '' && this.generalForm.get("textoCriterio2A")?.value == "O Que Contenga")) {
          this.generalForm.patchValue({
              textoAux2A: "",
              textoCriterio2A: ""
          })
      }
  }

  lessOr3A() {
    if ((this.generalForm.get("textoAux3A")?.value != '' && this.generalForm.get("textoCriterio3A")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux3A: "",
            textoCriterio3A: ""
        })
    }
  }

  lessOr4A() {
    if ((this.generalForm.get("textoAux4A")?.value != '' && this.generalForm.get("textoCriterio4A")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux4A: "",
            textoCriterio4A: ""
        })
    }
  }

  lessOr5A() {
    if ((this.generalForm.get("textoAux5A")?.value != '' && this.generalForm.get("textoCriterio5A")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux5A: "",
            textoCriterio5A: ""
        })
    }
  }

  lessOr6A() {
    if ((this.generalForm.get("textoAux6A")?.value != '' && this.generalForm.get("textoCriterio6A")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux6A: "",
            textoCriterio6A: ""
        })
    }
  }

  lessOr7A() {
    if ((this.generalForm.get("textoAux7A")?.value != '' && this.generalForm.get("textoCriterio7A")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux7A: "",
            textoCriterio7A: ""
        })
    }
  }

  lessOr8A() {
    if ((this.generalForm.get("textoAux8A")?.value != '' && this.generalForm.get("textoCriterio8A")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux8A: "",
            textoCriterio8A: ""
        })
    }
  }

  lessOr9A() {
    if ((this.generalForm.get("textoAux9A")?.value != '' && this.generalForm.get("textoCriterio9A")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux9A: "",
            textoCriterio9A: ""
        })
    }
  }

  lessEx1A() {
    if ((this.generalForm.get("textoAux1A")?.value != '' && this.generalForm.get("textoCriterio1A")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux1A: "",
            textoCriterio1A: ""
        })
    }
  }

  lessEx2A() {
    if ((this.generalForm.get("textoAux2A")?.value != '' && this.generalForm.get("textoCriterio2A")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux2A: "",
            textoCriterio2A: ""
        })
    }
  }

  lessEx3A() {
    if ((this.generalForm.get("textoAux3A")?.value != '' && this.generalForm.get("textoCriterio3A")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux3A: "",
            textoCriterio3A: ""
        })
    }
  }

  lessEx4A() {
    if ((this.generalForm.get("textoAux4A")?.value != '' && this.generalForm.get("textoCriterio4A")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux4A: "",
            textoCriterio4A: ""
        })
    }
  }

  lessEx5A() {
    if ((this.generalForm.get("textoAux5A")?.value != '' && this.generalForm.get("textoCriterio5A")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux5A: "",
            textoCriterio5A: ""
        })
    }
  }

  lessEx6A() {
    if ((this.generalForm.get("textoAux6A")?.value != '' && this.generalForm.get("textoCriterio6A")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux6A: "",
            textoCriterio6A: ""
        })
    }
  }

  lessEx7A() {
    if ((this.generalForm.get("textoAux7A")?.value != '' && this.generalForm.get("textoCriterio7A")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux7A: "",
            textoCriterio7A: ""
        })
    }
  }

  lessEx8A() {
    if ((this.generalForm.get("textoAux8A")?.value != '' && this.generalForm.get("textoCriterio8A")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux8A: "",
            textoCriterio8A: ""
        })
    }
  }

  lessEx9A() {
    if ((this.generalForm.get("textoAux9A")?.value != '' && this.generalForm.get("textoCriterio9A")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux9A: "",
            textoCriterio9A: ""
        })
    }
  }

}
