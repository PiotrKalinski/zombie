const log = require('./log.js');

const cors = '*';

exports.OK = (body, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': cors,
    },
    body,
  };
  log.info('HTTP 200:', body);
  callback(null, response);
};
exports.OkRequested = (callback) => {
  const response = {
    statusCode: 202,
    headers: {
      'Access-Control-Allow-Origin': cors,
    },
  };
  log.info('HTTP 204');
  callback(null, response);
};

exports.OkNoBody = (callback) => {
  const response = {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': cors,
    },
  };
  log.info('HTTP 204');
  callback(null, response);
};


exports.NotFound = (msg, callback) => {
  const response = {
    statusCode: 404,
    headers: {
      'Access-Control-Allow-Origin': cors,
    },
    body: JSON.stringify({ result: 'NOT_FOUND', message: msg }),
  };
  log.info('HTTP 404:', msg);
  callback(null, response);
};

exports.BadRequest = (error, callback) => {
  const response = {
    statusCode: 400,
    headers: {
      'Access-Control-Allow-Origin': cors,
    },
    body: JSON.stringify({ result: 'BAD_REQUEST', message: error }),
  };
  log.error('HTTP 400:', error);
  callback(null, response);
};


exports.Exception = (error, callback) => {
  const response = {
    statusCode: 500,
    headers: {
      'Access-Control-Allow-Origin': cors,
    },
    body: JSON.stringify({ result: 'SERVER_ERROR', message: error }),
  };
  log.error('HTTP 500:', error);
  callback(null, response);
};

exports.MaximumItemCount = (error, callback) => {
  const response = {
    statusCode: 400,
    headers: {
      'Access-Control-Allow-Origin': cors,
    },
    body: JSON.stringify({ result: 'Maximum item count is 5', message: error }),
  };
  log.error('HTTP 500:', error);
  callback(null, response);
};

exports.ItemAlreadyEquipped = (error, callback) => {
  const response = {
    statusCode: 400,
    headers: {
      'Access-Control-Allow-Origin': cors,
    },
    body: JSON.stringify({ result: 'Item already equipped', message: error }),
  };
  log.error('HTTP 500:', error);
  callback(null, response);
};
