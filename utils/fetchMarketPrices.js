const { MARKET_URL, ITEM_TABLE } = process.env;
const axios = require('axios');
const dbClient = require('./ddb.js');

module.exports = async function fetchMarketPrices() {
  const marketData = await axios.get(MARKET_URL);
  await Promise.all(marketData.data.items.map(async (item) => {
    const dbParams = {
      id: item.id,
      itemName: item.name,
      price: item.price,
    };
    await dbClient.put(ITEM_TABLE, dbParams);
  }));
};
