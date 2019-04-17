import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { STORAGE_KEY_NAMES } from 'src/app/_common/constants/storage';
import { APP_ROUTES } from 'src/app/_common/constants/routing';
import { StorageService } from 'src/app/_common/services/storage/storage.service';
import { AuthService } from 'src/app/_common/services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private storageService: StorageService,
        private authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getUserAccessToken();
        request = request.clone({
            setHeaders: {
                Authorization: token
            }
        });
        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                const newToken = event.headers.get('Authorization');
                if ((newToken && newToken !== '') && event.url.startsWith(environment.API_URL)) {
                    this.storageService.setSessionStorageItem(STORAGE_KEY_NAMES.userAuthToken, newToken);
                }
            }
            return event;
        }), catchError(error => {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 401) {
                    this.authService.clearUser();
                    this.router.navigate([APP_ROUTES.login]);
                }
            }
            return throwError(error);
        }));
    }
}