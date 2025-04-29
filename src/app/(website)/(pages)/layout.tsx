import MobileNav from "@/components/custom/MobileNav";
import Footer from "@/components/modules/footer";
import Header from "@/components/modules/header";
import * as React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      {children}
      <Footer />
      <MobileNav />
    </>
  );
}
