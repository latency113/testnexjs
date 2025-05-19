export interface Quiz {
  id: string;
  question: string;
  options: string[];
  answer: number;
  tag: string;
  createdAt: Date;
}

 export type NewQuiz = Omit<NewQuiz, 'id' | 'createdAt'>;