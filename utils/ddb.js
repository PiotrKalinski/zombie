const AWS = require('aws-sdk');

const log = require('./log.js');

const dbClient = new AWS.DynamoDB.DocumentClient({ Region: process.env.MY_REGION });
const db = new AWS.DynamoDB({ Region: process.env.MY_REGION });

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
    Key: { zombiename: key },
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

exports.getZombieByName = async (table, key) => new Promise((resolve) => {
  const queryParams = {
    TableName: table,
    IndexName: 'myGSI',
    KeyConditionExpression: 'zombiename = :id',
    ExpressionAttributeValues: {
      ':id': key,
    },
  };
  dbClient.query(queryParams, (error, result) => {
    if (error || result.Count === 0) return resolve(null);
    const params = {
      Key: { id: result.Items[0].id },
      TableName: table,
    };
    return resolve(dbClient.get(params).promise());
  });
});
