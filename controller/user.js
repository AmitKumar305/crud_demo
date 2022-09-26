const { UserModel } = require('../model');
const ModelResolver = require('./resolver');

module.exports = {
    signup: (req, res) => ModelResolver(req, res, UserModel.UsersSignupService),
    login: (req, res) => ModelResolver(req, res, UserModel.UsersLoginService),
    detail: (req, res) => ModelResolver(req, res, UserModel.UsersDetailService),
    update: (req, res) => ModelResolver(req, res, UserModel.UsersUpdateService),
}