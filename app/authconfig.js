export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = auth?.user;
      const isOnProfile = request.nextUrl.pathname.startsWith("/profile");
      const isOnCreatePrompt =
        request.nextUrl.pathname.startsWith("/create-prompt");
      const isOnUpdatePrompt =
        request.nextUrl.pathname.startsWith("/update-prompt");
      const isOnLogin = request.nextUrl.pathname.startsWith("/login");
      const isOnHome = request.nextUrl.pathname.startsWith("/");
      // if (!isLoggedIn) {
      //   return Response.redirect(new URL("/login", request.nextUrl));
      // } else if (isLoggedIn) {
      //   if (isOnLogin) {
      //     return Response.redirect(new URL("/", request.nextUrl));
      //   }
      // }
      // if (!isLoggedIn) {
      //   return Response.redirect(new URL("/login", request.nextUrl));
      // } else {
      //   return Response.redirect(new URL("/", request.nextUrl));
      // }
      if (isOnProfile) {
        if (isLoggedIn) return true;
        return false;
      } else if (isOnCreatePrompt) {
        if (isLoggedIn) return true;
        return false;
      } else if (isOnUpdatePrompt) {
        if (isLoggedIn) return true;
        return false;
      } else if (isOnHome) {
        if (isLoggedIn) {
          return true;
        }
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/profile", request.nextUrl));
      }
      return true;
    },
  },
};
