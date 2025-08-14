import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];

export function middleware(request: NextRequest) {
  const rawCookie = request.cookies.get("auth_token")?.value;

  let token: string | undefined;
  if (rawCookie) {
    try {
      const parsed = JSON.parse(
        rawCookie.startsWith("j:") ? rawCookie.slice(2) : rawCookie
      );
      token = parsed.access_token;
    } catch {
      token = undefined;
    }
  }

  console.log("token access =>", token);

  if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
