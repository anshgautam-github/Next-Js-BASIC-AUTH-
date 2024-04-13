import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection= mongoose.connection

        //mongoose also give connection a string, here why we are storing it in a var connection?
        //sometimes connectin might happen but after connection there might issus in the database, like crash, etc
        //so we can listen to it's events ("on" {one of them} -> used below)
        //SYANTX ->> on( <eventNAme>, callBAck )

        connection.on('connected',()=>{
            console.log('MongoDb connected')
        })
        connection.on('error',(err)=>{
            console.log('MongoDb connection error'+err)
            process.exit()   //there's no point in run app now so exit , there are exit codes too
        })


    } catch (error) {
        console.log('Someting went wrong while conencting to DB');
    }
}