const { UserControllers, AuthenticationControllers } = require('../controller');

const prefix = '/user/'

module.exports = (app) => {
    app.post(`${prefix}signup`, UserControllers.signup);
    app.post(`${prefix}login`, UserControllers.login);
    app.post(`${prefix}detail`, AuthenticationControllers, UserControllers.detail);
    app.post(`${prefix}update`, AuthenticationControllers, UserControllers.update);
};