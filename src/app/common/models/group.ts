export class Group {
  public groupId: number;
  public name: string;
  public description: string;
  public imageUrl: string;

  constructor(group: any) {
    this.groupId = group['groupId'];
    this.name = group['name'];
    this.description = group['description'];
    this.imageUrl = group['imageUrl'];
  }
}
