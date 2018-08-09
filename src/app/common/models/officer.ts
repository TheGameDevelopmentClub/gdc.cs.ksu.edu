export class Officer {
  public position: string;
  public name: string;
  public description: string;
  public imageUrl: string;

  constructor(position: string, obj) {
    this.position = position;
    this.name = obj.name || '';
    this.description = obj.description || '';
    this.imageUrl = obj.imageUrl || 'assets/images/profile.png';
  }
}
