import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerBadgeComponent } from './officer-badge.component';

describe('OfficerBadgeComponent', () => {
  let component: OfficerBadgeComponent;
  let fixture: ComponentFixture<OfficerBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficerBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
