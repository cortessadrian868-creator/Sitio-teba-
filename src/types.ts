export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  category: 'academic' | 'cultural' | 'holiday' | 'exam';
  description: string;
}

export interface PreRegistroRecord {
  fullName: string;
  birthDate: string;
  curp: string;
  middleSchool: string;
  gpa: number;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  selectedArea: string; // "Exactas" | "Humanidades" | "Economico"
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  replied: boolean;
}

export interface GradeSubject {
  name: string;
  p1: number;
  p2: number;
  p3: number;
  exam: number;
}
