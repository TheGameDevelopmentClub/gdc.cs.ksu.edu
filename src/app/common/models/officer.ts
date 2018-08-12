export class Officer {
  public position: string;
  public name: string;
  public description: string;
  public imageUrl: string;

  private constructor(position: string, obj) {
    this.position = position;
    this.name = obj.name || '';
    this.description = obj.description || '';
    this.imageUrl = obj.imageUrl || 'assets/images/profile.png';
  }

  static create(position: string, obj): Promise<Officer> {
    return new Promise<Officer>((resolve, reject) => {
      const newOfficer = new Officer(position, obj);
      resolve(newOfficer);
    });
  }
}
