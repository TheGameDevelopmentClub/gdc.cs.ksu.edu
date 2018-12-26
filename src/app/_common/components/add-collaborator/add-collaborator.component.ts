import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { InfoMessagesComponent } from 'src/app/_common/components/info-messages/info-messages.component';
import { GameService } from 'src/app/_common/services/game/game.service';
import { PortfolioItem } from 'src/app/_common/models/portfolio';
import { PaginatedList } from 'src/app/_common/models/paginated-list';
import { User } from 'src/app/_common/models/user';

@Component({
  selector: 'ksu-gdc-add-collaborator',
  templateUrl: './add-collaborator.component.html',
  styleUrls: ['./add-collaborator.component.scss']
})
export class AddCollaboratorComponent implements OnInit {
  @ViewChild('addCollaboratorMessages') addCollaboratorMessages: InfoMessagesComponent;

  categories = {
    games: {
      service: this.gameService
    }
  };

  pageSize = 9;
  loading = false;
  loaded = false;
  totalItemCount = 0;

  users = [];
  selectedUsers = [];

  constructor(
    private dialogRef: MatDialogRef<AddCollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { item: PortfolioItem, service: any },
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.loadPage(1);
  }

  loadPage(pageNumber: number) {
    this.loading = true;
    this.categories[this.data.item.category].service.getNonCollaborators(this.data.item.id, pageNumber, this.pageSize)
      .then((pageUsers: PaginatedList<User>) => {
        this.users = pageUsers.value;
        this.totalItemCount = pageUsers.total;
        this.loaded = true;
        this.loading = false;
      })
      .catch((err) => {
        this.addCollaboratorMessages.showError('There was a problem loading non-collaborators.');
      });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  selectUser(user: User) {
    this.selectedUsers.push(user);
    this.addCollaborators();
  }

  addCollaborators() {
    const user = this.selectedUsers[0];
    this.categories[this.data.item.category].service.addCollaborator(this.data.item.id, user.userId)
      .then(() => {
        this.dialogRef.close(true);
      })
      .catch(error => {
        this.addCollaboratorMessages.showError('There was a problem adding chosen collaborators.');
        this.loadPage(1);
      });
  }
}
