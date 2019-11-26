import React from "react";
import "components/InterviewerListItem.scss";
//let classNames = require("classnames");

export default function InterviewerListItem(props) {


  return (
    <li className="interviewers__item" onClick={() => props.setInterviewer(props.name)}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
      {props.name}
  </li>
  )
};


// id:number - the id of the interviewer
// name:string - the name of the interviewer
// avatar:url - a url to an image of the interviewer
// selected:boolean - to determine if an interview is selected or not
// setInterviewer:function - sets the interviewer upon selection