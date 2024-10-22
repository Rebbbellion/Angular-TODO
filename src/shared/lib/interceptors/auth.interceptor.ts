import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from 'environments';
import { from, Observable, switchMap } from 'rxjs';
import { FirebaseAuthService } from 'shared/api';

export function AuthInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const fireAuth: FirebaseAuthService = inject(FirebaseAuthService);
  const user = fireAuth.getCurrentUser();

  if (user) {
    return from(user.getIdToken()).pipe(
      switchMap((token: string) => {
        const modifiedReq: HttpRequest<unknown> = req.clone({
          url: `${environment.firebase.databaseURL}/users/${user.uid}/${req.url}.json`,
          setParams: {
            auth: token,
          },
        });
        return next(modifiedReq);
      })
    );
  }
  return next(req);
}
