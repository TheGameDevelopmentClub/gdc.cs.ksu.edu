import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameProfileManagementComponent } from './game-profile-management.component';

describe('GameProfileManagementComponent', () => {
  let component: GameProfileManagementComponent;
  let fixture: ComponentFixture<GameProfileManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameProfileManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameProfileManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
