import { environment } from 'src/environments/environment';

export class User {
  public userId: number;
  public username: string;
  public firstName: string;
  public lastName: string;
  public description: string;
  public imageUrl: string;
  public email: string;

  constructor(user: any) {
    this.userId = user['userId'];
    this.username = user['username'];
    this.firstName = user['firstName'];
    this.lastName = user['lastName'];
    this.description = user['description'];
    this.imageUrl = user['imageUrl'] || `${environment.API_URL}/users/${this.userId}/profile-image`;
    this.email = user['email'];
  }
}

export class AuthUser extends User {
  public isOfficer: boolean;

  constructor(user: any) {
    super(user);
    this.isOfficer = user['isOfficer'];
  }
}