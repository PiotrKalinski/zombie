// 0 - error, 1, warn, 2, All
/* eslint-disable no-console */

const { LOG_LEVEL } = process.env;

module.exports.error = (message, object) => {
  console.log(`ERROR: ${message}`, object || '');
};

module.exports.warn = (message, object) => {
  if (LOG_LEVEL && LOG_LEVEL > 0) {
    console.log(`WARN: ${message}`, object || '');
  }
};

module.exports.info = (message, object) => {
  if (LOG_LEVEL && LOG_LEVEL > 1) {
    console.log(message, object || '');
  }
};
