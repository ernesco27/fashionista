import usePagination from "@/hooks/usePagination";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/custom/Loading";
import ProductsTopBar from "@/components/custom/ProductsTopBar";
import ProductsContent from "@/components/custom/ProductsContent";
import Pagination from "@mui/material/Pagination";

function ProductsMainContent({
  minPrice,
  maxPrice,
  loading,
  setMinPrice,
  setMaxPrice,
  setLoading,
  className,
}: {
  minPrice: number;
  maxPrice: number;
  loading: boolean;
  setMinPrice: (v: number) => void;
  setMaxPrice: (v: number) => void;
  setLoading: (v: boolean) => void;
  className?: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [perPage, setPerPage] = useState<number>(10);
  const [filter, setFilter] = useState<string>("latest");
  const [page, setPage] = useState<number>(1);

  const count = Math.ceil(products?.length / perPage);
  const _DATA = usePagination(products, perPage);

  const handleChange = (e: React.ChangeEvent<unknown>, p: number) => {
    setPage(p);
    _DATA.jump(p);
  };

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
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getProducts();
  }, [page, filter, minPrice, maxPrice]);

  return (
    <>
      {loading && <Loading isLoading={loading} />}
      <div className={cn("", className)}>
        <div className="flex flex-col gap-4">
          <ProductsTopBar
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            loading={loading}
            setLoading={setLoading}
            perPage={perPage}
            filter={filter}
            setPerPage={setPerPage}
            setFilter={setFilter}
            maxPage={_DATA.maxPage}
            page={page}
            products={products}
          />
          <ProductsContent products={_DATA.currentData()} />
          <div className="py-10 flex justify-center mt-auto ">
            <Pagination
              count={count}
              page={page}
              color="primary"
              variant="outlined"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsMainContent;
