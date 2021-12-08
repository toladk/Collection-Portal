import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfinityValidateTransactionsComponent } from './infinity-validate-transactions.component';

describe('InfinityValidateTransactionsComponent', () => {
  let component: InfinityValidateTransactionsComponent;
  let fixture: ComponentFixture<InfinityValidateTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfinityValidateTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfinityValidateTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
