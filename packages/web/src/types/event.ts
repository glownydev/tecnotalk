export type EventType = 'pos' | 'neg' | 'croix' | 'absence' | 'retard';

export type EventCreateRequest = {
  studentId: string;
  type: EventType;
  comment?: string;
  authorId: string;
};