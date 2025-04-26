import Categories from "@/components/modules/home/Categories";
import CtaOne from "@/components/modules/home/CtaOne";
import Deals from "@/components/modules/home/Deals";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import HomeSlide from "@/components/modules/home/HomeSlide";
import Payments from "@/components/custom/Payments";
import { Metadata } from "next";
import * as React from "react";
import CollectionCta from "@/components/modules/home/CollectionCta";

export default function Home() {
  return (
    <>
      <HomeSlide />
      <Payments />
      <Categories />
      <FeaturedProducts />
      <CtaOne />
      <Deals />
      <CollectionCta />
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
