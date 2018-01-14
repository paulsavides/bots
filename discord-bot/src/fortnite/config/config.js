var fs = require('fs')

var configData = fs.readFileSync('./src/fortnite/config/config.json', 'utf8');

var config = JSON.parse(configData);

module.exports = config;