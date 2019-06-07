const { ITEM_TABLE, ZOMBIE_TABLE } = process.env;
const dbClient = require('../utils/ddb.js');
const log = require('../utils/log.js');
const getPriceList = require('../utils/getPriceList');
const fetchMarketPrices = require('../utils/fetchMarketPrices');
const response = require('../utils/response.js');

module.exports.handler = async (event, context, callback) => {
  log.info('Event => ', event);
  log.info('Context => ', context);
  if (event.path && event.path.zombieId) {
    try {
      const tableStatus = await dbClient.checkTable(ITEM_TABLE);
      if (tableStatus.Table.ItemCount === 0) {
        await fetchMarketPrices();
      }
      const zombieObject = await dbClient.get(ZOMBIE_TABLE, event.path.zombieId);
      const combinedPrice = zombieObject.Item.equipment.reduce((acc, obj) => acc + obj.price, 0);
      const equipmentPrice = await getPriceList(combinedPrice);
      return response.OK(JSON.stringify({ ...zombieObject, equipmentPrice }), callback);
    } catch (error) {
      log.error(error);
      return response.BadRequest(JSON.stringify(error), callback);
    }
  } else {
    return response.NotFound('error', callback);
  }
};
