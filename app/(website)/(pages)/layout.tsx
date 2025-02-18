import MobileButton from "@/components/modules/header/MobileButton";
import Footer from "@/components/modules/Footer";
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
    </>
  );
}
