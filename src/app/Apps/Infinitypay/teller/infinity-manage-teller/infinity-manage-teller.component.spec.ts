import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfinityManageTellerComponent } from './infinity-manage-teller.component';

describe('InfinityManageTellerComponent', () => {
  let component: InfinityManageTellerComponent;
  let fixture: ComponentFixture<InfinityManageTellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfinityManageTellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfinityManageTellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
