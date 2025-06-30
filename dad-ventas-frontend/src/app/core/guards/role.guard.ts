import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  canActivate(route: ActivatedRouteSnapshot, state: any): boolean | UrlTree {
    const userRole = this.authService.getRole() || '';  // Si es null, será cadena vacía
    const allowedRoles = route.data['roles'] as Array<string>;

    if (allowedRoles?.includes(userRole)) {
      return true;
    }

    // Usar alert solo en el navegador
    if (isPlatformBrowser(this.platformId)) {
      alert('🚫 No tienes permiso para acceder a esta página.');
    }

    return this.router.createUrlTree(['/dashboard']);
  }
}
