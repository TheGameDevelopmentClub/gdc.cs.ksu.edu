import { API_PATH } from 'src/app/_common/constants/paths';

export class User {
  public userId: number;
  public username: string;
  public firstName: string;
  public lastName: string;
  public description: string;
  public email: string;
  public imageUrl: string;

  constructor(user: any) {
    this.userId = user['userId'];
    this.username = user['username'];
    this.firstName = user['firstName'];
    this.lastName = user['lastName'];
    this.description = user['description'];
    this.email = user['email'];
    this.imageUrl = `${API_PATH.usersBaseUrl}/${this.userId}/profile-image`;
  }

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}

export class AuthUser extends User {
  public isOfficer: boolean;

  constructor(user: any) {
    super(user);
    this.isOfficer = user['isOfficer'];
  }
}
