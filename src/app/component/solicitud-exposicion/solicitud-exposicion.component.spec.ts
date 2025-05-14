import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudExposicionComponent } from './solicitud-exposicion.component';

describe('SolicitudExposicionComponent', () => {
  let component: SolicitudExposicionComponent;
  let fixture: ComponentFixture<SolicitudExposicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudExposicionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudExposicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
