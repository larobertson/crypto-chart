const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;
app.use(express.static("dist"));
app.use(
  bodyParser.json({
    strict: false
  })
);

app.listen(port, () => {
  console.log(`The shenanigans have started on aisle ${port}`);
});
