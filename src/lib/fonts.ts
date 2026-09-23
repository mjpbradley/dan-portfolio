import { Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";

export const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export const basier = localFont({
  src: "../fonts/BasierSquareMono-Medium.otf",
  weight: "500",
  display: "swap",
  variable: "--font-basier",
});
