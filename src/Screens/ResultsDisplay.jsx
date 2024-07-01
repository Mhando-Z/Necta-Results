import React, { useContext, useEffect, useState } from "react";
import ResultsContext from "../Context/ResultsContext";

function ResultsDisplay() {
  const { results } = useContext(ResultsContext);
  const [result, setResult] = useState([]);

  console.log(results);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex container mx-auto"></div>
    </div>
  );
}

export default ResultsDisplay;
