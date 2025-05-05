"use client";

import Container from "@/components/custom/Container";
import CustomButton from "@/components/custom/CustomButton";
import PageHeader from "@/components/custom/PageHeader";
import Payments from "@/components/custom/Payments";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import { Badge } from "@/components/ui/badge";
import { Category } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React from "react";
import useSWR from "swr";

const Categories = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const router = useRouter();

  const { data: categories, isLoading } = useSWR<Category[]>(
    "/api/categories",
    fetcher,
  );

  console.log("cat:", categories);

  const WomensCat = categories?.find(
    (cat: Category) => cat.name === "Women's Fashion",
  );

  return (
    <section className="h-full mb-10">
      <PageHeader heading="Categories" link1="Home" link2="Categories" />

      <Container>
        <Payments />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
          {/* womens category */}
          <div className="rounded-lg p-4 w-full bg-slate-100 relative overflow-hidden">
            <Badge
              variant="outline"
              className="absolute top-5 right-4  text-md bg-white"
            >
              200+ Items
            </Badge>
            <div className="absolute -right-10 lg:-right-14 top-14 w-[250px] lg:w-[450px] h-full">
              <Image
                src="/assets/lady.png"
                alt="lady"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="overflow-hidden">
              <div className="flex flex-col gap-8 h-[500px]  ">
                <h2 className="text-3xl lg:text-4xl font-medium">For Women</h2>
                <p className="text-wrap text-gray-500 text-lg lg:text-xl font-normal mr-8 leading-normal">
                  From casual to formal, find the perfect outfit for any
                  occasion.
                </p>
                {categories
                  ?.find((cat: Category) => cat.name === "Women's Fashion")
                  ?.subcategory.map((sub) => (
                    <p
                      key={sub.id}
                      className="text-gray-500 text-lg lg:text-xl font-normal mr-8 leading-normal"
                    >
                      {sub.name}
                    </p>
                  ))}
                <div className="my-4 pl-2">
                  <CustomButton
                    name="Shop Now"
                    primaryColor="white"
                    secondColor="#eab308"
                    outlineColor="#eab308"
                    // size="sm"
                    handleClick={() =>
                      router.push(`/categories/${WomensCat?.id}`)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* other categories */}
          <div className=" rounded-lg  h-[600px] w-full flex flex-col gap-4">
            {/* <div className="bg-red-400 rounded-lg p-4 h-[300px] w-full">

            </div> */}
            <div className="rounded-lg p-4 w-full bg-slate-100 relative overflow-hidden">
              <Badge
                variant="outline"
                className="absolute top-5 right-4  text-md bg-white"
              >
                100+ Items
              </Badge>
              <div className="absolute -right-10 lg:-right-14 top-14 w-[250px] lg:w-[450px] h-full">
                <Image
                  src="/assets/man.png"
                  alt="lady"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="overflow-hidden">
                <div className="flex flex-col gap-8 h-[500px]  ">
                  <h2 className="text-3xl lg:text-4xl font-medium">For Men</h2>
                  <p className="text-wrap text-gray-500 text-lg lg:text-xl font-normal mr-8 leading-normal">
                    From casual to formal, find the perfect outfit for any
                    occasion.
                  </p>
                  {categories
                    ?.find((cat: Category) => cat.name === "Men's Fashion")
                    ?.subcategory.map((sub) => (
                      <p
                        key={sub.id}
                        className="text-gray-500 text-lg lg:text-xl font-normal mr-8 leading-normal"
                      >
                        {sub.name}
                      </p>
                    ))}
                  <div className="my-4 pl-2">
                    <CustomButton
                      name="Shop Now"
                      primaryColor="white"
                      secondColor="#eab308"
                      outlineColor="#eab308"
                      // size="sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-red-400 rounded-lg p-4 h-[300px] w-full"></div>
          </div>
        </div>
      </Container>
      <FeaturedProducts />
    </section>
  );
};

export default Categories;
