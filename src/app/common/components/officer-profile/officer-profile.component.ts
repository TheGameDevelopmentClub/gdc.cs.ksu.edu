import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ksu-gdc-officer-profile',
  templateUrl: './officer-profile.component.html',
  styleUrls: ['./officer-profile.component.scss']
})
export class OfficerProfileComponent implements OnInit {
  name: string;
  position: string;

  constructor() { }

  ngOnInit() {
  }

}
