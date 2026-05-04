import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure, logout } from './authentication.actions';
import { User } from './auth.models';

export interface AuthenticationState {
  isLoggedIn: boolean;
  user:       User | null;
  error:      string | null;
  loading:    boolean;
}

const initialState: AuthenticationState = {
  isLoggedIn: false,
  user:       null,
  error:      null,
  loading:    false,
};

export const authenticationReducer = createReducer(
  initialState,
  on(login,        state => ({ ...state, loading: true,  error: null })),
  on(loginSuccess, (state, { user }) => ({ ...state, loading: false, isLoggedIn: true, user, error: null })),
  on(loginFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(logout,       state => ({ ...state, isLoggedIn: false, user: null }))
);
