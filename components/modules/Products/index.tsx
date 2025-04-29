"use client";

import Container from "@/components/custom/Container";
import Row from "@/components/custom/Row";
import React, { useState } from "react";
import ProductsSidebarLeft from "./ProductsSidebarLeft";
import ProductsMainContent from "./ProductsMainContent";

const index = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [loading, setLoading] = useState(false);

  return (
    <section className="my-10">
      <Container>
        <Row className="gap-12 items-start ">
          {/* sidebar */}
          <ProductsSidebarLeft
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            loading={loading}
            setLoading={setLoading}
            className="hidden lg:flex"
          />

          {/* main content */}
          <ProductsMainContent
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            loading={loading}
            setLoading={setLoading}
            className="flex-1"
          />
        </Row>
      </Container>
    </section>
  );
};

export default index;
