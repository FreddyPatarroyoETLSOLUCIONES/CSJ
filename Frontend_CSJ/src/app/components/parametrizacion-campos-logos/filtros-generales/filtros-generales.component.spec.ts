import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosGeneralesComponent } from './filtros-generales.component';

describe('FiltrosGeneralesComponent', () => {
  let component: FiltrosGeneralesComponent;
  let fixture: ComponentFixture<FiltrosGeneralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosGeneralesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
