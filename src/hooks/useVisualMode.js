import { useState } from "react";


export default function useVisualMode(initial) {
  // initial is only there to set the initial value
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  // transition allows us to advance to any other mode
  function transition(newMode, replace = false) {
    setMode(newMode);
    if (!replace) {
      setHistory(prev => ([...prev, newMode]) )
    }
    
  };

  function back() {
    history.pop()
    if (history.length >= 1) { setMode(history[history.length - 1]) }
  };
  
  return { mode, transition, back }
};