"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CiMenuFries } from "react-icons/ci";
import { cn } from "@/lib/utils";

import useSWR, { Fetcher } from "swr";
import { Category, Page, SubCategory } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SidebarMenu = ({
  catData,
  pageData,
}: {
  catData: Category[];
  pageData: Page[];
}) => {
  const [show, setShow] = useState(false);
  const [subCategory, setSubCategory] = useState<SubCategory[]>([]);

  const router = useRouter();

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <CiMenuFries size={34} />
        </SheetTrigger>
        <SheetContent
          className={cn("px-4 w-full [&>#closeBtn]:text-3xl ", "md:w-[400px]")}
        >
          <div className="mt-10">
            <Tabs defaultValue="category">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="category">Categories</TabsTrigger>
                <TabsTrigger value="page">Pages</TabsTrigger>
              </TabsList>
              <TabsContent value="category">
                <div className="flex flex-col gap-8 h-full">
                  {/* TODO: API call */}
                  {catData.map((item: Category, index) => (
                    <div key={item.id} className="group px-4 py-2">
                      <div className="flex items-center gap-4">
                        <span
                          className="capitalize hover:text-primary-500 cursor-pointer"
                          onClick={() =>
                            router.push(`/categories/${item.link}/products`)
                          }
                        >
                          {item.name}
                        </span>

                        {item.subcategory && item.subcategory.length > 0 && (
                          <ChevronRight
                            className={`text-icon ms-auto h-5 w-5`}
                            onClick={() => {
                              setShow(!show);
                              setSubCategory(item.subcategory);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="page">
                <div className="flex flex-col gap-8 h-full">
                  {/* TODO: API call */}
                  {pageData.map((page: Page) => (
                    <div
                      key={page.id}
                      className="group inline-flex items-center px-4 py-2 gap-4 w-full hover:text-primary-700 capitalize"
                    >
                      <div className="flex items-center gap-4 w-full">
                        <span
                          onClick={() => router.push(`/pages/${page.link}`)}
                          className=""
                        >
                          {page.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>
      <Sheet open={show}>
        <SheetTrigger></SheetTrigger>
        <SheetContent
          className="px-4 w-full [&>#closeBtn]:hidden md:w-[400px]"
          side="left"
        >
          <div className="duration-300 ease-in p-8 absolute top-0 h-screen left-0 bg-white w-[260px">
            <Button
              onClick={() => setShow(!show)}
              variant="default"
              title="back"
              className="hover:bg-black hover:text-white"
            >
              <ChevronLeft />
            </Button>
            <div className="flex flex-col gap-8 justify-center mt-12">
              {subCategory.map((item: SubCategory, index: number) => (
                <Link
                  className="Capitalize hover:text-primary-800"
                  href={`/categories/${item.link}/products`}
                  key={index}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SidebarMenu;
