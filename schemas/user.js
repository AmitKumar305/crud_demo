const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    headline: String,
    bio: String,
    companyName: String,
    country: String,
    city: String,
    token: String,
});

module.exports = mongoose.model('User', User);