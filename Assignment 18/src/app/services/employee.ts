import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees: any[] = [
    {
      id: 1,
      name: 'Rahul Sharma',
      department: 'IT',
      salary: 50000,
      email: 'rahul@gmail.com'
    }
  ];

  // Return all employees
  getEmployees() {
    return this.employees;
  }

  // Add employee
  addEmployee(emp: any) {
    this.employees.push(emp);
  }

  // Update employee
  updateEmployee(index: number, updatedEmployee: any) {
    this.employees[index] = updatedEmployee;
  }

  // Delete employee
  deleteEmployee(index: number) {
    this.employees.splice(index, 1);
  }
}