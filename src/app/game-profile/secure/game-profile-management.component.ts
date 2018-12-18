import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { InfoMessagesComponent } from 'src/app/_common/components/info-messages/info-messages.component';
import { FileUploadComponent } from 'src/app/_common/components/file-upload/file-upload.component';
import { ImageLoaderDirective } from 'src/app/_common/directives/image-loader/image-loader.directive';
import { GameService } from 'src/app/_common/services/game/game.service';
import { Game } from 'src/app/_common/models/game';

@Component({
  selector: 'ksu-gdc-game-profile-management',
  templateUrl: './game-profile-management.component.html',
  styleUrls: ['../game-profile.component.scss']
})
export class GameProfileManagementComponent implements OnInit {
  @Input() gameId: number;
  @Output() doneEditing: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('profileUpdateMessages') profileUpdateMessages: InfoMessagesComponent;
  @ViewChild('gamesUpdateMessages') gamesUpdateMessages: InfoMessagesComponent;
  @ViewChild('infoForm') infoForm: NgForm;
  @ViewChild(FileUploadComponent) imageUploader: FileUploadComponent;
  @ViewChild(ImageLoaderDirective) profileImage: ImageLoaderDirective;

  errorOccurred: boolean;
  game: Game;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
  }

  stopEditing(): void {
    this.doneEditing.emit();
  }
}
