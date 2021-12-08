import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalpayDashboardComponent } from './calpay-dashboard.component';

describe('CalpayDashboardComponent', () => {
  let component: CalpayDashboardComponent;
  let fixture: ComponentFixture<CalpayDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalpayDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalpayDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
