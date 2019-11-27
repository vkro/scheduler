import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";


export default function Appointment(props) {
  
  const showInterview = (
    props.interview ? <Show student={props.name} interviewer={props.interviewer}/> : <Empty onAdd={props.onAdd}/>
  )
  
  return (<article className="appointment">
    <Header
    time={props.time}
    />
    {showInterview}
  </article>)

};