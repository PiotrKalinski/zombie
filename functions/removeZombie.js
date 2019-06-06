const dbClient = require('../utils/ddb.js');
const log = require('../utils/log.js');
const response = require('../utils/response.js');

const { ZOMBIE_TABLE } = process.env;


module.exports.handler = async (event, context, callback) => {
  log.info('Event => ', event);
  log.info('Context => ', context);
  if (event.path && event.path.zombieId) {
    try {
      await dbClient.delete(ZOMBIE_TABLE, event.path.zombieId);
      return response.OK(JSON.stringify({ result: 'ok' }), callback);
    } catch (error) {
      log.error(error);
      return response.Exception(error, callback);
    }
  } else return response.NotFound('error', callback);
};
