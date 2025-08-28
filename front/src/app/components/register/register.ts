import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name = ''
  email = ''
  password = ''
  message = ''

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.validateToken().subscribe({
      next: () => this.router.navigate(['/game']),
      error: () => {}
    });
  }

  register() {
    this.auth.register(this.name, this.email, this.password).subscribe({
      next: res => {
        this.auth.saveToken(res.token)
        this.router.navigate(['/game'])
      },
      error: err => this.message = 'Error: ' + err.error.message
    })
  }

}
