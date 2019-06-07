const { ITEM_TABLE, ZOMBIE_TABLE } = process.env;
const dbClient = require('../utils/ddb.js');
const log = require('../utils/log.js');
const getPriceList = require('../utils/getPriceList');
const fetchMarketPrices = require('../utils/fetchMarketPrices');
const response = require('../utils/response.js');

module.exports.handler = async (event, context, callback) => {
  log.info('Event => ', event);
  log.info('Context => ', context);
  const {
    body: { zombieId, itemId },
  } = event;

  const checkTableStatus = await dbClient.checkTable(ITEM_TABLE);
  if (checkTableStatus.Table.ItemCount === 0) {
    await fetchMarketPrices();
  }
  const zombieObject = await dbClient.get(ZOMBIE_TABLE, zombieId);
  const itemObject = await dbClient.get(ITEM_TABLE, itemId);

  if (itemObject.Item === undefined) {
    return response.NotFound('Item not found', callback);
  }
  if (zombieObject.Item === undefined) {
    return response.NotFound('Zombie not found', callback);
  }
  const checkIfItemAlreadyEquipped = zombieObject.Item.equipment
    .find(o => o.id === itemId) !== undefined;
  if (checkIfItemAlreadyEquipped) {
    return response.ItemAlreadyEquipped('error', callback);
  }
  const itemCount = Object.keys(zombieObject.Item.equipment).length;
  if (itemCount > 5) {
    return response.MaximumItemCount('error', callback);
  }
  const newEquipentList = [...zombieObject.Item.equipment, itemObject.Item];

  try {
    const combinedPrice = newEquipentList.reduce((acc, obj) => acc + obj.price, 0);
    const equipmentPrice = await getPriceList(combinedPrice);
    const updateParams = {
      TableName: ZOMBIE_TABLE,
      Key: {
        id: zombieObject.Item.id,
      },
      UpdateExpression: 'set equipment = :s, price = :p',
      ExpressionAttributeValues: {
        ':s': newEquipentList,
        ':p': equipmentPrice,
      },
      ReturnValues: 'UPDATED_NEW',
    };
    await dbClient.update(updateParams);

    return response.OK(JSON.stringify(equipmentPrice), callback);
  } catch (error) {
    log.error(error);
    return response.BadRequest(JSON.stringify(error), callback);
  }
};
