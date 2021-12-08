import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgsreportComponent } from './egsreport.component';

describe('EgsreportComponent', () => {
  let component: EgsreportComponent;
  let fixture: ComponentFixture<EgsreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgsreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EgsreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
