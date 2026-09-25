import app from "./app";
import db from "../prisma/db";
import config from "./config";

const PORT = process.env.PORT;

const main = async() => { 
    try {

        // connect db
        
       
        console.log("✅ Database connected"); 


        app.listen(PORT, () => {
            console.log(`Your Server is running on Port : ${PORT}`)
        })
    } catch (err) { 
        console.log(err)
    }
}

main()