import mongoose, { Schema, Document, model, Model} from "mongoose";

interface Group extends Document {
    name: string;
    description: string;
    location: string;
    discussions: mongoose.Schema.Types.ObjectId[];
    members: mongoose.Schema.Types.ObjectId[];
    image: string
    createdBy: mongoose.Schema.Types.ObjectId;
    isBlocked: boolean;
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
            type: mongoose.Schema.Types.ObjectId,
            ref: "Discussion",
        },
    ],
    isBlocked: {
        type: Boolean,
        required: true,
        default: false,
    },
    
}, { timestamps: true })

const GroupModel: Model<Group> = model<Group>("Group", groupSchema);
export default GroupModel;