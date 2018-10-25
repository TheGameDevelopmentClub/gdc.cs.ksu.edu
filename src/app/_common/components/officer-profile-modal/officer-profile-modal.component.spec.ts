import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerProfileModalComponent } from './officer-profile-modal.component';

describe('OfficerProfileModalComponent', () => {
  let component: OfficerProfileModalComponent;
  let fixture: ComponentFixture<OfficerProfileModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficerProfileModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
