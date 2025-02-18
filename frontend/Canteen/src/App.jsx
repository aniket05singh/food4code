import React, { createContext, useState } from "react";
import StartingPage from "./pages/StartingPage";

// Create Context
const UserContext = createContext();

const App = () => {
  const [location, setLocation] = useState("");

  return (
    <UserContext.Provider value={{ location, setLocation }}>
      <div>
        <StartingPage />
      </div>
    </UserContext.Provider>
  );
};

export { UserContext };
export default App;
