import { DataProvider } from "@/context/DataContext";
import "./globals.css";

export const metadata = {
  title: "Necta Results",
  description:
    "In Tanzania, students often face challenges showcasing their NECTA results. This web platform, developed with React and an Express-based web scraper backend, helps students easily display their national exam results to parents. The goal is to simplify the process of sharing academic achievements.",
  keywords:
    "NECTA results,CSEE results, ACCE results, Tanzania exam results, student results platform, national exam display, academic achievements,form 4 national results, form 6 national results, matokeo yakidato cha tano, matokeo yakidato cha sita, student platform Tanzania, NECTA showcase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:image" content="https://yourwebsite.com/image.jpg" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="">
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
