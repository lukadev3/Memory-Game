import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  user: any;
  games: any[] = [];
  message: string = '';
  showDeleteModal: boolean = false;

  constructor(
    private auth: AuthService,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.validateToken().subscribe({
      next: res => {
        this.user = res.user;
        this.loadGames();
      },
      error: () => this.router.navigate(['/login'])
    });
  }

  loadGames() {
    this.gameService.getMyGames().subscribe({
      next: games => this.games = games,
      error: err => this.message = err.error?.message || 'Error loading games'
    });
  }

  confirmDelete() {
    this.auth.deleteUser().subscribe({
      next: () => {
        this.auth.logout();
        this.router.navigate(['/register']);
      },
      error: (err) => {
        this.message = err.error?.message || 'Failed to delete account';
      }
    });
    this.showDeleteModal = false;
  }
}
