import React, { useState, useEffect } from "react";


export default function useVisualMode(input) {

  const [mode, setMode] = useState(input);
  
  // transition allows us to advance to any other mode
  function transition(newMode) {
    setMode(newMode)
  }
  
  return { mode, transition }
};