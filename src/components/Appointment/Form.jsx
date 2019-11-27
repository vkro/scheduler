import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props) {

  const [ name, setName ] = useState( props.name || "" );
  const [ interviewer, setInterviewer ] = useState( props.interviewer || null );


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            type="text"
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter Student Name"
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger>Cancel</Button>
          <Button confirm onclick={(event) => console.log("buttonclicked")}>Save</Button>
        </section>
      </section>
    </main>
  );
};
