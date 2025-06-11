import { TestBed } from '@angular/core/testing';

import { UsuarioRegistradoService } from './usuario-registrado.service';

describe('UsuarioRegistradoService', () => {
  let service: UsuarioRegistradoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioRegistradoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
