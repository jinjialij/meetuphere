const express = require("express");
const router = express.Router();
const Country = require("../models/country");
const paginatedResults = require("../middleware/pagnition");
const searchOptions = require("../middleware/searchOptons");

router.get(
  "/",
  searchOptions(),
  paginatedResults(Country),
  async (req, res) => {
    try {
      res.status(200).json({
        message: "Countries fetched successfully!",
        countries: res.paginatedResults,
        statusCode: res.statusCode,
      });
    } catch (err) {
      res.status(500).json({
        message: "Failed to fetch Countries",
        error: err.message,
        statusCode: res.statusCode,
      });
    }
  }
);

module.exports = router;
