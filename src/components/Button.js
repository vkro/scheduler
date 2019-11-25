import React from "react";

import "components/Button.scss";
import { action } from "@storybook/addon-actions/dist/preview";
let classNames = require('classnames');


export default function Button(props) {
   
   const buttonClass = classNames("button",  {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   })


   return (
      <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
      >
         {props.children}
      </button>
   );

}

// function Application(props) {
//    return (
//    <main>
//       <Button onClick={(event) => action("button-clicked")}>Disabled</Button>
//    </main>
//    );
// }