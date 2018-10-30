import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupProfileManagementComponent } from './group-profile-management.component';

describe('GroupProfileManagementComponent', () => {
  let component: GroupProfileManagementComponent;
  let fixture: ComponentFixture<GroupProfileManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupProfileManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupProfileManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
