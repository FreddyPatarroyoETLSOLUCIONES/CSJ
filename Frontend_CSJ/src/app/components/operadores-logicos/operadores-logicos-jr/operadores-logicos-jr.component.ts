import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-operadores-logicos-jr',
  templateUrl: './operadores-logicos-jr.component.html',
  styleUrls: ['./operadores-logicos-jr.component.css']
})
export class OperadoresLogicosJrComponent implements OnInit {

  public shared: any;
  public generalForm: FormGroup;

  constructor( private AppComponent: AppComponent, public formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.shared = this.AppComponent;
    this.generalForm = new FormGroup({
      textoAux1JR: new FormControl(),
      textoCriterio1JR: new FormControl(),
      textoAux2JR: new FormControl(),
      textoCriterio2JR: new FormControl(),
      textoAux3JR: new FormControl(),
      textoCriterio3JR: new FormControl(),
      textoAux4JR: new FormControl(),
      textoCriterio4JR: new FormControl(),
      textoAux5JR: new FormControl(),
      textoCriterio5JR: new FormControl(),
      textoAux6JR: new FormControl(),
      textoCriterio6JR: new FormControl(),
      textoAux7JR: new FormControl(),
      textoCriterio7JR: new FormControl(),
      textoAux8JR: new FormControl(),
      textoCriterio8JR: new FormControl(),
      textoAux9JR: new FormControl(),
      textoCriterio9JR: new FormControl(),
    })
    
    // inicial criterio 1
    if(this.shared.generalForm.get("textoAux1JR")?.value){
      this.generalForm.patchValue({
        textoAux1JR: this.shared.generalForm.get("textoAux1JR")?.value ? this.shared.generalForm.get("textoAux1JR")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio1JR")?.value){
      this.generalForm.patchValue({
        textoCriterio1JR: this.shared.generalForm.get("textoCriterio1JR")?.value ? this.shared.generalForm.get("textoCriterio1JR")?.value : ''
      })
    }

    // inicial criterio 2
    if(this.shared.generalForm.get("textoAux2JR")?.value){
      this.generalForm.patchValue({
        textoAux2JR: this.shared.generalForm.get("textoAux2JR")?.value ? this.shared.generalForm.get("textoAux2JR")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio2JR")?.value){
      this.generalForm.patchValue({
        textoCriterio2JR: this.shared.generalForm.get("textoCriterio2JR")?.value ? this.shared.generalForm.get("textoCriterio2JR")?.value : ''
      })
    }

    // inicial criterio 3
    if(this.shared.generalForm.get("textoAux3JR")?.value){
      this.generalForm.patchValue({
        textoAux3JR: this.shared.generalForm.get("textoAux3JR")?.value ? this.shared.generalForm.get("textoAux3JR")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio3JR")?.value){
      this.generalForm.patchValue({
        textoCriterio3JR: this.shared.generalForm.get("textoCriterio3JR")?.value ? this.shared.generalForm.get("textoCriterio3JR")?.value : ''
      })
    }

    // inicial criterio 4
    if(this.shared.generalForm.get("textoAux4JR")?.value){
      this.generalForm.patchValue({
        textoAux4JR: this.shared.generalForm.get("textoAux4JR")?.value ? this.shared.generalForm.get("textoAux4JR")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio4JR")?.value){
      this.generalForm.patchValue({
        textoCriterio4JR: this.shared.generalForm.get("textoCriterio4JR")?.value ? this.shared.generalForm.get("textoCriterio4JR")?.value : ''
      })
    }

    // inicial criterio 5
    if(this.shared.generalForm.get("textoAux5JR")?.value){
      this.generalForm.patchValue({
        textoAux5JR: this.shared.generalForm.get("textoAux5JR")?.value ? this.shared.generalForm.get("textoAux5JR")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio5JR")?.value){
      this.generalForm.patchValue({
        textoCriterio5JR: this.shared.generalForm.get("textoCriterio5JR")?.value ? this.shared.generalForm.get("textoCriterio5JR")?.value : ''
      })
    }

    // inicial criterio 6
    if(this.shared.generalForm.get("textoAux6JR")?.value){
      this.generalForm.patchValue({
        textoAux6JR: this.shared.generalForm.get("textoAux6JR")?.value ? this.shared.generalForm.get("textoAux6JR")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio6JR")?.value){
      this.generalForm.patchValue({
        textoCriterio6JR: this.shared.generalForm.get("textoCriterio6JR")?.value ? this.shared.generalForm.get("textoCriterio6JR")?.value : ''
      })
    }

    // inicial criterio 7
    if(this.shared.generalForm.get("textoAux7JR")?.value){
      this.generalForm.patchValue({
        textoAux7JR: this.shared.generalForm.get("textoAux7JR")?.value ? this.shared.generalForm.get("textoAux7JR")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio7JR")?.value){
      this.generalForm.patchValue({
        textoCriterio7JR: this.shared.generalForm.get("textoCriterio7JR")?.value ? this.shared.generalForm.get("textoCriterio7JR")?.value : ''
      })
    }

    // inicial criterio 8
    if(this.shared.generalForm.get("textoAux8JR")?.value){
      this.generalForm.patchValue({
        textoAux8JR: this.shared.generalForm.get("textoAux8JR")?.value ? this.shared.generalForm.get("textoAux8JR")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio8JR")?.value){
      this.generalForm.patchValue({
        textoCriterio8JR: this.shared.generalForm.get("textoCriterio8JR")?.value ? this.shared.generalForm.get("textoCriterio8JR")?.value : ''
      })
    }

    // inicial criterio 9
    if(this.shared.generalForm.get("textoAux9JR")?.value){
      this.generalForm.patchValue({
        textoAux9JR: this.shared.generalForm.get("textoAux9JR")?.value ? this.shared.generalForm.get("textoAux9JR")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio9JR")?.value){
      this.generalForm.patchValue({
        textoCriterio9JR: this.shared.generalForm.get("textoCriterio9JR")?.value ? this.shared.generalForm.get("textoCriterio9JR")?.value : ''
      })
    }

    // criterio 1
    this.generalForm.get("textoAux1JR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux1JR: this.generalForm.get("textoAux1JR")?.value ? this.generalForm.get("textoAux1JR")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio1JR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio1JR: this.generalForm.get("textoCriterio1JR")?.value ? this.generalForm.get("textoCriterio1JR")?.value : ''
      })
    })

    // criterio 2
    this.generalForm.get("textoAux2JR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux2JR: this.generalForm.get("textoAux2JR")?.value ? this.generalForm.get("textoAux2JR")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio2JR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio2JR: this.generalForm.get("textoCriterio2JR")?.value ? this.generalForm.get("textoCriterio2JR")?.value : ''
      })
    })

    // criterio 3
    this.generalForm.get("textoAux3JR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux3JR: this.generalForm.get("textoAux3JR")?.value ? this.generalForm.get("textoAux3JR")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio3JR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio3JR: this.generalForm.get("textoCriterio3JR")?.value ? this.generalForm.get("textoCriterio3JR")?.value : ''
      })
    })

    // criterio 4
    this.generalForm.get("textoAux4JR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux4JR: this.generalForm.get("textoAux4JR")?.value ? this.generalForm.get("textoAux4JR")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio4JR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio4JR: this.generalForm.get("textoCriterio4JR")?.value ? this.generalForm.get("textoCriterio4JR")?.value : ''
      })
    })

    // criterio 5
    this.generalForm.get("textoAux5JR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux5JR: this.generalForm.get("textoAux5JR")?.value ? this.generalForm.get("textoAux5JR")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio5JR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio5JR: this.generalForm.get("textoCriterio5JR")?.value ? this.generalForm.get("textoCriterio5JR")?.value : ''
      })
    })

    // criterio 6
    this.generalForm.get("textoAux6JR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux6JR: this.generalForm.get("textoAux6JR")?.value ? this.generalForm.get("textoAux6JR")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio6JR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio6JR: this.generalForm.get("textoCriterio6JR")?.value ? this.generalForm.get("textoCriterio6JR")?.value : ''
      })
    })

    // criterio 7
    this.generalForm.get("textoAux7JR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux7JR: this.generalForm.get("textoAux7JR")?.value ? this.generalForm.get("textoAux7JR")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio7JR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio7JR: this.generalForm.get("textoCriterio7JR")?.value ? this.generalForm.get("textoCriterio7JR")?.value : ''
      })
    })

    // criterio 8
    this.generalForm.get("textoAux8JR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux8JR: this.generalForm.get("textoAux8JR")?.value ? this.generalForm.get("textoAux8JR")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio8JR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio8JR: this.generalForm.get("textoCriterio8JR")?.value ? this.generalForm.get("textoCriterio8JR")?.value : ''
      })
    })

    // criterio 9
    this.generalForm.get("textoAux9JR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux9JR: this.generalForm.get("textoAux9JR")?.value ? this.generalForm.get("textoAux9JR")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio9JR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio9JR: this.generalForm.get("textoCriterio9JR")?.value ? this.generalForm.get("textoCriterio9JR")?.value : ''
      })
    })
  }

  lessAnd1JR(){
    if ((this.generalForm.get("textoAux1JR")?.value != '' && this.generalForm.get("textoCriterio1JR")?.value == "Y Que Contenga")) {
      this.generalForm.patchValue({
          textoAux1JR: "",
          textoCriterio1JR: ""
      })
    }
  }

  lessAnd2JR() {
    if ((this.generalForm.get("textoAux2JR")?.value != '' && this.generalForm.get("textoCriterio2JR")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux2JR: "",
            textoCriterio2JR: ""
        })
    }
  }

  lessAnd3JR() {
    if ((this.generalForm.get("textoAux3JR")?.value != '' && this.generalForm.get("textoCriterio3JR")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux3JR: "",
            textoCriterio3JR: ""
        })
    }
  }

  lessAnd4JR() {
    if ((this.generalForm.get("textoAux4JR")?.value != '' && this.generalForm.get("textoCriterio4JR")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux4JR: "",
            textoCriterio4JR: ""
        })
    }
  }

  lessAnd5JR() {
    if ((this.generalForm.get("textoAux5JR")?.value != '' && this.generalForm.get("textoCriterio5JR")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux5JR: "",
            textoCriterio5JR: ""
        })
    }
  }

  lessAnd6JR() {
    if ((this.generalForm.get("textoAux6JR")?.value != '' && this.generalForm.get("textoCriterio6JR")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux6JR: "",
            textoCriterio6JR: ""
        })
    }
  }

  lessAnd7JR() {
    if ((this.generalForm.get("textoAux7JR")?.value != '' && this.generalForm.get("textoCriterio7JR")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux7JR: "",
            textoCriterio7JR: ""
        })
    }  
  }

  lessAnd8JR() {
    if ((this.generalForm.get("textoAux8JR")?.value != '' && this.generalForm.get("textoCriterio8JR")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux8JR: "",
            textoCriterio8JR: ""
        })
    }  
  }

  lessAnd9JR() {
    if ((this.generalForm.get("textoAux9JR")?.value != '' && this.generalForm.get("textoCriterio9JR")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux9JR: "",
            textoCriterio9JR: ""
        })
    }
  }

  lessOr1JR() {
    if ((this.generalForm.get("textoAux1JR")?.value != '' && this.generalForm.get("textoCriterio1JR")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux1JR: "",
            textoCriterio1JR: ""
        })
    }
  }

  lessOr2JR() {
      if ((this.generalForm.get("textoAux2JR")?.value != '' && this.generalForm.get("textoCriterio2JR")?.value == "O Que Contenga")) {
          this.generalForm.patchValue({
              textoAux2JR: "",
              textoCriterio2JR: ""
          })
      }
  }

  lessOr3JR() {
    if ((this.generalForm.get("textoAux3JR")?.value != '' && this.generalForm.get("textoCriterio3JR")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux3JR: "",
            textoCriterio3JR: ""
        })
    }
  }

  lessOr4JR() {
    if ((this.generalForm.get("textoAux4JR")?.value != '' && this.generalForm.get("textoCriterio4JR")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux4JR: "",
            textoCriterio4JR: ""
        })
    }
  }

  lessOr5JR() {
    if ((this.generalForm.get("textoAux5JR")?.value != '' && this.generalForm.get("textoCriterio5JR")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux5JR: "",
            textoCriterio5JR: ""
        })
    }
  }

  lessOr6JR() {
    if ((this.generalForm.get("textoAux6JR")?.value != '' && this.generalForm.get("textoCriterio6JR")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux6JR: "",
            textoCriterio6JR: ""
        })
    }
  }

  lessOr7JR() {
    if ((this.generalForm.get("textoAux7JR")?.value != '' && this.generalForm.get("textoCriterio7JR")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux7JR: "",
            textoCriterio7JR: ""
        })
    }
  }

  lessOr8JR() {
    if ((this.generalForm.get("textoAux8JR")?.value != '' && this.generalForm.get("textoCriterio8JR")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux8JR: "",
            textoCriterio8JR: ""
        })
    }
  }

  lessOr9JR() {
    if ((this.generalForm.get("textoAux9JR")?.value != '' && this.generalForm.get("textoCriterio9JR")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux9JR: "",
            textoCriterio9JR: ""
        })
    }
  }

  lessEx1JR() {
    if ((this.generalForm.get("textoAux1JR")?.value != '' && this.generalForm.get("textoCriterio1JR")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux1JR: "",
            textoCriterio1JR: ""
        })
    }
  }

  lessEx2JR() {
    if ((this.generalForm.get("textoAux2JR")?.value != '' && this.generalForm.get("textoCriterio2JR")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux2JR: "",
            textoCriterio2JR: ""
        })
    }
  }

  lessEx3JR() {
    if ((this.generalForm.get("textoAux3JR")?.value != '' && this.generalForm.get("textoCriterio3JR")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux3JR: "",
            textoCriterio3JR: ""
        })
    }
  }

  lessEx4JR() {
    if ((this.generalForm.get("textoAux4JR")?.value != '' && this.generalForm.get("textoCriterio4JR")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux4JR: "",
            textoCriterio4JR: ""
        })
    }
  }

  lessEx5JR() {
    if ((this.generalForm.get("textoAux5JR")?.value != '' && this.generalForm.get("textoCriterio5JR")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux5JR: "",
            textoCriterio5JR: ""
        })
    }
  }

  lessEx6JR() {
    if ((this.generalForm.get("textoAux6JR")?.value != '' && this.generalForm.get("textoCriterio6JR")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux6JR: "",
            textoCriterio6JR: ""
        })
    }
  }

  lessEx7JR() {
    if ((this.generalForm.get("textoAux7JR")?.value != '' && this.generalForm.get("textoCriterio7JR")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux7JR: "",
            textoCriterio7JR: ""
        })
    }
  }

  lessEx8JR() {
    if ((this.generalForm.get("textoAux8JR")?.value != '' && this.generalForm.get("textoCriterio8JR")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux8JR: "",
            textoCriterio8JR: ""
        })
    }
  }

  lessEx9JR() {
    if ((this.generalForm.get("textoAux9JR")?.value != '' && this.generalForm.get("textoCriterio9JR")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux9JR: "",
            textoCriterio9JR: ""
        })
    }
  }
}
