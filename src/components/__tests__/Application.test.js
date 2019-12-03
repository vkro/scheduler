import React from "react";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import Application from "components/Application";
import { exportAllDeclaration } from "@babel/types";

describe('Test', () => {

  // beforeEach(() => {
  //   jest.mock('axios', () => require('../../__mocks__/axios.js'))
  // });

  afterEach(cleanup);

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
    
  });

})
