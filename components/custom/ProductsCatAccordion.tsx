import { Category, SubCategory } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@mui/material";
import Link from "next/link";

const ProductsCatAccordion = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  //API CALL

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      await axios
        .get("/api/categories")
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getCategories();
  }, []);

  return (
    <>
      {loading ? (
        <Skeleton className=" w-full" height={600} />
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {categories?.slice(0, 20).map((item: Category) => (
            <AccordionItem key={item.id} value={`${item.id}`}>
              <AccordionTrigger className="!py-0">
                <Link
                  href={`/categories/${item.link}/products`}
                  className="text-xl text-left"
                >
                  <span className="text-xl ">{item.name}</span>
                </Link>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4 ms-10">
                  {item.subcategory.map((itemSub: SubCategory) => (
                    <Link
                      key={itemSub.id}
                      href={`/categories/${itemSub.link}/products`}
                      className="text-xl min-w-40 hover:text-primary-900"
                    >
                      {itemSub.name}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
};

export default ProductsCatAccordion;
