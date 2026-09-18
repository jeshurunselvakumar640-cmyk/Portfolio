import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jeshurun Selvakumar — Music × Engineering × AI",
  description:
    "Personal portfolio and digital studio of Jeshurun Selvakumar. Computer Engineering student, active church keyboardist, and software tool builder (Chordician, PhysiX).",
  keywords: [
    "Jeshurun Selvakumar",
    "Chordician",
    "PhysiX",
    "Computer Engineering",
    "SIES GST",
    "Church Keyboardist",
    "Music and Engineering",
    "AI Portfolio",
  ],
  authors: [{ name: "Jeshurun Selvakumar" }],
  openGraph: {
    title: "Jeshurun Selvakumar — Music × Engineering × AI",
    description:
      "A futuristic digital studio exploring the intersection of software engineering, live church musicianship, and intelligent systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeshurun Selvakumar — Music × Engineering × AI",
    description:
      "Interactive digital studio portfolio: Computer Engineering student, church keyboardist, and builder.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#080a0f] text-[#f0f6fc] antialiased selection:bg-[#00f0ff] selection:text-black">
        {children}
      </body>
    </html>
  );
}
