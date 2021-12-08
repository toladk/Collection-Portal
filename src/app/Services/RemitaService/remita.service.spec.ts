import { TestBed } from '@angular/core/testing';

import { RemitaService } from './remita.service';

describe('RemitaService', () => {
  let service: RemitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
