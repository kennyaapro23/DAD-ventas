import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';  // asegúrate que esté bien la ruta

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component')
    .then(m => m.LoginComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
