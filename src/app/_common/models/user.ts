import { API_PATH } from 'src/app/_common/constants/paths';
import { Router } from '@angular/router';

export class User {
  public userId: number;
  public username: string;
  public firstName: string;
  public lastName: string;
  public description: string;
  public email: string;
  public imageUrl: string;

  constructor(user: any) {
    this.userId = Number(user['userId']);
    this.username = user['username'];
    this.firstName = user['firstName'];
    this.lastName = user['lastName'];
    this.description = user['description'];
    this.email = user['email'];
    this.imageUrl = `${API_PATH.users}/${this.userId}/profile-image`;
  }

  navigateToProfilePage(router: Router) {
    router.navigate([`/members/${this.userId}`]);
  }

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}

export class AuthUser {
  public userId: number;
  public username: string;
  public roles: Array<string>;
  public token: string;

  constructor(user: any) {
    this.userId = user['userId'];
    this.username = user['username'];
    this.roles = user['roles'];
    this.token = 'Bearer ' + user['token'];
  }

  isOfficer(): boolean {
    return this.roles.includes('officer');
  }
}
