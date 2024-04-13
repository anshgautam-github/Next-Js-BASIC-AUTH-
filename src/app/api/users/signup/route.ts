//as nextjs works on edge, so whenever we need to work with DB , we need to connect it with everytime 
//because in NJ functions are deployed behind the scenes and func deosn;t know whthere connected to DB or not
import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/models/userModel";
//now as we did connection to DB , so we will need data -> syntax below for that
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { error } from "console";
import { sendEmail } from "@/app/helpers/mailer";

connect()


export async function POST(request:NextRequest) {
    try {

        const reqBody= await request.json() //req.body is a promise ,sin express it comes fast but nextjs run on edge so it takes time ->await use
        const {username,email, password} =reqBody //destrucring here object

        //finding user
        const user= await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User already exir"}, {status:400})
        }

         //hash password
         const salt = await bcryptjs.genSalt(10)   //first we genrated  a salt 
         const hashedPassword = await bcryptjs.hash(password, salt)

            const newUser = new User({     
                username,
                email,
                password: hashedPassword
            })

            const savedUser = await newUser.save()
            console.log(savedUser);

         //send verification email

         await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
        return NextResponse.json({
            message:'User created successfully ',
            success: true,
            savedUser
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
