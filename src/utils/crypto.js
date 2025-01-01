const crypto = require('crypto');

exports.generateClientId = () => {
  return crypto.randomBytes(16).toString('hex');
}

exports.generateApiKey = () => {
  return crypto.randomBytes(32).toString('hex');
}

exports.generateSecretKey = () => {
  return crypto.randomBytes(64).toString('hex');
}