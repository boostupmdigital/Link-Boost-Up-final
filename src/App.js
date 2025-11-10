import React from "react";
import { Routes, Route } from "react-router-dom";

import BoostUp from "./components/BoostUp/BoostUp";
import Vergel from "./components/VergelEstacion/Vergel";
import AvitViajes from "./components/AvitViajes/AvitViajes";
import OneServiceSrl from "./components/OneServiceSrl/OneServiceSrl";
import Acquasole from "./components/Acquasole/Acquasole";



const App = () => {
  return (
    <Routes>
      
      <Route
      //BoostUp enlaces
        path="/boostup"
        element={
            <BoostUp />
        }
      />
      <Route
      //Vergel enlaces
        path="/vergel-estacion"
        element={
            <Vergel />
        }
      />

      <Route
      //Avit enlaces
        path="/avit-viajes"
        element={
            <AvitViajes />
        }
      />

      <Route
      //oneServices enlaces
        path="/oneservice"
        element={
            <OneServiceSrl />
        }
      />

      <Route
      //oneServices enlaces
        path="/acquasole"
        element={
            <Acquasole />
        }
      />
      
    </Routes>
  );
};

export default App;
