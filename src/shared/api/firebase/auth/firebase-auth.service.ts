import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInAnonymously,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  private readonly auth: Auth = inject(Auth);

  public registerAnonymousUser(): Observable<UserCredential> {
    return from(signInAnonymously(this.auth));
  }

  public getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
