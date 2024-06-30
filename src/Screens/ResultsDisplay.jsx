import React, { useContext, useEffect, useState } from "react";
import ResultsContext from "../Context/ResultsContext";

function ResultsDisplay() {
  const { results } = useContext(ResultsContext);
  const [result, setResult] = useState([]);
  useEffect(() => {
    result.map((dt) => {
      const { subjects } = dt;
      if (subjects.length >= 3) {
        setResult(dt);
      }
    });
  }, []);
  console.log("power");

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex container mx-auto">
        {results?.map((dt) => {
          return (
            <div className="flex flex-col gap-x-12 md:flex-row">
              <div className="flex flex-col px-14 bg-slate-100 rounded-2xl p-10 gap-y-3">
                <div className="flex gap-y-2 flex-col items-center justify-center">
                  <h1>RegNo</h1>
                  <h1>{dt.examnumber}</h1>
                </div>
                <div className="flex gap-x-2 flex-row items-center justify-center">
                  <h1>Sex</h1>
                  <h1>{dt.sex}</h1>
                </div>
                <div className="flex gap-y-2 flex-col items-center justify-center">
                  <h1>Div</h1>
                  <h1>
                    {dt.division} point {dt.points}
                  </h1>
                </div>
              </div>
              <div className="flex w-full flex-col bg-slate-100 p-10 rounded-2xl">
                <table class="table-auto w-[400px] text-left">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dt.subjects?.map((xy) => {
                      return (
                        <tr>
                          <td>{xy.subject}</td>
                          <td>{xy.grade}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ResultsDisplay;
