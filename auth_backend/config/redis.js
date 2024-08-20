const redis = require('redis');

// Buat klien Redis
const client = redis.createClient();

module.exports = client;
