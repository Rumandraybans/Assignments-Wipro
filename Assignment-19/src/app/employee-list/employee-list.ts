import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { SalaryRangePipe } from '../pipes/salary-range-pipe';
import { PhoneFormatPipe } from '../pipes/phone-format-pipe';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    SalaryRangePipe,
    PhoneFormatPipe
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
  this.employeeService.getEmployees().subscribe(data => {
    if (Array.isArray(data)) {
      this.employees = data.filter(emp => emp && emp.isDeleted !== true);
    }
  });
}

  editEmployee(employee: any) {
    this.employeeService.setEditEmployee({ ...employee });
  }

  softDeleteEmployee(employee: any) {
  employee.isDeleted = true;
  this.employeeService.updateEmployee(employee.id, employee).subscribe(() => {
    alert('Employee Deleted'); 
    this.loadEmployees();
  });
  }
}