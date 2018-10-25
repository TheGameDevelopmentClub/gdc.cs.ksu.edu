import { User } from 'src/app/common/models/user';

export class Officer {
  public officerId: number;
  public position: string;
  public user: User;

  constructor(officer: any) {
    this.officerId = officer['officerId'];
    this.position = officer['position'];
    this.user = officer['user'];
  }
}
