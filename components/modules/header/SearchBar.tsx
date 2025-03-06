"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import useSWR from "swr";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Product } from "@/types";
import Loading from "@/components/custom/Loading";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SearchBar = ({
  openSearchBar,
  setOpenSearchBar,
}: {
  openSearchBar: boolean;
  setOpenSearchBar: (open: boolean) => void;
}) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  //get all products
  const { data, error, isLoading, isValidating } = useSWR<Product[]>(
    "/api/products?search=" + search,
    fetcher,
  );
  console.log("data:", data);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <>
      {(isValidating || isLoading) && <Loading isLoading={true} />}
      <Dialog open={openSearchBar} onOpenChange={setOpenSearchBar}>
        <DialogContent className="lg:max-w-screen-xl z-[99999] [&>.closeBtn]:hidden ">
          <div className="flex item-center  w-full gap-4">
            <SearchIcon className="w-8 h-8 text-slate-300" />
            <Input
              placeholder="search for any product"
              className=" text-slate-500 text-lg font-medium lg:text-2xl "
              onInput={handleSearch}
            />
            <Button
              className="px-4 hover:bg-primary-500 group "
              variant="outline"
              size="icon"
              onClick={() => setOpenSearchBar(!openSearchBar)}
            >
              <X className="group-hover:text-white" />
            </Button>
          </div>
          <div className="flex overflow-y-auto w-full py-12 gap-12 flex-col justify-start h-[600px] px-8">
            {data?.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col justify-start gap-8 px-8 items-center cursor-pointer lg:h-fit lg:flex-row lg:justify-between hover:border-gray-50 hover:scale-105 transition-all hover:shadow-lg py-4"
                role="button"
                onClick={() =>
                  router.push(`/categories/${product.slug}/products`)
                }
              >
                <Image
                  src={`/assets/${product.images?.[0].link}`}
                  alt={product.name}
                  width={80}
                  height={60}
                  className="object-contain"
                />
                {/* <h6>{Number(product.price).toFixed(2)}</h6> */}
                <span className="text-center">
                  {product.name.substring(0, 100)}
                </span>
                <div className="w-40 text-center font-bold text-xl text-primary-900 lg:text-center">
                  {Number(product.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchBar;
