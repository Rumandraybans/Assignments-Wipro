import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeService } from '../services/employee';

import { DepartmentFilterPipe } from '../pipes/department-filter-pipe';

@Component({
  selector: 'app-employee-list',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    DepartmentFilterPipe
  ],

  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeListComponent {

  employees: any[] = [];

  selectedDepartment = 'All';

  constructor(private empService: EmployeeService) {

    this.employees = this.empService.getEmployees();
  }

  deleteEmployee(index: number) {

    this.empService.deleteEmployee(index);
  }
}