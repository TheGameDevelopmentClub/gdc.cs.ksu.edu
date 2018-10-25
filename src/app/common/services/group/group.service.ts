import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Group } from 'src/app/common/models/group';
import { Game } from 'src/app/common/models/game';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private http: HttpClient
  ) { }

  getGroupById(groupId: number): Promise<Group> {
    return new Promise<Group>((resolve, reject) => {
      this.http.get<Group>(environment.API_URL + '/groups/' + groupId)
        .subscribe(
          group => resolve(new Group(group)),
          error => reject(error));
    });
  }

  getGames(groupId: number): Promise<Game[]> {
    return new Promise<Game[]>((resolve, reject) => {
      this.http.get<Game[]>(environment.API_URL + '/groups/' + groupId + '/portfolio/games')
        .subscribe(
          games => resolve(games.map((game) => new Game(game))),
          error => reject(error));
    });
  }
}
