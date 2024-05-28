import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadoresLogicosCComponent } from './operadores-logicos-c.component';

describe('OperadoresLogicosCComponent', () => {
  let component: OperadoresLogicosCComponent;
  let fixture: ComponentFixture<OperadoresLogicosCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperadoresLogicosCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperadoresLogicosCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
