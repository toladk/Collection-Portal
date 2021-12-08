import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgisreportComponent } from './agisreport.component';

describe('AgisreportComponent', () => {
  let component: AgisreportComponent;
  let fixture: ComponentFixture<AgisreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgisreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgisreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
