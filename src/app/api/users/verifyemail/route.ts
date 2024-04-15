import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";



connect()


export async function POST(request: NextRequest){

    try {
        //taking data from the user 
        const reqBody= await request.json()
        const {token} = reqBody;
        console.log(token);

        //finding USER
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log(user);

        user.isVerfied = true;  //in the schema we can see these variables , hence verified -> true
        user.verifyToken = undefined;       //now we dont need these tokens bcoz already verified
        user.verifyTokenExpiry = undefined;

        //this save is done on DB -> whatever we do on DB -> do on await 
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}
