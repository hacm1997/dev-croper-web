import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];

export function middleware(request: NextRequest) {
  const raw = request.cookies.get("auth_token")?.value;
  let token: string | undefined;

  if (raw?.startsWith("j:")) {
    try {
      const parsed = JSON.parse(raw.slice(2));
      token = parsed.access_token;
    } catch {
      token = undefined;
    }
  } else {
    token = raw;
  }

  if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
