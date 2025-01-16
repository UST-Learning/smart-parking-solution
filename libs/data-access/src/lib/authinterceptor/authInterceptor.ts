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
  intercept(
    req: HttpRequest<any>,
    handler: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Request URL: ' + req.url);
    const authToken = inject(AuthService).getAuthToken();
    const newReq = req.clone({
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
