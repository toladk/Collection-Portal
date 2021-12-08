import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bet9jadashboardComponent } from './bet9jadashboard.component';

describe('Bet9jadashboardComponent', () => {
  let component: Bet9jadashboardComponent;
  let fixture: ComponentFixture<Bet9jadashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bet9jadashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bet9jadashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
