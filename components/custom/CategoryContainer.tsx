"use client";

import { Product } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PageHeader from "./PageHeader";
import Products from "@/components/modules/Products";

const CategoryContainer = ({ categoryId }: { categoryId: string }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState<string>("latest");

  //API CALL

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      await axios
        .get("/api/products", {
          params: {
            filter: filter,
            minPrice: minPrice,
            maxPrice: maxPrice,
          },
        })
        .then((response) => {
          const filteredProducts = response.data?.filter(
            (prod: Product) => prod.category.id === Number(categoryId),
          );

          setProducts(filteredProducts);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getProducts();
  }, [minPrice, maxPrice]);

  return (
    <>
      <section className="my-10">
        <PageHeader heading="Women's Category" link1="Categories" />
      </section>
      <Products
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        loading={loading}
        setLoading={setLoading}
        filter={filter}
        setFilter={setFilter}
        products={products}
      />
    </>
  );
};

export default CategoryContainer;
