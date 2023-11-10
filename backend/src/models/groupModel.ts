import mongoose, { Schema, Document, model, Model} from "mongoose";

interface Group extends Document {
    name: string;
    description: string;
    location: string;
    discussions: string[];
    members: mongoose.Schema.Types.ObjectId[];
    image: string
    createdBy: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const groupSchema = new Schema<Group> ({
    name: {
        type: String,   
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userCollection",
        },
    ],
    image: {   
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userCollection",
        required: true,
    },
    discussions: [
        {
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
            createdAt: {
                type: Date,
                required: true,
                default: Date.now,
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
        },
    ],
    
}, { timestamps: true })

const GroupModel: Model<Group> = model<Group>("Group", groupSchema);
export default GroupModel;