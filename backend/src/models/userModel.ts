import mongoose, { Schema, Document, model, Model } from "mongoose"
import bcrypt from 'bcrypt'

interface User extends Document {
    name: string,
    username: string,
    email: string,
    password: string,
    phone: number,
    createdAt: Date,
    updatedAt: Date,
    isBlocked: boolean,
    matchPassword(enteredPassword: string): Promise<boolean>
}

const userSchema = new Schema<User>({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    isBlocked: {
        type: Boolean,
        required: true,
        default: false,
    }
}, { timestamps: true });

userSchema.methods.matchPassword = async function(enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre<User>('save', async function(next) {
    if(!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

const userModel: Model<User> = model<User>("userCollection", userSchema);
export default userModel;