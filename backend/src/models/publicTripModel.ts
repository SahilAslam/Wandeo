import mongoose, { Schema, Document, model, Model } from "mongoose";

interface Trip extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  destination: string;
  arrivalDate: Date;
  departureDate: Date;
  noOfTravelers: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const PublicTripSchema = new Schema<Trip>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userCollection",
    },
    destination: {
      type: String,
      required: true,
    },
    arrivalDate: {
      type: Date,
      required: true,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    noOfTravelers: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
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
  },
  { timestamps: true }
);

const PublicTripModel: Model<Trip> = model<Trip>("PublicTrip", PublicTripSchema);
export default PublicTripModel;
