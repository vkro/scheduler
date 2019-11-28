// helper selector functions for scheduler application

export default function getAppointmentsForDay(state, day) {

  const stateAppts = state.appointments;
  
  // get list of appointments
  const getAppointments = function(state, day) {
    let appointments = [];
    state.days.forEach(obj => {
      if (obj.name === day) {
        appointments =  obj.appointments;
      }
    });
    return appointments;
  };
  
  // map appointment details for each appointment id on the list
  const getAppointmentDetails = function(stateAppts, arr) {
    return arr.map(x => stateAppts[x]);
  };

  let appts = getAppointments(state, day);
  let getobject = getAppointmentDetails(stateAppts, appts);

  return getobject
};