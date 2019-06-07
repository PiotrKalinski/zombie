

const uuidv4 = require('uuid/v4');
const moment = require('moment');
const dbClient = require('../utils/ddb.js');
const log = require('../utils/log.js');

const { ZOMBIE_TABLE } = process.env;


module.exports.handler = async (event, context, callback) => {
  log.info('Event => ', event);
  log.info('Context => ', context);

  const {
    body: {
      name,
    },
  } = event;
  const zombieId = uuidv4();
  const zombieObj = {
    id: zombieId,
    zombiename: name,
    created: moment().format('MMMM Do YYYY, h:mm:ss a'),
    equipment: [],
    equipmentPrice: [],
  };
  try {
    await dbClient.put(ZOMBIE_TABLE, zombieObj);
    callback(null, { zombieObj });
  } catch (err) {
    log.error(err);
  }
};
