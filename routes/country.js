const express = require("express");
const router = express.Router();
const Country = require("../models/country");

const fs = require("fs");

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

router.get("/pagination", paginatedResults(), (req, res) => {
  res.json(res.paginatedResults);
});

function paginatedResults() {
  return (req, res, next) => {
    let model;
    try {
      model = fs.readFileSync("./country.json", "utf8");
      model = JSON.parse(model);
      console.log(model.length); //250
      // console.log(typeof data);
    } catch (err) {
      console.error(err);
    }

    if (!model) {
      res.status(500).json({ messgae: "fail to retrieve data" });
      return;
    }

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (startIndex < 0 || endIndex > model.length) {
      res.status(400).json({ message: "page exceeds", status: res.statusCode });
      return;
    }
    const results = {};
    results.results = model.slice(startIndex, endIndex);

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    res.paginatedResults = results;
    next();
  };
}

module.exports = router;
