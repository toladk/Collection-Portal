import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenareportdeclinedtransactionComponent } from './arenareportdeclinedtransaction.component';

describe('ArenareportdeclinedtransactionComponent', () => {
  let component: ArenareportdeclinedtransactionComponent;
  let fixture: ComponentFixture<ArenareportdeclinedtransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArenareportdeclinedtransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenareportdeclinedtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
