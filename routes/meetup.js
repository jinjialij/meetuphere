const express = require("express");
const router = express.Router();
const Meetup = require("../models/meetup");
const paginatedResults = require("../middleware/pagnition");
const searchOptions = require("../middleware/searchOptons");

router.get("/", searchOptions(), paginatedResults(Meetup), async (req, res) => {
  try {
    res.status(200).json({
      message: "Meetup fetched successfully!",
      meetups: res.paginatedResults,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch Meetup",
      errorMessage: error.messgae,
    });
  }
});

router.post("/new-meetup", async (req, res) => {
  const meetup = new Meetup({
    title: req.body.title,
    image: req.body.image,
    address: req.body.address,
    description: req.body.desc,
  });
  try {
    const newMeetup = await meetup.save();
    res.status(201).json({
      message: "Meetup added successfully",
      meetup: {
        ...meetup,
        id: newMeetup._id,
      },
    });
  } catch {
    res.status(500).json({
      message: "Error create meetup",
    });
  }
});

module.exports = router;
