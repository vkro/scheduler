// helper selector functions for scheduler application


// get appointments for a given day
export function getAppointmentsForDay(state, day) {

  const stateAppts = state.appointments;
  
  // get list of appointments in state for given day
  const getAppointments = function(state, day) {
    let appointments = [];
    state.days.forEach(obj => {
      if (obj.name === day) {
        appointments =  obj.appointments;
      }
    });
    return appointments;
  };
  
  // map appointment details from state for each appointment id on the list
  const getAppointmentDetails = function(stateAppts, arr) {
    return arr.map(x => stateAppts[x]);
  };

  let appts = getAppointments(state, day);
  let getobject = getAppointmentDetails(stateAppts, appts);

  return getobject
};

// get interviewer's data given an object that contains an interviewer
// returns null if no interview is booked
export function getInterview(state, interview) {

  if (interview === null) {
    return null
  } else {
    const interviewerId = interview.interviewer;
    const interviewers = state.interviewers;
    const newInterview = {...interview}
    // look through the interviewers object from state
    Object.keys(interviewers).forEach(key => {
      // for each interviewer obj in obj, check if id = given interviewer id
      if (interviewers[key]['id'] === interviewerId) {
        // update new interview object with interviewer obj from state
        newInterview["interviewer"] = {...interviewers[key]};
      }
    })
  return newInterview;
  }
};