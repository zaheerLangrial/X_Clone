import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';


const handler = NextAuth({

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGlE_CLIENT_SECRETS as string,
        }),
    ],
})

export { handler as GET, handler as POST}