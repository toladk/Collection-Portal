import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenareportpendingtransactionComponent } from './arenareportpendingtransaction.component';

describe('ArenareportpendingtransactionComponent', () => {
  let component: ArenareportpendingtransactionComponent;
  let fixture: ComponentFixture<ArenareportpendingtransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArenareportpendingtransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenareportpendingtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
