import React from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import Image from "next/image";
import { Button } from "../ui/Button";
import { Eye, HeartIcon, Share2, ShoppingCart } from "lucide-react";
import CurrencyFormat from "./CurrencyFormat";
import { m } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Tooltip from "@mui/material/Tooltip";

const ProductCard = ({ item }: { item: Product }) => {
  const router = useRouter();

  return (
    <Card className="w-[400px] mb-8">
      <CardHeader className="group/image relative h-[350px] overflow-hidden p-0">
        <Image
          src={item.images[1].link}
          alt={item.images[1].altText ?? item.name}
          width="400"
          height="350"
          className="absolute inset-0 object-cover duration-300 ease-linear group-hover/image:translate-x-full"
        />
        <Image
          src={item.images[0].link}
          alt={item.images[0].altText ?? item.name}
          width="400"
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
          <div className="flex flex-col gap-2">
            <Tooltip title="Quick View" placement="left-start" arrow>
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.push(`/products/${item.id}`)}
                className="hover:bg-primary-200 "
              >
                <Eye />
              </Button>
            </Tooltip>
            <Tooltip title="Add To Wishlist" arrow placement="left-start">
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.push(`/products${item.slug}`)}
                className="hover:bg-primary-200 "
              >
                <HeartIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Share" arrow placement="left-start">
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.push(`/products${item.slug}`)}
                className="hover:bg-primary-200"
              >
                <Share2 />
              </Button>
            </Tooltip>
          </div>
        </m.div>
      </CardHeader>
      <CardContent>
        <h5
          className="capitalize cursor-pointer"
          onClick={() => router.push(`/products/${item.id}`)}
        >
          {item.name.substring(0, 20)}...{" "}
        </h5>

        <div className="inline-flex justify-center gap-4 items-center">
          {item.salesPrice !== null ? (
            <div className="flex flex-wrap gap-20">
              <CurrencyFormat
                value={Number(item.salesPrice)}
                className="font-bold text-primary-600 text-left w-20 text-2xl "
              />
              <CurrencyFormat
                value={Number(item.price)}
                className="line-through text-lg   text-slate-600 "
              />
            </div>
          ) : (
            <CurrencyFormat
              value={Number(item.price)}
              className="font-bold text-primary-600 text-left w-20 text-2xl "
            />
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="lg"
          className="w-full text-lg bg-primary-200"
        >
          Add To Cart
          <ShoppingCart />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
