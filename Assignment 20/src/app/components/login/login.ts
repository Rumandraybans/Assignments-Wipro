import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  @Output() switchPage = new EventEmitter<string>();

  credentials = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        
        localStorage.setItem('jwt_token', res.token);
        localStorage.setItem('user_email', res.email);
        this.switchPage.emit('dashboard');
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed';
      }
    });
  }
}