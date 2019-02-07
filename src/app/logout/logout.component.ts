import { Component, OnInit, ViewChild } from '@angular/core';
import { InfoMessagesComponent } from 'src/app/_common/components/info-messages/info-messages.component';
import { AuthService } from '../_common/services/auth/auth.service';

@Component({
  selector: 'ksu-gdc-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  @ViewChild('logoutResponseMessages') logoutResponseMessages: InfoMessagesComponent;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.logoutCAS();
  }
}
