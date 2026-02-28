import NextAuth from "next-auth";
import { authConfig } from "./app/authconfig";

export const { auth } = NextAuth(authConfig);
export default auth;

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
