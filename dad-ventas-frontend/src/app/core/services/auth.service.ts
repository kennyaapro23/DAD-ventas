import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthUser } from '../models/auth-user.model';
import { TokenDto } from '../models/token-dto.model';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import {resources} from "../resources/resources";

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

  login(credentials: AuthUser): Observable<TokenDto> {
    console.log('AuthService: enviando login con credenciales', credentials);
    return this.http.post<TokenDto>(resources.auth.login, credentials);
  }

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

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('access_token') : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserName(): string | null {
    return this.isBrowser ? localStorage.getItem('user_name') : null;
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_role');
      console.log('AuthService: sesión cerrada y token eliminado');
    }
  }

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

  getUserId(): number | null {
    if (!this.isBrowser) return null;
    const idStr = localStorage.getItem('user_id');
    return idStr ? Number(idStr) : null;
  }
  getUserRole(): string | null {
    return this.isBrowser ? localStorage.getItem('user_role') : null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }
  getClientId(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.clientId || null;
    } catch (e) {
      return null;
    }
  }


}
