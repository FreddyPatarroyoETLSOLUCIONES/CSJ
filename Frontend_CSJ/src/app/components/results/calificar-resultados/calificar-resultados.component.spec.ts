import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificarResultadosComponent } from './calificar-resultados.component';

describe('CalificarResultadosComponent', () => {
  let component: CalificarResultadosComponent;
  let fixture: ComponentFixture<CalificarResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalificarResultadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificarResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
