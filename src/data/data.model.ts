export interface Course {
  id: string;
  name: string;
  code: string;
  departmentId: string;
}

export interface Department {
  id: string;
  name: string;
}

export interface Event {
  id: string;
  courseId: string;
  section: string;
  term: string;
  type: string;
  startDate: string;
  endDate: string;
  days: string[];
  startTime: string;
  endTime: string;
  location: string;
  staffId: string;
  physicality: string;
  registrationAdditions: string[];
}

export interface Staff {
  id: string;
  name: string;
}

export interface Term {
  id: string;
  name: string;
}
