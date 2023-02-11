import { format, subDays, isAfter, addDays, isTomorrow } from "date-fns";
import { Day, Gradient } from "./types";
import { isSameWeek, isSameYear } from "date-fns";

export const merge = (data: { [key: string]: any }) => {
  const newData = [];
  for (const [key, value] of Object.entries(data)) {
    newData.push({ ...value, id: key });
  }

  return newData;
};

export const fillWithLastWeekData = (days: Day[]): Day[] => {
  const newData: Day[] = [...days];

  for (let i = 0; i <= 6; i++) {
    const dayBefore = format(subDays(new Date(), i), "MM/dd/yyyy");
    if (!days.find((day) => day.date === dayBefore)) {
      const day: Day = {
        date: dayBefore,
      };
      newData.push(day);
    }
  }

  const compareDates = (a: Day, b: Day) => {
    return isAfter(new Date(a.date), new Date(b.date)) ? 1 : -1;
  };

  newData.sort(compareDates);

  newData.push({ date: format(addDays(new Date(), 1), "MM/dd/yyyy") });

  return newData;
};

export const getGradientClassName = (gradient?: Gradient): string => {
  if (!gradient) {
    return `linear-gradient(to right, #E6E6E6, #E6E6E6)`;
  }

  const from = gradient.colors[0];
  const to = gradient.colors[gradient.colors.length - 1];

  return `linear-gradient(to right, ${from}, ${to})`;
};

export const dateFormat = (date: string): string => {
  const passedDate = new Date(date);

  const currentDate = new Date();
  if (isSameWeek(passedDate, currentDate)) {
    return format(passedDate, "iiii");
  }

  if (isTomorrow(passedDate)) {
    return "Tomorrow";
  }

  if (isSameYear(passedDate, currentDate)) {
    return format(passedDate, "dd MMMM");
  }

  return format(passedDate, "dd MMMM, yyyy");
};
