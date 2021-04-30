require("dotenv").config();
const { PORT } = process.env;
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const fs = require("fs");
const Image = require("./Image.js");
const User = require("./User.js");
const sha512 = require("hash.js/lib/hash/sha/512");

const user = require("./routes/user");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("./public"));

mongoose
  .connect("mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MONGO CONNECTION OPEN!"))
  .catch((err) => {
    console.log("OH NO, MONGO ERROR!");
    console.log(err);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to data base");
});

app.use("/user", user);

// Image upload
const Storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: Storage,
  limits: { fileSize: 100000000, files: 1 },
});

app.post("/upload", upload.single("Image"), (req, res) => {
  let obj = {
    username: req.body.username,
    location: req.body.location,
    likes: 0,
    imgUrl: `http://localhost:8080/uploads/${req.file.filename}`,
    imgId: uuidv4(),
  };

  Image.create(obj, (err, item) => {
    if (err) {
      console.log(err);
      res.status(400).send("upload imag");
    }
  });
  res.status(201).send(obj.imgId);
});

// app.get("/:id", async (req, res) => {
//   const pic = await image.findOne({ imgId: req.params.id });
//   console.log(pic.imgUrl);
//   res.send(pic.imgUrl);
// });

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Server listening on port", PORT);
});

module.exports = app;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Server listening on port", PORT);
});

module.exports = app;
