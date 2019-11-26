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


  



  return (<section className="interviewers">
          <h4 className="interviewers__header text--light">Interviewer</h4>
          <ul className="interviewers__list">{mapInterviewers}</ul>
          </section>)
};