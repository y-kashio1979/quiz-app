import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Quiz } from "./quiz/Quiz";
import { HomePage } from "./quiz/pages/HomePage";
import { SelectGame } from "./SelectGame";
import { HitBlow } from "./hitblow/HitBlow";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectGame />} />
        <Route path="/quiz" element={<HomePage />} />
        <Route path="/quiz/:genre" element={<Quiz />} />
        <Route path="/hitblow" element={<HitBlow />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
