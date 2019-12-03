import React from "react";
import { render, cleanup, getByPlaceholderText, getByTestId } from "@testing-library/react";
import Form from "components/Appointment/Form";
import { isTSAnyKeyword, exportAllDeclaration } from "@babel/types";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  const { getByPlaceholderText } = render(<Form 
  interviewers={interviewers}
  />);

  it("renders without student name if not provided", () => {
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });
});