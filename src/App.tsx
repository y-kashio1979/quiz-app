import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Quiz } from "./quiz/Quiz";
import { HomePage } from "./quiz/pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<Navigate to="/" replace />} />
        <Route path="/quiz/:genre" element={<Quiz />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
