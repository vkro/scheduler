import React from "react";
import "./DayListItem.scss";
let classNames = require("classnames");


export default function DayListItem(props) {
  // applies day-list__item--selected and day-list__item--full styles
  // based on props passed to DLI using classnames lib
  const dayClass = classNames({
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  })


  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
};