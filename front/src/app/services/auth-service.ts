import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { CookieService } from 'ngx-cookie-service'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth'

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { name, email, password }).pipe(
      catchError(err => throwError(() => err))
    )
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password }, { withCredentials: true }).pipe(
      catchError(err => throwError(() => err))
    )
  }

  saveToken(token: string) {
    this.cookieService.set('token', token)
  }

  getToken(): string {
    return this.cookieService.get('token')
  }

  logout() {
    this.cookieService.delete('token')
  }

  validateToken(): Observable<any> {
    const token = this.getToken()
    if (!token) return throwError(() => ({ message: 'No token' }))

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` })
    return this.http.post(`${this.baseUrl}/validate`, {}, { headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => err))
    )
  }

  deleteUser(): Observable<any> {
    const token = this.getToken()
    if (!token) return throwError(() => ({ message: 'No token' }))

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` })
    return this.http.delete(`${this.baseUrl}/me`, { headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => err))
    )
  }
}