import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedPaymentsComponent } from './rejected-payments.component';

describe('RejectedPaymentsComponent', () => {
  let component: RejectedPaymentsComponent;
  let fixture: ComponentFixture<RejectedPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
