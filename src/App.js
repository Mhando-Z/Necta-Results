import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import { ResultsProvider } from "./Context/ResultsContext";
import ResultsDisplay from "./Screens/ResultsDisplay";

function App() {
  return (
    <div className="font-roboto overflow-x-hidden flex flex-col min-h-screen">
      <ResultsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="ResultsDisplay/" element={<ResultsDisplay />} />
          </Routes>
        </BrowserRouter>
      </ResultsProvider>
    </div>
  );
}

export default App;
