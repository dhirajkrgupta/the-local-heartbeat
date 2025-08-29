import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true, 
    },
    endTime: {
      type: Date, 
    },
    location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true }, //[long,lat]
    },
    interested:{type: Number, default: 0},
    userId:{ type: String, required: true },
  },
  { timestamps: true } 
);
// TTL index:
EventSchema.index({ endTime: 1 }, { expireAfterSeconds: 0 })

// Geospatial index for location queries
EventSchema.index({ location: "2dsphere" });
const EventModel= mongoose.model("Event", EventSchema);
export default EventModel;