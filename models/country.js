const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: { type: String, required: true },
  iso2: { type: String, required: true },
});

module.exports = mongoose.model("Country", countrySchema);
