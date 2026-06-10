import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html'
})
export class RegisterComponent {
  @Output() switchPage = new EventEmitter<string>();

  user = { username: '', email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.user).subscribe({
      next: () => {
        this.switchPage.emit('login');
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Registration failed';
      }
    });
  }
}