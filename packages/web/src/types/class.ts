export type ClassCreateRequest = {
  name: string;
};

export type ClassResponse = {
  id: number;
  name: string;
  createdAt: Date;
};

export type StudentsInClassRequest = {
  classId: number;
};