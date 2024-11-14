"use client";

import Image from "next/image";
import React, { useContext } from "react";
import { useParams } from "next/navigation";
import DataContext from "@/context/DataContext";
import logo from "../../../../public/logo.png";
import arms from "../../../../public/arms.png";

function ResultsDetails() {
  const { data, titles } = useContext(DataContext);
  const examnumber = useParams();
  const number = decodeURIComponent(examnumber.details);

  const filtered = data?.filter((dt) => dt?.examnumber === number);

  console.log(filtered);
  return (
    <div className="container flex flex-col w-full min-h-screen p-2 mx-auto md:p-20 bg-slate-100 rounded-xl">
      {/* Heading Section */}
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        {/* Necta Logo */}
        <div className="flex flex-row items-center justify-center mt-5 md:hidden gap-x-2">
          <Image src={logo} alt="necta logo" className="lg:size-40 size-20" />
          <Image src={arms} alt="necta logo" className="lg:size-40 size-20" />
        </div>
        <div className="hidden md:block">
          <Image
            src={logo}
            alt="necta logo"
            className="lg:size-40 xl:size-44 size-24"
          />
        </div>
        {/* Headings and Titles */}
        <div className="flex flex-col items-center justify-center mt-4 text-lg md:mt-0 xl:text-3xl xl:gap-y-3 md:text-2xl gap-y-1">
          <h1 className="font-bold text-center">{titles?.necta}</h1>
          <h1 className="font-medium text-center">{titles?.year}</h1>
          <h1 className="font-medium text-center">{titles?.xcul}</h1>
        </div>
        {/* court of Arms logo */}
        <div className="hidden md:block">
          <Image
            src={arms}
            alt="necta logo"
            className="lg:size-40 xl:size-44 size-24"
          />
        </div>
      </div>
      {/* Student Details */}
      <div className="flex flex-col items-center justify-center mt-5 md:mt-16">
        <table className="sm:w-[400px] bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-300 bg-gray-50"></th>
              <th className="px-4 py-2 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-300 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td className="px-4 py-4 align-middle border-b border-gray-200">
                REG NUMBER
              </td>
              <td className="px-4 py-4 align-top border-b border-gray-200">
                {filtered[0]?.examnumber}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-4 align-middle border-b border-gray-200">
                ACHIVEMENT
              </td>
              <td className="px-4 py-4 align-top border-b border-gray-200">
                DIV {filtered[0]?.division} Point {filtered[0]?.points}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-4 align-middle border-b border-gray-200">
                SEX
              </td>
              <td className="px-4 py-4 align-top border-b border-gray-200">
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
              <th className="px-4 py-2 text-lg font-bold leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-300 xl:text-xl bg-gray-50">
                SUBJECT
              </th>
              <th className="px-4 py-2 text-lg font-bold leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-300 xl:text-xl bg-gray-50">
                GRADE
              </th>
              <th className="px-4 py-2 text-lg font-bold leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-300 xl:text-xl bg-gray-50">
                REMARKS
              </th>
            </tr>
          </thead>
          {filtered[0]?.subjects.map((dt, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td className="px-4 py-4 align-middle border-b border-gray-200">
                    {dt.subject}
                  </td>
                  <td className="px-4 py-4 text-center align-top border-b border-gray-200">
                    {dt.grade}
                  </td>
                  <td className="px-4 py-4 text-center align-bottom border-b border-gray-200">
                    {dt.grade === "A" || dt.grade === "B" || dt.grade === "C"
                      ? "PASS"
                      : "FAIL"}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default ResultsDetails;
