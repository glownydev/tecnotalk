export type EventType = 'pos' | 'neg' | 'croix';

export type EventCreateRequest = {
  studentId: number;
  type: EventType;
  comment?: string;
  authorId: number;
};