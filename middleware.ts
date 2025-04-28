import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Optional: Add basic auth or other security measures for the admin route
  // This is a very simple example - you might want to implement more robust protection

  if (request.nextUrl.pathname.startsWith("/adminmandeploy")) {
    // You could add basic auth here
    // const basicAuth = request.headers.get('authorization')

    // For now, we'll just let it through since the URL is "hidden"
    return NextResponse.next()
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/adminmandeploy/:path*",
}
