import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";



// When we dispatch an action, we expect the reducer to handle it and
// replace the current state. When the component renders, it will use
// the latest state to generate an updated view.

export default function useApplicationData() {

  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  };

  const [state, dispatch] = useReducer(reducer, initialState);


  //make req to get all app data (days, appointments, interviewers) and update state 
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then((all) => dispatch({ type: SET_APPLICATION_DATA, value: all }))
      .catch(err => `Use Effect Promises error: ${err}`)
  }, []);

  const setDay = day => dispatch({ type: SET_DAY, value: day });


  //update database and state when interview booked/edited
  const bookInterview = function (id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (
      axios.put(`/api/appointments/${id}`, { interview: { ...interview } })
        .then(() => dispatch({ type: SET_INTERVIEW, value: { appointments, id } }))
    );
  };


  //update database and state when appointment is cancelled
  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (
      axios.delete(`/api/appointments/${id}`)
        .then(() => dispatch({ type: SET_INTERVIEW, value: { appointments, id } }))
    );
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};