const mongoose = require("mongoose");

const meetupSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fav: {
    type: Boolean,
    required: false,
    default: false,
  },
});
module.exports = mongoose.model("Meetup", meetupSchema);
