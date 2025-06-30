import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: any, state: any): boolean | UrlTree {

    const userRole = this.authService.getRole() || ''; // Si es null, será cadena vacía
    const allowedRoles = route.data['roles'] as Array<string>;

    if (allowedRoles?.includes(userRole)) {
      return true;
    }

    alert('🚫 No tienes permiso para acceder a esta página.');
    return this.router.createUrlTree(['/dashboard']);
  }
}
