import { API_URLS } from 'src/app/_common/constants/routing';
import { Router } from '@angular/router';

export class User {
  public userId: number;
  public username: string;
  public firstName: string;
  public lastName: string;
  public description: string;

  constructor(user: any) {
    this.userId = Number(user['userId']);
    this.username = user['username'];
    this.firstName = user['firstName'];
    this.lastName = user['lastName'];
    this.description = user['description'];
  }

  get displayName() {
    if (this.firstName == null || this.lastName == null) {
      return this.username;
    }
    return this.firstName + ' ' + this.lastName;
  }

  get imageUrl(): string {
    return `${API_URLS.users}/${this.userId}/profile-image`;
  }

  get email(): string {
    return this.username + '@ksu.edu';
  }

  navigateToProfilePage(router: Router) {
    router.navigate([`/members/${this.userId}`]);
  }
}

export class AuthUser {
  public userId: number;
  public username: string;
  public hasVerifiedInfo: boolean;

  constructor(user: any) {
    this.userId = user['userId'];
    this.username = user['username'];
    this.hasVerifiedInfo = user['hasVerifiedInfo'];
  }
}
