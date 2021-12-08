import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenadashboardComponent } from './arenadashboard.component';

describe('ArenadashboardComponent', () => {
  let component: ArenadashboardComponent;
  let fixture: ComponentFixture<ArenadashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArenadashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenadashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
