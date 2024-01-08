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
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "your name" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        //retrieve user data from database
        // const res = await fetch("/your/endpoint", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = await res.json();

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
