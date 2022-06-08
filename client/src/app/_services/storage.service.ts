import { Injectable } from '@angular/core';
import { appConst } from '../appConst';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _userKey = appConst.userKey

  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(this._userKey);
    window.sessionStorage.setItem(this._userKey, JSON.stringify(user));
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(this._userKey);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(this._userKey);
    if (user) {
      return true;
    }
    return false;
  }
}
