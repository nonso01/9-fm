const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// app.use(express.static("../dist"));
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
  // console.log(req.headers)
});

app.get("/api", (req, res) => {
  res.status(200).json({ status: "ok", message: "API is working" });
});

app.listen(port, (e) => {
  console.log(`Server is running on port: http://127.0.0.1:${port}`);
});
