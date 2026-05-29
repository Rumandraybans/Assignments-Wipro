import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'departmentFilter',
  standalone: true
})
export class DepartmentFilterPipe implements PipeTransform {

  transform(employees: any[], department: string): any[] {

    // Show all employees
    if (!department || department === 'All') {
      return employees;
    }

    // Filter employees
    return employees.filter(emp =>
      emp.department.toLowerCase() === department.toLowerCase()
    );
  }
}