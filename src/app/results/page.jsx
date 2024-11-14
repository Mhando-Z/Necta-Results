// src/app/results/page.js
"use client";

import DataContext from "@/context/DataContext";
import logo from "../../../public/logo.png";
import Image from "next/image";
import { useContext } from "react";
// icons imports
import { IoStatsChart } from "react-icons/io5";

function ResultsPage() {
  const { data } = useContext(DataContext);

  //   if (!data || data?.length === 0) {
  //     return (
  //       <div className="container flex flex-col items-center justify-center min-h-screen mx-auto">
  //         <h1 className="text-sm font-bold font-Raleway">No data...</h1>
  //       </div>
  //     );
  //   }

  return (
    <div className="container flex flex-col min-h-screen mx-auto mt-5">
      {/* header section */}
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
        <Image src={logo} alt="necta logo" className="size-44" />

        <div className="gap-2 text-center md:text-left">
          <h1 className="text-2xl font-bold md:text-4xl font-roboto">
            NATIONAL EXAMINATIONS COUNCIL OF TANZANIA
          </h1>
          <h1 className="text-xl font-semibold md:text-3xl font-roboto">
            P0110 ILBORU SECONDARY SCHOOL CENTRE
          </h1>
          <h1 className="text-lg font-semibold md:text-2xl font-roboto">
            ACSEE 2024 EXAMINATION RESULTS
          </h1>
        </div>
      </div>
      {/* perfomance Summary */}
      <div className="mt-5">
        <PerformanceTable data={data} />
      </div>
      {/* student Lists Results */}
      <div></div>
    </div>
  );
}

export default ResultsPage;

const PerformanceTable = ({ data }) => {
  const groupedData = data?.reduce((acc, item) => {
    if (!acc[item.sex]) {
      acc[item.sex] = {
        I: { count: 0, totalPoints: 0 },
        II: { count: 0, totalPoints: 0 },
        III: { count: 0, totalPoints: 0 },
        IV: { count: 0, totalPoints: 0 },
        O: { count: 0, totalPoints: 0 },
      };
    }
    acc[item.sex][item.division].count++;
    acc[item.sex][item.division].totalPoints += item.points || 0;
    return acc;
  }, {});

  const totals = {
    I: { count: 0, totalPoints: 0 },
    II: { count: 0, totalPoints: 0 },
    III: { count: 0, totalPoints: 0 },
    IV: { count: 0, totalPoints: 0 },
    O: { count: 0, totalPoints: 0 },
  };

  Object.values(groupedData).forEach((sexData) => {
    Object.keys(sexData).forEach((division) => {
      totals[division].count += sexData[division].count;
      totals[division].totalPoints += sexData[division].totalPoints;
    });
  });

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
          {Object.keys(groupedData).map((sex) => (
            <tr className="" key={sex}>
              <td className="p-2 font-medium border">{sex}</td>
              <td className="p-2 text-center border">
                {groupedData[sex].I.count} ({groupedData[sex].I.totalPoints})
              </td>
              <td className="p-2 text-center border">
                {groupedData[sex].II.count} ({groupedData[sex].II.totalPoints})
              </td>
              <td className="p-2 text-center border">
                {groupedData[sex].III.count} ({groupedData[sex].III.totalPoints}
                )
              </td>
              <td className="p-2 text-center border">
                {groupedData[sex].IV.count} ({groupedData[sex].IV.totalPoints})
              </td>
              <td className="p-2 text-center border">
                {groupedData[sex].O.count} ({groupedData[sex].O.totalPoints})
              </td>
            </tr>
          ))}
          <tr>
            <td className="p-2 font-medium text-center border">Total</td>
            <td className="p-2 text-center border">
              {totals.I.count} ({totals.I.totalPoints})
            </td>
            <td className="p-2 text-center border">
              {totals.II.count} ({totals.II.totalPoints})
            </td>
            <td className="p-2 text-center border">
              {totals.III.count} ({totals.III.totalPoints})
            </td>
            <td className="p-2 text-center border">
              {totals.IV.count} ({totals.IV.totalPoints})
            </td>
            <td className="p-2 text-center border">
              {totals.O.count} ({totals.O.totalPoints})
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
