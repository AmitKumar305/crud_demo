const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET_STRING } = require('../../constants');
const { UserModel } = require('../../schemas');

module.exports = ({ name, email, password }) => new Promise(async (resolve, reject) => {
    try {
        if (!name || !email || !password) {
            return resolve({
                code: 400,
                data: 'Required field name, email or password missing',
            });
        }
        const existingUser = await UserModel.findOne({
            email,
        });
        
        if (existingUser) {
            return resolve({
                code: 400,
                data: 'This user is already registered',
            });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({
            name,
            email, 
            password: encryptedPassword,
        });
        await user.save();

        const token = jwt.sign({
            id: user._id,
            name,
            email,
        }, 
        TOKEN_SECRET_STRING,
        {
            expiresIn: '365d',
        });
        user.token = token;

        return resolve({
            code: 200,
            message: 'User signed up successfully',
            data: {
                accessToken: user.token,
                user: {
                    name: user.name,
                    email: user.email,
                }
            },
        });

    } catch(err) {
        return reject(err);
    }
})