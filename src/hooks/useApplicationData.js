import React, { useReducer, useEffect } from "react";
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
  const SET_SPOTS = "SET_SPOTS";


  const reducer = function (state, action) {
    //update currently selected day in state
    if (action.type === SET_DAY) {
      return ({ ...state, day: action.value });
      //set state with all app data from api calls
    } else if (action.type === SET_APPLICATION_DATA) {
      return ({
        ...state,
        days: action.value[0]["data"],
        appointments: action.value[1]["data"],
        interviewers: action.value[2]["data"]
      })
      //update appointments in state with new interview data
    } else if (action.type === SET_INTERVIEW) {
      return ({ ...state, appointments: action.value.appointments })
      //update spots for day containing added/cancelled appointment
    } else if (action.type === SET_SPOTS) {
      const updateDays = function (daysArr, updatedDaysArr, id) {
        //look through the list of days in current state
        const updatedDays = daysArr.map((day, index) => {
          //if day at index contains the id in its list of appointments
          if (day.appointments.includes(id)) {
              //then update the spots for that day with the updated spots from the api/days response
              return { ...day, spots: updatedDaysArr[index]['spots'] }
            } 
          // otherwise keep day as is
          return day
        })
        //return mapped days array
        return updatedDays
      }
        //update state with mapped days array
      return ({ ...state, days: updateDays(state.days, action.value[0]['data'], action.value[1]) })


    } else {
      throw new Error(
        `tried to reduce with unsupported action type: ${action.type}`
      );
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("http://localhost:8001/api/days")),
      Promise.resolve(axios.get("http://localhost:8001/api/appointments")),
      Promise.resolve(axios.get("http://localhost:8001/api/interviewers"))
    ]).then((all) => dispatch({ type: SET_APPLICATION_DATA, value: all }))
      .catch(err => `Use Effect Promises error: ${err}`)
  }, []);

  const setDay = day => dispatch({ type: SET_DAY, value: day });

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
      axios({
        method: 'put',
        url: `http://localhost:8001/api/appointments/${id}`,
        data: { interview: { ...interview } }
      })
        .then(() => dispatch({ type: SET_INTERVIEW, value: { appointments } }))
        .then(() => axios.get("http://localhost:8001/api/days"))
        .then(res => dispatch({ type: SET_SPOTS, value: [ res, id ] }))
    );
  };

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
        url: `http://localhost:8001/api/appointments/${id}`
      })
        .then(() => dispatch({ type: SET_INTERVIEW, value: { appointments } }))
        .then(() => axios.get("http://localhost:8001/api/days"))
        .then(res => dispatch({ type: SET_SPOTS, value: [ res, id ] }))
    );
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};