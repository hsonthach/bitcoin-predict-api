const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/bitcoin-predict-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
