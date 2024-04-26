import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { catchError, Observable, throwError } from 'rxjs';

/**
 * An HTTP interceptor that handles API errors and displays alerts for HTTP 500 errors.
 */
@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
    constructor(private alertService: AlertService) {}

    /**
     * Intercepts HTTP requests and handles errors, displaying an alert for HTTP 500 status.
     *
     * @param {HttpRequest<unknown>} req - The incoming HTTP request.
     * @param {HttpHandler} next - The next HTTP handler in the chain.
     * @returns {Observable<HttpEvent<unknown>>} An observable of the HTTP event.
     *
     * @example
     * // Usage in Angular module
     * {
     *   provide: HTTP_INTERCEPTORS,
     *   useClass: ApiErrorInterceptor,
     *   multi: true,
     * }
     */
    public intercept(
        req: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 500) {
                    this.alertService.showAlert('Remote API Restriction', 'red-snackbar');
                }
                return throwError(() => error);
            })
        );
    }
}
