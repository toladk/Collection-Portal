import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenagetserviceComponent } from './arenagetservice.component';

describe('ArenagetserviceComponent', () => {
  let component: ArenagetserviceComponent;
  let fixture: ComponentFixture<ArenagetserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArenagetserviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenagetserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
