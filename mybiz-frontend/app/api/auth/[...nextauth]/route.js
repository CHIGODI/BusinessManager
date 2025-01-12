import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { isTokenExpired, refreshAccessToken } from '../../../lib/tokenUtils';

const SECRET = process.env.NEXTAUTH_SECRET;

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'username' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const res = await axios.post(
                    `${process.env.DJANGO_BACKEND_URL}/api/v1/account/login/`,
                    {
                        username: credentials.username,
                        password: credentials.password,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    }
                );

                if (res.status === 200) {
                    const { user, access, refresh } = res.data;
                    return { ...user, access, refresh };
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt', // Using JWT for session strategy
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const role = user.is_staff ? 'admin' : 'user';
                token.role = role;
                token.user = user;
                token.access = user.access;
                token.refresh = user.refresh;
            }
            const isExpired = await isTokenExpired(token.access, SECRET);
            if (isExpired) {
                const newAccessToken = await refreshAccessToken(token.refresh);

                if (newAccessToken) {
                    token.access = newAccessToken;
                } else {
                    return {
                        ...token,
                        error: "RefreshAccessTokenError",
                    };
                }
            }
            return token;
        },

        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },
    secret: SECRET,
});

export { handler as GET, handler as POST };
