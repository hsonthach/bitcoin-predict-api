const axios = require("axios");

/**
 * Description: Get bpi from coindesk then configure it to format :
 * bpis [
 *  bpi : {
 *    date: Date,
 *    price: Number
 *  }
 * ]
 */

const getBpi = async () => {
  const res = await axios.get(
    "https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2020-05-08"
  );
  let bpis = [];
  for (key in res.data.bpi) {
    bpis.push({
      date: key,
      price: res.data.bpi[key],
    });
  }
  bpis.forEach((el) => {
    let keys = el.date.split("-").map((num) => parseInt(num));
    el.date = new Date(keys[0], keys[1] - 1, keys[2] + 1);
  });
  return bpis;
};

module.exports = getBpi;
