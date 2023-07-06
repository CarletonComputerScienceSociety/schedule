import type { Department } from "./Department";

export class Course {
  id: string;
  department: Department;
  code: string;
  title: string;

  constructor(id: string, department: Department, code: string, title: string) {
    this.id = id;
    this.department = department;
    this.code = code;
    this.title = title;
  }
}
