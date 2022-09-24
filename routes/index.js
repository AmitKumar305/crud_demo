const fs = require('fs');

const skip = 'index.js';

const files = fs.readdirSync(__dirname);

module.exports = (app) => files.map(file => file !== skip && require(`./${file}`)(app));
