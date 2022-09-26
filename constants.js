require('dotenv').config();

module.exports = {
    PORT,
    MONGO_CONNECTION_URL,
    DB,
    TOKEN_SECRET_STRING,
    ACCESS_KEY,
    SECRET_KEY,
} = process.env;

module.exports.MONGO_URL = `${MONGO_CONNECTION_URL}/${DB}`;
