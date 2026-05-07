const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');

const listingSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    image: { url: String, filename: String },
    price: Number,
    location: String,
    country: String,
    category: {
        type: String,
        enum: ["trending", "rooms", "iconic-cities", "mountains", "castles", 
               "amazing-pools", "camping", "farms", "arctic", "beaches", "desi-villas"],
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    owner: { type: Schema.Types.ObjectId, ref: "User" }
});

// mongoose middleware
listingSchema.post("findOneAndDelete", async(deletedListing) => {
    if(deletedListing){
        await Review.deleteMany({_id : {$in: deletedListing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
