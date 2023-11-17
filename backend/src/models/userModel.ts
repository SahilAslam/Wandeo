import mongoose, { Schema, Document, model, Model } from "mongoose"
import bcrypt from 'bcrypt'

interface User extends Document {
    name: string,
    username: string,
    email: string,
    phone: number,
    address: string,
    occupation: string,
    education: string,
    dateOfBirth: Date,
    gender: string,
    location: string,
    profileImage: string,
    password: string,
    about: string,
    languagesFluentIn: string,
    languagesLearning: string,
    countriesLivedIn: string[],
    countriesVisited: string[],
    hostingAvailability: string,
    eventsAttending: mongoose.Schema.Types.ObjectId[],
    groups: mongoose.Schema.Types.ObjectId[],
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
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,        
    },
    address: {
        type: String,
    },
    occupation: {
        type: String,
    },
    education: {
        type: String,
    },
    dateOfBirth: {
        type: Date,        
    },
    gender: {
        type: String,        
    },
    location: {
        type: String
    },
    profileImage: {
        type: String
    },
    password: {
        type: String,
        required: true,
    },
    about: {
        type: String
    },
    languagesFluentIn: {
        type: String
    },
    languagesLearning: {
        type: String
    },
    countriesLivedIn: [
        {
            type: String
        }
    ],
    countriesVisited: [
        {
            type: String
        }
    ],
    hostingAvailability: {
        type: String,
    },
    eventsAttending: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        }
    ],
    groups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
        },
    ],
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