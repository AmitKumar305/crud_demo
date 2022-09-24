const { UserModel } = require('../model');

module.exports = {
    signup: (req, res) => {
        const { body } = req;
        UserModel.UsersSignupService(body)
            .then((success) => {
                res.json(success);
            })
            .catch(err => res.send(err));
    },
    login: (req, res) => {
        const { body } = req;
        UserModel.UsersLoginService(body)
            .then((success) => {
                res.json(success);
            })
            .catch(err => res.send(err));
    },
    welcome: (req, res, next) => {
        UserModel.UsersWelcomeService()
            .then((success) => {
                res.json(success);
            })
            .catch((err) => {
                console.log(err);
                res.send(err)
            });
    },
}