"use client";

import React from "react";
import { m } from "framer-motion";
import useSWR from "swr";
import { Slides } from "@/types";
import { useRouter } from "next/navigation";

const CtaOne = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const router = useRouter();

  const { data: slideImages } = useSWR<Slides[]>("/api/slides", fetcher);

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <m.section
      initial={{
        x: -100,
        opacity: 0,
      }}
      whileInView={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.4,
        type: "tween",
        delay: 0.2,
      }}
      className="my-4 hover:cursor-pointer"
    >
      <div
        className={`w-full h-[130px] lg:h-[250px] lg:bg-contain lg:bg-repeat    bg-[url(/assets/${
          slideImages?.filter((item: Slides) => item.slug === "cta-home")[0]
            .image
        })] bg-cover bg-no-repeat bg-top`}
        style={{
          backgroundImage: `url(${
            slideImages?.filter((item: Slides) => item.slug === "cta-home")[0]
              .image
          })`,
        }}
        onClick={() => handleClick("link")}
      ></div>
    </m.section>
  );
};

export default CtaOne;
