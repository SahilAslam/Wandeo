"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = mongoose_1.default.connect("mongodb+srv://sahil_aslam:1ipqH5WjdONX3Hqc@cluster0.hwqhb60.mongodb.net/")
    .then(() => {
    console.log('Mongodb Connected');
})
    .catch((err) => {
    console.error(err);
});
exports.default = connectDB;
