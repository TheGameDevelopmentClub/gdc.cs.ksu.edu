import { User } from 'src/app/_common/models/user';
import { Group } from 'src/app/_common/models/group';

export class PortfolioItem {
  public title: string;
  public description: string;
  public url: string;
  public user: User;
  public group: Group;
  public imageUrl: string;
}
