import React from "react";
import InterviewerListItem from "components/InterviewerListItem";


export default function DayList(props) {

  const mapInterviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}

      />
    )
  })



  return (<ul>{mapInterviewers</ul>)
};