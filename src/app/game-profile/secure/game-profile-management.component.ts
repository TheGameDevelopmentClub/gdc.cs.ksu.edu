import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';

import { AddCollaboratorComponent } from 'src/app/_common/components/add-collaborator/add-collaborator.component';
import { InfoMessagesComponent } from 'src/app/_common/components/info-messages/info-messages.component';
import { FileUploadComponent } from 'src/app/_common/components/file-upload/file-upload.component';
import { ImageLoaderDirective } from 'src/app/_common/directives/image-loader/image-loader.directive';
import { AuthService } from 'src/app/_common/services/auth/auth.service';
import { GameService } from 'src/app/_common/services/game/game.service';
import { Game } from 'src/app/_common/models/game';
import { User } from 'src/app/_common/models/user';

@Component({
  selector: 'ksu-gdc-game-profile-management',
  templateUrl: './game-profile-management.component.html',
  styleUrls: ['../game-profile.component.scss']
})
export class GameProfileManagementComponent implements OnInit {
  @Input() gameId: number;
  @Output() doneEditing: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('gameUpdateMessages') gameUpdateMessages: InfoMessagesComponent;
  @ViewChild('infoForm') infoForm: NgForm;
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

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.gameService.getById(this.gameId)
      .then(game => {
        this.game = game;
        this.loadPage('users', 1);
      })
      .catch(error => {
        this.game = null;
        this.errorOccurred = true;
      });
  }

  loadPage(category: string, pageNumber: number) {
    this.categories[category].loading = true;
    this.categories[category].service.getCollaborators(this.game.gameId, pageNumber, this.categories[category].pageSize)
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

  uploadGameImage(image: File): void {
    this.gameImageUploader.isProcessing = true;
    this.gameService.updateImage(this.game.gameId, image)
      .then(() => {
        this.gameUpdateMessages.showSuccess('The image has been updated.');
        this.gameImageUploader.isProcessing = false;
        this.gameImage.reload();
      })
      .catch(error => this.gameUpdateMessages.showError('There was a problem updating the image.'));
  }

  updateGameInfo(): void {
    this.gameService.update(this.game)
      .then(() => {
        this.infoForm.form.markAsPristine();
        this.infoForm.form.markAsUntouched();
        this.gameUpdateMessages.showSuccess('Info has been updated.');
      })
      .catch(error => this.gameUpdateMessages.showError('There was a problem updating the info.'));
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
