export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = auth?.user && Object.keys(auth?.user).length > 0;

      const isOnProfile = request.nextUrl.pathname.startsWith("/profile");
      const isOnCreatePrompt =
        request.nextUrl.pathname.startsWith("/create-prompt");
      const isOnUpdatePrompt =
        request.nextUrl.pathname.startsWith("/update-prompt");
      const isOnEvent = request.nextUrl.pathname.startsWith("/event");
      const isOnLogin = request.nextUrl.pathname.startsWith("/login");
      const isOnHome = request.nextUrl.pathname.startsWith("/");
      const isOnRegister = request.nextUrl.pathname.startsWith("/register");

      if (isOnProfile) {
        if (isLoggedIn) return true;
        return false;
      } else if (isOnCreatePrompt) {
        if (isLoggedIn) return true;
        return false;
      } else if (isOnUpdatePrompt) {
        if (isLoggedIn) return true;
        return false;
      } else if (isOnEvent) {
        if (isLoggedIn) return true;
        return false;
      } else if (isOnRegister) {
        if (!isLoggedIn) {
          return true;
        } else {
          return Response.redirect(new URL("/register", request.nextUrl));
        }
      } else if (isOnLogin) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/profile", request.nextUrl));
        } else {
          return false;
        }
      } else if (isOnHome) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    },
  },
};
