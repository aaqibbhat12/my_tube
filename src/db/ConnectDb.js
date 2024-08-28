import mongoose from "mongoose";
import DB_NAME from "../constantas.js";


const ConnectionDb = async () => {
    try {
        const Connection = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! HOST: ${Connection}`)
    } catch (error) {
        console.log("mongodb connetion failed", error)
    }

}

export default ConnectionDb