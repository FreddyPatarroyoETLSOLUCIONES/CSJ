import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrizacionCamposLogosComponent } from './parametrizacion-campos-logos.component';

describe('ParametrizacionCamposLogosComponent', () => {
  let component: ParametrizacionCamposLogosComponent;
  let fixture: ComponentFixture<ParametrizacionCamposLogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrizacionCamposLogosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrizacionCamposLogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
