import React from "react";

import { render, cleanup, waitForElement } from "@testing-library/react";

import Application from "components/Application";

describe('Test', () => {

  beforeEach(() => {
    jest.mock('axios', () => require('../../__mocks__/axios.js'))
  });

  afterEach(cleanup);

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"));
  });

})
