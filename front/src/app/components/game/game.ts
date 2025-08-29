import { Component } from '@angular/core'
import { GameService } from '../../services/game-service'
import { GameResult } from '../../models/gameresult'
import { AuthService } from '../../services/auth-service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-game',
  templateUrl: './game.html',
  standalone: false,
  styleUrls: ['./game.css']
})
export class Game {
  private cardValues = ['A','B','C']
  cards: any[] = []
  flipped: any[] = []
  moves = 0
  score = 0
  startTime!: number
  gameStarted = false
  gameOverMessage: string | null = null

  constructor(private gameService: GameService, private auth: AuthService, private router: Router) {}

  startGame() {
    this.moves = 0
    this.score = 0
    this.flipped = []
    this.startTime = Date.now()
    this.gameStarted = true
    this.gameOverMessage = null   
    this.cards = [...this.cardValues, ...this.cardValues]
      .sort(() => Math.random() - 0.5)
      .map(value => ({ value, flipped: false, matched: false }))
  }

  flipCard(card: any) {
    if (!this.gameStarted) return
    if (card.flipped || card.matched) return
    card.flipped = true
    this.flipped.push(card)

    if (this.flipped.length === 2) {
      this.moves++
      const [c1, c2] = this.flipped
      if (c1.value === c2.value) {
        c1.matched = c2.matched = true
        this.score++
      } else {
        setTimeout(() => {
          c1.flipped = c2.flipped = false
        }, 800)
      }
      this.flipped = []

      if (this.score === this.cardValues.length) {
        const duration = Math.floor((Date.now() - this.startTime) / 1000)
        const result: GameResult = {
          score: this.score,
          moves: this.moves,
          duration
        }
        this.gameService.saveGame(result).subscribe()

        this.gameStarted = false
        this.gameOverMessage = `Game Over! Score: ${this.score}, Moves: ${this.moves}, Time: ${duration}s`  // 👈
      }
    }
  }

  closeMessage() {
    this.gameOverMessage = null
  }
}
