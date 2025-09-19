export type ClassCreateRequest = {
  name: string;
};

export type ClassResponse = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type StudentsInClassRequest = {
  classId: string;
};