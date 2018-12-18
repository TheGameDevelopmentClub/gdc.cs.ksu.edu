import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupProfileContainerComponent } from './group-profile-container.component';

describe('GroupProfileContainerComponent', () => {
  let component: GroupProfileContainerComponent;
  let fixture: ComponentFixture<GroupProfileContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupProfileContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupProfileContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
