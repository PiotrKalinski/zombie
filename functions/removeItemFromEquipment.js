

const { ZOMBIE_TABLE, ITEM_TABLE } = process.env;
const dbClient = require('../utils/ddb.js');
const log = require('../utils/log.js');
const getPriceList = require('../utils/getPriceList');
const response = require('../utils/response.js');

module.exports.handler = async (event, context, callback) => {
  log.info('Event => ', event);
  log.info('Context => ', context);
  const {
    body: {
      zombieId, itemId,

    },
  } = event;

  const zombieObject = await dbClient.get(ZOMBIE_TABLE, zombieId);
  const itemObject = await dbClient.get(ITEM_TABLE, itemId);
  if (itemObject.Item === undefined) {
    return response.NotFound('Item not found', callback);
  }

  const newEquipentList = zombieObject.Item.equipment.filter(data => data.id === 2);
  const updateParams = {
    TableName: 'zombie-service-dev-ZombieList-IMEXLQ1KV3Q2',
    Key: {
      id: zombieObject.Item.id,
    },
    UpdateExpression: 'set equipment = :s',
    ExpressionAttributeValues: {
      ':s': newEquipentList,
    },
    ReturnValues: 'UPDATED_NEW',
  };
  await dbClient.update(updateParams);
  const combinedPrice = newEquipentList.reduce((acc, obj) => acc + obj.price, 0); // 7
  const priceList = await getPriceList(combinedPrice);
  return response.OK(JSON.stringify({ result: priceList }), callback);
};
