import { getDataFromToken } from "@/app/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/app/dbConfig/dbConfig";

connect();

//when user wants to get info about him -> then we have given a token to the user -> inside the token there's a payload
//there's ID too in token, so from token we extract ID-> after extracting ID -> we send request to the DB
//and DB will give us the data 
export async function GET(request:NextRequest){

    try {
        //extract data from token defined in the helper file 
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password"); //we don't want password
        
        //if no user found
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })

        
    } catch(error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}
