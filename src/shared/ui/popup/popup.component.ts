import { Component } from '@angular/core';
import { fadeInOut } from 'shared/lib';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
  animations: [fadeInOut],
  host: {
    '[@fadeInOut]': '',
  },
})
export class PopupComponent {}
