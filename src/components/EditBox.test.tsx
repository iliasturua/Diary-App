import { render, screen } from "@testing-library/react";
import { format, previousThursday } from "date-fns";
import { Day } from "../types";
import EditBox from "./EditBox";

describe("EditBox", () => {
  it("is displaying last thursday in correct format", () => {
    const editBoxData: Day = {
      date: format(previousThursday(new Date()), "MM/dd/yyyy"),
    };
    render(
      <EditBox
        sendData={() => {}}
        editBoxData={editBoxData}
        setEditBoxData={() => {}}
        backgroundClassName={""}
      />
    );

    const date = screen.getByTestId("date").textContent;

    console.log(date);

    expect(date).toEqual("Thursday");
  });

  it("is displaying 20th December in correct format", () => {
    const editBoxData: Day = {
      date: "12/20/2023",
    };
    render(
      <EditBox
        sendData={() => {}}
        editBoxData={editBoxData}
        setEditBoxData={() => {}}
        backgroundClassName={""}
      />
    );

    const date = screen.getByTestId("date").textContent;

    console.log(date);

    expect(date).toEqual("20 December");
  });

  it("is displaying 17th May of 2019 in correct format", () => {
    const editBoxData: Day = {
      date: "05/17/2019",
    };
    render(
      <EditBox
        sendData={() => {}}
        editBoxData={editBoxData}
        setEditBoxData={() => {}}
        backgroundClassName={""}
      />
    );

    const date = screen.getByTestId("date").textContent;

    console.log(date);

    expect(date).toEqual("17 May, 2019");
  });
});
