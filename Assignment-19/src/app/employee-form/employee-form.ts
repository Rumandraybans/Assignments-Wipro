import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeFormComponent implements OnInit {
  private blankEmployee: Employee = {
    EmployeeId: null,
    EmployeeName: '',
    Department: '',
    Designation: '',
    Salary: null,
    Age: null,
    Gender: '',
    Email: '',
    Phone: '',
    profileImage: '',
    isDeleted: false
  };

  employee: Employee = { ...this.blankEmployee };
  isEditMode: boolean = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.selectedEmployee$.subscribe(emp => {
      if (emp) {
        this.employee = emp;
        this.isEditMode = true;
      } else {
        this.employee = { ...this.blankEmployee };
        this.isEditMode = false;
      }
    });
  }

  saveEmployee() {
    
    if (!this.employee.profileImage || this.employee.profileImage.trim() === '') {
      if (this.employee.Gender === 'Male') {
        this.employee.profileImage = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
      } else if (this.employee.Gender === 'Female') {
        this.employee.profileImage = 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png';
      } else {
        this.employee.profileImage = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'; 
      }
    }

    if (this.isEditMode && this.employee.id) {
      this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(() => {
        alert('Employee Updated');
        this.resetForm();
      });
    } else {
      this.employeeService.addEmployee(this.employee).subscribe(() => {
        alert('Employee Added');
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.employee = { ...this.blankEmployee };
    this.isEditMode = false;
    this.employeeService.clearEditEmployee();
  }
}