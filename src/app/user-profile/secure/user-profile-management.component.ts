import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

import { CreateGameComponent } from 'src/app/_common/components/create-game/create-game.component';
import { FileUploadComponent } from 'src/app/_common/components/file-upload/file-upload.component';
import { InfoMessagesComponent } from 'src/app/_common/components/info-messages/info-messages.component';
import { ImageLoaderDirective } from 'src/app/_common/directives/image-loader/image-loader.directive';
import { UserService } from 'src/app/_common/services/user/user.service';
import { GameService } from 'src/app/_common/services/game/game.service';
import { User } from 'src/app/_common/models/user';
import { PortfolioItem } from 'src/app/_common/models/portfolio';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ksu-gdc-user-profile-management',
  templateUrl: './user-profile-management.component.html',
  styleUrls: ['../user-profile.component.scss']
})
export class UserProfileManagementComponent implements OnInit {
  @Input() userId: number;
  @Output() doneEditing: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(InfoMessagesComponent) profileUpdateMessages: InfoMessagesComponent;
  @ViewChild(FileUploadComponent) profileImageUploader: FileUploadComponent;
  @ViewChild(ImageLoaderDirective) profileImage: ImageLoaderDirective;

  errorOccurred: boolean;
  user: User;

  categories = {
    games: {
      service: this.gameService,
      loading: false,
      loaded: false,
      pageSize: 6,
      totalItemCount: 0,
      list: []
    }
  };

  dialogRef: MatDialogRef<any>;

  userInfoGroup: FormGroup;
  firstNameControl: FormControl;
  lastNameControl: FormControl;
  descriptionControl: FormControl;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.userService.getById(this.userId)
      .then(user => {
        this.user = user;
        this.firstNameControl = new FormControl(this.user.firstName || '', [Validators.required, Validators.maxLength(50)]);
        this.lastNameControl = new FormControl(this.user.lastName || '', [Validators.required, Validators.maxLength(50)]);
        this.descriptionControl = new FormControl(this.user.description || '', [Validators.maxLength(500)]);
        this.userInfoGroup = new FormGroup({
          firstName: this.firstNameControl,
          lastName: this.lastNameControl,
          description: this.descriptionControl
        });
        this.loadPage('games', 1);
      })
      .catch(error => {
        this.user = null;
        this.errorOccurred = true;
      });
  }

  userInfoIsValid(): boolean {
    return this.userInfoGroup.touched && this.userInfoGroup.valid;
  }

  loadPage(category: string, pageNumber: number) {
    this.categories[category].loading = true;
    this.categories[category].service.getByUserId(this.user.userId, pageNumber, this.categories[category].pageSize)
      .then((items: any) => {
        this.categories[category].list = items.value;
        this.categories[category].totalItemCount = items.total;
        this.categories[category].loaded = true;
        this.categories[category].loading = false;
      })
      .catch();
  }

  stopEditing(): void {
    this.doneEditing.emit();
  }

  uploadProfileImage(image: File) {
    this.profileImageUploader.isProcessing = true;
    this.userService.updateImage(this.user.userId, image).then(() => {
      this.profileUpdateMessages.showSuccess('The image has been updated.');
      this.profileImageUploader.isProcessing = false;
      this.profileImage.reload();
    }).catch((error: HttpErrorResponse) => {
      if (error.status === 400) {
        const modelError = error.error;
        this.profileUpdateMessages.showError(modelError.errorMessages[0]);
        this.profileImageUploader.isProcessing = false;
      } else {
        this.profileUpdateMessages.showError('There was a problem updating the image.');
        this.profileImageUploader.isProcessing = false;
      }
    });
  }

  updateUserInfo() {
    const userUpdate = [];
    if (this.firstNameControl.touched) {
      userUpdate.push({
        op: 'replace',
        path: '/firstName',
        value: this.firstNameControl.value
      });
    }
    if (this.lastNameControl.touched) {
      userUpdate.push({
        op: 'replace',
        path: '/lastName',
        value: this.lastNameControl.value
      });
    }
    if (this.descriptionControl.touched) {
      userUpdate.push({
        op: 'replace',
        path: '/description',
        value: this.descriptionControl.value
      });
    }
    if (userUpdate.length > 0) {
      this.userService.patch(this.user.userId, userUpdate).then(() => {
        this.userInfoGroup.markAsUntouched();
        this.profileUpdateMessages.showSuccess('Info has been updated.');
      }).catch((error: HttpErrorResponse) => {
        if (error.status === 400) {
          const modelError = error.error;
          this.userInfoGroup.markAsUntouched();
          this.profileUpdateMessages.showError(modelError.errorMessages[0]);
        } else {
          this.profileUpdateMessages.showError('There was a problem updating the info.');
        }
      });
    }
  }

  navigateToPortfolioItemPage(item: PortfolioItem): void {
    item.navigateToProfilePage(this.router);
  }

  openGameCreationModal() {
    this.dialogRef = this.dialog.open(CreateGameComponent, {
      height: '600px',
      width: '500px',
      maxHeight: '70%',
      maxWidth: '70%',
      data: {
        user: this.user
      }
    });
    this.dialogRef.afterClosed()
      .subscribe((created) => {
        if (created) {
          this.loadPage('games', 1);
        }
      });
  }
}
