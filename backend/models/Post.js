import mongoose from 'mongoose';

const PostSchema=new mongoose.Schema({
    content:{type:String,required:true},
    hub: { type: String, enum: ["TownSquare", "BulletinBoard", "LostFound", "HelpDesk"], required: true },
    displayHandle: { type: String, required: true },
    location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true }, //[long,lat]
    },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
    votes: { type: Number, default: 0 },
    userId: { type: String, required: true }, // anonymous, device-bound

});

// TTL index:
PostSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

// Geospatial index for location queries
PostSchema.index({ location: "2dsphere" });

const PostModel=mongoose.model('Post',PostSchema);
export default PostModel;