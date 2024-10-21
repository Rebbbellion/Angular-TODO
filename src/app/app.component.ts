import { Component, inject } from '@angular/core';
import { FirebaseAuthService } from 'shared/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  firebaseAuth: FirebaseAuthService = inject(FirebaseAuthService);

  ngOnInit() {
    this.firebaseAuth.registerAnonymousUser().subscribe();
  }
}
