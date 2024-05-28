import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { HelpersService } from '../../../../services/helpers.service'
import { userModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  @Input() usuario!: userModel;
  @Output() confirmarUsuarioDesactivado: EventEmitter<any> = new EventEmitter<any>();

  constructor(public helpersService:HelpersService) { }

  ngOnInit(): void {
  }

  closeModal():void{
    this.confirmarUsuarioDesactivado.emit(false);
    this.helpersService.changeModalDelete();
  }

  confirmarDesativacion():void{
    this.confirmarUsuarioDesactivado.emit(true);
    this.helpersService.changeModalDelete();
  }

}


