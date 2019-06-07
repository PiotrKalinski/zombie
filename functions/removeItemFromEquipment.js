const { ZOMBIE_TABLE, ITEM_TABLE } = process.env;
const dbClient = require('../utils/ddb.js');
const log = require('../utils/log.js');
const getPriceList = require('../utils/getPriceList');
const response = require('../utils/response.js');

module.exports.handler = async (event, context, callback) => {
  log.info('Event => ', event);
  log.info('Context => ', context);
  const {
    body: { zombieId, itemId },
  } = event;

  try {
    const zombieObject = await dbClient.get(ZOMBIE_TABLE, zombieId);
    const itemObject = await dbClient.get(ITEM_TABLE, itemId);
    if (itemObject.Item === undefined) {
      return response.NotFound('Item not found', callback);
    }

    const newequipmentList = zombieObject.Item.equipment.filter(data => data.id !== itemId);
    const updateParams = {
      TableName: ZOMBIE_TABLE,
      Key: {
        id: zombieObject.Item.id,
      },
      UpdateExpression: 'set equipment = :s',
      ExpressionAttributeValues: {
        ':s': newequipmentList,
      },
      ReturnValues: 'UPDATED_NEW',
    };
    await dbClient.update(updateParams);
    const combinedPrice = newequipmentList.reduce((acc, obj) => acc + obj.price, 0); // 7
    const priceList = await getPriceList(combinedPrice);
    return response.OK(JSON.stringify(priceList), callback);
  } catch (error) {
    log.error(error);
    return response.BadRequest(JSON.stringify(error), callback);
  }
};
