import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CredentialsService } from './credentials.service';

@Injectable({
  providedIn: 'root'
})
export class TreetterService {

  private url: string;
  constructor(
    private _http: HttpClient,
    private _credentials: CredentialsService
  ) {
    this.url = 'http://localhost:3001/api';
  }

  consultTreemap(user: string) {
    const params: HttpParams = new HttpParams().set('role',this._credentials.role !== '' ? this._credentials.role : '');
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', this._credentials.token !== '' ? this._credentials.token : '');
    return this._http.get(`${this.url}/treemap/${user}`, { headers, params });
  }

}
