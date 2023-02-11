export interface History {
  data: Array<Day>;
}

export interface Day {
  id?: string;
  date: string;
  description?: string;
  score?: number;
  gradient?: Gradient;
}

export interface Gradient {
  name: string;
  colors: Array<string>;
}
