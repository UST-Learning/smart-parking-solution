import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class loginService {
    constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } if (error.status === 404) {
            // A client-side or network error occurred. Handle it accordingly.
            // console.error('An error occurred:', error.error);
            this.router.navigate(['page_not_found'], {relativeTo: this.activatedRoute});
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.message);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }

    verifyLogin(phone: string): Observable<any> {
        return this.http.get(`/verify/${phone}`);
        // return of({
        //     isAdmin: true,
        //     isVerified: true
        // })
    }

    doLogin(userCred: any): Observable<any> {
        return this.http.post('/login', userCred).pipe(catchError(this.handleError.bind(this)));
        // return of({
        //     token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        // })
    }
}
