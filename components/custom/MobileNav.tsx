"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CiHeart, CiHome, CiShoppingCart, CiUser } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
import Container from "./Container";
import { m } from "framer-motion";
import Row from "./Row";

const MobileNav = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      icon: CiHome,
      href: "/",
    },
    {
      name: "Categories",
      icon: BiCategory,
      href: "/categories",
    },
    {
      name: "Cart",
      icon: CiShoppingCart,
      href: "/cart",
    },
    {
      name: "Wishlist",
      icon: CiHeart,
      href: "/wishlist",
    },
    {
      name: "Account",
      icon: CiUser,
      href: "/account/dashboard",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-50 w-full overflow-hidden">
      <Container className="w-full max-w-full px-0">
        <div className="flex justify-between items-center h-16 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <m.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-1/4 flex justify-center"
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center w-full h-full",
                    "text-gray-600 hover:text-primary-700 transition-colors",
                    isActive && "text-primary-700",
                  )}
                >
                  <m.div
                    animate={{
                      y: isActive ? -2 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <Icon size={24} />
                  </m.div>
                  <m.span
                    className="text-xs mt-1"
                    animate={{
                      opacity: isActive ? 1 : 0.7,
                    }}
                  >
                    {item.name}
                  </m.span>
                </Link>
              </m.div>
            );
          })}
        </div>
      </Container>
    </nav>
  );
};

export default MobileNav;
