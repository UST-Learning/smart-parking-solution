import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LandingService {
  private filterUsersSubject = new Subject<any>();
  public filterUsersObs = this.filterUsersSubject.asObservable();

  getfilterUsersObs(): Observable<any> {
    return this.filterUsersSubject.asObservable();
  }

  // Optional: method to update the subject
  updateValue(value: any): void {
    this.filterUsersSubject.next(value);
  }
}