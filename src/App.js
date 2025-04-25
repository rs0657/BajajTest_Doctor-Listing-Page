import React from "react";
import { Routes, Route } from "react-router-dom";
import DoctorlistPage from "./pages/DoctorlistPage";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DoctorlistPage />} />
      </Routes>
    </div>
  );
}
export default App;
