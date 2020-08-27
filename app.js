require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const routes = require("./routes");
const connection = require("./models");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", routes.AuthRoute);

app.listen(PORT, () => {
  console.log(`Now listening d(^_^)b on PORT: ${PORT}`);
});
