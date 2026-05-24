import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    
    //Basic info
    title: { type: String, required: true },
    description: String,
    address: { type: String, required: true},
    price: { type: Number, required: true },

    //Geolocation data
    latitude: Number,
    longitude: Number,
    distanceFromCampus: Number,

    //Housing attributes
    furnished: { type: Boolean, default: false },
    shared: { type: Boolean, default: false },
    availableFrom: Date,
    images: [String],

    //Verification info
    isVerified: { type: Boolean, default: false },
    verificationDocument: String,

    //Relationship
    landlord: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

}, { timestamps: true });

export default mongoose.model("Listing", listingSchema);