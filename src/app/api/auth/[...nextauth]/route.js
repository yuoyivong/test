import { loginService } from "@/services/auth_service";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOption = {
  providers: [
    // CredentialsProvider for email/password authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const userInfo = {
            email: credentials.email,
            password: credentials.password,
          };

          const login = await loginService(userInfo);

          if (login.status === 400) {
            return null; // Fail authorization
          }

          return login; // Successful login
        } catch (error) {
          console.error("Login error:", error);
          return null; // Fail authorization in case of error
        }
      },
    }),

    // GitHub Provider
    GitHubProvider({
      clientId: 'Ov23liKIbpCGO37L97Ts',
      clientSecret: '83140ef99c1d8e126d61590f54dfb91a63fe59c6',
    }),

    // Google Provider
    GoogleProvider({
      clientId: '168642453500-3oj1mt4i21vm2r0p3pnr412terp42fg1.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user }; // Add user info to token on first sign-in
      }
      return token; // Return existing token for subsequent requests
    },
    async session({ session, token }) {
      session.user = token; // Assign the token data to the session
      return session;
    },
  },

  secret: 'g8zkAk8+oV/wUEEsNHthl4Ldx2KAczLRarYjAPAm8XgtTGncOpmAaYFO5u8=',

  session: {
    strategy: "jwt", // Use JWT strategy
  },

  pages: {
    signIn: "/login", // Custom sign-in page
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
