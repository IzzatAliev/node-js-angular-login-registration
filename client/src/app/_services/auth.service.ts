import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';
import { appConst } from '../appConst';

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _apiUrl = environment.apiUrl + appConst.appAuth;

  constructor(private http: HttpClient) {
  }

  login(_login: string, password: string): Observable<any> {
    return this.http.post(
      this._apiUrl + 'signin',
      {
        _login,
        password,
      },
      httpOptions
    );
  }

  register(email: string, login: string, username: string, password: string, birthDate: Date, country: string): Observable<any> {
    return this.http.post(
      this._apiUrl + 'signup',
      {
        email,
        login,
        username,
        password,
        birthDate,
        country
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(this._apiUrl + 'signout', {}, httpOptions);
  }
}
