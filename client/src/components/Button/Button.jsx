import React from "react";
import "./Button.scss";

// reusable button ui component
function Button({ className, content }) {
  return (
    <button className={`${className} button-component pointer`}>
      {content}
    </button>
  );
}

export default Button;
