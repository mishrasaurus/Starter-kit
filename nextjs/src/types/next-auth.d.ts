import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      id: string;
      role: string;
      name: string;
      orgId: string;
    };
  }

  interface User {
    username: string;
    id: string;
    role: string;
    name: string;
    orgId: string;
  }
}
