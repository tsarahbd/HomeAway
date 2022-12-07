const mongoose = require("mongoose");
const Listing = require("./models/listings");

mongoose.connect("mongodb://127.0.0.1:27017/HomeAway", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  await Listing.deleteMany({});
  const listing = new Listing({
    title: "Breathtaking Mountain views cottage",
    images: [
      "/images/img1.webp",
      "/images/img2.webp",
      "/images/img3.jpg",
      "/images/img4.webp",
      "/images/img5.webp",
      "/images/img6.webp",
    ],
    location: "Imsterberg, Tirol, Austria",
    price: 121,
    description:
      "The cottage has a bathroom with bathtub and separate toilet. The living room is equipped with two couches, living wall and a TV. In the bedroom is a double bed, wardrobe, a dresser and a TV. In the kitchen you will find all kitchen appliances and Nespresso capsule coffee machine or filter machine. Enjoy beautiful days on the cozy terrace and fine relaxation in the hot tub. For motorcyclists we have a garage. Ideal for 2 to 4 people.",
    amenities: [
      "Bathtub",
      "Hair dryer",
      "Cleaning products",
      "Shampoo",
      "Body soap",
      "Hot water",
      "Shower gel",
      "Kitchen",
      "Space where guests can cook their own meals",
      "Refrigerator",
      "Cooking basics - Pots and pans, oil, salt and pepper",
      "Dishes and silverware - Bowls, chopsticks, plates, cups, etc.",
      "Dishwasher",
      "Stove",
      "Oven",
      "Hot water kettle",
      "Coffee maker: Nespresso",
      "Wine glasses",
      "Toaster",
      "Baking sheet",
      "Dining table",
    ],
    houseRules: [
      "Check-in: 5:00 PM - 11:00 PM",
      "Checkout: 10:00 AM",
      "No smoking",
      "No pets",
      "No parties or events",
    ],
    map: {
      type: "Point",
      coordinates: [10.69716, 47.20636],
    },
    host: "6385debde1d5bf3bfb5b1834",
    guest: ["6384b7fa24cfe1fde5a371d9"],
  });
  await listing.save();
};

seedDB().then(() => {
  mongoose.connection.close();
});
