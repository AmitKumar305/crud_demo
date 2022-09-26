const jwt = require('jsonwebtoken');
const { TOKEN_SECRET_STRING } = require('../constants');
const { UserModel } = require('../schemas');

const prepareDecodedData = ({ authorization, res }) => new Promise(async (resolve, reject) => {
    try {
        const decoded = jwt.verify(authorization, TOKEN_SECRET_STRING);
        if (decoded) {
            const { email, id } = decoded;
            userData = await UserModel.findOne({ _id: id });
            return resolve({
                id, email
            });
        }
    }
    catch {
        reject();
    }
});

const commonDecodingHandler = ({
    req,
    res,
    next,
}) => {
    const { headers: { authorization } } = req;
    if (authorization) {
        prepareDecodedData({ authorization, res })
            .then((payload) => {
                if (payload) {
                    const body = Object.assign({}, req.body, payload);
                    req.body = body;
                    return next();
                }
            }).catch(() => res.status(401).send({ code: 401, message: 'Token might be invalid or has been expired', error: 'Token Invalid.' }));
    } else {
        res.status(400).send({ code: 400, message: 'Malformed Request', error: 'Missing Headers' });
    }
};

module.exports =  (req, res, next) => commonDecodingHandler({
        req, res, next
    });
