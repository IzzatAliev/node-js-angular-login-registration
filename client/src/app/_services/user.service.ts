import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { appConst } from '../appConst';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _apiUrl = environment.apiUrl + appConst.appTest;

  constructor(private http: HttpClient) {}
  getPublicContent(): Observable<any> {
    return this.http.get(this._apiUrl + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(this._apiUrl + 'user', { responseType: 'text' });
  }
}
