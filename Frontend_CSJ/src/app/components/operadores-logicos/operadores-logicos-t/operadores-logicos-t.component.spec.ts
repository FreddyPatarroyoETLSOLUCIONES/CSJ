import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadoresLogicosTComponent } from './operadores-logicos-t.component';

describe('OperadoresLogicosTComponent', () => {
  let component: OperadoresLogicosTComponent;
  let fixture: ComponentFixture<OperadoresLogicosTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperadoresLogicosTComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperadoresLogicosTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
