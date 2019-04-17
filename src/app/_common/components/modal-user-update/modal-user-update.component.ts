import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { InfoMessagesComponent } from '../info-messages/info-messages.component';

const allowedImageTypes = [
  'image/jpg', 'image/jpeg', 'image/png', 'image/gif'
];

@Component({
  selector: 'ksu-gdc-modal-user-update',
  templateUrl: './modal-user-update.component.html',
  styleUrls: ['./modal-user-update.component.scss']
})
export class ModalUserUpdateComponent implements OnInit {
  @ViewChild(InfoMessagesComponent) infoMessage: InfoMessagesComponent;

  updateUserForm: FormGroup;
  firstNameControl: FormControl;
  lastNameControl: FormControl;

  image: File;
  imageUrl: string | ArrayBuffer;

  constructor(
    private dialogRef: MatDialogRef<ModalUserUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.imageUrl = this.user.imageUrl;
    this.firstNameControl = new FormControl(this.user.firstName || '', [Validators.required, Validators.maxLength(50)]);
    this.lastNameControl = new FormControl(this.user.lastName || '', [Validators.required, Validators.maxLength(50)]);
    this.updateUserForm = new FormGroup({
      firstName: this.firstNameControl,
      lastName: this.lastNameControl
    });
    this.updateUserForm.markAsTouched();
  }

  hasNoImage(): boolean {
    return this.imageUrl === '' && this.image == null;
  }

  formIsValid(): boolean {
    return this.updateUserForm.touched && this.updateUserForm.valid && !this.hasNoImage();
  }

  changeProfileImage(event: any) {
    const files = event.target.files as Array<File>;
    if (files.length > 0) {
      const file = files[0];
      const mimeType = file.type;
      if (allowedImageTypes.includes(mimeType)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageUrl = reader.result;
          this.image = file;
          this.updateUserForm.markAsTouched();
          this.infoMessage.hide();
        };
      }
    }
  }

  updateImage(): Promise<boolean> {
    if (this.image) {
      return this.userService.updateImage(this.user.userId, this.image);
    }
    return Promise.resolve(true);
  }

  updateUser(): Promise<void> {
    if (this.updateUserForm.dirty) {
      return this.userService.patch(this.user.userId, [{
        op: 'replace',
        path: '/firstName',
        value: this.firstNameControl.value
      }, {
        op: 'replace',
        path: '/lastName',
        value: this.lastNameControl.value
      }]);
    }
    return Promise.resolve();
  }

  setUserHasUpdated(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.userService.patch(this.user.userId, [{
        op: 'replace',
        path: '/hasVerifiedInfo',
        value: true
      }]).then(() => {
        this.authService.authenticatedUser.hasVerifiedInfo = true;
        this.dialogRef.close();
      }).catch((error) => this.handleError(error));
    });
  }

  submit(): void {
    this.updateImage().then(() => {
      this.updateUser().then(() => {
        this.setUserHasUpdated();
      }).catch((userError) => this.handleError(userError));
    }).catch((imgError) => this.handleError(imgError));
  }


  handleImgLoadError(event: any) {
    event.target.src = 'assets/images/profile.png';
    this.imageUrl = '';
    this.image = null;
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.status === 400) {
      const modelError = error.error;
      this.infoMessage.showError(modelError.errors[0]);
      this.updateUserForm.markAsUntouched();
    } else {
      this.infoMessage.showError('Something went wrong.');
    }
  }
}
