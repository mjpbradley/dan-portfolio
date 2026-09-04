import { Gloock } from "next/font/google";
import localFont from "next/font/local";

export const gloock = Gloock({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-gloock",
});

export const basier = localFont({
  src: "../fonts/BasierSquareMono-Medium.otf",
  weight: "500",
  display: "swap",
  variable: "--font-basier",
});
