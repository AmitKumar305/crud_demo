const { UserModel }= require('../../schemas');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET_STRING } = require('../../constants');

module.exports = ({ email, password }) => new Promise(async (resolve, reject) => {
    try {
        const user = await UserModel.findOne({
            email,
        });
        if (!user) {
            return reject({
                code: 400,
                data: 'User not found',
            });
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if (!passwordMatched) {
            return reject({
                code: 400,
                data: 'Invalid password',
            });
        }

        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email,
        },
        TOKEN_SECRET_STRING,
        {
            expiresIn: '365d',
        });

        return resolve({
            code: 200,
            message: 'User logged in successfully',
            data: {
                accessToken: token,
                user,
            },
        });

    } catch (err) {
        return reject({
            code: 400,
            data: `Some error occurred: ${err}`,
        });
    }
})