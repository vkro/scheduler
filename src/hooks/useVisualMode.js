import React, { useState, useEffect } from "react";


export default function useVisualMode(input) {
  // input is only there to set the initial value
  const [mode, setMode] = useState(input);
  
  // transition allows us to advance to any other mode
  function transition(newMode) {
    setMode(newMode)
  };

  function back(oldMode) {
    setMode(oldMode)
  };
  
  return { mode, transition, back }
};