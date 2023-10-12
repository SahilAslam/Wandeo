import mongoose from "mongoose";

const connectDB = mongoose.connect("mongodb://127.0.0.1:27017/Project_2")
    .then(() => {
        console.log('Mongodb Connected');
    })
    .catch((err) => {
        console.error(err);
    });

export default connectDB;