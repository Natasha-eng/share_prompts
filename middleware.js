// import { verifyToken } from "@lib/token";
// import { cookies } from "next/headers";

// import { NextResponse } from "next/server";

// export async function middleware(request, event) {
//   const cookieStore = cookies();
//   const userCookie = cookieStore.get("promptToken");
//   const user = await verifyToken(userCookie?.value);

//   if (!user) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }
// }

import NextAuth from "next-auth";
import { authConfig } from "./app/authconfig";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};

// export const config = {
//   matcher: ["/create-prompt", "/update-prompt", "/profile"],
// };
