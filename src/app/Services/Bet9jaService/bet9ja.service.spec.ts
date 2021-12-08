import { TestBed } from '@angular/core/testing';

import { Bet9jaService } from './bet9ja.service';

describe('Bet9jaService', () => {
  let service: Bet9jaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bet9jaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
