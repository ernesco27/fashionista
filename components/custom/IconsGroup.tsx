import React from "react";
import Row from "./Row";
import { CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";

import SearchBar from "../modules/header/SearchBar";
import CartMin from "../modules/header/CartMin";
import { useRouter } from "next/navigation";

const IconsGroup = ({
  openSearchBar,
  setOpenSearchBar,
  cartOpen,
  setCartOpen,
}: {
  openSearchBar: boolean;
  setOpenSearchBar: (open: boolean) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  userOpen: boolean;
  setUserOpen: (open: boolean) => void;
}) => {
  const router = useRouter();
  return (
    <section>
      <Row className="lg:gap-4">
        <SearchBar
          openSearchBar={openSearchBar}
          setOpenSearchBar={setOpenSearchBar}
        />
        <div
          className="cursor-pointer"
          onClick={() => setOpenSearchBar(!openSearchBar)}
        >
          <CiSearch size={40} className="hover:text-primary-700" />
        </div>
        <div
          className="cursor-pointer hidden lg:block relative "
          onClick={() => setCartOpen(!cartOpen)}
        >
          <CiShoppingCart size={40} className="hover:text-primary-700" />
          <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center">
            0
          </span>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => router.push("/account/dashboard")}
        >
          <CiUser
            size={40}
            className="hover:text-primary-700 hidden lg:block"
          />
        </div>
        <CartMin cartOpen={cartOpen} setCartOpen={setCartOpen} />
      </Row>
    </section>
  );
};

export default IconsGroup;
