const { UserControllers, AuthenticationControllers } = require('../controller');

const prefix = '/user/'

module.exports = (app) => {
    app.post(`${prefix}signup`, UserControllers.signup);
    app.post(`${prefix}login`, UserControllers.login);
    app.post(`${prefix}welcome`, AuthenticationControllers, UserControllers.welcome);
};