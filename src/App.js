import React from "react";
import { Routes, Route } from "react-router-dom";

//Linktree Jefa
import BoostUp from "./components/BoostUp/BoostUp";



const App = () => {
  return (
    <Routes>
      
      <Route
      //Linktree enlaces
        path="/links"
        element={
            <BoostUp />
        }
      />
      
    </Routes>
  );
};

export default App;
