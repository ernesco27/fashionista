import React from "react";
import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import { Trash } from "lucide-react";

import CurrencyFormat from "@/components/custom/CurrencyFormat";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
const CartMin = ({
  cartOpen,
  setCartOpen,
}: {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}) => {
  const handleRemoveItem = () => {
    console.log("remove item");
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <m.div
          onMouseLeave={() => setCartOpen(false)}
          initial={{
            opacity: 1,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { type: "spring", duration: 0.7 },
          }}
          exit={{
            opacity: 0,
            y: -20,
            filter: "blur(5px)",
            // scale: 0,
            transition: { ease: "easeIn", duration: 0.22 },
          }}
          className="absolute top-[60px] right-20 h-fit w-[360px] p-4 shadow-2xl bg-white z-50"
        >
          <div className="flex flex-col justify-between gap-8">
            <span className="text-center">
              You have <strong>0</strong> items in your cart{" "}
            </span>
            <div className="flex flex-col snap-y gap-6 max-h-[360px] border-b border-gray-200 pb-4 overflow-y-auto">
              {/* TODO: lIST items here */}
              <div className="flex justify-between gap-4 snap-center cursor-grab">
                <Image
                  src="/assets/ankara-jumpsuit-1.png"
                  alt="product"
                  width={200}
                  height={200}
                  className="h-20 w-20 object-cover"
                />
                <div className="flex flex-col gap-1">
                  <span className="capitalize">name here</span>
                  <div className="inline-flex gap-4 font-bold">
                    <span className="font-bold">2</span>
                    <span>x</span>
                    <span className="font-bold">GHs 100</span>
                  </div>
                  <div className="inline-flex justify-between">
                    <div className="inline-flex justify-between items-center gap-1 ">
                      <span>Style:</span>
                      <span className="font-bold">style</span>
                    </div>
                    <div className="inline-flex gap-1">
                      <span>Options:</span>
                      <span className="font-bold">Option</span>
                    </div>
                  </div>
                </div>
                <div
                  className="flex item-start"
                  role="button"
                  onClick={() => handleRemoveItem()}
                >
                  <Trash className=" hover:text-primary-500" size={20} />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex justify-between">
                <div className="text-xl font-bold ">Subtotal</div>
                <strong>
                  <CurrencyFormat value={100} className="text-right" />
                </strong>
              </div>
              <div className="flex flex-col gap-4">
                <Link
                  href="/cart"
                  className="rounded-sm py-4 justify-center hover:bg-primary-500 text-center hover:text-white capitalize border border-border text-base"
                >
                  View Cart
                </Link>
                <Button
                  variant="default"
                  size="lg"
                  className="rounded-sm py-8 capitalize text-base"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default CartMin;
