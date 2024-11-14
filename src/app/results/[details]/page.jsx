"use client";

import logo from "../../../../public/logo.png";
import arms from "../../../../public/arms.png";
import React, { useContext } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Printer } from "lucide-react";
import DataContext from "@/context/DataContext";

const ResultsDetails = () => {
  const { data, titles } = useContext(DataContext);
  const examnumber = useParams();
  const number = decodeURIComponent(examnumber.details);
  const filtered = data?.filter((dt) => dt?.examnumber === number);
  const student = filtered[0];

  const handlePrint = () => {
    window.print();
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A":
        return "text-green-600";
      case "B":
        return "text-blue-600";
      case "C":
        return "text-yellow-600";
      default:
        return "text-red-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl p-4 mx-auto md:p-8">
        {/* Print Button - Hidden in print */}
        <div className="flex justify-end print:hidden">
          <button
            onClick={handlePrint}
            className="flex flex-row items-center font-roboto font-semibold gap-2 mb-4 px-3 py-1.5 rounded text-white bg-green-600 hover:bg-blue-700"
          >
            <Printer className="w-4 h-4" />
            Print Results
          </button>
        </div>

        {/* Main Content Container */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          {/* Header Section */}
          <div className="flex flex-col items-center justify-between gap-4 pb-6 border-b border-gray-200 md:flex-row">
            <Image
              src={logo}
              alt="necta logo"
              className="w-24 h-24 md:w-32 md:h-32"
              priority
            />
            <div className="text-center">
              <h1 className="text-xl font-bold md:text-2xl">{titles?.necta}</h1>
              <h2 className="mt-2 text-lg font-medium text-gray-600">
                {titles?.year}
              </h2>
              <h2 className="mt-1 text-lg font-medium text-gray-600">
                {titles?.xcul}
              </h2>
            </div>
            <Image
              src={arms}
              alt="court of arms"
              className="hidden w-24 h-28 md:flex md:w-32 md:h-32"
              priority
            />
          </div>

          {/* Student Details Section */}
          <div className="p-6 mt-8 rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500">
                  Registration Number
                </p>
                <p className="mt-1 text-lg font-semibold">
                  {student?.examnumber}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500">Achievement</p>
                <p className="mt-1 text-lg font-semibold">
                  Division {student?.division} ({student?.points} Points)
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500">Gender</p>
                <p className="mt-1 text-lg font-semibold">
                  {student?.sex === "F" ? "Female" : "Male"}
                </p>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="mt-8">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-sm font-semibold text-left text-gray-600 border-b border-gray-200">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-center text-gray-600 border-b border-gray-200">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-center text-gray-600 border-b border-gray-200">
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {student?.subjects.map((subject, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {subject.subject}
                      </td>
                      <td
                        className={`px-6 py-4 text-sm font-bold text-center ${getGradeColor(
                          subject.grade
                        )}`}
                      >
                        {subject.grade}
                      </td>
                      <td
                        className={`px-6 py-4 text-sm text-center ${
                          ["A", "B", "C"].includes(subject.grade)
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {["A", "B", "C"].includes(subject.grade)
                          ? "PASS"
                          : "FAIL"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer - Only visible in print */}
        <div className="hidden mt-8 text-sm text-center text-gray-500 print:block">
          <p>This is an official examination result document</p>
          <p>Printed on: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 20mm;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
          .shadow-md {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResultsDetails;
