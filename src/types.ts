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

export class TranslationDateFormat {
  public day: string = "";
  public translationText: string;
  public year: string = "";

  constructor(translationText: string, day?: string, year?: string) {
    this.translationText = translationText.toLowerCase();
    if (day) {
      this.day = day;
    }
    if (year) {
      this.year = year;
    }
  }
}
