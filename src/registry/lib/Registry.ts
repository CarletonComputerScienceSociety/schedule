import { Course, Department, Event, Staff, Term } from "./entity";
import type {
  Course as CourseDataInterface,
  Department as DepartmentDataInterface,
  Event as EventDataInterface,
  Staff as StaffDataInterface,
  Term as TermDataInterface,
} from "../../data/data.model";

export class Registry {
  loadDepartments = () => {
    let data = this.getData("./src/data/departments.json");

    return data.map((department: DepartmentDataInterface) => {
      return new Department(department.id, department.name);
    });
  };

  loadEvents = (courseId: string, term: string) => {
    const departmentId = courseId.slice(0, 4);

    let data = this.getData(`./src/data/events/${term}/${departmentId}.json`);
    data = data.filter(
      (event: EventDataInterface) => event.courseId === courseId
    );

    return data.map((event: EventDataInterface) => {
      let course = this.loadCourse(event.courseId, departmentId);
      let staff = this.loadStaff(event.staffId, departmentId);
      let term = this.loadTerm(event.term);

      return new Event(
        event.id,
        course,
        event.section,
        term,
        event.type,
        event.startDate,
        event.endDate,
        event.days,
        event.startTime,
        event.endTime,
        event.location,
        staff,
        event.physicality,
        event.registrationAdditions
      );
    });
  };

  loadCourse = (courseId: string, departmentId: string) => {
    let data = this.getData(`./src/data/courses/${departmentId}.json`);
    data = data.find((course: CourseDataInterface) => course.id === courseId);

    let department = this.loadDepartment(departmentId);

    return new Course(data.id, department, data.code, data.title);
  };

  loadStaff = (staffId: string, departmentId: string) => {
    let data = this.getData(`./src/data/staff/${departmentId}.json`);
    data = data.find((staff: StaffDataInterface) => staff.id === staffId);

    return new Staff(data.id, data.name);
  };

  loadTerm = (termId: string) => {
    let data = this.getData("./src/data/terms.json");
    data = data.find((term: TermDataInterface) => term.id === termId);

    return new Term(data.id, data.name);
  };

  loadDepartment = (departmentId: string) => {
    let data = this.getData("./src/data/departments.json");
    data = data.find(
      (department: DepartmentDataInterface) => department.id === departmentId
    );
    return new Department(data.id, data.name);
  };

  private getData = (path: string) => {
    let data = fs.readFileSync(path, "utf8");
    return JSON.parse(data);
  };
}
