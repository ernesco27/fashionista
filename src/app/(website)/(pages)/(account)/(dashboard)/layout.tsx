import { SignOutButton } from "@clerk/nextjs";

import { UserButton } from "@clerk/nextjs";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      <UserButton />
      <SignOutButton />
      {children}
    </div>
  );
}
