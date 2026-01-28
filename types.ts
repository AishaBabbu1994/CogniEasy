
export interface QuizQuestion {
  question: string;
  isTrue: boolean;
  explanation: string;
}

export interface SimplificationResult {
  oneSentenceSummary: string;
  eli5Explanation: string;
  analogy: string;
  quiz: QuizQuestion[];
}

export type AppStep = 'input' | 'loading' | 'results';
