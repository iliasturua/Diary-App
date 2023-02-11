import { render, screen } from "@testing-library/react";
import { format, previousThursday } from "date-fns";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { Day } from "../types";
import EditBox from "./EditBox";
import { en, ka } from "../i18n/i18n";

i18next.use(initReactI18next).init({
  resources: { en, ka },

  lng: "ka",
  fallbackLng: "ka",

  interpolation: { escapeValue: false },
});

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

    expect(date).toEqual("ხუთშაბათი");
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

    expect(date).toEqual("20 დეკემბერი");
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

    expect(date).toEqual("17 მაისი, 2019");
  });
});
