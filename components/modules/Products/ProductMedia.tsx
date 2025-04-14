import { ProductImage } from "@prisma/client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { cn } from "@/lib/utils";
import type { Swiper as SwiperType } from "swiper";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductMedia = ({ media }: { media: ProductImage[] }) => {
  const defaultImage = media.find((img) => img.isPrimary) || media[0];
  const [selectedMedia, setSelectedMedia] = useState(defaultImage);
  const mainSwiperRef = useRef<SwiperType | null>(null);

  if (!media.length) return null;

  const handleThumbnailClick = (img: ProductImage, index: number) => {
    setSelectedMedia(img);
    mainSwiperRef.current?.slideTo(index);
  };

  return (
    <div className="">
      {/* Image Column */}
      <Swiper
        onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
        slidesPerView={1}
        spaceBetween={40}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Navigation, Pagination]}
      >
        <div className="bg-gray-200 h-[700px] rounded-lg flex items-center justify-center">
          {media.length > 1 &&
            media.map((img) => (
              <SwiperSlide
                key={img.id}
                className="flex items-center justify-center"
              >
                <Zoom key={img.link}>
                  <img
                    src={img.link}
                    alt={img.altText || ""}
                    className="w-full h-[700px] object-cover"
                  />
                </Zoom>
              </SwiperSlide>
            ))}
        </div>
      </Swiper>
      <Swiper
        breakpoints={{
          360: {
            slidesPerView: 2,
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
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className=" w-full flex items-center justify-center rounded-md  py-10 mt-4"
      >
        {media.length > 1 && (
          <div className="flex flex-wrap gap-5 justify-center mt-4 ">
            {media.map((img, index) => (
              <SwiperSlide
                key={img.id}
                className=" relative [&>button]:block hover:scale-105 duration-300 ease-linear cursor-pointer rounded-md "
              >
                <div
                  key={img.id}
                  className={cn(
                    "flex justify-center items-center border-2 rounded-lg w-[200px] h-[200px] p-2",
                    selectedMedia.id === img.id
                      ? "border-primary-600"
                      : "border-gray-200",
                  )}
                  onClick={() => handleThumbnailClick(img, index)}
                >
                  <Image
                    src={img.link}
                    alt={img?.altText || ""}
                    width={145}
                    height={145}
                  />
                </div>
              </SwiperSlide>
            ))}
          </div>
        )}
      </Swiper>
    </div>
  );
};

export default ProductMedia;
