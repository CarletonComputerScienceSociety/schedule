import type { Course } from "./Course";
import type { Staff } from "./Staff";
import type { Term } from "./Term";

export class Event {
  id: string;
  course: Course;
  section: string;
  term: Term;
  type: string;
  startDate: string;
  endDate: string;
  days: string[];
  startTime: string;
  endTime: string;
  location: string;
  staff: Staff;
  physicality: string;
  registrationAdditions: string[];

  constructor(
    id: string,
    course: Course,
    section: string,
    term: Term,
    type: string,
    startDate: string,
    endDate: string,
    days: string[],
    startTime: string,
    endTime: string,
    location: string,
    staff: Staff,
    physicality: string,
    registrationAdditions: string[]
  ) {
    this.id = id;
    this.course = course;
    this.section = section;
    this.term = term;
    this.type = type;
    this.startDate = startDate;
    this.endDate = endDate;
    this.days = days;
    this.startTime = startTime;
    this.endTime = endTime;
    this.location = location;
    this.staff = staff;
    this.physicality = physicality;
    this.registrationAdditions = registrationAdditions;
  }

  displayName = () => {
    return `${this.course.department.id} ${this.course.code}`
  }

}
