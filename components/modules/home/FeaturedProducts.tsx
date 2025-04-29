"use client";

import React from "react";
import Container from "@/components/custom/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import useSWR from "swr";
import { Product } from "@/types";

import ProductCard from "@/components/custom/ProductCard";
import Row from "@/components/custom/Row";
import Heading from "@/components/custom/Heading";
import { m } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedProducts = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: products,
    error,
    isLoading,
  } = useSWR<Product[]>("/api/products", fetcher);

  if (error) return <div>error fetching featured products</div>;

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
      className="py-10 "
    >
      <Container>
        <Row className="mb-10">
          <Heading name="Featured Products" />
        </Row>
        {isLoading && (
          <div className=" ">
            <Skeleton className="w-full h-[350px]" />
          </div>
        )}
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
          navigation={false}
          pagination={true}
          modules={[Autoplay, Navigation, Pagination]}
          className=" w-full flex items-center justify-center rounded-md  py-10"
        >
          {products
            ?.filter((item: Product) => item.featured === true)
            .map((item: Product, index) => (
              <SwiperSlide
                key={item.id}
                className=" relative [&>button]:block hover:scale-105 duration-300 ease-linear cursor-pointer rounded-md "
              >
                <ProductCard item={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </Container>
    </m.section>
  );
};

export default FeaturedProducts;
