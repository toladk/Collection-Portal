import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenapendingtransactionComponent } from './arenapendingtransaction.component';

describe('ArenapendingtransactionComponent', () => {
  let component: ArenapendingtransactionComponent;
  let fixture: ComponentFixture<ArenapendingtransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArenapendingtransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenapendingtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
