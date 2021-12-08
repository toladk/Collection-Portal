import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenaapprovedtransactionComponent } from './arenaapprovedtransaction.component';

describe('ArenaapprovedtransactionComponent', () => {
  let component: ArenaapprovedtransactionComponent;
  let fixture: ComponentFixture<ArenaapprovedtransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArenaapprovedtransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenaapprovedtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
