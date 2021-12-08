import { TestBed } from '@angular/core/testing';

import { PayarenaendpointsService } from './payarenaendpoints.service';

describe('PayarenaendpointsService', () => {
  let service: PayarenaendpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayarenaendpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
