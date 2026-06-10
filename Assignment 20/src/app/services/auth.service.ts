import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3003/api/auth';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  getProfile(): Observable<any> {
    
    const email = localStorage.getItem('user_email');
    return this.http.get(`${this.apiUrl}/profile?email=${email}`);
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_email');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('jwt_token') !== null;
  }
}