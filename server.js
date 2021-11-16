const express = require("express");
const app = express();
const cors = require("cors");

//https://expressjs.com/en/api.html
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const indexRouter = require("./routes/index");
const meetupRouter = require("./routes/meetup");
const countryRouter = require("./routes/country");

const mongoose = require("mongoose");

const connectionStr = `mongodb+srv://${process.env.MONGO_ALTAS_USERNAME}:${process.env.MONGO_ALTAS_PW}@meetups.tg5lk.mongodb.net/meetups?retryWrites=true&w=majority`;

// const db = mongoose.connection;

mongoose
  .connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection succeed");
  })
  .catch((error) => {
    console.error(error);
  });

// db.on("error", (error) => );
// db.once("open", () => {
//   console.log("connection succeed");
// });

app.use("/", indexRouter);
app.use("/meetups", meetupRouter);
app.use("/countries", countryRouter);

app.listen(process.env.PORT || 5000);
