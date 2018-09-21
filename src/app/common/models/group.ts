import { User } from 'src/app/common/models/user';

export class Group {
  public groupId: number;
  public name: string;
  public description: string;
  public memberCount: number;
  public users: User[];
}
