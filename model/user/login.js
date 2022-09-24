const { UserModel }= require('../../schemas');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET_STRING } = require('../../constants');

module.exports = ({ email, password }) => new Promise(async (resolve, reject) => {
    try {
        const user = await UserModel.findOne({
            email,
        });

        const passwordMatched = await bcrypt.compare(password, user.password);

        let token;
        if (passwordMatched) {
            token = jwt.sign({
                name: user.name,
                email,
            },
            TOKEN_SECRET_STRING,
            {
                expiresIn: '2d',
            });
            user.token = token;
            return resolve({
                code: 200,
                data: user,
            });
        }
        return reject({
            code: 400,
            data: 'Not found',
        });

    } catch (err) {
        return reject({
            code: 400,
            data: `Some error occurred: ${err}`,
        });
    }
})