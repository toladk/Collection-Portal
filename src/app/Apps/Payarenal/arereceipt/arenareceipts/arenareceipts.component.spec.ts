import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenareceiptsComponent } from './arenareceipts.component';

describe('ArenareceiptsComponent', () => {
  let component: ArenareceiptsComponent;
  let fixture: ComponentFixture<ArenareceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArenareceiptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenareceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
