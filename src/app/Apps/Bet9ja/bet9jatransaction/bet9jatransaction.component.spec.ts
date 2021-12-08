import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bet9jatransactionComponent } from './bet9jatransaction.component';

describe('Bet9jatransactionComponent', () => {
  let component: Bet9jatransactionComponent;
  let fixture: ComponentFixture<Bet9jatransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bet9jatransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bet9jatransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
