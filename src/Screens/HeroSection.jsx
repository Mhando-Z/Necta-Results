import React, { useContext, useState } from "react";
import logo from "../Assets/Images/logo.png";
import { Link } from "react-router-dom";
import ResultsContext from "../Context/ResultsContext";

function HeroSection() {
  const { setUrl } = useContext(ResultsContext);
  const { fetchResults } = useContext(ResultsContext);
  const { results } = useContext(ResultsContext);
  const [show, setShow] = useState(false);

  const handleUrl = (e) => {
    setUrl(e.target.value);
    setShow(true);
  };

  return (
    <div className="flex mt-10 flex-col justify-center min-h-screen items-center">
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
      {show ? (
        <div className="flex gap-x-16 gap-y-10 justify-between flex-col">
          <div className="flex mb-10 flex-col gap-y-6 h-[200px] w-full rounded-2xl sticky top-0">
            <div className="flex flex-col md:text-2xl text-xl items-center gap-y-1 justify-center">
              <h1 className="font-bold text-center">
                {results.title[0]?.necta}
              </h1>
              <h1 className="font-medium text-center">
                {results.title[0]?.year}
              </h1>
              <h1 className="font-medium text-center">
                {results.title[0]?.xcul}
              </h1>
            </div>
            <div className="flex flex-col gap-y-2 md:px-24 px-2 sm:px-0">
              <input
                type="text"
                className="py-2 md:relative text-black font-medium px-4 ring-green-600 rounded-3xl w-full outline-none ring-2"
                placeholder="Write your examination number"
              />
              <Link className="flex md:absolute md:right-24 sm:px-10 rounded-3xl py-2 md:w-auto bg-green-600 text-white font-medium">
                <h1 className="text-center xl:text-xl w-full">Search</h1>
              </Link>
            </div>
          </div>
          <div>
            {results.results?.map((dt) => {
              const { subjects } = dt;
              if (subjects.length === 1) {
              } else {
                return (
                  <div
                    key={dt.examnumber}
                    className="flex px-2 xl:text-xl md:ring-0 gap-y-1 ring-2 ring-green-600 rounded-2xl flex-col mt-5 gap-x-12 md:flex-row"
                  >
                    <div className="flex font-bold md:ring-2 md:ring-green-600 flex-col md:px-14 px-7 bg-slate-100 rounded-2xl p-5 md:p-10 gap-y-3">
                      <div className="flex gap-y-2 gap-x-3 md:flex-col flex-row items-center justify-center">
                        <h1 className="font-bold xl:text-2xl">RegNo</h1>
                        <h1 className="font-bold">{dt.examnumber}</h1>
                      </div>
                      <div className="flex gap-x-2 flex-row items-center justify-center">
                        <h1>Sex</h1>
                        <h1>{dt.sex}</h1>
                      </div>
                      <div className="flex gap-y-1 gap-x-3 md:flex-col flex-row items-center justify-center">
                        <h1 className="">Div</h1>
                        <h1>
                          {dt.division} point {dt.points}
                        </h1>
                      </div>
                    </div>
                    <div className="flex w-full md:ring-2 md:ring-green-600 flex-col bg-slate-100 md:p-10 p-5 rounded-2xl">
                      <table class="table-auto w-[300px]  md:w-[400px] text-left">
                        <thead>
                          <tr>
                            <th className=" uppercase">Subject</th>
                            <th className="text-center uppercase">Grade</th>
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
          <div className="md:flex hidden flex-col h-[400px] w-[400px] sticky top-0 left-0 right-0 bottom-0 rounded-3xl bg-black"></div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default HeroSection;
