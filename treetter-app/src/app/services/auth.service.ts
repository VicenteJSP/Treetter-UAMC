import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserTreetter } from '../models/user-treetter';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string;
  headers: HttpHeaders;

  constructor(private _httpClient: HttpClient) {
    this.url = `http://localhost:3001`;
    this.headers = new HttpHeaders();
    this.headers.append('Content-type', 'aplication/json');
  }

  login(user: UserTreetter) {
    return this._httpClient.post(`${this.url}/singin`, user, { headers: this.headers });
  }

  logout(user: UserTreetter) {
    return this._httpClient.post( `${this.url}/logout`,user, { headers: this.headers });
   }

  register(newUser: UserTreetter) {
    return this._httpClient.post(`${this.url}/singup`, newUser, { headers: this.headers });
  }

}
