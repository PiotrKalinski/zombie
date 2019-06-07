const uuidv4 = require('uuid/v4');
const moment = require('moment');
const dbClient = require('../utils/ddb.js');
const log = require('../utils/log.js');
const response = require('../utils/response.js');

const { ZOMBIE_TABLE } = process.env;
// const ZOMBIE_TABLE = 'zombie-service-dev-ZombieList-IMEXLQ1KV3Q2';
// const zombieName = 'xxxxxxxxxxx';
module.exports.handler = async (event, context, callback) => {
  log.info('Event => ', event);
  log.info('Context => ', context);

  const {
    body: { zombieName },
  } = event;
  const zombieId = uuidv4();

  const zombieObj = {
    id: zombieId,
    zombiename: zombieName,
    created: moment().format('MMMM Do YYYY, h:mm:ss a'),
    equipment: [],
    equipmentPrice: [],
  };

  try {
    await dbClient.put(ZOMBIE_TABLE, zombieObj);
    return response.OK(JSON.stringify(zombieObj), callback);
  } catch (error) {
    return response.BadRequest(JSON.stringify(error), callback);
  }
};
