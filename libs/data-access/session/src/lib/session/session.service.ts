import { Injectable } from '@angular/core';
import { LocalStorageService } from '@smart-parking/localStorage';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { User } from '@smart-parking/data-access';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private loginSubject = new BehaviorSubject<boolean>(false);
  isLogin$ = this.loginSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) { }


  loggIn(token: string): void {
    this.localStorageService.clear();
    if(token) {
      this.localStorageService.set('token', token);
      this.loginSubject.next(true);
    }
  }

  logOut(): void {
    this.loginSubject.next(false);
    this.localStorageService.clear();
  }

  checkLoginSession(): void {
    const token = this.localStorageService.get('token');
    const loggedIn = (token) ? true : false;
    console.log(this.getSessionUser());
    if (!loggedIn) {
      this.localStorageService.clear();
    }
    this.loginSubject.next(loggedIn);
  }

  getSessionUser(): User | null {
    const token = this.localStorageService.get('token') as string;
    if (!token) return null;
    const decoded = jwtDecode(token);
    return decoded as User;
  }
}
