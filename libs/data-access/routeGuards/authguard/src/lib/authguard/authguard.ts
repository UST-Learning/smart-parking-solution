import { Injectable } from '@angular/core';
import { CanMatch, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '@smart-parking/session';

@Injectable()
export class AuthGuard implements CanMatch {
  constructor(private sessionService: SessionService) {}
  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.sessionService.getSessionUser();
    return currentUser ? true : false;
  }
}
