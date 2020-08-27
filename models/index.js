const mongoose = require("mongoose");
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(
  DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.log(err);
    else return console.log("Connected to database succesfully!");
  }
);

const db = mongoose.connection;
db.once("open", () => console.log("Initializing Database...")).on(
  "error",
  (err) => console.log(err)
);

const User = require("./user.model");
module.exports = {
  User,
};
