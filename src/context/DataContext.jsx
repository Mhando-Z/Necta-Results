"use client";

import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);
  const [titles, setTitles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      setData(result?.results);
      setTitles(result?.title[0]);
      router.push("/results");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        url,
        titles,
        error,
        loading,
        setUrl,
        setLoading,
        fetchData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
