import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemitaPaymentsComponent } from './remita-payments.component';

describe('RemitaPaymentsComponent', () => {
  let component: RemitaPaymentsComponent;
  let fixture: ComponentFixture<RemitaPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemitaPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemitaPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
