const express = require("express");
const router = express.Router();
const Meetup = require("../models/meetup");

router.get("/", async (req, res) => {
  try {
    let serachOptions = {};
    if (req.query.title) {
      console.log(req.query.title);
      serachOptions.title = new RegExp(req.query.title, "i");
      console.log(serachOptions);
    }
    // {
    //   title: { $regex: /test/, $options: "i" },
    // }
    const meetups = await Meetup.find(serachOptions);
    console.log(meetups);
    res.status(200).json({
      message: "Meetup fetched successfully!",
      meetups: meetups,
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
