import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgisdashboardComponent } from './agisdashboard.component';

describe('AgisdashboardComponent', () => {
  let component: AgisdashboardComponent;
  let fixture: ComponentFixture<AgisdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgisdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgisdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
