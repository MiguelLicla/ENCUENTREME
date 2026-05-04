import { createAction, props } from '@ngrx/store';
import { User } from './auth.models';

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');

// Kept for compatibility with existing template code
export const Register = createAction('[Auth] Register', props<{ email: string; first_name: string; password: string }>());
export const RegisterSuccess = createAction('[Auth] Register Success', props<{ user: User }>());
export const RegisterFailure = createAction('[Auth] Register Failure', props<{ error: string }>());
