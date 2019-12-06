import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode.js";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDITING = "EDITING";
  const ERROR_SAVING = "ERROR_SAVING";
  const ERROR_DELETING = "ERROR_DELETING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function (name, interviewer) {
    //create interview object from name and interviewer captured @ Form onSave
    const interview = {
      student: name,
      interviewer
    };
    // transition to saving mode
    // pass to bookInterview in useApplicationData hook
    // transition to show saved appointment
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVING, true))
  };

  const deleteInterview = function () {
  // transition to deleting mode
    // pass to cancelInterview in useApplicationData hook
    // transition to show empty appointment
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETING, true))
  };

  return (<article className="appointment" data-testid="appointment">
    <Header
      time={props.time}
    />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={() => transition(EDITING)}
        onDelete={() => transition(CONFIRM)}
      />
    )}
    {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onCancel={() => back()}
        // pass name and interviweer from the Form to save function
        onSave={(name, interviewer) => save(name, interviewer)}
      />
    )}
    {mode === SAVING && (
      <Status
        message="Saving"
      />
    )}
    {mode === DELETING && (
      <Status
        message="Deleting"
      />
    )}
    {mode === ERROR_DELETING && (
      <Error
      message="Could not cancel appointment."
      onClose={() => back()}
      />
    )}
    {mode === CONFIRM && (
      <Confirm
        onCancel={() => back()}
        onConfirm={() => deleteInterview()}
        message="Are you sure you would like to delete?"
      />
    )}
    {mode === EDITING && (
        <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={() => back()}
        // pass name and interviweer from the Form to save function
        onSave={(name, interviewer) => save(name, interviewer)}
        />
    )}
    {mode === ERROR_SAVING && (
      <Error
      message="Could not edit appointment."
      onClose={() => back()}
      />
    )}

  </article>)
};