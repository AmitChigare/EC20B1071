import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TrainSchedule from "./TrainSchedule";
import SingleTrain from "./SingleTrain";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TrainSchedule />} />
        <Route path="/single-train/:trainNumber" element={<SingleTrain />} />
      </Routes>
    </Router>
  );
}

export default App;
