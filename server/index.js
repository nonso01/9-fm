const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello server");
});

app.listen(port, () => {
  console.log(`Server is running on port: http://127.0.0.1:${port}`);
});
