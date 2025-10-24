import React from "react";
import { Routes, Route } from "react-router-dom";

//Linktree Jefa
import LinktreeJefa from "./components/LinktreeJefa/Linktree";



const App = () => {
  return (
    <Routes>
      
      <Route
      //Linktree enlaces
        path="/enlaces"
        element={
            <LinktreeJefa />
        }
      />
      
    </Routes>
  );
};

export default App;
