const express = require("express");
const router = express.Router();
const Country = require("../models/country");

router.get("/", async (req, res) => {
  try {
    const countries = await Country.find();
    console.log(countries);
    res.status(200).json({
      message: "Countries fetched successfully!",
      countries: countries,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch Countries",
      error: err.message,
    });
  }
});

module.exports = router;
