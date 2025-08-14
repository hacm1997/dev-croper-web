import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dash"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  console.log("token access => ", token);
  if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
