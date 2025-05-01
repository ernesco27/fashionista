import React from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import Image from "next/image";
import { Button } from "../ui/Button";
import { ArrowRight, Eye, HeartIcon, Share2, Star } from "lucide-react";
import CurrencyFormat from "./CurrencyFormat";
import { m } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Tooltip from "@mui/material/Tooltip";

const ProductCardTwo = ({ item }: { item: Product }) => {
  const router = useRouter();

  return (
    <Card className="w-[650px] max-h-[400px] overflow-hidden grid grid-cols-2 mb-6 ">
      <CardHeader className="group/image relative h-[350px] overflow-hidden p-0">
        <Image
          src={item.images[1].link}
          alt={item.images[1].altText ?? item.name}
          width="400"
          height="400"
          className="absolute inset-0 object-cover duration-300 ease-linear group-hover/image:translate-x-full"
        />
        <Image
          src={item.images[0].link}
          alt={item.images[0].altText ?? item.name}
          width="350"
          height="350"
          className="absolute inset-0 object-cover duration-300 ease-linear -translate-x-full group-hover/image:translate-x-0"
        />{" "}
        <m.div
          initial={{
            opacity: 0,
            x: 10,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: 10,
          }}
          transition={{
            duration: 0.3,
            type: "spring",
          }}
          className="hidden absolute top-4 right-4 flex-col gap-4 group-hover/image:flex duration-300 ease-in"
        >
          <div className="flex flex-col gap-2 ">
            <Tooltip title="Quick View" placement="left-start" arrow>
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.push(`/products/${item.id}`)}
                className="hover:bg-black hover:text-white"
              >
                <Eye />
              </Button>
            </Tooltip>
            <Tooltip title="Add To Wishlist" arrow placement="left-start">
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.push(`/products/${item.id}`)}
                className="hover:bg-black hover:text-white"
              >
                <HeartIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Share" arrow placement="left-start">
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.push(`/products/${item.id}`)}
                className="hover:bg-black hover:text-white"
              >
                <Share2 />
              </Button>
            </Tooltip>
          </div>
        </m.div>
      </CardHeader>
      <div className="flex flex-col gap-2 items-start justify-center ">
        <CardContent className="flex flex-col gap-4 text-start py-2">
          <h5 className="capitalize text-lg">
            {item.name.substring(0, 20)}...{" "}
          </h5>

          <div className="inline-flex justify-between items-center">
            {item.salesPrice !== null ? (
              <div className="flex flex-wrap  justify-between w-full">
                <CurrencyFormat
                  value={parseFloat(item.salesPrice.toString())}
                  className="font-bold text-primary-600 text-left w-20 text-xl "
                />
                <CurrencyFormat
                  value={parseFloat(item.price.toString())}
                  className="line-through text-lg   text-slate-600 "
                />
              </div>
            ) : (
              <CurrencyFormat
                value={parseFloat(item.price.toString())}
                className="font-bold text-primary-600 text-left w-20 text-2xl "
              />
            )}
          </div>
          <span
            className="flex gap-2 items-center
          "
          >
            <Star fill="#d97706" className="text-yellow-600" />
            <p>4.5</p>
          </span>
          <p className="text-sm lg:text-lg font-normal">
            {item.description.substring(0, 40)}...
          </p>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button
            variant="outline"
            size="sm"
            className="text-lg"
            onClick={() => router.push(`/products/${item.id}`)}
          >
            Shop Now
            <ArrowRight />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProductCardTwo;
