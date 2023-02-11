import { Dispatch, SetStateAction } from "react";
import { Day, History } from "../types";
import DayBox from "./DayBox";

export interface InputProps {
  history: History;
  setEditBoxData: Dispatch<SetStateAction<Day>>;
  setBackgroundClassName: Dispatch<SetStateAction<string>>;
}

const DayBoxList = (props: InputProps) => {
  const { history, setEditBoxData, setBackgroundClassName } = props;

  return (
    <div className="flex flex-row items-center gap-4 max-w-full overflow-x-auto p-5 overflow-y-hidden">
      {history.data.map((day, index) => {
        return (
          <DayBox
            key={day.id}
            id={day.id}
            setEditBoxData={setEditBoxData}
            date={day.date}
            description={day.description ?? ""}
            score={day.score ?? 0}
            gradient={day.gradient}
            setBackgroundClassName={setBackgroundClassName}
            disabled={index === history.data.length - 1}
          />
        );
      })}
    </div>
  );
};

export default DayBoxList;
