import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  modalDeleteUser:boolean = false;

  modalActiveUser:boolean = false;

  constructor() { }

  changeModalDelete(): void{
    if(this.modalDeleteUser){
      this.modalDeleteUser = false;
    }else{
      this.modalDeleteUser = true;
    }
  }

  changeModalActive(): void{
    if(this.modalActiveUser){
      this.modalActiveUser = false;
    }else{
      this.modalActiveUser = true;
    }
  }

}
