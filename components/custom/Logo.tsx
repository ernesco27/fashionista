import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/assets/logo.jpg"
        alt="logo"
        width={60}
        height={60}
        priority
      />
    </Link>
  );
};

export default Logo;
