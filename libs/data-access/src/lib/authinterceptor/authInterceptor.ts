import { DOCUMENT } from '@angular/common';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class authInterceptor implements HttpInterceptor {
  private API_BASE_URL = 'http://localhost:3000/api';
  private authExemptedUrls = ['/verify', '/login'];

  intercept(
    req: HttpRequest<any>,
    handler: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Request URL: ' + req.url);
    const authToken = inject(AuthService).getAuthToken();
    let newReq;
    if(this.authExemptedUrls.includes(req.url)) {
      newReq = req.clone({
        url: `${this.API_BASE_URL}${req.urlWithParams}`
      });
    } else {
      newReq = req.clone({
        url: `${this.API_BASE_URL}${req.urlWithParams}`,
        headers: req.headers.append('X-Authentication-Token', authToken),
      });
    }
    return handler.handle(newReq);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly localStorage = inject(DOCUMENT)?.defaultView?.localStorage;
  getAuthToken() {
    if(this.localStorage?.getItem('token')) {
      const token = this.localStorage.getItem('token')?.replace(/"/g, '') ;
      return "Bearer " + token;
    }

    return '';
  }
}
