import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "your name" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = {
          id: "42",
          name: "Natasha",
          password: "natasha",
        };
        // If no error and we have user data, return it
        if (
          credentials?.username === user.name &&
          credentials.password === user.password
        ) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
      async signIn({ user, account, profile, email, credentials }) {
        try {
          await connectionToDB();
          //check if a user already exists
          const userExists = await User.findOne({
            email: profile.email,
          });
          //if not, create a new user
          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name.replace(" ", "").toLowerCase(),
              image: profile.picture,
            });
          }
          return true;
        } catch (err) {
          console.log(err);
          return false;
        }
      },
      async redirect({ url, baseUrl }) {
        return baseUrl;
      },
      async session({ session, user, token }) {
        const sessionUser = await User.findOne({
          email: session.user.email,
        });
        session.user.id = sessionUser._id.toString();
        return session;
      },
    }),
  ],
};
