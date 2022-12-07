const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

const ListingSchema = new Schema({
  title: String,
  images: Array,
  location: String,
  price: Number,
  discount: Number,
  description: Array,
  amenities: Array,
  houseRules: Array,
  map: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  host: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  guest: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

module.exports = mongoose.model("Listing", ListingSchema);
