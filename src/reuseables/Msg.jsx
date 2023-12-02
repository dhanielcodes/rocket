/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from "react";
import Success from "../images/Success.svg";
import Failed from "../images/Fail.svg";
function Msg({ children, type }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "1em",
          textAlign: "center",
          fontSize: "20px",
        }}
      >
        <img src={type === true ? Success : Failed} height="50px" />
        <p
          style={{
            display: "grid",
            fontSize: "20px",
            placeItems: "center",
          }}
        >
          {children}
        </p>
      </div>
    </div>
  );
}

export default Msg;
