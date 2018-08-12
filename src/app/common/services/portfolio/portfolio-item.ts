export class PortfolioItem {
  public creator: string;
  public title: string;
  public description: string;
  public imageUrls: string[];

  private constructor(obj) {
    this.creator = obj.creator || 'anonymous';
    this.title = obj.title || '';
    this.description = obj.description || '';
    this.imageUrls = [];
  }

  static create(obj): Promise<PortfolioItem> {
    return new Promise<PortfolioItem>((resolve, reject) => {
      const newItem = new PortfolioItem(obj);
      resolve(newItem);
    });
  }
}
