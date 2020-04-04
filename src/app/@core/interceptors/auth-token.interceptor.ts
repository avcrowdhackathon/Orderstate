import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      this.router.navigateByUrl(`/logout`);
      return of(err.message);
    }
    return throwError(err);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request || !request.url || (/^http/.test(request.url) && !(environment.api_url && request.url.startsWith(environment.api_url)))) {
      return next.handle(request);
    }

    if (!!this.auth.token) {
      request = request.clone({
        headers: request.headers.append('Authorization', 'Bearer ' + this.auth.token.access_token),
      });
    }

    return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));
  }


}
