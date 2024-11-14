// src/app/results/page.js
"use client";

import DataContext from "@/context/DataContext";
import logo from "../../../public/logo.png";
import Image from "next/image";
import { useContext } from "react";
// icons imports
import { IoStatsChart } from "react-icons/io5";
import { useRouter } from "next/navigation";

function ResultsPage() {
  const { data, titles } = useContext(DataContext);
  const pData = data?.filter((md) => md?.examnumber?.length >= 5);
  const router = useRouter();

  if (!data || data?.length === 0) {
    router.push("/");
  }

  return (
    <div className="container flex flex-col min-h-screen px-2 mx-auto mt-5">
      {/* header section */}
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
        <Image src={logo} alt="necta logo" className="size-44" />

        <div className="gap-2 text-center md:text-left">
          <h1 className="text-2xl font-bold md:text-4xl font-roboto">
            {titles?.necta}
          </h1>
          <h1 className="text-xl font-semibold md:text-3xl font-roboto">
            {titles?.xcul}
          </h1>
          <h1 className="text-lg font-semibold md:text-2xl font-roboto">
            {titles?.year}
          </h1>
        </div>
      </div>
      {/* perfomance Summary */}
      <div className="mt-5">
        <PerformanceTable data={data} />
      </div>
      {/* search for candidate */}
      <div></div>
      {/* student Lists Results */}
      <div className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pData?.map((student) => (
          <div
            key={student?.examnumber}
            className="p-4 transition-all duration-200 border border-gray-200 rounded-lg bg-gray-50 hover:border-gray-300"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between py-1 border-b border-gray-100">
                <h3 className="text-sm font-medium text-gray-500">
                  Reg Number
                </h3>
                <span className="text-sm font-semibold">
                  {student?.examnumber}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-gray-100">
                <h3 className="text-sm font-medium text-gray-500">Division</h3>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold">
                    {student?.division}
                  </span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                    {student?.points} pts
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between py-1">
                <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full
                  ${
                    student?.sex?.toLowerCase() === "m"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-pink-50 text-pink-600"
                  }`}
                >
                  {student?.sex}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsPage;

const PerformanceTable = ({ data }) => {
  const filteredData = data?.filter((item) => item.division !== "ABS");

  const groupedData = filteredData?.reduce((acc, item) => {
    // Ensure each item has the expected structure and division
    if (item?.sex && item?.division) {
      // Initialize the sex group if it doesn't exist
      if (!acc[item.sex]) {
        acc[item.sex] = {
          I: { count: 0, totalPoints: 0 },
          II: { count: 0, totalPoints: 0 },
          III: { count: 0, totalPoints: 0 },
          IV: { count: 0, totalPoints: 0 },
          O: { count: 0, totalPoints: 0 },
        };
      }

      // Increment count and add points if available for the division
      const division = item.division;
      const points = item.points ?? 0; // Default points to 0 if null or undefined

      if (acc[item.sex][division]) {
        acc[item.sex][division].count++;
        acc[item.sex][division].totalPoints += points;
      } else {
        // Handle cases where the division might not exist
        acc[item.sex][division] = {
          count: 1,
          totalPoints: points,
        };
      }
    }
    return acc;
  }, {});

  const totals = {
    I: { count: 0 },
    II: { count: 0 },
    III: { count: 0 },
    IV: { count: 0 },
    O: { count: 0 },
  };

  // Check if groupedData exists and is valid before processing
  if (groupedData) {
    Object.values(groupedData).forEach((sexData) => {
      Object.keys(sexData).forEach((division) => {
        if (totals[division]) {
          totals[division].count += sexData[division].count;
        } else {
          // Handle cases where division might not exist in totals
          totals[division] = { count: sexData[division].count };
        }
      });
    });
  }

  const GData = {
    F: groupedData.F,
    M: groupedData.M,
  };

  return (
    <>
      <div className="flex flex-row items-center mb-4 gap-x-2">
        <IoStatsChart className="text-xl" />
        <h1 className="text-xl">Perfomance Summary</h1>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 bg-gray-200 border">SEX</th>
            <th className="p-2 bg-gray-200 border">I</th>
            <th className="p-2 bg-gray-200 border">II</th>
            <th className="p-2 bg-gray-200 border">III</th>
            <th className="p-2 bg-gray-200 border">IV</th>
            <th className="p-2 bg-gray-200 border">O</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(GData).map((sex) => (
            <tr className="" key={sex}>
              <td className="p-2 font-medium text-center border">{sex}</td>
              <td className="p-2 text-center border">{GData[sex].I.count}</td>
              <td className="p-2 text-center border">{GData[sex].II.count}</td>
              <td className="p-2 text-center border">{GData[sex].III.count}</td>
              <td className="p-2 text-center border">{GData[sex].IV.count}</td>
              <td className="p-2 text-center border">{GData[sex].O.count}</td>
            </tr>
          ))}
          <tr>
            <td className="p-2 font-medium text-center border">Total</td>
            <td className="p-2 text-center border">{totals.I.count}</td>
            <td className="p-2 text-center border">{totals.II.count}</td>
            <td className="p-2 text-center border">{totals.III.count}</td>
            <td className="p-2 text-center border">{totals.IV.count}</td>
            <td className="p-2 text-center border">{totals.O.count}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
