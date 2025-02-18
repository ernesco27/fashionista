import { SignOutButton, UserButton } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div>
      dashboard - protected
      <UserButton />
      <SignOutButton />
    </div>
  );
};

export default page;
