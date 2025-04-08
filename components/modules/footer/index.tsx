"use client";

import Container from "@/components/custom/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Loader2Icon, Mail, MapPin, MoveRight, PhoneCall } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import { m } from "framer-motion";

const index = () => {
  const { isSignedIn } = useUser();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (loading) {
      setLoading(false);
      return false;
    }

    const Email = z.object({
      email: z.string().min(5).max(100),
    });

    const validatedField = Email.safeParse({
      email: email,
    });

    if (!validatedField.success) {
      toast.error("validation error. Please try again");
      setLoading(false);
      return;
    }
  };

  return (
    <m.footer
      className="bg-primary-950 py-6"
      initial={{
        opacity: 0,
        y: 100,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-4 text-slate-400">
          <ul className="flex flex-col gap-4 ">
            <li className="mt-10 ">
              <h4 className="text-white">Edimays Couture</h4>
            </li>
            <li className="flex gap-4">
              <PhoneCall /> +233 (0) 24000525
            </li>
            <li className="flex gap-4">
              <Mail /> edimayscouture@testmail.com
            </li>
            <li className="flex gap-4">
              <MapPin /> Z-10, obedeka Street, Tema - Community One
            </li>
          </ul>
          <ul className="flex flex-col gap-4 ">
            <li className="mt-10 ">
              <h6 className="text-white">Information</h6>
            </li>
            <Link
              href={isSignedIn ? "/account/dashboard" : "/sign-in"}
              className="flex gap-4 hover:text-primary-500 duration-300 hover:translate-x-1 capitalize"
            >
              {isSignedIn ? "Dashboard" : "Login"}
            </Link>
            <Link
              href="/cart"
              className="flex gap-4 hover:text-primary-500 duration-300 hover:translate-x-1 capitalize"
            >
              My Cart
            </Link>
            <Link
              href="/checkout"
              className="flex gap-4 hover:text-primary-500 duration-300 hover:translate-x-1 capitalize"
            >
              Checkout
            </Link>
          </ul>
          <ul className="flex flex-col gap-4 ">
            <li className="mt-10 ">
              <h6 className="text-white">Services</h6>
            </li>
            <Link
              href="/about-us"
              className="flex gap-4 hover:text-primary-500 duration-300 hover:translate-x-1 capitalize"
            >
              About Us
            </Link>
            <Link
              href="/careers"
              className="flex gap-4 hover:text-primary-500 duration-300 hover:translate-x-1 capitalize"
            >
              Careers
            </Link>
            <Link
              href="/delivery-information"
              className="flex gap-4 hover:text-primary-500 duration-300 hover:translate-x-1 capitalize"
            >
              Delivery Information
            </Link>
            <Link
              href="/privacy-policy"
              className="flex gap-4 hover:text-primary-500 duration-300 hover:translate-x-1 capitalize"
            >
              Privacy Policy
            </Link>
          </ul>
          <ul className="flex flex-col gap-4 ">
            <li className="mt-10 ">
              <h6 className="text-white">Newsletter Subscription</h6>
            </li>
            <Link href="/" className="flex gap-4">
              <h6>Enter your email to get updates on latest products.</h6>
            </Link>
            <li className="flex gap-4 mt-4">
              <form
                action=""
                className="flex w-full bg-transparent border border-white rounded-xl gap-2 items-center justify-between p-2"
              >
                <Mail size={40} />
                <input
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  max={40}
                  placeholder="Enter your email here!"
                  className="rounded-xl p-4 bg-transparent text-white w-3/4 text-base outline-none"
                />
                <Button
                  variant="outline"
                  onClick={handleSave}
                  disabled={loading}
                  type="submit"
                  size="icon"
                >
                  <MoveRight className={cn("block", loading && "hidden")} />
                  <Loader2Icon
                    className={cn("hidden", loading && "block animate-spin")}
                  />
                </Button>
              </form>
            </li>
          </ul>
        </div>
      </Container>
    </m.footer>
  );
};

export default index;
