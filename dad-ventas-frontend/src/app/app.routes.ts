import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./modules/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./modules/auth/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'productos',
    loadComponent: () =>
      import('./modules/productos/list/list.component').then(m => m.ListComponent),
  },
  {
    path: 'productos/nuevo',
    loadComponent: () =>
      import('./modules/productos/form/form.component').then(m => m.FormComponent),
  },
  {
    path: 'productos/editar/:id',
    loadComponent: () =>
      import('./modules/productos/form/form.component').then(m => m.FormComponent),
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
];
