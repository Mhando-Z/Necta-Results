import { createContext, useEffect, useState } from "react";
import cheerio from "cheerio";
import axios from "axios";

const ResultsContext = createContext();

export function ResultsProvider({ children }) {
  // const [Results, setResults] = useState([]);
  // const [Titles, setTitles] = useState([]);
  // const [Url, setUrl] = useState("");

  // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  // const targetUrl =
  //   "https://matokeo.necta.go.tz/results/2023/csee/CSEE2023/results/s4459.htm";
  // const url = proxyUrl + targetUrl;

  // function getResults() {
  //   try {
  //     //   const url =
  //     //     "https://matokeo.necta.go.tz/results/2023/csee/CSEE2023/results/s4459.htm";

  //     // Step 2: Request the data with an HTTP Client
  //     async function getData() {
  //       const { data } = await axios.get(url, {
  //         headers: {
  //           "User-Agent":
  //             "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  //         },
  //       });
  //       const $ = cheerio.load(data);

  //       const results = [];

  //       // Step 3: Parse the raw HTML data
  //       $("table").each((i, table) => {
  //         const rows = $(table).find("tr");
  //         rows.each((j, row) => {
  //           const columns = $(row).find("td");
  //           if (columns.length > 2) {
  //             const result = {
  //               examnumber: $(columns[0]).text().trim(),
  //               sex: $(columns[1]).text().trim(),
  //               points: +$(columns[2]).text().trim(),
  //               division: $(columns[3]).text().trim(),
  //               subjects: $(columns[4]).text().trim(),
  //             };
  //             results.push(result);
  //           }
  //         });
  //       });

  //       // Step 4: Collect only the data you need
  //       const polished = results.map((dt) => {
  //         const { subjects } = dt;
  //         const subject = subjects.split("  ").map((subjGrade) => {
  //           const [subject, grade] = subjGrade.split(" - ");
  //           return {
  //             subject: subject.trim(),
  //             grade: grade?.replace(/'/g, "").trim(),
  //           };
  //         });
  //         return {
  //           ...dt,
  //           subjects: subject,
  //         };
  //       });

  //       // Step 4: Collect only the data you need
  //       const yearTitle = $("h1").text();
  //       const nectaTitle = $("h2").text();
  //       const xculTitle = $("h3").text();

  //       // Step 5: Printing data to console
  //       console.log(`${nectaTitle}\n${yearTitle}\n${xculTitle}`);

  //       polished.map((dt) => {
  //         const { subjects } = dt;
  //         if (subjects.length !== 1) {
  //           console.log(dt);
  //         }
  //       });
  //     }
  //     getData();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // useEffect(() => {
  //   getResults();
  // }, []);

  return (
    <ResultsContext.Provider value={{}}>{children}</ResultsContext.Provider>
  );
}

export default ResultsContext;

// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import cheerio from "cheerio";

// const ResultsContext = createContext();

// export function ResultsProvider({ children }) {
//   const [Results, setResults] = useState([]);
//   const [Titles, setTitles] = useState({
//     yearTitle: "",
//     nectaTitle: "",
//     xculTitle: "",
//   });
//   const [Url, setUrl] = useState("");

//   console.log(Url);
//   console.log(Results);

//   const defaultUrl =
//     "https://matokeo.necta.go.tz/results/2023/csee/CSEE2023/results/s4459.htm";

//   // Step 2: Request the data with an HTTP Client
//   async function getData(url) {
//     const { data } = await axios.get(url);
//     const $ = cheerio.load(data);

//     const results = [];
//     // Step 3: Parse the raw HTML data
//     $("table").each((i, table) => {
//       const rows = $(table).find("tr");
//       rows.each((j, row) => {
//         const columns = $(row).find("td");
//         if (columns.length > 2) {
//           const result = {
//             examnumber: $(columns[0]).text().trim(),
//             sex: $(columns[1]).text().trim(),
//             points: +$(columns[2]).text().trim(),
//             division: $(columns[3]).text().trim(),
//             subjects: $(columns[4]).text().trim(),
//           };
//           results.push(result);
//         }
//       });
//     });

//     // Step 4: Collect only the data you need
//     const polished = results.map((dt) => {
//       const { subjects } = dt;
//       const subject = subjects.split("  ").map((subjGrade) => {
//         const [subject, grade] = subjGrade.split(" - ");
//         return {
//           subject: subject.trim(),
//           grade: grade?.replace(/'/g, "").trim(),
//         };
//       });
//       return {
//         ...dt,
//         subjects: subject,
//       };
//     });

//     // Step 4: Collect only the data you need
//     const yearTitle = $("h1").text();
//     const nectaTitle = $("h2").text();
//     const xculTitle = $("h3").text();

//     // Step 5: Printing data to console
//     setTitles({ yearTitle, nectaTitle, xculTitle });
//     setResults(polished);
//   }

//   useEffect(() => {
//     getData(defaultUrl);
//   }, [defaultUrl]);

//   return (
//     <ResultsContext.Provider value={{ Results, Titles, setUrl }}>
//       {children}
//     </ResultsContext.Provider>
//   );
// }

// export default ResultsContext;
