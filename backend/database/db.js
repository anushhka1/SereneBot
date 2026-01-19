import mongoose from "mongoose"

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.Db_url)         
        console.log("Mongo db Connected to SereneBot!");
        
    } catch(err) {
        // console.log(err);
        console.error("MongoDB Connection Failed:", err)   
    }
}

export default connectDb