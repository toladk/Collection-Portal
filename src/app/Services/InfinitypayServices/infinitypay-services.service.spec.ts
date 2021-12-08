import { TestBed } from '@angular/core/testing';

import { InfinitypayServicesService } from './infinitypay-services.service';

describe('InfinitypayServicesService', () => {
  let service: InfinitypayServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfinitypayServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
