import mongoose, { Schema, Document, model, Model} from "mongoose";

interface DirectMessage extends Document {
    messages: {
        userId: mongoose.Schema.Types.ObjectId;
        message: string;
        createdAt: Date;
    }[];
    userOne: mongoose.Schema.Types.ObjectId;
    userTwo: mongoose.Schema.Types.ObjectId;
    latestMessage: {
        userId: mongoose.Schema.Types.ObjectId;
        message: string;
        createdAt: Date;
    };
}

const directMessageSchema = new Schema<DirectMessage> ({
    messages: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "userCollection"
            },
            message: {
                type: String,
            },
            createdAt: {
                type: Date,
                required: true,
                default: Date.now,
            },
        }
    ],
    userOne: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userCollection"
    },
    userTwo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userCollection"
    },
    latestMessage: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userCollection",
        },
        message: {
            type: String,
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
}, {timestamps: true})

const DirectMessageModel: Model<DirectMessage> = model<DirectMessage>("DirectMessage", directMessageSchema);
export default DirectMessageModel;