import { createContext, useEffect, useState } from "react";
import cheerio from "cheerio";
import axios from "axios";

const ResultsContext = createContext();

export function ResultsProvider({ children }) {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const fetchResults = () => {
    if (url) {
      axios
        .get(`http://localhost:5000/api/results`, { params: { url } })
        .then((response) => {
          setResults(response.data);
          setError("");
        })
        .catch((error) => {
          setError("Error fetching data");
          console.error("Error fetching data:", error);
        });
    } else {
      setError("Please enter a URL");
    }
  };

  return (
    <ResultsContext.Provider value={{ fetchResults, results, setUrl, error }}>
      {children}
    </ResultsContext.Provider>
  );
}

export default ResultsContext;
