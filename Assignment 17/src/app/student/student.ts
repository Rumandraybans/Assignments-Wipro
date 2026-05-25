import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Required for two-way binding [(ngModel)]

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule], // Importing FormsModule locally since there is no app.module.ts
  templateUrl: './student.html',
  styleUrls: ['./student.css']
})
export class StudentComponent {
  name = "Rohan";
  age = 20;
  imageUrl = "https://via.placeholder.com/150";
  message = "";

  showMessage() {
    this.message = "Button Clicked!";
  }
}