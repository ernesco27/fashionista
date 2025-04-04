import type { Metadata } from "next";
import * as React from "react";

import "./globals.css";
import { kanit } from "@/app/fonts";
import Providers from "@/providers";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Edimays Couture",
  description: "The No.1 fashion store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen overflow-x-hidden", kanit.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
