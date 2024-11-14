"use client";

import Image from "next/image";
import logo from "../../public/logo.png";
import { useContext } from "react";
import DataContext from "@/context/DataContext";
import { RefreshCw } from "lucide-react";

export default function Home() {
  const { setUrl, error } = useContext(DataContext);
  const { loading, fetchData } = useContext(DataContext);

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-10">
      <div
        className={`mb-16 flex flex-col gap-y-4 justify-center items-center `}
      >
        <Image
          src={logo}
          alt="Necta Logo"
          className="h-auto mb-4 max-w-screen"
        />
        <div className="flex flex-col w-full gap-x-4 gap-y-3 sm:flex-row">
          <input
            onChange={(e) => handleUrl(e)}
            type="text"
            placeholder="Paste Results url"
            className="w-full py-2 font-medium text-white bg-black outline-none px-7 placeholder:text-center right-2 rounded-3xl ring-black"
          />
        </div>
        <div className="flex items-center justify-center w-full mt-3">
          <button
            onClick={fetchData}
            className="flex items-center justify-center px-10 py-2 font-bold text-center text-white bg-green-600 rounded-3xl"
          >
            {loading ? (
              <>
                <div className="flex items-center justify-center cursor-not-allowed">
                  <RefreshCw className="animate-spin" />
                </div>
              </>
            ) : (
              <>
                <span className="relative z-10">GO</span>
              </>
            )}
          </button>
        </div>
        {/* error section preview */}
        <div className="flex items-center justify-center mt-4 ">
          <h1 className="max-w-md font-bold text-center text-red-600 font-Raleway">
            {error}
          </h1>
        </div>
      </div>
    </div>
  );
}
