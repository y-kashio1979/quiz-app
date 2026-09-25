export interface Option {
    id: number;
    text: string;
}

export interface Question {
    id: number;
    contents: string;
    options: Option[];
    answerId: number;
}

export interface Answer {
    question: Question;
    selectedId: number;
}

export interface History {
    id: number;
    answerDate: Date;
    answers: Answer[];
}