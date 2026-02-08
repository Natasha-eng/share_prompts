import NextAuth from "next-auth";
import { authConfig } from "./app/authconfig";

//export default NextAuth(authConfig).auth;

export const { auth } = NextAuth(authConfig);
export default auth;

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
