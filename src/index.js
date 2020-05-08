const express = require("express");
const app = express();
require("./db/mongoose");
const bpiRouter = require("../src/routers/bpi");
app.use(express.json());
app.use(bpiRouter);

module.exports = app;

app.listen(3000, () => {
  console.log("Server is on", 3000);
});
