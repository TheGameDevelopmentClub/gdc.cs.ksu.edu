import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';

import { AddCollaboratorComponent } from 'src/app/_common/components/add-collaborator/add-collaborator.component';
import { InfoMessagesComponent } from 'src/app/_common/components/info-messages/info-messages.component';
import { FileUploadComponent } from 'src/app/_common/components/file-upload/file-upload.component';
import { ImageLoaderDirective } from 'src/app/_common/directives/image-loader/image-loader.directive';
import { AuthService } from 'src/app/_common/services/auth/auth.service';
import { GameService } from 'src/app/_common/services/game/game.service';
import { Game } from 'src/app/_common/models/game';
import { User } from 'src/app/_common/models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ksu-gdc-game-profile-management',
  templateUrl: './game-profile-management.component.html',
  styleUrls: ['../game-profile.component.scss']
})
export class GameProfileManagementComponent implements OnInit {
  @Input() gameId: number;
  @Output() doneEditing: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(InfoMessagesComponent) gameUpdateMessages: InfoMessagesComponent;
  @ViewChild(FileUploadComponent) gameImageUploader: FileUploadComponent;
  @ViewChild(ImageLoaderDirective) gameImage: ImageLoaderDirective;

  errorOccurred: boolean;
  game: Game;

  categories = {
    users: {
      service: this.gameService,
      loading: false,
      loaded: false,
      pageSize: 6,
      totalItemCount: 0,
      list: []
    }
  };

  dialogRef: MatDialogRef<any>;

  gameInfoGroup: FormGroup;
  titleControl: FormControl;
  descriptionControl: FormControl;
  hostUrlControl: FormControl;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.gameService.getById(this.gameId).then(game => {
      this.game = game;
      this.titleControl = new FormControl(this.game.title || '', [Validators.required, Validators.maxLength(100)]);
      this.descriptionControl = new FormControl(this.game.description || '', [Validators.maxLength(1000)]);
      this.hostUrlControl = new FormControl(this.game.hostUrl || '', [Validators.maxLength(2000)]);
      this.gameInfoGroup = new FormGroup({
        title: this.titleControl,
        description: this.descriptionControl,
        hostUrl: this.hostUrlControl
      });
      this.loadPage('users', 1);
    }).catch(error => {
      this.game = null;
      this.errorOccurred = true;
    });
  }

  formIsValid(): boolean {
    return this.gameInfoGroup.touched && this.gameInfoGroup.valid;
  }

  loadPage(category: string, pageNumber: number) {
    this.categories[category].loading = true;
    this.categories[category].service.getCollaborators(this.game.gameId, pageNumber, this.categories[category].pageSize)
      .then((items: any) => {
        this.categories[category].list = items.value;
        this.categories[category].totalItemCount = items.total;
        this.categories[category].loaded = true;
        this.categories[category].loading = false;
      }).catch();
  }

  stopEditing(): void {
    this.doneEditing.emit();
  }

  uploadGameImage(image: File): void {
    this.gameImageUploader.isProcessing = true;
    this.gameService.updateImage(this.game.gameId, image)
      .then(() => {
        this.gameUpdateMessages.showSuccess('The image has been updated.');
        this.gameImageUploader.isProcessing = false;
        this.gameImage.reload();
      })
      .catch((error: HttpErrorResponse) => {
        if (error.status === 400) {
          const modelError = error.error;
          this.gameUpdateMessages.showError(modelError.errorMessages[0]);
          this.gameImageUploader.isProcessing = false;
        } else {
          this.gameUpdateMessages.showError('There was a problem updating the image.');
          this.gameImageUploader.isProcessing = false;
        }
      });
  }

  updateGameInfo(): void {
    const gameUpdate = [];
    if (this.titleControl.touched) {
      gameUpdate.push({
        op: 'replace',
        path: '/title',
        value: this.titleControl.value
      });
    }
    if (this.descriptionControl.touched) {
      gameUpdate.push({
        op: 'replace',
        path: '/description',
        value: this.descriptionControl.value
      });
    }
    if (this.hostUrlControl.touched) {
      gameUpdate.push({
        op: 'replace',
        path: '/hostUrl',
        value: this.hostUrlControl.value
      });
    }
    if (gameUpdate.length > 0) {
      this.gameService.patch(this.game.gameId, gameUpdate).then(() => {
        this.gameInfoGroup.markAsUntouched();
        this.gameUpdateMessages.showSuccess('Info has been updated.');
      }).catch((error: HttpErrorResponse) => {
        if (error.status === 400) {
          const modelError = error.error;
          this.gameInfoGroup.markAsUntouched();
          this.gameUpdateMessages.showError(modelError.errorMessages[0]);
        } else {
          this.gameUpdateMessages.showError('There was a problem updating the info.');
        }
      });
    }
  }

  navigateToMemberProfile(user: User): void {
    user.navigateToProfilePage(this.router);
  }

  openAddGameUserModal(): void {
    this.dialogRef = this.dialog.open(AddCollaboratorComponent, {
      height: '700px',
      width: '500px',
      maxHeight: '70%',
      maxWidth: '70%',
      data: {
        item: this.game
      }
    });
    this.dialogRef.afterClosed()
      .subscribe((created) => {
        if (created) {
          this.loadPage('users', 1);
        }
      });
  }

  removeCollaborator(user: User): void {
    this.gameService.removeCollaborator(this.game.gameId, user.userId)
      .then(() => {
        if (this.authService.authenticatedUser.userId === user.userId) {
          user.navigateToProfilePage(this.router);
        } else {
          this.gameUpdateMessages.showSuccess(`'${user.username}' was removed as a collaborator.`);
          this.loadPage('users', 1);
        }
      })
      .catch((err) => this.gameUpdateMessages.showError(`There was a problem removing '${user.username}' from collaborators.`));
  }
}
