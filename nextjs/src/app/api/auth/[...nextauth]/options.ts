import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Collection, connectToDB } from "@/backend/database/mongo";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const User = await connectToDB({ collection: Collection.user });
        if (!User) return null;

        const user = await User.findOne({
          username: credentials.username,
          password: credentials.password,
        });

        return user
          ? {
              id: user.id,
              name: user.get("name"),
              username: user.get("username"),
              role: user.get("role"),
              orgId: user.get("orgId"),
            }
          : null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = { ...session.user, ...(token.user || {}) };
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = { ...user };
      }
      return token;
    },
  },
};
