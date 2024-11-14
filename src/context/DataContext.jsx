"use client";

const { createContext, useState } = require("react");

const DataContext = createContext();

export function DataProvider({ children }) {
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(data);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    setData("");

    try {
      const response = await fetch(
        `/api/scrape?url=${encodeURIComponent(url)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <DataContext.Provider
      value={{ data, url, error, loading, setUrl, setLoading, fetchData }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
