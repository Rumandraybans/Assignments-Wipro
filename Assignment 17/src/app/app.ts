import { Component } from '@angular/core';
import { HeaderComponent } from './header/header';     // Clean import matching your folder
import { StudentComponent } from './student/student';   // Clean import matching your folder
import { FooterComponent } from './footer/footer';     // Clean import matching your folder

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, StudentComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'student-app';
}