import Button from "../core-components/Button";
import { Day } from "../types";

export interface InputProps {
  sendData: (day: Day) => void;
  editBoxData: Day;
}

const Score = (props: InputProps) => {
  const { sendData, editBoxData } = props;

  const scores = [1, 2, 3, 4, 5];

  return (
    <div>
      {scores.map((number) => {
        return (
          <Button
            key={number}
            onClick={() => {
              sendData({ ...editBoxData, score: number });
            }}
          >
            {number}
          </Button>
        );
      })}
    </div>
  );
};

export default Score;
