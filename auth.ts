import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        console.log("Attempting to find user with email:", credentials.email);

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        console.log("User found:", user);

        if (!user || !user?.hashedPassword) {
          console.log("No user found or no hashed password");
          throw new Error("No user found");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword ?? ""
        );

        console.log("Password correct:", isCorrectPassword);

        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "github" || account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
        });
        if (existingUser) {
          // Check if this OAuth account is already linked to the user
          const linkedAccount = await prisma.account.findFirst({
            where: {
              userId: existingUser.id,
              provider: account?.provider as string,
            },
          });
          if (!linkedAccount) {
            // Link the new OAuth account to the existing user
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account?.type as string,
                provider: account?.provider as string,
                providerAccountId: account?.providerAccountId as string,
                access_token: account?.access_token,
                token_type: account?.token_type,
                scope: account?.scope,
              },
            });
          }
          return true; // Allow sign in
        }
      }
      return true; // Allow sign in for other cases
    },
  },
  pages: {
    signIn: "/",
  },

  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});
