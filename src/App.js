import React from "react";
import { Routes, Route } from "react-router-dom";

import BoostUp from "./components/Links/BoostUp/BoostUp";
import Vergel from "./components/Links/VergelEstacion/Vergel";
import AvitViajes from "./components/Links/AvitViajes/AvitViajes";
import OneServiceSrl from "./components/Links/OneServiceSrl/OneServiceSrl";
import Acquasole from "./components/Links/Acquasole/Acquasole";
import Atos from "./components/Links/Atos/Atos";
import Solenar from "./components/Links/Solenar/Solenar";
import Jimena from "./components/Links/Jimena/Jimena";
import Finder from "./components/Links/Finder/Finder";
import Tuprop from "./components/Links/TuProp/Tuprop";
import Chamena from "./components/Links/Chamena/Chamena";
import Sublime from "./components/Links/Sublime/Sublime";
import Jefaweb from "./components/Links/JefaWeb/Jefaweb";
import Garbo from "./components/Links/Garbo/Garbo";
import Home from "./components/Home/Home";
import AtosVentas from "./components/AtosVentas/AtosVentas";
//import GestorJCP from "./components/GestorEscribaniaJCP/GestorJCP";
import DashboardJCP from "./components/GestorEscribaniaJCP/pages/DashboardJCP";
const App = () => {
  return (
    <Routes>
      <Route
        //BoostUp enlaces
        path="/"
        element={<Home />}
      />

<Route
//Gestor Escribania
  path="/gestor-escribania-jcp/dashboard"
  element={
      <DashboardJCP />}
      />
      
        <Route
        //BoostUp enlaces
        path="/boostup"
        element={<BoostUp />}
      />
      

      <Route
        //Garbo enlaces
        path="/garbo"
        element={<Garbo />}
      />
      <Route
        //Garbo enlaces
        path="/atos-ventas"
        element={<AtosVentas />}
      />
      <Route
        //Jefa web enlaces
        path="/jefa"
        element={<Jefaweb />}
      />
      <Route
        //Vergel enlaces
        path="/vergel-estacion"
        element={<Vergel />}
      />

      <Route
        //Avit enlaces
        path="/avit-viajes"
        element={<AvitViajes />}
      />

      <Route
        //oneServices enlaces
        path="/oneservice"
        element={<OneServiceSrl />}
      />

      <Route
        //Acquasole enlaces
        path="/acquasole"
        element={<Acquasole />}
      />

      <Route
        //Atos enlaces
        path="/atos"
        element={<Atos />}
      />

      <Route
        //Solenar enlaces
        path="/solenar"
        element={<Solenar />}
      />

      <Route
        //Jimena enlaces
        path="/jimenapalacios"
        element={<Jimena />}
      />

      <Route
        //Finder
        path="/viajes-finder"
        element={<Finder />}
      />

      <Route
        //Tu Prop
        path="/tuprop"
        element={<Tuprop />}
      />

      <Route
        //Chamena
        path="/chamena"
        element={<Chamena />}
      />

      <Route
        //Sublime
        path="/sublime"
        element={<Sublime />}
      />
    </Routes>
  );
};

export default App;
