import mongoose, { Schema, Document, model, Model} from "mongoose";

interface Discussion extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    title: string;
    content: string;
    groupId: mongoose.Schema.Types.ObjectId;
    replies: string[];
    createdAt: Date;
    updatedAt: Date;

}

const discussionSchema = new Schema<Discussion> ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userCollection"
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true,
    },
    replies: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "userCollection"
            },
            replyMessage: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                required: true,
                default: Date.now,
            },
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
}, { timestamps: true })

const DiscussionModel: Model<Discussion> = model<Discussion>("Discussion", discussionSchema);
export default DiscussionModel;