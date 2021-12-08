import { TestBed } from '@angular/core/testing';

import { CalpayStudentService } from './calpay-student.service';

describe('CalpayStudentService', () => {
  let service: CalpayStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalpayStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
