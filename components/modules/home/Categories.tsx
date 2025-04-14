"use client";

import React from "react";
import Container from "@/components/custom/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import useSWR from "swr";
import { Slides } from "@/types";
import { m } from "framer-motion";
import { useRouter } from "next/navigation";
import Row from "@/components/custom/Row";
import Heading from "@/components/custom/Heading";

const Categories = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: slideImages } = useSWR<Slides[]>("/api/slides", fetcher);

  const animation = {
    hide: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1 },
  };

  const router = useRouter();

  const handleClick = (link: string) => {
    router.push(`/${link}`);
  };

  return (
    <section className="py-10 w-full">
      <Container>
        <Row className="mb-10">
          <Heading name="shop by category" />
        </Row>
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
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          //spaceBetween={50}
          //slidesPerView={5}
          navigation={false}
          pagination={true}
          modules={[Autoplay, Navigation, Pagination]}
          className="shadow-xl w-full flex items-center justify-center border border-gray-200 rounded-md px-20 py-10 "
        >
          {slideImages
            ?.filter((item: Slides) => item.slug === "top-categories-home")
            .map((item: Slides, index) => (
              <SwiperSlide
                key={item.id}
                className="relative [&>button]:block hover:scale-105 duration-300 ease-linear cursor-pointer rounded-md "
                style={{
                  backgroundImage: `url(${item.image})`,
                  height: "600px",
                  width: "auto",
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                }}
              >
                <div
                  className="absolute bg-white rounded-lg p-4 bottom-10 shadow-xl cursor-pointer hover:bg-black hover:text-white drop-shadow-xl duration-200 ease-linear capitalize"
                  onClick={() => handleClick(item.link)}
                >
                  <m.h6
                    initial={animation.hide}
                    whileInView={animation.show}
                    transition={{
                      delay: 0.1 + index / 6,
                    }}
                  >
                    {item.title}
                  </m.h6>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default Categories;
