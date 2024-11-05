// import NextAuth from "next-auth";
// import KeycloakProvider from "next-auth/providers/keycloak";
//
// export const authOptions = {
//   providers: [
//     KeycloakProvider({
//       clientId: 'stack-notes-client',
//       clientSecret: 'tDbzKXKsHvvmFQAJ1bUSR87Dbia2ssfZ',
//       issuer: 'https://keycloak.jelay.site/realms/stack-notes',
//       grant_type: 'password',
//       authorization: {
//         params: {
//           scope: 'openid',
//           response_type: 'code',
//         },
//       },
//     }),
//   ],
//
//   callbacks: {
//     async jwt({ token, account, profile }) {
//       return { ...token, ...account, ...profile }
//     },
//     async session({ session, token }) {
//       session.user = {
//         ...session.user,
//         name: token.name,
//         email: token.email,
//         token: token.access_token
//       };
//       return session;
//     },
//   },
//
//   secret: 'g8zkAk8+oV/wUEEsNHthl4Ldx2KAczLRarYjAPAm8XgtTGncOpmAaYFO5u8=',
//   session: {
//     strategy: "jwt",
//   },
//
//   pages: {
//     signIn: "/login",
//   },
// };
//
// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginService } from "@/services/auth_service";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // credentials: {
      //   username,
      //   password,
      // },

      async authorize(credentials) {
        const newUser = {
          username: credentials?.username,
          password: credentials?.password,
        };
        console.log("Credentials : ", newUser);
        const response = await loginService(newUser);
        console.log("Response : ", response);
        return response;
      },
    }),
    // KeycloakProvider({
    //   clientId: "stack-notes-client",
    //   clientSecret: "tDbzKXKsHvvmFQAJ1bUSR87Dbia2ssfZ",
    //   issuer: "https://keycloak.jelay.site/realms/stack-notes",
    //   authorization: {
    //     params: {
    //       grant_type: "password",
    //       scope: "openid",
    //       response_type: "code",
    //     },
    //   },
    // }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Date.now() + account.expires_in * 1000;
      }

      return { ...token, ...account, ...profile };
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        name: token.name,
        email: token.email,
        token: token.access_token,
      };
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login", // Custom sign-in page if required
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
