import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { Page, Category, SubCategory } from "@/types";
import { AnimatePresence, m } from "framer-motion";
import { ChevronDown } from "lucide-react";

const MainMenu = () => {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: pageData } = useSWR<Page[]>("/api/pages", fetcher);
  const { data: categoryData } = useSWR<Category[]>("/api/categories", fetcher);

  return (
    <section className="hidden lg:flex z-9 relative">
      <ul className="flex justify-between items-center gap-32 ">
        {["Home", "Store", "Contact"].map((name) => {
          const page = pageData?.find((page) => page.name === name);
          return page ? (
            <li key={page.id} className="relative">
              <Link
                className={cn(
                  "text-xl h-full duration-300 after:absolute after:top-[26px] after:left-0 after:w-0 after:h-1 after:bg-primary-700 after:duration-100 after:ease-linear hover:after:w-full ",
                  pathname === `${page.link}` &&
                    "border-b-4 border-primary-400 capitalize",
                )}
                href={`${page.link}`}
              >
                {page.name}
              </Link>
            </li>
          ) : null;
        })}

        {/* Categories */}
        <li className="group">
          <button
            className="capitalize inline-flex items-center text-lg"
            onClick={() => setShow(!show)}
          >
            Categories
            <ChevronDown />
          </button>
          <AnimatePresence>
            {show && (
              <m.div
                onMouseLeave={() => setShow(false)}
                initial={{ opacity: 0, y: -15 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { type: "spring", duration: 0.7 },
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                  filter: "blur(5px)",
                  transition: { ease: "easeIn", duration: 0.22 },
                }}
                className="grid grid-cols-4 justify-items-center grid-rows-auto absolute bg-white p-4 max-h-[560px] max-w-[999px] right-0 top-[54px] gap-12 shadow-xl z-50 "
              >
                {categoryData?.map((cat: Category) => {
                  return (
                    <ul key={cat.id} className="flex flex-col gap-4 text-xl">
                      <li>
                        <Link
                          href={`/categories/${cat.link}/products`}
                          className="font-bold group/item w-full transition-all flex items-center gap-2 duration-100 ease-linear hover:translate-x-1 capitalize"
                        >
                          <h5 className="transition ease-in-out hover:text-primary-500">
                            {cat.name}
                          </h5>
                        </Link>
                      </li>

                      {cat.subcategory?.length > 0 &&
                        cat.subcategory.map(
                          (sub: SubCategory, index: number) => (
                            <li
                              key={index}
                              className="font-normal duration-300 hover:translate-x-1 capitalize"
                            >
                              <Link
                                className="hover:text-primary-500"
                                href={`/categories/${sub.link}/products`}
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ),
                        )}
                    </ul>
                  );
                })}
              </m.div>
            )}
          </AnimatePresence>
        </li>
      </ul>
    </section>
  );
};

export default MainMenu;
