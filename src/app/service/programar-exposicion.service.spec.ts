import { TestBed } from '@angular/core/testing';

import { ProgramarExposicionService } from './programar-exposicion.service';

describe('ProgramarExposicionService', () => {
  let service: ProgramarExposicionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramarExposicionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
