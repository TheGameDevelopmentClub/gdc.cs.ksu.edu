import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserUpdateComponent } from './modal-user-update.component';

describe('ModalUserUpdateComponent', () => {
  let component: ModalUserUpdateComponent;
  let fixture: ComponentFixture<ModalUserUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUserUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
