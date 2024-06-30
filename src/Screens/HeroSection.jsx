import React, { useContext } from "react";
import logo from "../Assets/Images/logo.png";
import { Link } from "react-router-dom";
import ResultsContext from "../Context/ResultsContext";

function HeroSection() {
  const { setUrl } = useContext(ResultsContext);
  const { fetchResults } = useContext(ResultsContext);
  const { results } = useContext(ResultsContext);

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  console.log(results);
  return (
    <div className="flex mt-10 flex-col justify-center items-center">
      <div className="flex mb-16 flex-col gap-y-4 justify-center items-center">
        <img src={logo} alt="Necta Logo" className="max-w-screen h-auto" />
        <div className="flex flex-col gap-x-4 gap-y-3 sm:flex-row w-full">
          <input
            onChange={(e) => handleUrl(e)}
            type="text"
            placeholder="Paste Results url"
            className="py-2 w-full px-7 placeholder:text-center text-white font-medium outline-none right-2 bg-black rounded-3xl ring-black"
          />
        </div>
        <Link
          onClick={fetchResults}
          className="px-10 py-2 font-bold text-center bg-green-600 rounded-3xl text-white"
        >
          GO
        </Link>
      </div>
      {/* Results Display Section */}
      <div className="flex md:flex-row gap-x-16 justify-between flex-col">
        <div className="md:flex flex-col hidden h-[200px] w-[400px] rounded-3xl sticky top-0 left-0 z-50 bg-black"></div>
        <div>
          {results?.map((dt) => {
            const { subjects } = dt;
            if (subjects.length === 1) {
            } else {
              return (
                <div
                  key={dt.examnumber}
                  className="flex text-xl flex-col mt-5 gap-x-12 md:flex-row"
                >
                  <div className="flex flex-col md:px-14 px-7 bg-slate-100 rounded-2xl p-5 md:p-10 gap-y-3">
                    <div className="flex gap-y-2 gap-x-3 md:flex-col flex-row items-center justify-center">
                      <h1>RegNo</h1>
                      <h1>{dt.examnumber}</h1>
                    </div>
                    <div className="flex gap-x-2 flex-row items-center justify-center">
                      <h1>Sex</h1>
                      <h1>{dt.sex}</h1>
                    </div>
                    <div className="flex gap-y-2 gap-x-3 md:flex-col flex-row items-center justify-center">
                      <h1>Div</h1>
                      <h1>
                        {dt.division} point {dt.points}
                      </h1>
                    </div>
                  </div>
                  <div className="flex w-full flex-col bg-slate-100 md:p-10 p-5 rounded-2xl">
                    <table class="table-auto w-[300px]  md:w-[400px] text-left">
                      <thead>
                        <tr>
                          <th className="text-2xl uppercase">Subject</th>
                          <th className="text-center text-2xl uppercase">
                            Grade
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dt.subjects?.map((xy) => {
                          return (
                            <tr>
                              <td>{xy.subject}</td>
                              <td className="text-center">{xy.grade}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="md:flex hidden flex-col h-[400px] w-[400px] sticky top-0 left-0 z-50 rounded-3xl bg-black"></div>
      </div>
    </div>
  );
}

export default HeroSection;
