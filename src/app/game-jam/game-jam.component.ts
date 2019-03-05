import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ksu-gdc-game-jam',
  templateUrl: './game-jam.component.html',
  styleUrls: ['./game-jam.component.scss']
})
export class GameJamComponent implements OnInit {
  participantsCanSignUp = true;
  selectedGameJamYear: number | undefined;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const snapshot = this.route.snapshot;
    const gameJamYear = Number(snapshot.queryParams['year']);
    this.selectedGameJamYear = (isNaN(gameJamYear) ? null : gameJamYear);
  }

  openParticipantSignup(): void {
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLScc3hXb-kkyJlVL5wEKN8ggydY172AXp1Gmuq9Map_GJFS5Tw/viewform';
  }

  stopParticipation(): void {
    this.participantsCanSignUp = false;
  }
}
