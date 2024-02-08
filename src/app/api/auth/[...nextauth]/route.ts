import { db } from "@/db";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      name: "Google",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope:
            "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.upload  ",
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user  }) {
      if (!user?.email) {
        throw new Error("Missing profile");
      }
      console.log("pro: "+ user.id);
      
      
      await db.user.upsert({
        where: {
          email: user.email,
        },
        create: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.image,
        },
        update: {
          name: user.name,
          avatar: user.image,
        },
      })
      return true
      
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      if(session.user) {
        session.user.id = token.sub as string;
        session.user.accessToken = token.accessToken as string;
      }
      
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
