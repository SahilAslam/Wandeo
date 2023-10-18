import mongoose, { Schema, Document, model, Model } from "mongoose";

interface IEvent extends Document {
  eventName: string;
  location: string;
  startDate: Date;
  endDate: Date;
  attendeesLimit: number;
  description: string;
  image: string;
  organizedBy: mongoose.Schema.Types.ObjectId;
  attendees: mongoose.Schema.Types.ObjectId;
  comments: string[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    eventName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    attendeesLimit: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    organizedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userCollection",
      required: true,
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userCollection",
      },
    ],
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "userCollection",
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
  },
  { timestamps: true }
);

const EventModel: Model<IEvent> = model<IEvent>("Event", eventSchema);
export default EventModel;
