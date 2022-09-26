const { Schema, Types, model } = require('mongoose');

const Post = new Schema({
    userRef: Types.ObjectId,
    title: String,
    description: String,
    picture: String,
    createdOn: Date,
    updatedOn: Date,
});

module.exports = model('Post', Post);