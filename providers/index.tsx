"use client";

import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import FramerMotionProvider from "./FramerMotionProvider";
import { ToastContainer } from "react-toastify";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ClerkProvider
        appearance={{
          layout: {
            socialButtonsPlacement: "bottom",
            socialButtonsVariant: "blockButton",
            logoImageUrl: "/assets/logo.png",
          },
        }}
        afterSignOutUrl="/sign-in"
        afterSignInUrl="/account/dashboard"
        signInUrl={`${process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}`}
        signUpUrl={`${process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}`}
        signInFallbackRedirectUrl="/"
        signUpFallbackRedirectUrl="/"
      >
        <ToastContainer position="top-right" theme="dark" />
        <FramerMotionProvider>{children}</FramerMotionProvider>
      </ClerkProvider>
    </div>
  );
};

export default Providers;
