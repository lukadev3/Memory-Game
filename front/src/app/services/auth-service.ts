import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { CookieService } from 'ngx-cookie-service'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth'

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { name, email, password })
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password }, { withCredentials: true })
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
}
