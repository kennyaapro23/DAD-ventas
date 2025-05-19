import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Para hacer peticiones HTTP
import { Observable } from 'rxjs';
import { AuthUser } from '../models/auth-user.model'; // Modelo con datos del usuario (username, password)
import { TokenDto } from '../models/token-dto.model'; // Modelo con el token JWT recibido

@Injectable({
  providedIn: 'root', // Servicio singleton accesible desde toda la app
})
export class AuthService {

  // URL base para autenticación, apunta al gateway o directamente al microservicio auth
  private baseUrl = 'http://localhost:8085/auth';

  constructor(private http: HttpClient) {}

  // Método para hacer login, envía credenciales y espera un token en respuesta
  login(credentials: AuthUser): Observable<TokenDto> {
    console.log('AuthService: enviando login con credenciales', credentials);
    return this.http.post<TokenDto>(`${this.baseUrl}/login`, credentials);
  }

  // Guarda el token JWT en localStorage para mantener sesión
  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
    console.log('AuthService: token guardado en localStorage');
  }

  // Recupera el token guardado
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Valida si hay un token para saber si el usuario está logueado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Cierra sesión borrando el token almacenado
  logout(): void {
    localStorage.removeItem('access_token');
    console.log('AuthService: token eliminado');
  }
  create(user: { userName: string, password: string, role: string }): Observable<any> {
  return this.http.post(`${this.baseUrl}/create`, user);
  }
}
