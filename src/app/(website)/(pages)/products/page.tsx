import Container from "@/components/custom/Container";
import Row from "@/components/custom/Row";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Metadata } from "next";
import Products from "@/components/modules/Products";
import PageHeader from "@/components/custom/PageHeader";
import ProductsContainer from "@/components/custom/ProductsContainer";
const page = () => {
  return (
    <>
      <section className="my-10">
        <PageHeader heading="Store" link1="store" />
        <Container>
          <Row>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Link
                    href="/"
                    className="text-xl hover:text-primary-500 hover:font-bold"
                  >
                    Home
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Link
                    href="/products"
                    className="text-xl hover:text-primary-500 hover:font-bold"
                  >
                    Store
                  </Link>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </Row>
        </Container>
      </section>

      <ProductsContainer />
    </>
  );
};

export default page;

export const metadata: Metadata = {
  title: "Edimays Couture - Products page",
  description: "Your Go To Online Fahion Store",
  icons: {
    icon: "/assets/logo.png",
  },
};
