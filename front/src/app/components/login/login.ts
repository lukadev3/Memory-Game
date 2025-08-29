import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = ''
  password = ''
  message = ''

  constructor(private auth: AuthService, private router: Router, private cd: ChangeDetectorRef) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: res => {
        this.auth.saveToken(res.token);
        this.message = 'Logged in successfully!';
        this.router.navigate(['/game']);
      },
      error: err => {
        this.message = err.error.message;
      }
    });
  }
}
