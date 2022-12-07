const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "images/" });

const listings = require("../controllers/listings");
const catchAsync = require("../utils/catchAsync");
const Listing = require("../models/listings");
const { isLoggedIn, isHost, validateListing } = require("./middleware");

router
  .route("/")
  .get(listings.index)
  .post(
    isLoggedIn,
    upload.array("image"),
    validateListing,
    catchAsync(listings.createListing)
  );
router.route("/search").get(listings.searchLocation);
router.route("/host").get(isLoggedIn, isHost, listings.host);
router.route("/new").get(isLoggedIn, isHost, listings.newListing);
router.route("/:id/edit").get(isLoggedIn, isHost, listings.edit);
router.route("/:id").get(listings.showListing);

module.exports = router;
