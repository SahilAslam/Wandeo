import mongoose, { Schema, Document, model, Model} from "mongoose";

interface Hosting extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    hostingAvailability: string;
    availableNights: string;
    noOfGuests: string;
    preferredGender: string;
    kidFriendly: string;
    petFriendly: string;
    smoking: string
    sleepingArrangement: string;
    sleepingArrangementDescription: string;
    transportationAccess: string;
    whatCanIShare: string;
    additionalInformation: string;
}

const hostingSchema = new Schema<Hosting> ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userCollection"
    },
    hostingAvailability: {
        type: String,
    },
    availableNights: {
        type: String
    },
    noOfGuests: {
        type: String
    },
    preferredGender: {
        type: String
    },
    kidFriendly: {
        type: String
    },
    petFriendly: {
        type: String
    },
    smoking: {
        type: String
    },
    sleepingArrangement: {
        type: String,
    },
    sleepingArrangementDescription: {
        type: String
    },
    transportationAccess: {
        type: String,
    },
    whatCanIShare: {
        type: String,
    },
    additionalInformation: {
        type: String,
    },
}, { timestamps: true })

const HostingModel: Model<Hosting> = model<Hosting>("Hosting", hostingSchema);
export default HostingModel;