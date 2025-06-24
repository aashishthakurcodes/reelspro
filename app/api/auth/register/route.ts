import { NextRequest, NextResponse } from "next/server";

import { coonectDB } from "@/utils/db";
import User from "@/modals/User";

//Function that handle POST REQUEST

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    //If no password and email
    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Email and password is required",
        },
        {status:400}
      );
    }
    await coonectDB()
  const existingUser=  await User.findOne({email})
  if(existingUser){
       return NextResponse.json(
        {
          error: "Email already registered",
        },
        {status:400}
      );
  }
  await User.create({
    email,
    password
  })
  console.log(User)
   return NextResponse.json(
        {
          message: "User Registered SuccessFully",
        },
        {status:201}
      );


      
  } catch (error) {
    throw error
  }
}
