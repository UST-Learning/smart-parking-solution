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

  intercept(
    req: HttpRequest<any>,
    handler: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Request URL: ' + req.url);
    const authToken = inject(AuthService).getAuthToken();
    const newReq = req.clone({
      url: `${this.API_BASE_URL}${req.urlWithParams}`,
      headers: req.headers.append('X-Authentication-Token', authToken),
    });
    return handler.handle(newReq);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}
  getAuthToken() {
    return '';
  }
}
