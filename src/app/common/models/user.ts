import { Group } from 'src/app/common/models/group';

export class User {
  public id: number;
  public username: string;
  public firstName: string;
  public lastName: string;
  public description: string;
  public imageUrl: string;
  public email: string;
  public groups: Group[];
}
