import { UserCredential } from '@angular/fire/auth';
import { Observable, switchMap, throwError } from 'rxjs';
import { FirebaseAuthService, TaskAPI } from 'shared/api';
import { DecoratorModule } from './decorator.module';

export function AuthenticateRequest() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: TaskAPI[]): Observable<unknown> {
      const authService = DecoratorModule.injector.get(FirebaseAuthService);
      return authService
        .registerAnonymousUser()
        .pipe(
          switchMap((credentials: UserCredential) =>
            credentials.user
              ? <Observable<unknown>>originalMethod.apply(this, args)
              : throwError(() => new Error('User is not authenticated'))
          )
        );
    };

    return descriptor;
  };
}
