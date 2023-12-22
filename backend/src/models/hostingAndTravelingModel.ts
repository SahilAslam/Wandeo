import mongoose, { Schema, Document, model, Model} from "mongoose";

interface HostingAndTraveling extends Document {
    arrivalDate: Date;
    departureDate: Date;
    noOfTravelers: number;
    response: string;
    messages: {
        userId: mongoose.Schema.Types.ObjectId;
        message: string;
        createdAt: Date;
    }[];
    hostingUser: mongoose.Schema.Types.ObjectId;
    requestingUser: mongoose.Schema.Types.ObjectId;
    latestMessage: {
        userId: mongoose.Schema.Types.ObjectId;
        message: string;
        createdAt: Date;
    };
}

const hostingAndTravelingSchema = new Schema<HostingAndTraveling> ({
    arrivalDate: {
        type: Date,
    },
    departureDate: {
        type: Date,
    },
    noOfTravelers: {
        type: Number
    },
    response: {
        type: String,
    },
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
    hostingUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userCollection"
    },
    requestingUser: {
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

const HostingAndTravelingModel: Model<HostingAndTraveling> = model<HostingAndTraveling>("HostingAndTraveling", hostingAndTravelingSchema);
export default HostingAndTravelingModel;