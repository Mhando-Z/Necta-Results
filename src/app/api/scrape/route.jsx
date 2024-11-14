import axios from "axios";
import { load } from "cheerio";

export async function GET(req) {
  const url = new URL(req.url);
  const targetUrl = url.searchParams.get("url");

  if (!targetUrl) {
    return new Response(
      JSON.stringify({ error: "URL query parameter is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const { data } = await axios.get(targetUrl);
    const $ = load(data);

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

    const yearTitle = $("h1").text().trim();
    const nectaTitle = $("h2").text().trim();
    const xculTitle = $("h3").text().trim();
    const title = [];

    const titles = {
      year: yearTitle,
      necta: nectaTitle,
      xcul: xculTitle,
    };
    title.push(titles);

    return new Response(JSON.stringify({ title, results }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
