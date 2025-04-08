"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface PageHeaderProps {
  heading: string;
  link1?: string;
  link2?: string;
  link3?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  heading,
  link1,
  link2,
  link3,
}) => {
  return (
    <div
      className="flex flex-col gap-2 lg:gap-10 justify-center items-center w-full h-[100px] lg:h-[250px] bg-[url('/assets/page-header.jpg')] bg-cover lg:bg-auto mb-4"
      role="banner"
      aria-label="Page header"
    >
      <h1 className="text-3xl lg:text-4xl capitalize font-normal">{heading}</h1>

      <Breadcrumb aria-label="Breadcrumb navigation">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link
              href="/"
              className="text-lg text-black lg:text-2xl hover:text-primary-600 hover:font-bold"
            >
              Home
            </Link>
          </BreadcrumbItem>
          {link1 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link
                  href={`/${link1}`}
                  className="text-lg text-black lg:text-2xl hover:text-primary-600 hover:font-bold"
                >
                  {link1.charAt(0).toUpperCase() + link1.slice(1)}
                </Link>
              </BreadcrumbItem>
            </>
          )}
          {link2 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link
                  href={`/${link1}/${link2}`}
                  className="text-lg capitalize text-black lg:text-2xl hover:text-primary-600 hover:font-bold"
                >
                  {link2}
                </Link>
              </BreadcrumbItem>
            </>
          )}
          {link3 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link
                  href={`/${link1}/${link2}/${link3}`}
                  className="text-lg capitalize text-black lg:text-2xl hover:text-primary-600 hover:font-bold"
                >
                  {link3}
                </Link>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default PageHeader;
