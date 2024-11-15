"use client";

import DataContext from "@/context/DataContext";
import logo from "../../../public/logo.png";
import arms from "../../../public/arms.png";
import Image from "next/image";
import { useContext, useState } from "react";
import { IoStatsChart } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion"; // Import Framer Motion

function ResultsPage() {
  const { data, titles } = useContext(DataContext);
  const pData = data?.filter((md) => md?.examnumber?.length >= 5);
  const [count, setCount] = useState(20);
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState(pData);
  const router = useRouter();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const filtered = pData?.filter((item) =>
      item?.examnumber?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  if (typeof window !== "undefined" && (!data || data?.length === 0)) {
    router.back();
  }

  const handleClick = () => {
    if (typeof window !== "undefined") {
      router.back();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container flex flex-col min-h-screen px-2 mx-auto mt-5"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-5"
      >
        <motion.div className="">
          <Image
            src={logo}
            alt="necta logo"
            className="transition-transform duration-300 size-44 lg:size-52 hover:scale-105"
          />
        </motion.div>

        <div className="flex flex-col items-center gap-3 text-center">
          <motion.h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl lg:text-4xl font-roboto">
            {titles?.necta}
          </motion.h1>
          <motion.h2 className="text-xl font-semibold text-gray-800 md:max-w-2xl md:text-3xl lg:text-3xl font-roboto">
            {titles?.xcul}
          </motion.h2>
          <motion.h3 className="text-lg font-medium text-gray-700 md:text-xl lg:text-2xl font-roboto">
            {titles?.year}
          </motion.h3>
        </div>

        <motion.div className="hidden md:flex group">
          <Image
            src={arms}
            alt="necta logo"
            className="transition-transform duration-300 size-44 lg:size-52 hover:scale-105"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-5"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PerformanceTable data={data} />
      </motion.div>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex flex-col px-2 gap-y-2 md:px-24 sm:px-0">
          <input
            onChange={(e) => handleInputChange(e)}
            type="text"
            className="w-full px-5 py-2 font-medium text-black outline-none placeholder:text-center md:relative md:px-10 ring-green-600 rounded-3xl ring-1 focus:ring-2"
            placeholder="Write your examination number"
          />
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6 mt-10 mb-28 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {filteredData?.slice(0, count)?.map((student) => (
          <motion.div
            key={student?.examnumber}
            className="p-4 transition-all duration-200 border border-gray-200 rounded-lg bg-gray-50 hover:border-green-500"
            whileHover={{ scale: 1.02 }}
          >
            <Link href={`/results/${encodeURIComponent(student?.examnumber)}`}>
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
                  <h3 className="text-sm font-medium text-gray-500">
                    Division
                  </h3>
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
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      student?.sex?.toLowerCase() === "m"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-pink-50 text-pink-600"
                    }`}
                  >
                    {student?.sex}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <button
          onClick={handleClick}
          className="flex flex-row items-center font-roboto font-semibold gap-2 mb-4 px-3 py-1.5 rounded text-white bg-green-600 hover:bg-green-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </motion.div>
    </motion.div>
  );
}

export default ResultsPage;

const PerformanceTable = ({ data }) => {
  const filteredData = data?.filter((item) => item.division !== "ABS");

  const groupedData = filteredData?.reduce((acc, item) => {
    if (item?.sex && item?.division) {
      if (!acc[item.sex]) {
        acc[item.sex] = {
          I: { count: 0, totalPoints: 0 },
          II: { count: 0, totalPoints: 0 },
          III: { count: 0, totalPoints: 0 },
          IV: { count: 0, totalPoints: 0 },
          O: { count: 0, totalPoints: 0 },
        };
      }

      const division = item.division;
      const points = item.points ?? 0;

      if (acc[item.sex][division]) {
        acc[item.sex][division].count++;
        acc[item.sex][division].totalPoints += points;
      } else {
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

  const Dummy = {
    I: { count: 0 },
    II: { count: 0 },
    III: { count: 0 },
    IV: { count: 0 },
    O: { count: 0 },
  };

  const GData = {
    F: groupedData?.F || Dummy,
    M: groupedData?.M || Dummy,
  };

  if (GData) {
    Object.values(GData).forEach((sexData) => {
      Object.keys(sexData).forEach((division) => {
        if (totals[division]) {
          totals[division].count += sexData[division].count;
        } else {
          totals[division] = { count: sexData[division].count };
        }
      });
    });
  }

  return (
    <>
      <motion.div
        className="flex flex-row items-center mb-4 gap-x-2"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <IoStatsChart className="text-xl" />
        <h1 className="text-xl md:text-2xl">Performance Summary</h1>
      </motion.div>

      <table className="w-full border-collapse">
        <thead>
          <motion.tr
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <th className="p-2 bg-gray-200 border">SEX</th>
            <th className="p-2 bg-gray-200 border">I</th>
            <th className="p-2 bg-gray-200 border">II</th>
            <th className="p-2 bg-gray-200 border">III</th>
            <th className="p-2 bg-gray-200 border">IV</th>
            <th className="p-2 bg-gray-200 border">O</th>
          </motion.tr>
        </thead>

        <tbody>
          {Object.keys(GData).map((sex, index) => (
            <motion.tr
              key={sex}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <td className="p-2 font-medium text-center border">{sex}</td>
              <td className="p-2 text-center border">{GData[sex].I.count}</td>
              <td className="p-2 text-center border">{GData[sex].II.count}</td>
              <td className="p-2 text-center border">{GData[sex].III.count}</td>
              <td className="p-2 text-center border">{GData[sex].IV.count}</td>
              <td className="p-2 text-center border">{GData[sex].O.count}</td>
            </motion.tr>
          ))}

          <motion.tr
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <td className="p-2 font-medium text-center border">Total</td>
            <td className="p-2 text-center border">{totals.I.count}</td>
            <td className="p-2 text-center border">{totals.II.count}</td>
            <td className="p-2 text-center border">{totals.III.count}</td>
            <td className="p-2 text-center border">{totals.IV.count}</td>
            <td className="p-2 text-center border">{totals.O.count}</td>
          </motion.tr>
        </tbody>
      </table>
    </>
  );
};
