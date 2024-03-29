import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment/index.js";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";

//Initiates Storybook and registers DayListItem component
storiesOf("DayListItem", module)
  .addParameters({
    // Provides the default background color for our component
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  // To define our stories, we call add() once for each of our test states to generate a story
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />)
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    // action() allows us to create a callback that appears in the actions panel when clicked
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} />
  ));
//stories for button component
storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0
  }
];
// stories for DayList component
storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
    ))
  .add("Wednesday", () => (
    <DayList days={days} day={"Wednesday"} setDay={action("setDay")} />
  ));

  // Stories for InterviewerListItem component
  const interviewer = {
    id: 1,
    name: "Sylvia Palmer",
    avatar: "https://i.imgur.com/LpaY82x.png"
  };
  
  storiesOf("InterviewerListItem", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
    })
    .add("Unselected", () => (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
      />
    ))
    .add("Selected", () => (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected
      />
    ))
    .add("Clickable", () => (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={event => action("setInterviewer")(interviewer.id)}
        />
    ));


    const interviewers = [
      { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
      { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
      { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
      { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
      { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
    ];
    // stories for InterviewerList component
    storiesOf("InterviewerList", module)
      .addParameters({
        backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
      })
      .add("Initial", () => (
        <InterviewerList
          interviewers={interviewers}
          setInterviewer={action("setInterviewer")}
        />
      ))
      .add("Preselected", () => (
        <InterviewerList
          interviewers={interviewers}
          interviewer={3}
          setInterviewer={action("setInterviewer")}
        />
      ));

      const student = {
        id: 1,
        name: "Lynda Miller-Jones"
      };

      const deleteMessage = "Delete the appointment?";
      const deleteStatusMessage = "Deleting";
      const saveStatusMessage = "Saving";
      const errorMessage = "Could not delete appointment";

      // stories for Appointment module
      storiesOf("Appointment", module)
      .addParameters({
        backgrounds: [{ name: "white", value: "#fff", default: true}]
      })
      .add("Appointment", () => <Appointment />)
      .add("Appointment with Time", () => <Appointment time="12pm"/>)
      .add("Header", () => <Header time="12pm"/>)
      .add("Empty", () => <Empty onAdd={action("onAdd")}/>)
      .add("Show", () => (
        <Show 
          student={student.name}
          interviewer={interviewer}
          onEdit={action("onEdit")}
          onDelete={action("onDelete")}
        />
      ))
      .add("Confirm", () => (
        <Confirm
          message={deleteMessage}
          onConfirm={action("onConfirm")}
          onCancel={action("onCancel")}
        />
      ))
      .add("Status: Deleting", () => (
        <Status 
          message={deleteStatusMessage}
        />
      ))
      .add("Status: Saving", () => (
        <Status 
          message={saveStatusMessage}
        />
      ))
      .add("Error", () => (
        <Error
          message={errorMessage}
          onClose={action("onClose")}
        />
      ))
      .add("Form: Edit", () => (
        <Form
          name={student.name}
          interviewers={interviewers}
          interviewer={3}
          onSave={action("onSave")}
          onCancel={action("onCancel")}
        />
      ))
      .add("Form: Create", () => (
        <Form
          interviewers={interviewers}
          onSave={action("onSave")}
          onCancel={action("onCancel")}
        />
      ))
      .add("Appointment Empty", () => (
        <Fragment>
          <Appointment id={1} time="12pm" />
          <Appointment id="last" time="1pm" />
        </Fragment>
      ))
      .add("Appointment Booked", () => (
        <Fragment>
          <Appointment
            id={1}
            time="12pm"
            interview={{ student: "Lydia Miller-Jones", interviewer }}
          />
          <Appointment id="last" time="1pm" />
        </Fragment>
      ));

