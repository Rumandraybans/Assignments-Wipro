import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {
  @Output() switchPage = new EventEmitter<string>();
  
  userProfile: any = null;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.userProfile = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load profile details.';
      }
    });
  }

  logout() {
    this.authService.logout();
    this.switchPage.emit('login');
  }
}