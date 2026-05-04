import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalComponent } from '../../global-component';
import { LoginResponse } from '../models/carwash.models';
import { User } from '../../store/Authentication/auth.models';

const API = GlobalComponent.AUTH_API;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    return this.http.post<LoginResponse>(`${API}login`, { username, password }).pipe(
      map(res => {
        if (res.success && res.data) {
          const user: User = {
            token:   res.data.token,
            usuario: res.data.usuario,
            opciones: res.data.opciones,
          };
          localStorage.setItem('cw_token',   user.token!);
          localStorage.setItem('cw_usuario', JSON.stringify(user.usuario));
          localStorage.setItem('cw_opciones', JSON.stringify(user.opciones));
          return user;
        }
        throw new Error(res.message || 'Credenciales incorrectas.');
      })
    );
  }

  logout(): void {
    localStorage.removeItem('cw_token');
    localStorage.removeItem('cw_usuario');
    localStorage.removeItem('cw_opciones');
  }

  getToken(): string | null {
    return localStorage.getItem('cw_token');
  }

  getUser() {
    const raw = localStorage.getItem('cw_usuario');
    return raw ? JSON.parse(raw) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Métodos de compatibilidad con el template (no se usan en flujo CarWash)
  currentUser(): any { return null; }
  currentUserValue: any = null;
}
