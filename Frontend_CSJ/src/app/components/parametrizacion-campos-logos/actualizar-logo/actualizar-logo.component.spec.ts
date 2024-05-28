import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarLogoComponent } from './actualizar-logo.component';

describe('ActualizarLogoComponent', () => {
  let component: ActualizarLogoComponent;
  let fixture: ComponentFixture<ActualizarLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarLogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
