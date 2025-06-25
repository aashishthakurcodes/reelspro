import { authOptions } from "@/utils/auth";
import NextAuth from "next-auth";

//making handler

const handler=NextAuth(authOptions)

export {handler as GET,handler as POST};