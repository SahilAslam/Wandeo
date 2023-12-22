import mongoose from "mongoose";

const connectDB = mongoose.connect("mongodb+srv://sahil_aslam:1ipqH5WjdONX3Hqc@cluster0.hwqhb60.mongodb.net/")
    .then(() => {
        console.log('Mongodb Connected');
    })
    .catch((err) => {
        console.error(err);
    });

export default connectDB;


// mongodb://127.0.0.1:27017/Project_2