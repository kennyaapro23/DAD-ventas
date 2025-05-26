import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './core/layout/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  // Redirección desde raíz al login
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  // Auth público (sin layout)
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

  // Rutas protegidas con layout principal
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
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
      }
    ]
  },

  // Fallback: cualquier otra ruta no válida → login
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
