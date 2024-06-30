const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

async function getData(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const results = [];

  $("table").each((i, table) => {
    const rows = $(table).find("tr");
    rows.each((j, row) => {
      const columns = $(row).find("td");
      if (columns.length > 2) {
        const result = {
          examnumber: $(columns[0]).text().trim(),
          sex: $(columns[1]).text().trim(),
          points: +$(columns[2]).text().trim(),
          division: $(columns[3]).text().trim(),
          subjects: $(columns[4]).text().trim(),
        };
        results.push(result);
      }
    });
  });

  const polished = results.map((dt) => {
    const { subjects } = dt;
    const subject = subjects.split("  ").map((subjGrade) => {
      const [subject, grade] = subjGrade.split(" - ");
      return {
        subject: subject.trim(),
        grade: grade?.replace(/'/g, "").trim(),
      };
    });
    return {
      ...dt,
      subjects: subject,
    };
  });

  return polished;
}

app.get("/api/results", async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: "URL query parameter is required" });
  }

  try {
    const results = await getData(url);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
