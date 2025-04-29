"use client";

import Container from "@/components/custom/Container";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import useSWR from "swr";
import { Slides } from "@/types";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import "./style.css";
import { m } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const HomeSlide = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const animation = {
    hide: {
      opacity: 0,
      x: 82,
    },
    show: {
      opacity: 1,
      x: 0,
    },
  };

  const {
    data: slideImages,
    error,
    isLoading,
  } = useSWR<Slides[]>("/api/slides", fetcher);

  if (isLoading)
    return (
      <div className=" w-full overflow-hidden">
        <Skeleton className="w-full h-[700px]" />
      </div>
    );

  return (
    <section className=" w-full overflow-hidden">
      <Container className="w-full max-w-full px-0">
        <Swiper
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          spaceBetween={50}
          slidesPerView={1}
          navigation={true}
          pagination={true}
          modules={[Autoplay, Navigation, Pagination]}
          className="w-full"
        >
          {slideImages
            ?.filter((item: Slides) => item.slug === "banner-home")
            .map((item: Slides) => (
              <SwiperSlide
                key={item.id}
                className="relative [&>button]:block hover:animate-heart-beating w-full"
                style={{
                  backgroundImage: `url(${item.image})`,
                  height: "700px",
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                }}
              >
                {item.title !== "" ? (
                  <div className="absolute drop-shadow-2xl grid grid-cols-1 place-content-start justify-items-center gap-4 capitalize m-auto top-100 lg:top-30 lg:left-20 w-fit text-white lg:justify-items-start  ">
                    <m.h4
                      initial={animation.hide}
                      whileInView={animation.show}
                      transition={{ delay: 0.4 }}
                      className="max-w-60 text-2xl lg:max-w-screen-md drop-shadow"
                    >
                      {item.subTitle}
                    </m.h4>
                    <m.h1
                      initial={animation.hide}
                      whileInView={animation.show}
                      transition={{ delay: 0.6 }}
                      className="text-3xl lg:text-h1"
                    >
                      {item.title.substring(0, 65)}
                    </m.h1>
                    <m.h6
                      initial={animation.hide}
                      whileInView={animation.show}
                      transition={{ delay: 1 }}
                      className="font-normal"
                    >
                      {item.description}
                    </m.h6>
                    <m.a
                      initial={animation.hide}
                      whileInView={animation.show}
                      transition={{ delay: 1.2, type: "spring" }}
                      href={item.link}
                      className="rounded-sm p-4 bg-white text-black hover:bg-black hover:text-white"
                    >
                      {item.btn}
                    </m.a>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Button
                      variant="default"
                      size="lg"
                      className="hover:shadown-button px-12 py-8 bg-white text-black hover:text-white"
                    >
                      <Link href={`/${item.link}`}>BUY NOW</Link>
                    </Button>
                  </div>
                )}
              </SwiperSlide>
            ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default HomeSlide;
