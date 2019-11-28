import React, { useState, useEffect } from "react";


export default function useVisualMode(input) {

  const [ mode, setMode ] = useState(input);

  return { mode }
};