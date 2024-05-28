import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { userModel } from 'src/app/models/user-model';
import { HelpersService } from 'src/services/helpers.service';

@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.css']
})
export class ActiveUserComponent implements OnInit {

  @Input() usuario!: userModel;
  @Output() confirmarUsuarioActivado: EventEmitter<any> = new EventEmitter<any>();

  constructor(public helpersService:HelpersService) { }

  ngOnInit(): void {
  }

  closeModal():void{
    this.confirmarUsuarioActivado.emit(false);
    this.helpersService.changeModalActive();
  }

  confirmarActivacion():void{
    this.confirmarUsuarioActivado.emit(true);
    this.helpersService.changeModalActive();
  }

}
