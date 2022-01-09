import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  _url = 'http://127.0.0.1:5000/api/v1/login/user';
  constructor(private _http: HttpClient) { }

  login(user: User) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    localStorage.setItem('currentUser', JSON.stringify(user));
    return this._http.post<any>(this._url, JSON.stringify(user), {headers: headers});
  }
}
