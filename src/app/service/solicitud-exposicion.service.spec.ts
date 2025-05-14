import { TestBed } from '@angular/core/testing';

import { SolicitudExposicionService } from './solicitud-exposicion.service';

describe('SolicitudExposicionService', () => {
  let service: SolicitudExposicionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudExposicionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
