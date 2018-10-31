import { User } from 'src/app/_common/models/user';

export class Officer {
  public officerId: number;
  public position: string;
  public user: User;

  constructor(officer: any) {
    this.officerId = officer['officerId'];
    this.position = officer['position'];
    this.user = (officer['user']) ? new User(officer['user']) : new User({});
  }

  get fullName(): string {
    return this.user.fullName;
  }

  get imageUrl(): string {
    return this.user.imageUrl;
  }
}
