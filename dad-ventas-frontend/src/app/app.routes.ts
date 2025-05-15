import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () => import('./modules/auth/login/login.component')
      .then(m => m.LoginComponent)
  },

  // ✅ Rutas de productos
  {
    path: 'productos',
    loadComponent: () => import('./modules/productos/list/list.component')
      .then(m => m.ListComponent)
  },
  {
    path: 'productos/nuevo',
    loadComponent: () => import('./modules/productos/form/form.component')
      .then(m => m.FormComponent)
  },
  {
    path: 'productos/editar/:id',
    loadComponent: () => import('./modules/productos/form/form.component')
      .then(m => m.FormComponent)
  },

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' } // ✅ ruta por defecto
];
