import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemitaDashboardComponent } from './remita-dashboard.component';

describe('RemitaDashboardComponent', () => {
  let component: RemitaDashboardComponent;
  let fixture: ComponentFixture<RemitaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemitaDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemitaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
