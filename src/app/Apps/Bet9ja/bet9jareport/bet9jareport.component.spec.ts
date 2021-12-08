import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bet9jareportComponent } from './bet9jareport.component';

describe('Bet9jareportComponent', () => {
  let component: Bet9jareportComponent;
  let fixture: ComponentFixture<Bet9jareportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bet9jareportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bet9jareportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
