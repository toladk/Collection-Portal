import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfinityAllTransactionsComponent } from './infinity-all-transactions.component';

describe('InfinityAllTransactionsComponent', () => {
  let component: InfinityAllTransactionsComponent;
  let fixture: ComponentFixture<InfinityAllTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfinityAllTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfinityAllTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
