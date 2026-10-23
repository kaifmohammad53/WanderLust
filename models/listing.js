const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:"https://images.unsplash.com/photo-1625505826533-5c80aca7d157?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
        : v,
  },
  price: String,
  location: String,
  country: String,
});

const listing=mongoose.model("listing",listingSchema);
module.exports=listing;