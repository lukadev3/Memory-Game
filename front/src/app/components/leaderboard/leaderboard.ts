import { Component } from '@angular/core';
import { GameService } from '../../services/game-service';

@Component({
  selector: 'app-leaderboard',
  standalone: false,
  templateUrl: './leaderboard.html',
  styleUrls: ['./leaderboard.css']
})
export class Leaderboard {

  leaderboard: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.fetchLeaderboard();
  }

  private fetchLeaderboard(): void {
    this.loading = true;
    this.error = null;

    this.gameService.getLeaderboard().subscribe({
      next: data => {
        this.leaderboard = data || [];
        this.loading = false;
      },
      error: err => {
        this.error = err.message || 'Failed to load leaderboard';
        this.leaderboard = [];
        this.loading = false;
      }
    });
  }
}