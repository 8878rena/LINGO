import React, { useState } from "react";

export const ThingsTodoContext = React.createContext();

export const ThingsTodoProvider = (props) => {
  const [thingsTodo, setThingsTodo] = useState("");
  return (
    <ThingsTodoContext.Provider value={{ language, setThingsTodo }}>
      {props.children}
    </ThingsTodoContext.Provider>
  );
};
