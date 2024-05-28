import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-operadores-logicos-pr',
  templateUrl: './operadores-logicos-pr.component.html',
  styleUrls: ['./operadores-logicos-pr.component.css']
})
export class OperadoresLogicosPrComponent implements OnInit {

  public shared: any;
  public generalForm: FormGroup;

  constructor( private AppComponent: AppComponent, public formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.shared = this.AppComponent;
    this.generalForm = new FormGroup({
      textoAux1PR: new FormControl(),
      textoCriterio1PR: new FormControl(),
      textoAux2PR: new FormControl(),
      textoCriterio2PR: new FormControl(),
      textoAux3PR: new FormControl(),
      textoCriterio3PR: new FormControl(),
      textoAux4PR: new FormControl(),
      textoCriterio4PR: new FormControl(),
      textoAux5PR: new FormControl(),
      textoCriterio5PR: new FormControl(),
      textoAux6PR: new FormControl(),
      textoCriterio6PR: new FormControl(),
      textoAux7PR: new FormControl(),
      textoCriterio7PR: new FormControl(),
      textoAux8PR: new FormControl(),
      textoCriterio8PR: new FormControl(),
      textoAux9PR: new FormControl(),
      textoCriterio9PR: new FormControl(),
    })
    
    // inicial criterio 1
    if(this.shared.generalForm.get("textoAux1PR")?.value){
      this.generalForm.patchValue({
        textoAux1PR: this.shared.generalForm.get("textoAux1PR")?.value ? this.shared.generalForm.get("textoAux1PR")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio1PR")?.value){
      this.generalForm.patchValue({
        textoCriterio1PR: this.shared.generalForm.get("textoCriterio1PR")?.value ? this.shared.generalForm.get("textoCriterio1PR")?.value : ''
      })
    }

    // inicial criterio 2
    if(this.shared.generalForm.get("textoAux2PR")?.value){
      this.generalForm.patchValue({
        textoAux2PR: this.shared.generalForm.get("textoAux2PR")?.value ? this.shared.generalForm.get("textoAux2PR")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio2PR")?.value){
      this.generalForm.patchValue({
        textoCriterio2PR: this.shared.generalForm.get("textoCriterio2PR")?.value ? this.shared.generalForm.get("textoCriterio2PR")?.value : ''
      })
    }

    // inicial criterio 3
    if(this.shared.generalForm.get("textoAux3PR")?.value){
      this.generalForm.patchValue({
        textoAux3PR: this.shared.generalForm.get("textoAux3PR")?.value ? this.shared.generalForm.get("textoAux3PR")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio3PR")?.value){
      this.generalForm.patchValue({
        textoCriterio3PR: this.shared.generalForm.get("textoCriterio3PR")?.value ? this.shared.generalForm.get("textoCriterio3PR")?.value : ''
      })
    }

    // inicial criterio 4
    if(this.shared.generalForm.get("textoAux4PR")?.value){
      this.generalForm.patchValue({
        textoAux4PR: this.shared.generalForm.get("textoAux4PR")?.value ? this.shared.generalForm.get("textoAux4PR")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio4PR")?.value){
      this.generalForm.patchValue({
        textoCriterio4PR: this.shared.generalForm.get("textoCriterio4PR")?.value ? this.shared.generalForm.get("textoCriterio4PR")?.value : ''
      })
    }

    // inicial criterio 5
    if(this.shared.generalForm.get("textoAux5PR")?.value){
      this.generalForm.patchValue({
        textoAux5PR: this.shared.generalForm.get("textoAux5PR")?.value ? this.shared.generalForm.get("textoAux5PR")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio5PR")?.value){
      this.generalForm.patchValue({
        textoCriterio5PR: this.shared.generalForm.get("textoCriterio5PR")?.value ? this.shared.generalForm.get("textoCriterio5PR")?.value : ''
      })
    }

    // inicial criterio 6
    if(this.shared.generalForm.get("textoAux6PR")?.value){
      this.generalForm.patchValue({
        textoAux6PR: this.shared.generalForm.get("textoAux6PR")?.value ? this.shared.generalForm.get("textoAux6PR")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio6PR")?.value){
      this.generalForm.patchValue({
        textoCriterio6PR: this.shared.generalForm.get("textoCriterio6PR")?.value ? this.shared.generalForm.get("textoCriterio6PR")?.value : ''
      })
    }

    // inicial criterio 7
    if(this.shared.generalForm.get("textoAux7PR")?.value){
      this.generalForm.patchValue({
        textoAux7PR: this.shared.generalForm.get("textoAux7PR")?.value ? this.shared.generalForm.get("textoAux7PR")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio7PR")?.value){
      this.generalForm.patchValue({
        textoCriterio7PR: this.shared.generalForm.get("textoCriterio7PR")?.value ? this.shared.generalForm.get("textoCriterio7PR")?.value : ''
      })
    }

    // inicial criterio 8
    if(this.shared.generalForm.get("textoAux8PR")?.value){
      this.generalForm.patchValue({
        textoAux8PR: this.shared.generalForm.get("textoAux8PR")?.value ? this.shared.generalForm.get("textoAux8PR")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio8PR")?.value){
      this.generalForm.patchValue({
        textoCriterio8PR: this.shared.generalForm.get("textoCriterio8PR")?.value ? this.shared.generalForm.get("textoCriterio8PR")?.value : ''
      })
    }

    // inicial criterio 9
    if(this.shared.generalForm.get("textoAux9PR")?.value){
      this.generalForm.patchValue({
        textoAux9PR: this.shared.generalForm.get("textoAux9PR")?.value ? this.shared.generalForm.get("textoAux9PR")?.value : ''
      })
    }
    if(this.shared.generalForm.get("textoCriterio9PR")?.value){
      this.generalForm.patchValue({
        textoCriterio9PR: this.shared.generalForm.get("textoCriterio9PR")?.value ? this.shared.generalForm.get("textoCriterio9PR")?.value : ''
      })
    }

    // criterio 1
    this.generalForm.get("textoAux1PR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux1PR: this.generalForm.get("textoAux1PR")?.value ? this.generalForm.get("textoAux1PR")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio1PR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio1PR: this.generalForm.get("textoCriterio1PR")?.value ? this.generalForm.get("textoCriterio1PR")?.value : ''
      })
    })

    // criterio 2
    this.generalForm.get("textoAux2PR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux2PR: this.generalForm.get("textoAux2PR")?.value ? this.generalForm.get("textoAux2PR")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio2PR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio2PR: this.generalForm.get("textoCriterio2PR")?.value ? this.generalForm.get("textoCriterio2PR")?.value : ''
      })
    })

    // criterio 3
    this.generalForm.get("textoAux3PR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux3PR: this.generalForm.get("textoAux3PR")?.value ? this.generalForm.get("textoAux3PR")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio3PR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio3PR: this.generalForm.get("textoCriterio3PR")?.value ? this.generalForm.get("textoCriterio3PR")?.value : ''
      })
    })

    // criterio 4
    this.generalForm.get("textoAux4PR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux4PR: this.generalForm.get("textoAux4PR")?.value ? this.generalForm.get("textoAux4PR")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio4PR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio4PR: this.generalForm.get("textoCriterio4PR")?.value ? this.generalForm.get("textoCriterio4PR")?.value : ''
      })
    })

    // criterio 5
    this.generalForm.get("textoAux5PR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux5PR: this.generalForm.get("textoAux5PR")?.value ? this.generalForm.get("textoAux5PR")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio5PR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio5PR: this.generalForm.get("textoCriterio5PR")?.value ? this.generalForm.get("textoCriterio5PR")?.value : ''
      })
    })

    // criterio 6
    this.generalForm.get("textoAux6PR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux6PR: this.generalForm.get("textoAux6PR")?.value ? this.generalForm.get("textoAux6PR")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio6PR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio6PR: this.generalForm.get("textoCriterio6PR")?.value ? this.generalForm.get("textoCriterio6PR")?.value : ''
      })
    })

    // criterio 7
    this.generalForm.get("textoAux7PR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux7PR: this.generalForm.get("textoAux7PR")?.value ? this.generalForm.get("textoAux7PR")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio7PR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio7PR: this.generalForm.get("textoCriterio7PR")?.value ? this.generalForm.get("textoCriterio7PR")?.value : ''
      })
    })

    // criterio 8
    this.generalForm.get("textoAux8PR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux8PR: this.generalForm.get("textoAux8PR")?.value ? this.generalForm.get("textoAux8PR")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio8PR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio8PR: this.generalForm.get("textoCriterio8PR")?.value ? this.generalForm.get("textoCriterio8PR")?.value : ''
      })
    })

    // criterio 9
    this.generalForm.get("textoAux9PR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoAux9PR: this.generalForm.get("textoAux9PR")?.value ? this.generalForm.get("textoAux9PR")?.value : ''
      })
    })
    this.generalForm.get("textoCriterio9PR").valueChanges.subscribe((origen: any) => {
      this.shared.generalForm.patchValue({
        textoCriterio9PR: this.generalForm.get("textoCriterio9PR")?.value ? this.generalForm.get("textoCriterio9PR")?.value : ''
      })
    })
  }

  lessAnd1PR(){
    if ((this.generalForm.get("textoAux1PR")?.value != '' && this.generalForm.get("textoCriterio1PR")?.value == "Y Que Contenga")) {
      this.generalForm.patchValue({
          textoAux1PR: "",
          textoCriterio1PR: ""
      })
    }
  }

  lessAnd2PR() {
    if ((this.generalForm.get("textoAux2PR")?.value != '' && this.generalForm.get("textoCriterio2PR")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux2PR: "",
            textoCriterio2PR: ""
        })
    }
  }

  lessAnd3PR() {
    if ((this.generalForm.get("textoAux3PR")?.value != '' && this.generalForm.get("textoCriterio3PR")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux3PR: "",
            textoCriterio3PR: ""
        })
    }
  }

  lessAnd4PR() {
    if ((this.generalForm.get("textoAux4PR")?.value != '' && this.generalForm.get("textoCriterio4PR")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux4PR: "",
            textoCriterio4PR: ""
        })
    }
  }

  lessAnd5PR() {
    if ((this.generalForm.get("textoAux5PR")?.value != '' && this.generalForm.get("textoCriterio5PR")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux5PR: "",
            textoCriterio5PR: ""
        })
    }
  }

  lessAnd6PR() {
    if ((this.generalForm.get("textoAux6PR")?.value != '' && this.generalForm.get("textoCriterio6PR")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux6PR: "",
            textoCriterio6PR: ""
        })
    }
  }

  lessAnd7PR() {
    if ((this.generalForm.get("textoAux7PR")?.value != '' && this.generalForm.get("textoCriterio7PR")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux7PR: "",
            textoCriterio7PR: ""
        })
    }  
  }

  lessAnd8PR() {
    if ((this.generalForm.get("textoAux8PR")?.value != '' && this.generalForm.get("textoCriterio8PR")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux8PR: "",
            textoCriterio8PR: ""
        })
    }  
  }

  lessAnd9PR() {
    if ((this.generalForm.get("textoAux9PR")?.value != '' && this.generalForm.get("textoCriterio9PR")?.value == "Y Que Contenga")) {
        this.generalForm.patchValue({
            textoAux9PR: "",
            textoCriterio9PR: ""
        })
    }
  }

  lessOr1PR() {
    if ((this.generalForm.get("textoAux1PR")?.value != '' && this.generalForm.get("textoCriterio1PR")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux1PR: "",
            textoCriterio1PR: ""
        })
    }
  }

  lessOr2PR() {
      if ((this.generalForm.get("textoAux2PR")?.value != '' && this.generalForm.get("textoCriterio2PR")?.value == "O Que Contenga")) {
          this.generalForm.patchValue({
              textoAux2PR: "",
              textoCriterio2PR: ""
          })
      }
  }

  lessOr3PR() {
    if ((this.generalForm.get("textoAux3PR")?.value != '' && this.generalForm.get("textoCriterio3PR")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux3PR: "",
            textoCriterio3PR: ""
        })
    }
  }

  lessOr4PR() {
    if ((this.generalForm.get("textoAux4PR")?.value != '' && this.generalForm.get("textoCriterio4PR")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux4PR: "",
            textoCriterio4PR: ""
        })
    }
  }

  lessOr5PR() {
    if ((this.generalForm.get("textoAux5PR")?.value != '' && this.generalForm.get("textoCriterio5PR")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux5PR: "",
            textoCriterio5PR: ""
        })
    }
  }

  lessOr6PR() {
    if ((this.generalForm.get("textoAux6PR")?.value != '' && this.generalForm.get("textoCriterio6PR")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux6PR: "",
            textoCriterio6PR: ""
        })
    }
  }

  lessOr7PR() {
    if ((this.generalForm.get("textoAux7PR")?.value != '' && this.generalForm.get("textoCriterio7PR")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux7PR: "",
            textoCriterio7PR: ""
        })
    }
  }

  lessOr8PR() {
    if ((this.generalForm.get("textoAux8PR")?.value != '' && this.generalForm.get("textoCriterio8PR")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux8PR: "",
            textoCriterio8PR: ""
        })
    }
  }

  lessOr9PR() {
    if ((this.generalForm.get("textoAux9PR")?.value != '' && this.generalForm.get("textoCriterio9PR")?.value == "O Que Contenga")) {
        this.generalForm.patchValue({
            textoAux9PR: "",
            textoCriterio9PR: ""
        })
    }
  }

  lessEx1PR() {
    if ((this.generalForm.get("textoAux1PR")?.value != '' && this.generalForm.get("textoCriterio1PR")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux1PR: "",
            textoCriterio1PR: ""
        })
    }
  }

  lessEx2PR() {
    if ((this.generalForm.get("textoAux2PR")?.value != '' && this.generalForm.get("textoCriterio2PR")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux2PR: "",
            textoCriterio2PR: ""
        })
    }
  }

  lessEx3PR() {
    if ((this.generalForm.get("textoAux3PR")?.value != '' && this.generalForm.get("textoCriterio3PR")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux3PR: "",
            textoCriterio3PR: ""
        })
    }
  }

  lessEx4PR() {
    if ((this.generalForm.get("textoAux4PR")?.value != '' && this.generalForm.get("textoCriterio4PR")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux4PR: "",
            textoCriterio4PR: ""
        })
    }
  }

  lessEx5PR() {
    if ((this.generalForm.get("textoAux5PR")?.value != '' && this.generalForm.get("textoCriterio5PR")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux5PR: "",
            textoCriterio5PR: ""
        })
    }
  }

  lessEx6PR() {
    if ((this.generalForm.get("textoAux6PR")?.value != '' && this.generalForm.get("textoCriterio6PR")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux6PR: "",
            textoCriterio6PR: ""
        })
    }
  }

  lessEx7PR() {
    if ((this.generalForm.get("textoAux7PR")?.value != '' && this.generalForm.get("textoCriterio7PR")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux7PR: "",
            textoCriterio7PR: ""
        })
    }
  }

  lessEx8PR() {
    if ((this.generalForm.get("textoAux8PR")?.value != '' && this.generalForm.get("textoCriterio8PR")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux8PR: "",
            textoCriterio8PR: ""
        })
    }
  }

  lessEx9PR() {
    if ((this.generalForm.get("textoAux9PR")?.value != '' && this.generalForm.get("textoCriterio9PR")?.value == "Que Excluya")) {
        this.generalForm.patchValue({
            textoAux9PR: "",
            textoCriterio9PR: ""
        })
    }
  }
}
