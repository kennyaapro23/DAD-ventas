import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './core/layout/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  // 🔓 Público
  {
    path: 'auth/login',
    loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./modules/auth/register/register.component').then(m => m.RegisterComponent),
  },

  // 🔐 Protegidas con Layout
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [

      { path: 'dashboard', component: DashboardComponent },

      // 🛒 Productos
      {
        path: 'productos',
        loadComponent: () => import('./modules/productos/list/list.component').then(m => m.ListComponent),
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'productos/nuevo',
        loadComponent: () => import('./modules/productos/form/form.component').then(m => m.FormComponent),
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'productos/editar/:id',
        loadComponent: () => import('./modules/productos/form/form.component').then(m => m.FormComponent),
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      },

      // 📦 Categorías
      {
        path: 'categorias',
        loadComponent: () => import('./modules/categorias/list/list.component').then(m => m.ListComponent),
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'categorias/nuevo',
        loadComponent: () => import('./modules/categorias/form/form.component').then(m => m.FormComponent),
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'categorias/editar/:id',
        loadComponent: () => import('./modules/categorias/form/form.component').then(m => m.FormComponent),
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      },

      // 👤 Clientes (Admin)
      {
        path: 'clientes',
        loadComponent: () => import('./modules/clientes/list/list.component').then(m => m.ListComponent),
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'clientes/nuevo',
        loadComponent: () => import('./modules/clientes/form/form.component').then(m => m.FormComponent),
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'clientes/editar/:id',
        loadComponent: () => import('./modules/clientes/form/form.component').then(m => m.FormComponent),
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      },

      // 📝 Pedidos
      {
        path: 'pedidos',
        loadComponent: () => import('./modules/pedidos/list/list.component').then(m => m.ListComponent),
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'CLIENTE'] }
      },
      {
        path: 'pedidos/nuevo',
        loadComponent: () => import('./modules/pedidos/form/form.component').then(m => m.FormComponent),
        canActivate: [RoleGuard],
        data: { roles: ['CLIENTE'] }
      },
      {
        path: 'pedidos/editar/:id',
        loadComponent: () => import('./modules/pedidos/form/form.component').then(m => m.FormComponent),
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      },

      // 💳 Ventas (Solo ADMIN)
      {
        path: 'ventas',
        loadComponent: () => import('./modules/ventas/list/list.component').then(m => m.ListComponent),
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      },

      // 🛍️ Mis Compras (Solo CLIENTE)
      {
        path: 'mis-compras',
        loadComponent: () => import('./modules/ventas/mis-compras/mis-compras.component').then(m => m.MisComprasComponent),
        canActivate: [RoleGuard],
        data: { roles: ['CLIENTE'] }
      }

    ]
  },

  // 🔄 Fallback general
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
