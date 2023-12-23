import mongoose from "mongoose";






    async function connectToDb() {
        
        
       
        try {
            await mongoose.connect("mongodb+srv://sahil_aslam:1ipqH5WjdONX3Hqc@cluster0.hwqhb60.mongodb.net/");
            console.log('====================================');
            console.log("MongoDB connected");
            console.log('====================================');
            
        } catch (error) {
            console.error(error)
        }
    }
export default connectToDb;


