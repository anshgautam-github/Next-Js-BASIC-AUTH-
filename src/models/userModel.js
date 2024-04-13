import { verify } from "crypto";
import mongoose from "mongoose";
import { type } from "os";

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please provied a username"],
        unique: true
   },
   email:{
    type: String,
    required: [true, "Please provied an email"],
    unique: true
    },
    password:{
        type: String,
        required: [true, "Please provied a password"],
    },
    isVerified :{
        type: Boolean,
        default: false
    },
    isAdmin :{
        type: Boolean,
        default: false
    },
    forgotPasswordToken :String,
    forgotPasswordTokenExpiry :Date,
    verifyToken :String,
    verifyTokenExpiry :Date,
    
})

//Next-js ->> EDGE time framework
//NextJs mostly does work on edge-> aesa ni h ki ek special server rkha jata h aur waha pe kaam hota h , mostly work
//is done on edge , edge computing is used.
//so on there , what happens is that schema doesn't know whether it is making connection with mongoDB firsy time
//or already it has been made, so there we mighht encounter issues, so exporting here is different .

// so here we have to handel 2 cases -> 
// 1-> if model is already been made -> then we pass the reference of that user model
// 2-> if model not made -> means first time -> then make the user Model

//checking both the cases over here-> (CASE-1 || CASE -2) 
const User= mongoose.models.users || mongoose.model("users", userSchema)
//here above in the model name we are using "users" instead of standard practice "User"
//well in the backend , usually saved like users only so no problem

export default User