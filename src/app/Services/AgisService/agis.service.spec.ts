import { TestBed } from '@angular/core/testing';

import { AgisService } from './agis.service';

describe('AgisService', () => {
  let service: AgisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
