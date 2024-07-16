import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export interface UserData {
  expires: string;
  user: {
    email: string;
    image: string;
    name: string;
    uid: string;
    username: string;
  };
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGlE_CLIENT_SECRETS as string,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.username = session?.user?.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();
      session.user.uid = token.sub;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
