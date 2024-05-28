import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() UrlRef:string
  // @Input() altaCorte:number;
  // @Input() altaCorte2:number;
  // @Input() altaCorte3:number;
  // @Input() altaCorte4:number;
  // @Input() altaCorte5:number;


  constructor() { }
  ngOnInit(): void {
  }

}
