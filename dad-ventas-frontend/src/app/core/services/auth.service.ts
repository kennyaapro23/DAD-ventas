import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthUser } from '../models/auth-user.model';
import { TokenDto } from '../models/token-dto.model';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { resources } from '../resources/resources';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isBrowser: boolean;

  constructor(
      private http: HttpClient,
      @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Login y guarda token decodificado
   */
  login(credentials: AuthUser): Observable<TokenDto> {
    return this.http.post<TokenDto>(resources.auth.login, credentials);
  }

  /**
   * Guarda el token y los datos decodificados en localStorage
   */
  saveToken(token: string): void {
    if (!this.isBrowser) return;

    localStorage.setItem('access_token', token);

    try {
      const decoded: any = jwtDecode(token);
      localStorage.setItem('user_name', decoded.sub || '');
      localStorage.setItem('user_role', decoded.role || '');
      if (decoded.clientId) {
        localStorage.setItem('client_id', decoded.clientId.toString());
      }
    } catch (err) {
      console.error('Error al decodificar el token JWT:', err);
    }
  }

  /**
   * Devuelve el token almacenado
   */
  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('access_token') : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserName(): string | null {
    return this.isBrowser ? localStorage.getItem('user_name') : null;
  }

  getRole(): string | null {
    return this.isBrowser ? localStorage.getItem('user_role') : null;
  }

  getClientId(): number | null {
    const idStr = this.isBrowser ? localStorage.getItem('client_id') : null;
    return idStr ? Number(idStr) : null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isClient(): boolean {
    return this.getRole() === 'CLIENTE';
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_role');
      localStorage.removeItem('client_id');
      console.log('AuthService: sesión cerrada');
    }
  }

  /**
   * Registro de usuario
   */
  create(user: {
    userName: string;
    password: string;
    role: string;
    name: string;
    document: string;
    telefono: string;
  }): Observable<any> {
    return this.http.post(resources.auth.create, user);
  }
}
