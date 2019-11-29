import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode.js";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function(name, interviewer) {
    //create interview object from name and interviewer captured @ Form onSave
    const interview = {
      student: name,
      interviewer
    };
    // pass to bookInterview in Application
    props.bookInterview(props.id, interview);
    transition(SHOW);
  };

  return (<article className="appointment">
    <Header
      time={props.time}
    />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
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
  </article>)

};