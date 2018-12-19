import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

import { FileUploadComponent } from 'src/app/_common/components/file-upload/file-upload.component';
import { InfoMessagesComponent } from 'src/app/_common/components/info-messages/info-messages.component';
import { ImageLoaderDirective } from 'src/app/_common/directives/image-loader/image-loader.directive';
import { UserService } from 'src/app/_common/services/user/user.service';
import { GameService } from 'src/app/_common/services/game/game.service';
import { User } from 'src/app/_common/models/user';

@Component({
  selector: 'ksu-gdc-user-profile-management',
  templateUrl: './user-profile-management.component.html',
  styleUrls: ['../user-profile.component.scss']
})
export class UserProfileManagementComponent implements OnInit {
  @Input() userId: number;
  @Output() doneEditing: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('profileUpdateMessages') profileUpdateMessages: InfoMessagesComponent;
  @ViewChild('gamesUpdateMessages') gamesUpdateMessages: InfoMessagesComponent;
  @ViewChild('infoForm') infoForm: NgForm;
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

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.userService.getById(this.userId)
      .then(user => {
        this.user = user;
        this.loadPage('games', 1);
      })
      .catch(error => this.errorOccurred = true);
  }

  loadPage(category: string, pageNumber: number) {
    this.categories[category].loading = true;
    this.categories[category].service.getPaginationOfAllByUserId(this.user.userId, pageNumber, this.categories[category].pageSize)
      .then((items) => {
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
    this.userService.updateImage(this.user.userId, image)
      .then(() => {
        this.profileUpdateMessages.showSuccess('Your profile image has been updated.');
        this.profileImageUploader.isProcessing = false;
        this.profileImage.reload();
      })
      .catch(error => this.profileUpdateMessages.showError('There was a problem updating your profile image.'));
  }

  updateUserInfo() {
    this.userService.update(this.user)
      .then(() => {
        this.infoForm.form.markAsPristine();
        this.infoForm.form.markAsUntouched();
        this.profileUpdateMessages.showSuccess('Your info has been updated.');
      })
      .catch(error => this.profileUpdateMessages.showError('There was a problem updating your info.'));
  }

  openGameCreationModal() {
    // this.dialogRef = this.dialog.open(CreateGameComponent, {
    //   height: '400px',
    //   width: '400px'
    // });
    // this.dialogRef.afterClosed()
    //   .subscribe((created) => {
    //     if (created) {
    //       this.loadPage('games', 1);
    //     }
    //   });
  }
}
