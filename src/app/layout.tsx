import type { Metadata } from "next";
import * as React from "react";

import "./globals.css";

import { Jost } from "next/font/google";
import Providers from "@/providers";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Edimays Couture",
  description: "The No.1 fashion store",
};

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen  w-full max-w-full overflow-x-hidden pb-16 lg:pb-0",
          jost.className,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
