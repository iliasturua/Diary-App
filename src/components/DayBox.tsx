import { Dispatch, SetStateAction } from "react";
import Button from "../core-components/Button";
import { Day, Gradient } from "../types";
import { dateFormat, getGradientClassName } from "../utils";

export interface InputProps {
  setEditBoxData: Dispatch<SetStateAction<Day>>;
  id?: string;
  date: string;
  description: string;
  score: number;
  gradient?: Gradient;
  setBackgroundClassName: Dispatch<SetStateAction<string>>;
  disabled: boolean;
}

const DayBox = (props: InputProps) => {
  const {
    id,
    date,
    description,
    score,
    gradient,
    setEditBoxData,
    setBackgroundClassName,
    disabled,
  } = props;

  return (
    <div
      onClick={
        disabled
          ? undefined
          : () => {
              setEditBoxData({ id, date, description, score, gradient });
              setBackgroundClassName(getGradientClassName(gradient));
            }
      }
      className={`border-2 border-blue-900 rounded-3xl w-56 h-36 flex flex-col pl-2 pt-2 min-w-[14rem] ${
        disabled ? "" : "cursor-pointer"
      }`}
      style={{ background: getGradientClassName(gradient) }}
    >
      <h1>{dateFormat(date)}</h1>
      <p className="max-w-full break-words overflow-y-auto p-1 h-1/2">
        {description || ""}
      </p>
      <div className="flex justify-end">
        {score ? <Button disabled>{score}</Button> : null}
      </div>
    </div>
  );
};

export default DayBox;
