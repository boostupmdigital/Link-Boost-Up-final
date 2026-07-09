import React from "react";
import { Routes, Route } from "react-router-dom";

import BoostUp from "./components/BoostUp/BoostUp";
import Vergel from "./components/VergelEstacion/Vergel";
import AvitViajes from "./components/AvitViajes/AvitViajes";
import OneServiceSrl from "./components/OneServiceSrl/OneServiceSrl";
import Acquasole from "./components/Acquasole/Acquasole";
import Atos from "./components/Atos/Atos";
import Solenar from "./components/Solenar/Solenar";
import Jimena from "./components/Jimena/Jimena";
import Finder from "./components/Finder/Finder";
import Tuprop from "./components/TuProp/Tuprop";
import Chamena from "./components/Chamena/Chamena";
import Sublime from "./components/Sublime/Sublime";
import Jefaweb from "./components/JefaWeb/Jefaweb";
import Home from "./components/Home/Home";



const App = () => {
  return (
    <Routes>
      
      <Route
      //BoostUp enlaces
        path="/"
        element={
            <Home />
        }
      />
      <Route
      //BoostUp enlaces
        path="/boostup"
        element={
            <BoostUp />
        }
      />
      <Route
      //Jefa web enlaces
        path="/jefa"
        element={
            <Jefaweb />
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
      //Acquasole enlaces
        path="/acquasole"
        element={
            <Acquasole />
        }
      />

      <Route
      //Atos enlaces
        path="/atos"
        element={
            <Atos />
        }
      />

      <Route
      //Solenar enlaces
        path="/solenar"
        element={
            <Solenar />
        }
      />

      <Route
      //Jimena enlaces
        path="/jimenapalacios"
        element={
            <Jimena />
        }
      />

      <Route
      //Finder
        path="/viajes-finder"
        element={
            <Finder />
        }
      />

       <Route
      //Tu Prop
        path="/tuprop"
        element={
            <Tuprop />
        }
      />

         <Route
      //Chamena
        path="/chamena"
        element={
            <Chamena />
        }
      />

            <Route
      //Sublime
        path="/sublime"
        element={
            <Sublime />
        }
      />
      
    </Routes>
  );
};

export default App;
