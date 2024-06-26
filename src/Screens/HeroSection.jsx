import React, { useContext } from "react";
import logo from "../Assets/Images/logo.png";
import { Link } from "react-router-dom";
import ResultsContext from "../Context/ResultsContext";

function HeroSection() {
  const { setUrl } = useContext(ResultsContext);
  const handleUrl = (e) => {
    setUrl(e.target.value);
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col gap-y-4 justify-center items-center">
        <img src={logo} alt="Necta Logo" className="max-w-screen h-auto" />
        <div className="flex flex-col gap-x-4 gap-y-3 sm:flex-row w-full">
          <input
            onChange={(e) => handleUrl(e)}
            type="text"
            placeholder="Paste Results url"
            className="py-2 w-full px-7 placeholder:text-center text-white font-medium outline-none right-2 bg-black rounded-3xl ring-black"
          />
        </div>
        <Link className="px-10 py-2 font-bold text-center bg-green-600 rounded-3xl text-white">
          GO
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
