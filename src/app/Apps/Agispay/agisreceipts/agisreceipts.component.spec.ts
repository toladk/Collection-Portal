import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgisreceiptsComponent } from './agisreceipts.component';

describe('AgisreceiptsComponent', () => {
  let component: AgisreceiptsComponent;
  let fixture: ComponentFixture<AgisreceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgisreceiptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgisreceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
