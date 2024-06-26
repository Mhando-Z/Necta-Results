import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import { ResultsProvider } from "./Context/ResultsContext";

function App() {
  return (
    <div className="font-roboto flex flex-col min-h-screen">
      <ResultsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </ResultsProvider>
    </div>
  );
}

export default App;
