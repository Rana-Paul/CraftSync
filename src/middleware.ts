import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  //   console.log("middleware");
  const token = await getToken({ req: request });
  //   console.log("midd token" + token?.email);
  //   console.log(request.nextUrl.pathname);

  // TODO: Add routes 
  const authURLS = ["/dashboard", "/api/workspace"];

  if (token && request.nextUrl.pathname == "/api/auth/signin") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (authURLS.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/auth/signin", "/dashboard/:path*"],
};

// /api/auth/:path*
