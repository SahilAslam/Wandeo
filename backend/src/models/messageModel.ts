import mongoose, { Schema, Document, model, Model} from "mongoose";

interface Message extends Document {
    sender: mongoose.Schema.Types.ObjectId;
    content: string;
    chat: mongoose.Schema.Types.ObjectId;
}

const messageSchema = new Schema<Message> ({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userCollection",
    },
    content: {
        type: String,
        trim: true,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    },
}, {timestamps: true})

const MessageModel: Model<Message> = model<Message> ("Message", messageSchema);
export default MessageModel;