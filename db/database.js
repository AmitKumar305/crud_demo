const mongoose = require('mongoose');
const { MONGO_URL } = require('../constants');
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(MONGO_URL, options, (err) => {
    if (err) {
        console.log('Database not Connected');
    } else {
        console.log('Database Connected');
    }
});

module.exports = mongoose;