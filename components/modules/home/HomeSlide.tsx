"use client";

import Container from "@/components/custom/Container";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import useSWR from "swr";
import { Slides } from "@/types";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import "./style.css";

const HomeSlide = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: slideImages,
    error,
    isLoading,
  } = useSWR<Slides[]>("/api/slides", fetcher);

  console.log("slide:", slideImages);
  return (
    <section>
      <Container>
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
        >
          {slideImages
            ?.filter((item: Slides) => item.slug === "banner-home")
            .map((item: Slides) => (
              <SwiperSlide
                key={item.id}
                className="relative [&>button]:block hover:animate-heart-beating"
                style={{
                  backgroundImage: `url(/assets/${item.image})`,
                  height: "700px",
                  width: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                }}
              >
                {item.title !== "" ? (
                  <div className="absolute drop-shadow-2xl grid grid-cols-1 place-content-start justify-items-center gap-4 capitalize m-auto top-100 lg:top-30 lg:left-20 w-fit text-white lg:justify-items-start  ">
                    <h4 className="max-w-60 text-2xl lg:max-w-screen-md drop-shadow">
                      {item.subTitle}
                    </h4>
                    <h1 className="text-3xl lg:text-h1">
                      {item.title.substring(0, 65)}
                    </h1>
                    <h6 className="font-normal">{item.description}</h6>
                    <a
                      href={item.link}
                      className="rounded-sm p-4 bg-white text-black hover:bg-black hover:text-white"
                    >
                      {item.btn}
                    </a>
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
