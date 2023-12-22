import mongoose, { Schema, Document, model, Model} from "mongoose";

interface Chat extends Document {
    chatName: string;
    isGroupChat: boolean;
    users: mongoose.Schema.Types.ObjectId[];
    latestMessage: mongoose.Schema.Types.ObjectId;
    groupAdmin: mongoose.Schema.Types.ObjectId;
}

const chatSchema = new Schema<Chat> ({
    chatName: {
        type: String,
        trim: true,
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userCollection"
        }
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userCollection"
    }
}, {timestamps: true})

const ChatModel: Model<Chat> = model<Chat>("Chat", chatSchema);
export default ChatModel;