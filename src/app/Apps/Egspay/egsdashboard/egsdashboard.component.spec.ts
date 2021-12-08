import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgsdashboardComponent } from './egsdashboard.component';

describe('EgsdashboardComponent', () => {
  let component: EgsdashboardComponent;
  let fixture: ComponentFixture<EgsdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgsdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EgsdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
