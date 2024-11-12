import { Component, inject } from '@angular/core';
import { ConnectivityService } from 'shared/connectivity';

@Component({
  selector: 'app-online-state',
  templateUrl: './online-state.component.html',
  styleUrl: './online-state.component.scss',
  standalone: false,
})
export class OnlineStateComponent {
  public readonly connectivityService: ConnectivityService =
    inject(ConnectivityService);
}
