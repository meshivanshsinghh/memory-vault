import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/dbclient";
import User from "@/models/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  trustHost: true,
  cookies: {
    sessionToken: {
      name: "sessionToken",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      },
    },
    callbackUrl: {
      name: "_callbackUrl",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      },
    },
    csrfToken: {
      name: "_csrfToken",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      },
    },
  },
  secret: process.env.AUTH_SECRET!,
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDB();
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) {
        console.log("User already exists:", existingUser);
        return true;
      }
      const newUser = await User.create({
        name: user.name,
        email: user.email,
        image: user.image,
        googleId: account?.providerAccountId,
      });
      console.log("New user created:", newUser);
      return true;
    },
    async session({ session, token, user }) {
      const dbUser = await User.findOne({ email: session?.user?.email });
      if (dbUser) {
        session.user.id = dbUser._id.toString();
      }
      return session;
    },
  },
});
