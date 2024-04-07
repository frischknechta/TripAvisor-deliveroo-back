const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const tripadvisorRoutes = require("./routes/tripadvisor");
app.use(tripadvisorRoutes);

const deliverooRoutes = require("./routes/deliveroo");
app.use(deliverooRoutes);

app.get("/", (req, res) => {
  res.status(200).json("Server is up");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
