
import CredentialsProvider from "./../node_modules/next-auth/src/providers/credentials";
// import GitHubProvider from "next-auth/providers/github";
//define array of provider

import { NextAuthOptions } from "next-auth";
import { coonectDB } from "./db";
import UserModal from "@/modals/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing Email or Password");
        }

        try {
          await coonectDB();
          const user = await UserModal.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found");
          }
          const isValidate = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValidate) {
            throw new Error("wrong Credentials");
          }

          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
    //Github Provider
  //   GitHubProvider({
  //   clientId: process.env.GITHUB_ID!,
  //   clientSecret: process.env.GITHUB_SECRET!
  // })
  ],
  callbacks:{
    async jwt({token,user}){
        if(user){
            token.id=user.id
        }
        return token;
    },
    async session({session,token}){

        if(session.user){
            session.user.id=token.id as string
        }
        return session
    }
  },
  pages:{
    signIn:"/login",
    error:"/login"
  },
  session:{
    strategy:"jwt",
    maxAge:30*24*60*60
  },
  secret:process.env.NEXTAUTH_SECRET
};


