import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            accessToken: string
            id: string
            refreshToken: string
        } & DefaultSession["user"],
        
    }
}