const express = require("express");
const router = new express.Router();
const Bpi = require("../models/bpi");
const getBpi = require("../utils/getBpi");
const sortByObjectProperty = require("../utils/sortByObjectProperty");

const saveBpi = async () => {
  const bpis = await getBpi();
  await Bpi.deleteMany({});
  bpis.forEach((el, i) => {
    el = calculate7DaysChanges(el.date, bpis, i);
    const newBpi = new Bpi(el);
    newBpi.save();
  });
};

router.get("/save-bpis", async (req, res) => {
  try {
    await saveBpi();
    res.send("OK");
  } catch (error) {
    res.status(400).send(error);
  }
});

const calculate7DaysChanges = (currentDay, bpis, index) => {
  const bpiChanges = {
    priceChanges: [],
    date: currentDay,
    price: bpis[index].price,
  };
  const currentPrice = bpis[index].price;
  for (let j = 1; j < 8; j++) {
    if (index < 7) break;
    bpiChanges.priceChanges.push(
      (bpis[index - j].price / currentPrice - 1) * 100
    );
  }

  // bpis.forEach((el,i)=>{
  //   if (el.date===currentDay){
  //     for (let j = 1 ; j <8 ; j++){
  //       bpiChanges.priceChanges.push(bpis[i-j]/el) ;
  //       bpiChanges.totalChanges += Math.abs(bpis[i-j]/el)
  //     }
  //   }
  // })
  return bpiChanges;
};

// TODO: REUSE THIS FUNC
const calculateMargin = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return Infinity;
  let margin = 0;
  arr1.forEach((el, i) => {
    margin += Math.abs(el - arr2[i]);
  });
  return margin;
};

router.get("/sort-by-margin", async (req, res) => {
  const currentDay = new Date(
    req.body.date.year,
    req.body.date.month - 1,
    req.body.date.day + 1
  );
  const bpis = await Bpi.find({});
  const currentBpi = bpis.find(
    (bpi) => bpi.date.toString() === currentDay.toString()
  );
  const bpiMargins = [];
  bpis.forEach((bpi) => {
    bpiMargins.push({
      date: bpi.date,
      margin: calculateMargin(bpi.priceChanges, currentBpi.priceChanges),
      priceChanges: bpi.priceChanges,
    });
  });
  sortByObjectProperty("margin", bpiMargins);
  res.send(bpiMargins);
});

router.get("/pricechanges-30days", async (req, res) => {
  const currentDay = new Date(
    req.body.date.year,
    req.body.date.month - 1,
    req.body.date.day + 1
  );
  const bpis = await Bpi.find({});
  const currentBpiIndex = bpis.findIndex(
    (bpi) => bpi.date.toString() === currentDay.toString()
  );
  const priceChanges30days = [];
  for (let i = 0; i < 30; i++) {
    priceChanges30days.push({
      date: bpis[currentBpiIndex + i].date,
      priceChanges:
        (bpis[currentBpiIndex + i].price / bpis[currentBpiIndex].price - 1) *
        100,
    });
  }
  res.send(priceChanges30days);
});

module.exports = router;

// TODO: Calculate average profit,best profit and worst profit base on old one
// Pricechanges by N days
// Predict by N days
