import React, { useContext, useEffect, useState } from "react";
import logo from "../Assets/Images/logo.png";
import arms from "../Assets/Images/arms.png";
import { Link } from "react-router-dom";
import ResultsContext from "../Context/ResultsContext";

function HeroSection() {
  const { setUrl } = useContext(ResultsContext);
  const { fetchResults } = useContext(ResultsContext);
  const { results } = useContext(ResultsContext);
  const [show, setShow] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [PrintSection, setSection] = useState(false);
  const [hide, setHide] = useState("flex");
  const [Title, setTitles] = useState([]);
  const [filtered, setfilterd] = useState([]);
  const [examnumber, setNumber] = useState("P0134");

  // handles filter
  const handleFilter = () => {
    const filterd = results.results?.filter((dt) => {
      return dt.examnumber === examnumber;
    });
    if (filterd.length > 0) {
      setShowFilter(true);
      setShow(false);
    } else {
      setShow(true);
      setShowFilter(false);
    }
    setfilterd(filterd);
  };

  const handleSection = () => {
    setSection(true);
    setShow(false);
    setShowFilter(false);
    setHide("hidden");
  };

  const handleChange = () => {
    setSection(false);
    setShow(true);
    setShowFilter(false);
    setHide("flex");
  };

  useEffect(() => {
    results.title?.map((dt) => {
      setTitles(dt);
    });
  }, [results]);

  const handleNumber = (e) => {
    setNumber(e.target.value);
  };

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleShow = () => {
    setShowFilter(false);
    setShow(true);
  };

  return (
    <div className="flex mt-10 flex-col justify-center min-h-screen items-center">
      <div
        className={`mb-16 flex-col gap-y-4 justify-center items-center ${hide}`}
      >
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
          <h1 onClick={handleShow}>GO</h1>
        </Link>
      </div>
      {/* Single Results Display Section */}
      {show ? (
        <div className="flex gap-x-16 gap-y-10 justify-between flex-col">
          <div className="flex flex-col gap-y-6 h-[200px] w-full rounded-2xl sticky top-0">
            <div className="flex flex-col md:text-2xl text-xl items-center gap-y-1 justify-center">
              <h1 className="font-bold text-center">{Title?.necta}</h1>
              <h1 className="font-medium text-center">{Title?.year}</h1>
              <h1 className="font-medium text-center">{Title?.xcul}</h1>
            </div>
            <div className="flex flex-col gap-y-2 md:px-24 px-2 sm:px-0">
              <input
                onChange={(e) => handleNumber(e)}
                type="text"
                className="py-2 md:relative text-black font-medium px-5 md:px-10 ring-green-600 rounded-3xl w-full outline-none ring-2"
                placeholder="Write your examination number"
              />
              <Link
                onClick={handleFilter}
                className="flex md:absolute md:right-24 sm:px-10 rounded-3xl py-2 md:w-auto bg-green-600 text-white font-medium"
              >
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
                      <div className="flex uppercase mt-1 border-b-2 border-slate-300 gap-y-2 py-2 gap-x-3 md:flex-col flex-row items-center justify-center">
                        <h1 className="font-bold xl:text-xl">Reg-No</h1>
                        <h1 className="font-bold">{dt.examnumber}</h1>
                      </div>
                      <div className="flex md:border-b-2 md:border-slate-300 uppercase gap-x-2 py-2 flex-row items-center justify-center">
                        <h1>Sex</h1>
                        <h1>{dt.sex}</h1>
                      </div>
                      <div className="flex uppercase md:border-b-2 md:border-slate-300 gap-y-1 py-2 gap-x-3 md:flex-col flex-row items-center justify-center">
                        <h1 className="">Div</h1>
                        <h1>
                          {dt.division} point {dt.points}
                        </h1>
                      </div>
                    </div>
                    <div className="flex w-full md:ring-2 md:ring-green-600 flex-col bg-slate-100 md:p-10 p-5 rounded-2xl">
                      <table class="table-auto w-full md:w-[400px] text-left">
                        <thead>
                          <tr className="border-b-2 border-slate-300">
                            <th className="uppercase text-left py-3 ">
                              Subject
                            </th>
                            <th className="text-center py-3 uppercase">
                              Grade
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {dt.subjects?.map((xy) => {
                            return (
                              <tr>
                                <td className="border-b-2 border-slate-300">
                                  {xy.subject}
                                </td>
                                <td className="text-center border-b-2 border-slate-300 px-10 py-3">
                                  {xy.grade}
                                </td>
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
        </div>
      ) : (
        ""
      )}
      {/* Single Results Display Section */}
      {showFilter ? (
        <div className="flex mb-24 gap-x-16 gap-y-10 justify-between flex-col">
          <div className="flex mb-10 flex-col gap-y-6 h-[200px] w-full rounded-2xl sticky top-0">
            <div className="flex flex-col md:text-2xl text-xl items-center gap-y-1 justify-center">
              <h1 className="font-bold text-center">{Title?.necta}</h1>
              <h1 className="font-medium text-center">{Title?.year}</h1>
              <h1 className="font-medium text-center">{Title?.xcul}</h1>
            </div>
            <div className="flex flex-col gap-y-2 md:px-24 px-2 sm:px-0">
              <input
                onChange={(e) => handleNumber(e)}
                type="text"
                className="py-2 md:relative text-black font-medium md:px-10 px-4 ring-green-600 rounded-3xl w-full outline-none ring-2"
                placeholder="Write your examination number"
              />
              <Link
                onClick={handleFilter}
                className="flex md:absolute md:right-24 sm:px-10 rounded-3xl py-2 md:w-auto bg-green-600 text-white font-medium"
              >
                <h1 className="text-center xl:text-xl w-full">Search</h1>
              </Link>
            </div>
          </div>
          <div>
            {filtered?.map((dt) => {
              const { subjects } = dt;
              if (subjects.length === 1) {
              } else {
                return (
                  <div
                    onClick={handleSection}
                    key={dt.examnumber}
                    className="flex px-2 cursor-pointer xl:text-xl md:ring-0 gap-y-1 ring-2 ring-green-600 rounded-2xl flex-col mt-5 gap-x-12 md:flex-row"
                  >
                    <div className="flex font-bold md:ring-2 md:ring-green-600 flex-col md:px-14 px-7 bg-slate-100 rounded-2xl p-5 md:p-10 gap-y-3">
                      <div className="flex uppercase mt-1 border-b-2 border-slate-300 gap-y-2 py-2 gap-x-3 md:flex-col flex-row items-center justify-center">
                        <h1 className="font-bold xl:text-xl">Reg-No</h1>
                        <h1 className="font-bold">{dt.examnumber}</h1>
                      </div>
                      <div className="flex md:border-b-2 md:border-slate-300 uppercase gap-x-2 py-2 flex-row items-center justify-center">
                        <h1>Sex</h1>
                        <h1>{dt.sex}</h1>
                      </div>
                      <div className="flex uppercase md:border-b-2 md:border-slate-300 gap-y-1 py-2 gap-x-3 md:flex-col flex-row items-center justify-center">
                        <h1 className="">Div</h1>
                        <h1>
                          {dt.division} point {dt.points}
                        </h1>
                      </div>
                    </div>
                    <div className="flex w-full md:ring-2 md:ring-green-600 flex-col bg-slate-100 md:p-10 p-5 rounded-2xl">
                      <table class="table-auto w-full md:w-[400px] text-left">
                        <thead>
                          <tr className="border-b-2 border-slate-300">
                            <th className="uppercase text-left py-3 ">
                              Subject
                            </th>
                            <th className="text-center py-3 uppercase">
                              Grade
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {dt.subjects?.map((xy) => {
                            return (
                              <tr>
                                <td className="border-b-2 border-slate-300">
                                  {xy.subject}
                                </td>
                                <td className="text-center border-b-2 border-slate-300 px-10 py-3">
                                  {xy.grade}
                                </td>
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
        </div>
      ) : (
        ""
      )}
      {/* Print results section */}
      {PrintSection ? (
        <div className="md:p-20 p-2 bg-slate-100 flex flex-col rounded-xl w-full container mx-auto min-h-screen">
          {/* Heading Section */}
          <div className="flex md:flex-row flex-col md:items-center justify-between">
            {/* Necta Logo */}
            <div className="flex mt-5 flex-row md:hidden gap-x-2 items-center justify-center">
              <img src={logo} alt="necta logo" className="lg:size-40 size-20" />
              <img src={arms} alt="necta logo" className="lg:size-40 size-20" />
            </div>
            <div className="md:block hidden">
              <img
                src={logo}
                alt="necta logo"
                className="lg:size-40 xl:size-44 size-24"
              />
            </div>
            {/* Headings and Titles */}
            <div className="flex flex-col mt-4 md:mt-0 xl:text-3xl xl:gap-y-3 md:text-2xl text-lg items-center gap-y-1 justify-center">
              <h1 className="font-bold text-center">{Title?.necta}</h1>
              <h1 className="font-medium text-center">{Title?.year}</h1>
              <h1 className="font-medium text-center">{Title?.xcul}</h1>
            </div>
            {/* court of Arms logo */}
            <div className="hidden md:block">
              <img
                src={arms}
                alt="necta logo"
                className="lg:size-40 xl:size-44 size-24"
              />
            </div>
          </div>
          {/* Student Details */}
          <div className="flex flex-col md:mt-16 mt-5 justify-center items-center">
            <table className="sm:w-[400px] bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="py-2 px-4 border-b border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td className="py-4 px-4 border-b border-gray-200 align-middle">
                    REG NUMBER
                  </td>
                  <td className="py-4 px-4 border-b border-gray-200 align-top">
                    {filtered[0]?.examnumber}
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 border-b border-gray-200 align-middle">
                    ACHIVEMENT
                  </td>
                  <td className="py-4 px-4 border-b border-gray-200 align-top">
                    DIV {filtered[0]?.division} Point {filtered[0]?.points}
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 border-b border-gray-200 align-middle">
                    SEX
                  </td>
                  <td className="py-4 px-4 border-b border-gray-200 align-top">
                    {filtered[0]?.sex === "F" ? "FEMALE" : "MALE"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Results Section */}
          <div className="mt-12">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4  xl:text-xl  border-b border-gray-300 bg-gray-50 text-left text-lg leading-4 font-bold  text-gray-500 uppercase tracking-wider">
                    SUBJECT
                  </th>
                  <th className="py-2 px-4 xl:text-xl text-center border-b border-gray-300 bg-gray-50  text-lg leading-4 font-bold text-gray-500 uppercase tracking-wider">
                    GRADE
                  </th>
                  <th className="py-2 px-4 xl:text-xl text-center border-b border-gray-300 bg-gray-50  text-lg leading-4 font-bold text-gray-500 uppercase tracking-wider">
                    REMARKS
                  </th>
                </tr>
              </thead>
              {filtered[0]?.subjects.map((dt) => {
                return (
                  <tbody>
                    <tr>
                      <td className="py-4 px-4 border-b border-gray-200 align-middle">
                        {dt.subject}
                      </td>
                      <td className="py-4 text-center px-4 border-b border-gray-200 align-top">
                        {dt.grade}
                      </td>
                      <td className="py-4 px-4 text-center border-b border-gray-200 align-bottom">
                        {dt.grade === "A" ||
                        dt.grade === "B" ||
                        dt.grade === "C"
                          ? "PASS"
                          : "FAIL"}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
            <div className="mt-10">
              <Link
                onClick={handleChange}
                className=" px-5 py-2 bg-green-600 text-white font-medium"
              >
                Go Back
              </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default HeroSection;
