import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/auth.service';
import { login, loginSuccess, loginFailure, logout, logoutSuccess } from './authentication.actions';

@Injectable()
export class AuthenticationEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map(user => {
            this.router.navigate(['/dashboard']);
            return loginSuccess({ user });
          }),
          catchError(err => of(loginFailure({ error: err.message ?? 'Error al iniciar sesión.' })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        this.authService.logout();
        this.router.navigate(['/auth/signin/basic']);
      }),
      map(() => logoutSuccess())
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router
  ) {}
}
