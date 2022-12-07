const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const reviews = require("../controllers/reviews");
const { listingSchema, reviewSchema } = require("../schemas.js");
const {
  isLoggedIn,
  isHost,
  isReviewAuthor,
  validateReview,
} = require("./middleware");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listings");
const Review = require("../models/reviews");

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
