const mongoose = require("mongoose");

const bpiSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  priceChanges: [],
});

const Bpi = mongoose.model("Bpi", bpiSchema);

module.exports = Bpi;
