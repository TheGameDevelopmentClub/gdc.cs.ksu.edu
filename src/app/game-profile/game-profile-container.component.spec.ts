import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameProfileContainerComponent } from './game-profile-container.component';

describe('GameProfileContainerComponent', () => {
  let component: GameProfileContainerComponent;
  let fixture: ComponentFixture<GameProfileContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameProfileContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameProfileContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
