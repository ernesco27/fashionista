"use client";

import React from "react";
import SidebarMenu from "./SidebarMenu";
import { Category, Page } from "@/types";
import useSWR from "swr";

const SidebarMenuContainer = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: catData } = useSWR<Category[]>("/api/categories", fetcher);
  const { data: pageData } = useSWR<Page[]>("/api/pages", fetcher);

  // Optional: Add loading state
  if (!catData || !pageData) return <div>Loading...</div>;

  return <SidebarMenu catData={catData} pageData={pageData} />;
};

export default SidebarMenuContainer;
