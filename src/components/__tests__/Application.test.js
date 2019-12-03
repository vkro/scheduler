import React from "react";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import Application from "components/Application";
import { exportAllDeclaration } from "@babel/types";

describe('Test', () => {
  // >>> Needed this before, but not anymore - nothing changed so keep it just in case???
  // beforeEach(() => {
  //   jest.mock('axios', () => require('../../__mocks__/axios.js'))
  // });

  afterEach(cleanup);

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });



})
