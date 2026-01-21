import { BrowserRouter, Routes, Route } from "react-router-dom";
import VoiceQuiz from "./pages/Voicequiz";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<VoiceQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
