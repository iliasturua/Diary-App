import axios from "axios";
import { Day, History } from "../types";
import { merge } from "../utils";

class Api {
  public api;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_PUBLIC_API_URL,
    });
  }

  public async getHistory(): Promise<History> {
    const response = await this.api.get("/days.json");

    const data = merge(response.data ? response.data : []);

    return { data };
  }

  public async createDay(day: Day, gradient: any): Promise<any> {
    const response = await this.api.post("/days.json", {
      date: day.date,
      description: day.description,
      score: day.score,
      gradient,
    });

    return response.data;
  }

  public async updateDay(day: Day): Promise<any> {
    const response = await this.api.put(`/days/${day.id}.json`, {
      date: day.date,
      description: day.description,
      score: day.score,
      gradient: day.gradient,
    });

    return response.data;
  }

  public async getGradients(): Promise<any> {
    const response = await this.api.get(
      "https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json"
    );

    return response.data;
  }
}

const api = new Api();

export default api;
