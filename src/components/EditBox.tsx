import { Dispatch, SetStateAction, useState } from "react";
import { useDebounce } from "../hooks/debounce.hook";
import { Day } from "../types";
import { dateFormat } from "../utils";
import Score from "./Score";

export interface InputProps {
  sendData: (day: Day) => void;
  setEditBoxData: Dispatch<SetStateAction<Day>>;
  editBoxData: Day;
  backgroundClassName: string;
}

const EditBox = (props: InputProps) => {
  const { sendData, setEditBoxData, editBoxData, backgroundClassName } = props;

  const debouncedSend = useDebounce(sendData, 1000);

  return (
    <div className="border-2 border-black w-full lg:w-1/3 xl:w-1/4 max-h-72 rounded-3xl pt-4 mx-5">
      <div>
        <h1 className="pb-6 font-bold mx-8">{dateFormat(editBoxData.date)}</h1>
        <div className="relative mx-8">
          <textarea
            className="w-full h-32 p-2 rounded border-0 border-gray-400  overflow-y-auto"
            style={{ background: backgroundClassName }}
            placeholder="აღწერა"
            id="description"
            name="description"
            value={editBoxData.description}
            onChange={(event) => {
              setEditBoxData({
                ...editBoxData,
                description: event.target.value,
              });
              debouncedSend({
                ...editBoxData,
                description: event.target.value,
              });
            }}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Score sendData={sendData} editBoxData={editBoxData} />
      </div>
    </div>
  );
};

export default EditBox;
