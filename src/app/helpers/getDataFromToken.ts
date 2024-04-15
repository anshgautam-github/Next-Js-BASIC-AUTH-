import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        // in decoded -> we get the data defined in tokenData set in userModel
        return decodedToken.id; //so there we have defined
    } catch (error: any) {
        throw new Error(error.message);
    }
}
