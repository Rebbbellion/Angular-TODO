import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';
import { catchError, first, from, Observable, switchMap } from 'rxjs';
import { FirebaseAuthService } from './firebase-auth.service';

export function AuthInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const fireAuth: FirebaseAuthService = inject(FirebaseAuthService);

  return fireAuth.registerAnonymousUser().pipe(
    switchMap((credentials: UserCredential) => {
      const user = credentials.user;

      return from(user.getIdToken()).pipe(
        first(),
        switchMap((token: string) => {
          const modifiedReq: HttpRequest<unknown> = req.clone({
            url: `${user.uid}/${req.url}.json`,
            setParams: {
              auth: token,
            },
          });
          return next(modifiedReq);
        })
      );
    }),
    catchError(() => next(req))
  );
}
