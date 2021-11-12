const express = require("express");
const app = express();

const indexRouter = require("./routes/index");

const mongoose = require("mongoose");

const connectionStr = `mongodb+srv://${process.env.MONGO_ALTAS_USERNAME}:${process.env.MONGO_ALTAS_PW}@meetups.tg5lk.mongodb.net/meetups?retryWrites=true&w=majority`;

const db = mongoose.connection;

mongoose.connect(connectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.on("error", (error) => console.error(error));
db.once("open", () => {
  console.log("connection succeed");
});
//   .then(() => {
//     console.log("Connect to mongoDB successfully");
//   })
//   .catch((err) => {
//     "Connection failed!";
//   });

app.use("/", indexRouter);

app.listen(process.env.PORT || 5000);
