import React from "react";

import { render, cleanup, fireEvent, getByAltText, getAllByTestId, getByPlaceholderText, getByText, prettyDOM, waitForElement, waitForElementToBeRemoved } from "@testing-library/react";

import Application from "components/Application";
import { exportAllDeclaration } from "@babel/types";
import { notDeepEqual } from "assert";

describe('Application', () => {
  // >>> Needed this before, but not anymore - nothing changed so keep it just in case???
  beforeEach(() => {
    jest.mock('axios', () => require('../../__mocks__/axios.js'))
  });

  afterEach(cleanup);

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"))

    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
    
    fireEvent.click(getByText(appointment, "Save"))

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));

    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();




  })



})
