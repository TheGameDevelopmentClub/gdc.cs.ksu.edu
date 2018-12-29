export class ApiToken {
  public accessToken: string;
  public tokenType: string;
  public expirationDate: Date;

  constructor(token) {
    this.expirationDate = new Date();
    const secondsUntilExpired = Number(token['expires_in']);
    this.expirationDate.setSeconds(this.expirationDate.getSeconds() + secondsUntilExpired);
    this.accessToken = token['access_token'];
    this.tokenType = token['token_type'];
  }

  get token(): string {
    return `${this.tokenType} ${this.accessToken}`;
  }

  get expired(): boolean {
    return this.expirationDate > new Date();
  }
}
