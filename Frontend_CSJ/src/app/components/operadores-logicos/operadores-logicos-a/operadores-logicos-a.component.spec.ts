import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadoresLogicosAComponent } from './operadores-logicos-a.component';

describe('OperadoresLogicosAComponent', () => {
  let component: OperadoresLogicosAComponent;
  let fixture: ComponentFixture<OperadoresLogicosAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperadoresLogicosAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperadoresLogicosAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
