import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
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
  const EDITING = "EDITING"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function (name, interviewer) {
    //create interview object from name and interviewer captured @ Form onSave
    const interview = {
      student: name,
      interviewer
    };
    // pass to bookInterview in Application
    // transition to save mode first
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  };

  const deleteInterview = function () {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
  }

  return (<article className="appointment">
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
    {mode === CONFIRM && (
      <Confirm
        onCancel={() => back()}
        onConfirm={() => deleteInterview()}
        message="Are you sure you would like to delete?"
      />
    )}
    {
      mode === EDITING && (
        <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={() => back()}
        // pass name and interviweer from the Form to save function
        onSave={(name, interviewer) => save(name, interviewer)}
        />

      )
    }
  </article>)

};