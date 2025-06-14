import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get('/users');
  }

  createUser(user: any): Observable<any> {
    return this.http.post('/users', user);
  }

  updateUser(userId: string, user: any): Observable<any> {
    return this.http.put(`/users/${userId}`, user);
  }
  
  getAccountsMetadata(): Observable<any> {
    return this.http.get('/accounts/metadata');
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`/users/${userId}`);
  }

}
