import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  catchError,
  first,
  fromEvent,
  map,
  merge,
  Observable,
  of,
  Subscriber,
  timeout,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectivityService {
  private readonly http: HttpClient = inject(HttpClient);

  private sendPingRequest(): Observable<boolean> {
    return this.http
      .get('ping')
      .pipe(
        timeout(3000),
        map(() => true),
        catchError(() => of(false))
      )
      .pipe(first());
  }

  public getOnlineStatus(): Observable<boolean> {
    return new Observable<boolean>((subscriber: Subscriber<boolean>) => {
      this.sendPingRequest().subscribe({
        next: (value: boolean) => {
          subscriber.next(value);
        },
      });

      merge(
        fromEvent(window, 'online'),
        fromEvent(window, 'offline')
      ).subscribe({
        next: (ev: Event) => {
          if (ev.type === 'online') {
            this.sendPingRequest().subscribe({
              next: (value: boolean) => {
                subscriber.next(value);
              },
            });
          } else {
            subscriber.next(false);
          }
        },
      });
    });
  }
}
