import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectivityService {
  public readonly onlineStatus: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(navigator.onLine);
  private readonly windowOnlineStatus: Observable<boolean> = merge(
    fromEvent(window, 'online'),
    fromEvent(window, 'offline')
  ).pipe(map((ev: Event) => ev.type === 'online'));

  constructor() {
    this.windowOnlineStatus.subscribe({
      next: (isOnline: boolean) => {
        this.onlineStatus.next(isOnline);
      },
    });
  }
}
