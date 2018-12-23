import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGameUsersComponent } from './add-game-users.component';

describe('AddGameUsersComponent', () => {
  let component: AddGameUsersComponent;
  let fixture: ComponentFixture<AddGameUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGameUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGameUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
