"use client";

import React from "react";
import { m } from "framer-motion";
import useSWR from "swr";
import { Product, Slides } from "@/types";
import { useRouter } from "next/navigation";
import Container from "@/components/custom/Container";
import Countdown from "react-countdown";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Row from "@/components/custom/Row";
import Heading from "@/components/custom/Heading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import ProductCardTwo from "@/components/custom/ProductCardTwo";

const Deals = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const router = useRouter();

  const {
    data: products,
    error,
    isLoading,
  } = useSWR<Product[]>("/api/products", fetcher);

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <m.section
      initial={{
        opacity: 0,
        y: 100,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className="py-10 w-full"
    >
      <Container>
        <Row className="mb-10">
          <Heading name="Today Deals" />
          <Countdown date={Date.now() + 1000000} className="text-2xl" />
        </Row>
        <h3 className="py-2 font-normal text-lg lg:text-2xl">
          Deals of the Day
        </h3>
        <Swiper
          breakpoints={{
            360: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            575: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          //spaceBetween={50}
          //slidesPerView={5}
          navigation={false}
          pagination={true}
          modules={[Autoplay, Navigation, Pagination]}
          className=" w-full flex items-center justify-center rounded-md  py-10"
        >
          {products
            ?.filter((item: Product) => item.featured === true)
            .map((item: Product) => (
              <SwiperSlide
                key={item.id}
                className=" relative [&>button]:block hover:scale-105 duration-300 ease-linear cursor-pointer rounded-md "
              >
                <ProductCardTwo item={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </Container>
    </m.section>
  );
};

export default Deals;
