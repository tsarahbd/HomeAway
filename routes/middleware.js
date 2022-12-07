const { listingSchema, reviewSchema } = require("../schemas.js");
const User = require("../models/user");
const Review = require("../models/reviews");
const ExpressError = require("../utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    console.log(req.session.returnTo);
    req.flash("error", "You must be logged in!");
    return res.redirect("/login");
  }
  next();
};

module.exports.isHost = async (req, res, next) => {
  const currentUser = req.user.username;
  const user = await User.find({ username: currentUser });
  const parsedUserType = user[0].userType.toString();
  if (parsedUserType != "host") {
    req.flash("error", "Your do not have permission to access that page!");
    return res.redirect(`/listings`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "Your do not have permission to edit this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
