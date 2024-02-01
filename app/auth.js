import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { findUser } from "@lib/actions";
import bcrypt from "bcrypt";

const login = async (credentials) => {
  try {
    const user = await findUser(credentials.username);

    if (!user) {
      return { message: "Wrong credentials!" };
    }

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return { message: "Wrong credentials!" };
    }

    return user;
  } catch (err) {
    throw new Error(`Error while loggin in.`);
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);

          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  // ADD ADDITIONAL INFORMATION TO SESSION
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.email = token.email;
      }
      return session;
    },
  },
});
