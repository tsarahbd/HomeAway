const Listing = require("../models/listings");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

module.exports.index = async (req, res) => {
  const listings = await Listing.find({});
  res.render("listings/index", { listings });
};

module.exports.showListing = async (req, res) => {
  const listing_with_review_populated = await Listing.findById(
    req.params.id
  ).populate("reviews");

  const listingWithReviewAndAuthorInsideReviewPopulated =
    await listing_with_review_populated.populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    });

  const listing =
    await listingWithReviewAndAuthorInsideReviewPopulated.populate("guest");

  if (!listing) {
    return res.redirect("/listings");
  }

  res.render("listings/show", { listing });
};

module.exports.host = async (req, res) => {
  const userId = req.user._id;
  const listings = await Listing.find({ host: userId });
  res.render("listings/host", { listings });
};

module.exports.newListing = (req, res) => {
  res.render("listings/new");
};

module.exports.createListing = async (req, res, next) => {
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  const listing = new Listing(req.body.listing);
  listing.map = geoData.body.features[0].geometry;
  listing.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  listing.host = req.user._id;
  await listing.save();
  console.log(listing);
  req.flash("success", "Successfully made a new listing!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.edit = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Campground Not Found!");
    res.redirect("/listings/host");
  }
  res.render("listings/edit", { listing });
};

module.exports.searchLocation = async (req, res) => {
  const { searchLocation } = req.query;
  const listings = await Listing.find({
    location: { $regex: searchLocation },
  });
  res.render("listings/index", { listings });
};
