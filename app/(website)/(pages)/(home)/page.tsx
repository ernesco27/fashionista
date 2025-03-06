import Categories from "@/components/modules/home/Categories";
import CtaOne from "@/components/modules/home/CtaOne";
import CtaTwo from "@/components/modules/home/CtaTwo";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import HomeSlide from "@/components/modules/home/HomeSlide";
import Payments from "@/components/custom/Payments";
import { Metadata } from "next";
import * as React from "react";

export default function Home() {
  return (
    <>
      <HomeSlide />
      <Payments />
      <Categories />
      <FeaturedProducts />
      <CtaOne />
      <CtaTwo />
    </>
  );
}

export const metadata: Metadata = {
  title: "Edimays Couture - Home",
  description: "Your Go To Online Fahion Store",
  icons: {
    icon: "/assets/logo.png",
  },
};
