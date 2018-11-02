import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ksu-gdc-game-jam',
  templateUrl: './game-jam.component.html',
  styleUrls: ['./game-jam.component.scss']
})
export class GameJamComponent implements OnInit {
  participantsCanSignUp = true;

  constructor(
  ) { }

  ngOnInit() {
  }

  openParticipantSignup() {
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLScc3hXb-kkyJlVL5wEKN8ggydY172AXp1Gmuq9Map_GJFS5Tw/viewform';
  }

  stopParticipation() {
    this.participantsCanSignUp = false;
  }
}
