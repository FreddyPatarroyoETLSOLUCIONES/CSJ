import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadoresLogicosJrComponent } from './operadores-logicos-jr.component';

describe('OperadoresLogicosJrComponent', () => {
  let component: OperadoresLogicosJrComponent;
  let fixture: ComponentFixture<OperadoresLogicosJrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperadoresLogicosJrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperadoresLogicosJrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
