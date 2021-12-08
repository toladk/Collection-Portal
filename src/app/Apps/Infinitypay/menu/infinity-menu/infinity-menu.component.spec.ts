import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfinityMenuComponent } from './infinity-menu.component';

describe('InfinityMenuComponent', () => {
  let component: InfinityMenuComponent;
  let fixture: ComponentFixture<InfinityMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfinityMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfinityMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
