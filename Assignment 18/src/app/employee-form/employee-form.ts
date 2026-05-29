import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeService } from '../services/employee';

@Component({
  selector: 'app-employee-form',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeFormComponent {

  employee = {
    id: '',
    name: '',
    department: '',
    salary: '',
    email: ''
  };

  constructor(private empService: EmployeeService) {}

  addEmployee() {

    this.empService.addEmployee({
      ...this.employee
    });

    this.employee = {
      id: '',
      name: '',
      department: '',
      salary: '',
      email: ''
    };
  }
}