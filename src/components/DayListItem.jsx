import React from "react";
import "components/DayListItem.scss";

let classNames = require("classnames");

export default function DayListItem(props) {
  // applies day-list__item--selected and day-list__item--full styles
  // based on props passed to dayListItem using classnames library
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  const formatSpots = (
    (props.spots === 0) ? `no spots remaining` : 
    (props.spots === 1) ? `1 spot remaining` :
    `${props.spots} spots remaining`
  );

  return (
    <li className={dayClass} data-testid="day" onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots}</h3>
    </li>
  );
};