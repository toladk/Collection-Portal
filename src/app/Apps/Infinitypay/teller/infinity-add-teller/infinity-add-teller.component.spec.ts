import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfinityAddTellerComponent } from './infinity-add-teller.component';

describe('InfinityAddTellerComponent', () => {
  let component: InfinityAddTellerComponent;
  let fixture: ComponentFixture<InfinityAddTellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfinityAddTellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfinityAddTellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
