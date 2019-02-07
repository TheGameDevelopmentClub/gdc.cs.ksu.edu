import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ksu-gdc-game-profile-container',
  templateUrl: './game-profile-container.component.html',
  styleUrls: ['./game-profile.component.scss']
})
export class GameProfileContainerComponent implements OnInit {
  gameId: number;
  editing: boolean;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.gameId = Number(this.route.snapshot.params['gameId']);
  }
}
