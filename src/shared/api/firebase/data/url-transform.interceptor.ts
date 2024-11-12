import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from 'environments';
import { Observable } from 'rxjs';

export function URLTransformInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const modifiedReq: HttpRequest<unknown> = req.clone({
    url: `${environment.firebase.databaseURL}/${req.url}.json`,
  });

  return next(modifiedReq);
}
