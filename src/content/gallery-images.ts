import type { StaticImageData } from "next/image";
import page01 from "./gallery/1.png";
import page02 from "./gallery/2.png";
import page03 from "./gallery/3.png";
import page04 from "./gallery/4.png";
import page05 from "./gallery/5.png";
import page06 from "./gallery/6.png";
import page07 from "./gallery/7.png";
import page08 from "./gallery/8.png";
import page09 from "./gallery/9.png";
import page10 from "./gallery/10.png";
import page11 from "./gallery/11.png";
import page12 from "./gallery/12.png";
import page13 from "./gallery/13.png";
import page14 from "./gallery/14.png";
import page15 from "./gallery/15.png";
import page16 from "./gallery/16.png";
import page17 from "./gallery/17.png";
import page18 from "./gallery/18.png";
import page19 from "./gallery/19.png";
import page20 from "./gallery/20.png";
import page21 from "./gallery/21.png";
import page22 from "./gallery/22.png";
import page23 from "./gallery/23.png";
import page24 from "./gallery/24.png";
import page25 from "./gallery/25.png";
import page26 from "./gallery/26.png";
import page27 from "./gallery/27.png";
import page28 from "./gallery/28.png";
import page29 from "./gallery/29.png";
import page30 from "./gallery/30.png";
import page31 from "./gallery/31.png";
import page32 from "./gallery/32.png";
import page33 from "./gallery/33.png";
import page34 from "./gallery/34.png";
import page35 from "./gallery/35.png";
import page36 from "./gallery/36.png";
import page37 from "./gallery/37.png";
import page38 from "./gallery/38.png";

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
  alt: string;
};

const frames: StaticImageData[] = [
  page01,
  page02,
  page03,
  page04,
  page05,
  page06,
  page07,
  page08,
  page09,
  page10,
  page11,
  page12,
  page13,
  page14,
  page15,
  page16,
  page17,
  page18,
  page19,
  page20,
  page21,
  page22,
  page23,
  page24,
  page25,
  page26,
  page27,
  page28,
  page29,
  page30,
  page31,
  page32,
  page33,
  page34,
  page35,
  page36,
  page37,
  page38,
];

export const galleryImages: GalleryImage[] = frames.map((image, index) => ({
  src: image.src,
  width: image.width,
  height: image.height,
  blurDataURL: image.blurDataURL,
  alt: `Portfolio page ${index + 1}`,
}));
