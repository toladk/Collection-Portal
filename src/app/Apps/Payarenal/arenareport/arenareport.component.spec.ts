import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenareportComponent } from './arenareport.component';

describe('ArenareportComponent', () => {
  let component: ArenareportComponent;
  let fixture: ComponentFixture<ArenareportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArenareportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenareportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
