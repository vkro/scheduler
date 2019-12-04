import { useReducer, useEffect } from "react";
import axios from "axios";



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

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  // const SET_SPOTS = "SET_SPOTS";


  const reducer = function (state, action) {

    //update currently selected day in state
    if (action.type === SET_DAY) {
      return ({ ...state, day: action.value });
      //set state with all app data from api calls
    }

    //initial state after getting data from api calls
    if (action.type === SET_APPLICATION_DATA) {
      return ({
        ...state,
        days: action.value[0]["data"],
        appointments: action.value[1]["data"],
        interviewers: action.value[2]["data"]
      })
    }

    //update appointments in state with new interview data
    if (action.type === SET_INTERVIEW) {

      const appointments = action.value.appointments;

      const updateSpotCount = function (day) {
        // number of open spots starts at 0
        let spots = 0;
        let stateAppts = appointments
        // go through the day's list of appointmemts
        for (let id in day['appointments']) {

          // look at each appointmemt in the appointments object, by id
          // and check out the status of its interview
          // if (stateAppts[id]   )
          if (stateAppts[(day.appointments[id])]['interview'] === null) {
            spots = spots + 1
          }
        }
        return spots
      }

      const updateDays = function (daysArr, id) {
        //look through the list of days in current state
        const updatedDays = daysArr.map((day, index) => {
          //if day at index contains the id in its list of appointments
          if (day.appointments.includes(id)) {
            //then update the spots for that day
            return { ...day, spots: updateSpotCount(daysArr[index]) }
          }
          // otherwise keep day as is
          return day
        })
        //return mapped days array
        return updatedDays
      }

      // new state for days array
      const days = updateDays(state.days, action.value.id);

      // set state with updated appointments and days
      return ({ ...state, appointments: action.value.appointments, days: days })
    }

    throw new Error(
      `tried to reduce with unsupported action type: ${action.type}`
    )
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
      axios({
        method: 'delete',
        url: `/api/appointments/${id}`
      })
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