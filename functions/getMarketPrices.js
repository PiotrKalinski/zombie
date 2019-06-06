

const { MARKET_URL, ITEM_TABLE } = process.env;
const axios = require('axios');
const dbClient = require('../utils/ddb.js');
const log = require('../utils/log.js');

module.exports.handler = async (event, context) => {
  log.info('Event => ', event);
  log.info('Context => ', context);

  const marketData = await axios.get(MARKET_URL);
  await Promise.all(marketData.data.items.map(async (item) => {
    const dbParams = {
      TableName: ITEM_TABLE,
      Key: {
        id: item.id,
      },
      UpdateExpression: 'SET #S = :val',
      ExpressionAttributeNames: {
        '#S': 'price',
      },
      ExpressionAttributeValues: {
        ':val': item.price,
      },
      ReturnValues: 'ALL_NEW',
    };
    await dbClient.update(dbParams);
  }));
};
