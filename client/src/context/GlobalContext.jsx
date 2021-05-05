import React, { useState, useEffect } from "react";

export const globalContext = React.createContext();

function GlobalContext(props) {
  const [user, setUser] = useState(null);
  const [loggingInfo, setLoggingInfo] = useState(false);

  return (
    <globalContext.Provider
      value={{ user, setUser, loggingInfo, setLoggingInfo }}
    >
      {props.children}
    </globalContext.Provider>
  );
}

export default GlobalContext;
