import { API_PATH } from '../constants/paths';

export class NewGroup {
  public name: string;
  public description: string;
}

export class Group {
  public groupId: number;
  public name: string;
  public description: string;
  public imageUrl: string;

  constructor(group: any) {
    this.groupId = group['groupId'];
    this.name = group['name'];
    this.description = group['description'];
    this.imageUrl = `${API_PATH.groups}/${this.groupId}/profile-image`;
  }
}
