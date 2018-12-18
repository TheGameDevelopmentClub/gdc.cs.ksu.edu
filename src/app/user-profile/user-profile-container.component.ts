import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ksu-gdc-user-profile-container',
  templateUrl: './user-profile-container.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileContainerComponent implements OnInit {
  userId: number;
  editing: boolean;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userId = Number(this.route.snapshot.params['userId']);
  }
}
