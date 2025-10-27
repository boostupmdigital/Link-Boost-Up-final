import React from "react";
import { Routes, Route } from "react-router-dom";

import BoostUp from "./components/BoostUp/BoostUp";
import Vergel from "./components/VergelEstacion/Vergel";
import AvitViajes from "./components/AvitViajes/AvitViajes";



const App = () => {
  return (
    <Routes>
      
      <Route
      //Linktree enlaces
        path="/boostup"
        element={
            <BoostUp />
        }
      />
      <Route
      //Linktree enlaces
        path="/vergel-estacion"
        element={
            <Vergel />
        }
      />

      <Route
      //Linktree enlaces
        path="/avit-viajes"
        element={
            <AvitViajes />
        }
      />
      
    </Routes>
  );
};

export default App;
