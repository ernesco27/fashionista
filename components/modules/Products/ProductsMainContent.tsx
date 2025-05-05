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
  products,
  filter,
  setFilter,
  className,
}: {
  minPrice: number;
  maxPrice: number;
  loading: boolean;
  setMinPrice: (v: number) => void;
  setMaxPrice: (v: number) => void;
  setLoading: (v: boolean) => void;
  products: Product[];
  filter: string;
  setFilter: (v: string) => void;
  className?: string;
}) {
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const count = Math.ceil(products?.length / perPage);
  const _DATA = usePagination(products, perPage);

  const handleChange = (e: React.ChangeEvent<unknown>, p: number) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <>
      {loading && <Loading isLoading={loading} />}
      <div className={cn("w-full", className)}>
        <div className="flex flex-col gap-4 ">
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
