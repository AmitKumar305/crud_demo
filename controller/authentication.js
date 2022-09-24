const jwt = require('jsonwebtoken');
const { TOKEN_SECRET_STRING } = require('../constants');

module.exports = (req, res, next) => new Promise(async (resolve, reject) => {
        const authorizationToken = req.body.token || req.query.token || req.headers["authorization"];

        if (!authorizationToken) {
            return resolve({
                code: 403,
                data: 'Authorization token is required',
            });
        }
        try {
            const decoded = jwt.verify(authorizationToken, TOKEN_SECRET_STRING);
        } catch (err) {
            return res.send('You are not a valid user');
        }
        return next();
})