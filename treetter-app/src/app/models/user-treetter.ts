import { ResponseTreetter, Credentials } from './response-treetter';

export class UserTreetter {
  username?: string;
  password: string;
  email: string;
}

export class UserCredentials {
  private responseUsername: string;
  private responseAccess_token: string;
  private responseMethod: string;
  private responseRole: string;
  constructor(response: ResponseTreetter) {
    const { username, access_token, method, role } = (response.data as Credentials);
    this.responseUsername = username;
    this.responseAccess_token = access_token;
    this.responseMethod = method;
    this.responseRole = role;
  }

  get username() { return this.responseUsername; }

  get access_token() { return `${this.responseMethod} ${this.responseAccess_token}`; }

  get role() { return this.responseRole; }

}
