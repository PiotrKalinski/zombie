const { NBP_URL } = process.env;
const axios = require('axios');

module.exports = async function getPriceList(price) {
  const marketData = await axios.get(NBP_URL).then(data => data.data[0].rates);
  const priceUSD = marketData.find(data => data.code === 'USD');
  const priceEUR = marketData.find(data => data.code === 'EUR');
  const priceGBP = marketData.find(data => data.code === 'GBP');
  const priceMap = {
    USDprice: (price / priceUSD.bid).toFixed(2),
    EURprice: (price / priceEUR.bid).toFixed(2),
    GBPprice: (price / priceGBP.bid).toFixed(2),
  };
  return priceMap;
};
