require('dotenv').config();

module.exports = {
    PORT,
    MONGO_CONNECTION_URL,
    DB,
    TOKEN_SECRET_STRING,
} = process.env;

module.exports.MONGO_URL = `${MONGO_CONNECTION_URL}/${DB}`;
module.exports.TOKEN_SECRET_STRING = 'saslkalskaslakslakslak';