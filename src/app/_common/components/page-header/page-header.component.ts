import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/_common/services/auth/auth.service';

@Component({
  selector: 'ksu-gdc-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  authPath: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  getAuthUserUsername(): string {
    return this.authService.authenticatedUser.username;
  }
}
