// Without a defined matcher, this one line applies next-auth
// to the entire project
export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes) - comment out because if you want to test unauth api
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    //"/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
