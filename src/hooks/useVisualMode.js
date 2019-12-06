import { useState } from "react";

export default function useVisualMode(initial) {
  // set the initial value
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  // transition allows us to advance to any other mode
  function transition(newMode, replace = false) {
    setMode(newMode);
    if (!replace) {
      setHistory(prev => ([...prev, newMode]));
    };    
  };
  // if transitioning back (for cancelling actions, closing error messages)
  // remove last state from history, set mode one more back (skip transition to error/saving/deleting mode)
  function back() {
    history.pop();
    if (history.length >= 1) { setMode(history[history.length - 1]) }
  };
  return { mode, transition, back };
};