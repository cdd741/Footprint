require("dotenv").config();
const { PORT } = process.env;
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const user = require("./routes/user");
const post = require("./routes/post");
const search = require("./routes/search");
const mockdata = require("./routes/mockdata");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("./public"));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

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
  console.log("Connected to database");
});

app.use("/user", user);
// app.use('/location', location);
app.use('/post', post);
app.use('/search', search)
app.use('/mockdata', mockdata)


app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Server listening on port", PORT);
});