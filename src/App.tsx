import { format } from "date-fns";
import { useEffect, useState } from "react";
import api from "./api/api";
import DayBoxList from "./components/DayBoxList";
import EditBox from "./components/EditBox";
import { Day, Gradient } from "./types";
import { fillWithLastWeekData, getGradientClassName } from "./utils";

function App() {
  const [data, setData] = useState<Array<Day>>([]);

  const [backgroundClassName, setBackgroundClassName] = useState(
    "linear-gradient(to right, #E6E6E6, #E6E6E6)"
  );

  const [gradients, setGradients] = useState<Array<Gradient>>([]);

  const [editBoxData, setEditBoxData] = useState<Day>({
    date: format(new Date(), "MM/dd/yyyy"),
    description: "",
    score: 0,
  });

  useEffect(() => {
    api.getGradients().then((response) => setGradients(response));

    api.getHistory().then((history) => {
      const dt = history.data;

      const today = format(new Date(), "MM/dd/yyyy");
      const todayData = dt.find((d) => d.date === today);

      if (todayData) {
        setEditBoxData(todayData);

        if (todayData.gradient) {
          setBackgroundClassName(getGradientClassName(todayData.gradient));
        }
      }

      setData(fillWithLastWeekData(dt ? dt : []));
    });
  }, []);

  const sendData = async (day: Day) => {
    if (day.id) {
      await api.updateDay(day);
      setEditBoxData({
        ...editBoxData,
        description: day.description,
        score: day.score,
      });
    } else {
      const randomGradient =
        gradients[Math.floor(Math.random() * gradients.length)];

      const response = await api.createDay(day, randomGradient);
      day.id = response.name;
      day.gradient = randomGradient;
      setEditBoxData({
        ...editBoxData,
        id: response.name,
        description: day.description,
        score: day.score,
        gradient: randomGradient,
      });
      setBackgroundClassName(getGradientClassName(randomGradient));
    }

    const newDataIndex = data.findIndex((oldDay) => oldDay.date === day.date);

    data[newDataIndex] = day;

    setData(data);
  };

  return (
    <div
      className={`h-screen flex flex-col justify-center items-center`}
      style={{ background: backgroundClassName }}
    >
      <div className="w-full h-4/5 flex justify-center items-center">
        <EditBox
          sendData={sendData}
          editBoxData={editBoxData}
          setEditBoxData={setEditBoxData}
          backgroundClassName={backgroundClassName}
        />
      </div>
      <DayBoxList
        history={{ data }}
        setEditBoxData={setEditBoxData}
        setBackgroundClassName={setBackgroundClassName}
      />
    </div>
  );
}

export default App;
