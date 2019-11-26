import React from "react";
import InterviewerListItem from "components/InterviewerListItem";


export default function InterviewerList(props) {

  const mapInterviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        interviewer={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={props.setInterviewer}
      />
    )
  })

  return (<section className="interviewers">
          <h4 className="interviewers__header text--light">Interviewer</h4>
          <ul className="interviewers__list">{mapInterviewers}</ul>
          </section>)
};