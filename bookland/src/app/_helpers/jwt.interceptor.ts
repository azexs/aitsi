import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';


import {environment} from "../../environments/environment";
import {AccountService} from "../_services/account.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {
  }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
      const user = this.accountService.userValue;
      const isLoggedIn = user && user.accessToken;
      const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
          const cloned = request.clone({
            setHeaders: {
              Authorization: `Bearer ${user.accessToken}`
            }
          });

          return next.handle(cloned);
        }

        return next.handle(request);
    }
}
