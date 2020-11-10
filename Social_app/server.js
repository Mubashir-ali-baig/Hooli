const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { mongoURI } = require("./config/keys");
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("connected to MongoDB"))
  .catch(err => console.log(err));

//passport middleware

app.use(passport.initialize());
require("./config/passport")(passport);



const posts = require("./routes/api/posts");
const profiles = require("./routes/api/profiles");
const users = require("./routes/api/users");

app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Port running at ${port}`));
