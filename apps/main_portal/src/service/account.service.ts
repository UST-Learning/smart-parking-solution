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

    createAccount(account: any): Observable<any> {
        return this.http.post('/accounts', account);
    }

    deleteAccount(accountId: string): Observable<any> {
        return this.http.delete(`/accounts/${accountId}`);
    }

    updateAccount(accountId: string, account: any): Observable<any> {
        return this.http.put(`/accounts/${accountId}`, account);
    }
}
