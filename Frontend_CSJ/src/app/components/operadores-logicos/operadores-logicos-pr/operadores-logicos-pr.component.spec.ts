import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadoresLogicosPrComponent } from './operadores-logicos-pr.component';

describe('OperadoresLogicosPrComponent', () => {
  let component: OperadoresLogicosPrComponent;
  let fixture: ComponentFixture<OperadoresLogicosPrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperadoresLogicosPrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperadoresLogicosPrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
