import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenareportapprovedtransactionComponent } from './arenareportapprovedtransaction.component';

describe('ArenareportapprovedtransactionComponent', () => {
  let component: ArenareportapprovedtransactionComponent;
  let fixture: ComponentFixture<ArenareportapprovedtransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArenareportapprovedtransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenareportapprovedtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
