import GoogleProvider from "next-auth/providers/google";
import NextAuth, { NextAuthOptions } from "next-auth";
import axios from "axios";
import config from "@/config";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },

        })
    ],
    secret: process.env.AUTH_SECRECT,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/signin',
        signOut: '/signin',
        error: '/signin',
        verifyRequest: '/',
        newUser: '/blogs'
    },
    callbacks: {
        async jwt({ token, account, user }) {
            if (account && user) {
                const { email } = user;
                try {
                    await axios.post(`${config.API_URL}/users/google/auth`, {
                        email
                    }, {
                        withCredentials: true
                    });
                } catch (error) {
                    console.log(error);
                }
            }
            return token;
        },

    },


};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };