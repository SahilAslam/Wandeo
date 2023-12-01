import mongoose, { Schema, Document, model, Model} from "mongoose";

interface Reference extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    targettedUserId: mongoose.Schema.Types.ObjectId;
    recommendYes: string;
    recommendNo: string;
    referenceMessage: string;
    createdAt: Date;
    updateAt: Date;
}

const referenceSchema = new Schema<Reference> ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userCollection",
    },
    targettedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userCollection",
    },
    recommendYes: {
        type: String,
    },
    recommendNo: {
        type: String,
    },
    referenceMessage: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const ReferenceModel: Model<Reference> = model<Reference>("UserReference", referenceSchema);
export default ReferenceModel;