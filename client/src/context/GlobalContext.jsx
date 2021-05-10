import React, { useState, useEffect } from "react";

export const globalContext = React.createContext();

function GlobalContext(props) {
  const [user, setUser] = useState(null);
  const [loggingInfo, setLoggingInfo] = useState(false);
  const [postInfo, setPostInfo] = useState(null);

  return (
    <globalContext.Provider
      value={{
        user,
        setUser,
        loggingInfo,
        setLoggingInfo,
        postInfo,
        setPostInfo,
      }}
    >
      {props.children}
    </globalContext.Provider>
  );
}

export default GlobalContext;
