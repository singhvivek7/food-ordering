export interface IQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export const QUESTIONS: IQuestion[] = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    answer: 'Paris',
  },
  {
    id: 2,
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    answer: 'Mars',
  },
  {
    id: 3,
    question: 'What is the largest ocean on Earth?',
    options: [
      'Atlantic Ocean',
      'Indian Ocean',
      'Arctic Ocean',
      'Pacific Ocean',
    ],
    answer: 'Pacific Ocean',
  },
  {
    id: 4,
    question: "Who wrote 'Hamlet'?",
    options: [
      'Charles Dickens',
      'William Shakespeare',
      'Mark Twain',
      'Jane Austen',
    ],
    answer: 'William Shakespeare',
  },
  {
    id: 5,
    question: 'What is the square root of 64?',
    options: ['6', '7', '8', '9'],
    answer: '8',
  },
];
