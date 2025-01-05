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
                    // Returning user with tokens to NextAuth
                    return { ...user, access, refresh }; // Return user and tokens
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
                token.access = user.access;  // Store access token in JWT
                token.refresh = user.refresh; // Store refresh token in JWT
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
            session.user.role = token.role;
            session.user.access = token.access; // Attach access token to session
            session.user.refresh = token.refresh; // Attach refresh token to session
            return session;
        },
    },
    secret: SECRET,
});

export { handler as GET, handler as POST };
