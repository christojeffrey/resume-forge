import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // print the pathname
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  requestHeaders.set("pathname", request.nextUrl.pathname);
  //   console.log(request.url);
  //   console.log("request.url");

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
