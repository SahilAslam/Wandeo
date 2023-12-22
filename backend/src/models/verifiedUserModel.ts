import mongoose, { Schema, Document, model, Model } from "mongoose";

interface Verified extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    verified: boolean;
    createdAt: Date;
    updateAt: Date;
}

const verifiedSchema = new Schema<Verified> (
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userCollection",
            required: true,
        },
        verified: {
            type: Boolean,
            default: false,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            required: true
        },
        updateAt: {
            type: Date,
            default: Date.now,
            required: true,
        },

    }, {timestamps: true}
)

const VerifiedModel: Model<Verified> = model<Verified>("VerifiedUsers", verifiedSchema);
export default VerifiedModel;

