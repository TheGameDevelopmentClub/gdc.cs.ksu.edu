import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerProfileComponent } from './officer-profile.component';

describe('OfficerProfileComponent', () => {
  let component: OfficerProfileComponent;
  let fixture: ComponentFixture<OfficerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
