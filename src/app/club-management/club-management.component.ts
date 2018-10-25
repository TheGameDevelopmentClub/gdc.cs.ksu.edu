import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/common/services/auth/auth.service';
import { User } from 'src/app/common/models/user';

@Component({
  selector: 'ksu-gdc-club-management',
  templateUrl: './club-management.component.html',
  styleUrls: ['./club-management.component.scss']
})
export class ClubManagementComponent implements OnInit {
  isValidated: boolean;
  isAdmin: boolean;
  user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.validateCASTicket(this.router.url, this.route.snapshot.queryParams['ticket'])
      .then(user => {
        this.user = user;
        this.isValidated = true;
        this.isAdmin = true;
      })
      .catch(error => {
        this.authService.loginWithCAS(this.router.url);
      });
  }
}
