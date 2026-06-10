export interface Employee {

  id?: number;

  EmployeeId: number | null;
  EmployeeName: string;
  Department: string;
  Designation: string;
  Salary: number | null;
  Age: number | null;
  Gender: string;
  Email: string;
  Phone: string;
  profileImage: string;
  isDeleted: boolean;

}