import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgstransactionComponent } from './egstransaction.component';

describe('EgstransactionComponent', () => {
  let component: EgstransactionComponent;
  let fixture: ComponentFixture<EgstransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgstransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EgstransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
