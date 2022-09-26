const { PostControllers, AuthenticationControllers } = require('../controller');
const Multipart = require('../services/multipart');

const prefix = '/post/'

module.exports = (app) => {
    app.post(`${prefix}create`, Multipart, AuthenticationControllers, PostControllers.create);
    app.post(`${prefix}detail`, AuthenticationControllers, PostControllers.detail);
    app.post(`${prefix}list`, AuthenticationControllers, PostControllers.list);
};