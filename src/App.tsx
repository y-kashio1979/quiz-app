import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Quiz } from "./quiz/Quiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <ul>
                <li>
                  <Link to="/quiz">クイズ</Link>
                </li>
              </ul>
            </div>
          }
        />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
