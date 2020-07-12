import { Injectable } from '@angular/core';
import { ResponseTreetter } from '../models/response-treetter';
import { UserCredentials } from '../models/user-treetter';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  isAuth$: Subject<boolean>;

  private credentials: UserCredentials;

  constructor() {
    this.isAuth$ = new Subject<boolean>();
    setTimeout(() => this.update(false), 1);
  }

  login(response: ResponseTreetter) {
    this.credentials = new UserCredentials(response);
    this.update(true);
  }

  logout() {
    this.credentials = null;
    this.update(false);
  }

  update(state: boolean): any { this.isAuth$.next(state); }

  get token() { return this.credentials ? this.credentials.access_token : ''; }

  get username() { return this.credentials ? this.credentials.username : ''; }

  get role() { return this.credentials ? this.credentials.role : ''; }

}
