import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UtilityService } from 'src/app/_common/services/utility/utility.service';
import { AuthService } from 'src/app/_common/services/auth/auth.service';
import { User, AuthUser } from 'src/app/_common/models/user';

@Component({
  selector: 'ksu-gdc-club-management',
  templateUrl: './club-management.component.html',
  styleUrls: ['./club-management.component.scss']
})
export class ClubManagementComponent implements OnInit {
  isValidated: boolean;
  canManageClub: boolean;
  user: AuthUser;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.validateCASTicket(this.router.url, this.route.snapshot.queryParams['ticket'])
      .then(user => {
        this.utilityService.deleteQueryParams(this.router, this.route, ['ticket']);
        this.user = user;
        this.isValidated = true;
        this.canManageClub = user.isOfficer;
        if (!this.canManageClub) {
          this.router.navigate(['/manage/member']);
        }
      })
      .catch(error => {
        this.authService.loginWithCAS(this.router.url);
      });
  }
}
