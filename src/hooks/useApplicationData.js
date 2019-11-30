import React, { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("http://localhost:8001/api/days")),
      Promise.resolve(axios.get("http://localhost:8001/api/appointments")),
      Promise.resolve(axios.get("http://localhost:8001/api/interviewers"))
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0]["data"], appointments: all[1]["data"], interviewers: all[2]["data"] }))
    });
  }, []);

  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (
      axios({
        method: 'put',
        url: `http://localhost:8001/api/appointments/${id}`,
        data: { interview: { ...interview } }
      })
        .then(() => {
          setState(prev => ({ ...prev, appointments })
          )
        })
    )
  };






  return {
    state,
    setDay,
    setState,
    bookInterview
    //cancelInterview
  }
};