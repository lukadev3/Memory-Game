import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GameResult } from '../models/gameresult';
import { AuthService } from './auth-service';

@Injectable({ providedIn: 'root' })
export class GameService {
  private baseUrl = 'http://localhost:3000/game';

  constructor(private http: HttpClient, private auth: AuthService) {}

  saveGame(result: GameResult): Observable<any> {
    const token = this.auth.getToken();
    if (!token) return throwError(() => ({ message: 'No token' }));

    return this.http
      .post(`${this.baseUrl}/`, result, { 
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
        withCredentials: true
      })
      .pipe(catchError(err => throwError(() => err)));
  }

  getMyGames(): Observable<any> {
    const token = this.auth.getToken();
    if (!token) return throwError(() => ({ message: 'No token' }));

    return this.http
      .get(`${this.baseUrl}/my`, { 
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
        withCredentials: true
      })
      .pipe(catchError(err => throwError(() => err)));
  }

  getLeaderboard(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/leaderboard`)
      .pipe(catchError(err => throwError(() => err)));
  }
}
