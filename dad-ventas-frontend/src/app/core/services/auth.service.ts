import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthUser } from '../models/auth-user.model';
import { TokenDto } from '../models/token-dto.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl = 'http://localhost:8085/auth'; // Gateway

  constructor(private http: HttpClient) {}

  login(credentials: AuthUser): Observable<TokenDto> {
    console.log('AuthService: enviando login con credenciales', credentials);
    return this.http.post<TokenDto>(`${this.baseUrl}/login`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
    console.log('AuthService: token guardado en localStorage');
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('access_token');
    console.log('AuthService: token eliminado');
  }
}
