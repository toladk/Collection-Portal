import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bet9jareceiptComponent } from './bet9jareceipt.component';

describe('Bet9jareceiptComponent', () => {
  let component: Bet9jareceiptComponent;
  let fixture: ComponentFixture<Bet9jareceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bet9jareceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bet9jareceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
