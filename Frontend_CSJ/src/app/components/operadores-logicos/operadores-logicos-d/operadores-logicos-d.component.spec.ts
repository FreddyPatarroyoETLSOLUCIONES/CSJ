import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadoresLogicosDComponent } from './operadores-logicos-d.component';

describe('OperadoresLogicosDComponent', () => {
  let component: OperadoresLogicosDComponent;
  let fixture: ComponentFixture<OperadoresLogicosDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperadoresLogicosDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperadoresLogicosDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
