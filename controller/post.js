const { PostModel } = require('../model');
const ModelResolver = require('./resolver');

module.exports = {
    create: (req, res) => ModelResolver(req, res, PostModel.PostCreateService),
    detail: (req, res) => ModelResolver(req, res, PostModel.PostDetailService),
    list: (req, res) => ModelResolver(req, res, PostModel.PostListService),
}