import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import path from "path";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log(reqBody);

    // Check if user already exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "user doesn't exists" },
        { status: 400 }
      );
    }

    // chack the password is correct
    const validPass = await bcryptjs.compare(password, user.password);

    // hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // if the password isn't correct
    if (!validPass) {
      return NextResponse.json({ error: "invalid password" }, { status: 400 });
    }

    // create token data
    const tokenData = {
      id: user._id,
      usernames: user._username,
      email: user._email,
    };

    // create token
    // const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
    //   expiresIN: "id",
    // });
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    // set token as user cookie
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
