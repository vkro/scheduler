const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW };

export default function reducer(state, action) {
  //update currently selected day in state
  if (action.type === SET_DAY) {
    return ({ ...state, day: action.value });
    //set state with all app data from api calls
  };
  //initial state after getting data from api calls
  if (action.type === SET_APPLICATION_DATA) {
    return ({
      ...state,
      days: action.value[0]["data"],
      appointments: action.value[1]["data"],
      interviewers: action.value[2]["data"]
    });
  };
  //update appointments in state with new interview data
  if (action.type === SET_INTERVIEW) {

    const appointments = action.value.appointments;
    const updateSpotCount = function (day) {
      // number of open spots starts at 0
      let spots = 0;
      let stateAppts = appointments;
      // go through the day's list of appointmemts
      for (let id in day['appointments']) {
        // look at each appointmemt in the appointments object, by id
        // and check out the status of its interview
        // if interview is null, add one to the count of available spots
        if (stateAppts[(day.appointments[id])]['interview'] === null) {
          ++spots;
        };
      };
      return spots;
    };

    const updateDays = function (daysArr, id) {
      //look through the list of days in current state
      const updatedDays = daysArr.map((day, index) => {
        //if day at index contains the given id in its list of appointments
        if (day.appointments.includes(id)) {
          //then update the spots for that day
          return { ...day, spots: updateSpotCount(daysArr[index]) }
        };
        // otherwise keep day as is
        return day;
      });
      //return mapped days array
      return updatedDays;
    };

    // new days array for updating state
    const days = updateDays(state.days, action.value.id);

    // set state with updated appointments and days
    return ({ ...state, appointments: action.value.appointments, days: days });
  };

  throw new Error(
    `tried to reduce with unsupported action type: ${action.type}`
  );
};