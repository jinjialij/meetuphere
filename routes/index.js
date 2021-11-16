const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const html = `<h1>Welcome to meetup!</h1>
  <ul><li>meetups</li><li>countries</li></ul>`;
  res.send(html);
});

module.exports = router;
