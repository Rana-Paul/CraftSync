import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  //   console.log("middleware");
  const token = await getToken({ req: request });
  //   console.log("midd token" + token?.email);
  //   console.log(request.nextUrl.pathname);

  if (request.nextUrl.pathname == "/api/auth/signin" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/auth/signin"],
};

// /api/auth/:path*
