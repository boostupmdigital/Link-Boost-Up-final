import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import DashboardJCP from "./pages/DashboardJCP";

const GestorJCP = () => {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={<DashboardJCP />}
      />

      <Route
        index
        element={<Navigate to="dashboard" replace />}
      />

      <Route
        path="*"
        element={<Navigate to="dashboard" replace />}
      />
    </Routes>
  );
};

export default GestorJCP;