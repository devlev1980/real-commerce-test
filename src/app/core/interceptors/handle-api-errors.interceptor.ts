import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class HandleApiErrorsInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      let errorMsg = '';
      if (err.error instanceof ErrorEvent) {
        console.log('Client side error');
        errorMsg = `Error: ${err.error.message}`;
      } else {
        console.log('Server side error');
        errorMsg = `Error Code: ${err.status},Message: ${err.message}`;
      }
      if (err.status === 401 || err.status === 403 || err.status === 404)  {
        console.log('asd');
      }

      console.log(errorMsg);
      return throwError(errorMsg);
    }));
  }
}
