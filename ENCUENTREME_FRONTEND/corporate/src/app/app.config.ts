import { ApplicationConfig, importProvidersFrom, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideRouter, withComponentInputBinding, Routes } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

// New Architecture Dependencies (TanStack)
import { provideAngularQuery, QueryClient } from '@tanstack/angular-query-experimental';

import { rootReducer } from './store';
import { AuthenticationEffects } from './store/Authentication/authentication.effects';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { environment } from '../environments/environment';

import { LayoutComponent } from './layouts/layout.component';
import { PublicLayoutComponent } from './layouts/public-layout.component';
import { AuthGuard } from './core/guards/auth.guard';

// Import Standalone Components directly for routes
import { BasicComponent } from './account/auth/signin/basic/basic.component';
import { PublicacionRegistroComponent } from './pages/public/publicacion-registro.component';
import { ObjetoHalladoPublicoComponent } from './pages/public/objeto-hallado-publico.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PublicacionListadoComponent } from './pages/publicaciones/publicacion-listado.component';
import { ObjetoListadoComponent } from './pages/objetos/objeto-listado.component';
import { DonacionListadoComponent } from './pages/donaciones/donacion-listado.component';
import { EntregaListadoComponent } from './pages/entregas/entrega-listado.component';
import { SearchComponent } from './features/search/search.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const routes: Routes = [
  // Raíz → Registro público (única pestaña pública)
  { path: '', redirectTo: 'publico/registro', pathMatch: 'full' },

  // Páginas públicas — sin AuthGuard
  {
    path: 'publico',
    component: PublicLayoutComponent,
    children: [
      { path: 'registro', component: PublicacionRegistroComponent },
      { path: 'hallazgos', component: ObjetoHalladoPublicoComponent },
      { path: 'buscar', component: SearchComponent },
      { path: '', redirectTo: 'registro', pathMatch: 'full' }
    ]
  },

  // Login
  {
    path: 'auth',
    children: [
      { path: 'signin/basic', component: BasicComponent }
    ]
  },

  // Páginas de personal — requieren login
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'publicaciones/listado', component: PublicacionListadoComponent },
      { path: 'objetos/listado', component: ObjetoListadoComponent },
      { path: 'donaciones', component: DonacionListadoComponent },
      { path: 'entregas', component: EntregaListadoComponent }
    ]
  },

  // Cualquier otra ruta → lista pública
  { path: '**', redirectTo: 'publico/perdidos' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideAngularQuery(new QueryClient()),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
    provideStore(rootReducer),
    provideEffects([AuthenticationEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ]
};
