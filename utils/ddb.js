const AWS = require('aws-sdk');

const log = require('./log.js');

const dbClient = new AWS.DynamoDB.DocumentClient({ Region: process.env.MY_REGION });
const db = new AWS.DynamoDB({ Region: process.env.MY_REGION });

exports.getAll = (table, user, startKey) => {
  const params = {
    TableName: table,
    FilterExpression: '#u = :u',
    ExpressionAttributeNames: {
      '#u': 'owner',
    },
    ExpressionAttributeValues: { ':u': `user:${user}` },
  };
  if (startKey) params.ExclusiveStartKey = startKey;
  log.info('DDB GetAll ->', params);
  return dbClient.scan(params).promise();
};

exports.get = (table, key) => {
  const params = {
    TableName: table,
    Key: { id: key },
  };
  log.info('DDB Get Item ->', params);
  return dbClient.get(params).promise();
};

exports.getByZombieId = (table, key) => {
  const params = {
    TableName: table,
    Key: { owner: key },
  };
  log.info('DDB Get Item ->', params);
  return dbClient.get(params).promise();
};


exports.put = (table, item) => {
  const params = {
    TableName: table,
    Item: item,
    RerurnValues: 'ALL_NEW',
  };
  log.info('DDB Put Item ->', params);
  return dbClient.put(params).promise();
};

exports.delete = (table, key) => {
  const params = {
    TableName: table,
    Key: { id: key },
  };
  log.info('DDB Delete Item ->', params);
  return dbClient.delete(params).promise();
};


exports.update = (item) => {
  log.info('DDB Put Item ->', item);
  return dbClient.update(item).promise();
};


exports.checkTable = (table) => {
  const params = {
    TableName: table,
  };
  return db.describeTable(params).promise();
};
