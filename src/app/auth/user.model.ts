export interface IUser {
  uid: string;
  email: string;
  name: string;
}

export class User {
  public name: string;
  public email: string;
  public uid: string;

  constructor(public user: IUser) {
    this.name = (user && user.name) || null;
    this.email = (user && user.email) || null;
    this.uid = (user && user.uid) || null;
  }
}
