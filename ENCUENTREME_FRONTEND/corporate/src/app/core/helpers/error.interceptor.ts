import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload();
            }
            
            const error = err.error?.message || err.statusText || 'Error desconocido';
            
            // Proactive notification for errors (except 401 which reloads)
            if (err.status !== 401) {
                Swal.fire({
                    title: 'Error del Servidor',
                    text: error,
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Entendido'
                });
            }

            return throwError(() => error);
        }))
    }
}
