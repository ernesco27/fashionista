import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { routeAccessMap } from "./lib/settings";

export default clerkMiddleware(async (auth, req) => {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Get the session
  const session = await auth();
  const userRole = session?.sessionClaims?.metadata?.role || "guest";

  // Find matching route pattern
  const matchingRoute = Object.keys(routeAccessMap).find((route) => {
    if (route.endsWith("*")) {
      const baseRoute = route.slice(0, -1);
      return pathname.startsWith(baseRoute);
    }
    return pathname === route;
  });

  if (matchingRoute) {
    const allowedRoles = routeAccessMap[matchingRoute];

    // If user is not authenticated and trying to access a protected route
    if (!session && !allowedRoles.includes("guest")) {
      const redirectUrl = new URL("/sign-in", req.url);
      return NextResponse.redirect(redirectUrl);
    }

    // If user is authenticated but doesn't have the required role
    if (session && !allowedRoles.includes(userRole)) {
      const redirectUrl = new URL("/", req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
