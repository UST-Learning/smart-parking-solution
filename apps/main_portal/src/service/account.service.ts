import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    constructor(private http: HttpClient) { }

    getAccounts(): Observable<any> {
        return this.http.get('/accounts');
    }

    saveAccount(account: any): Observable<any> {
        return this.http.post('/accounts', account);
    }
}
