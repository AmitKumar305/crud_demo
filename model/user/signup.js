const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET_STRING } = require('../../constants');
const { UserModel } = require('../../schemas');

module.exports = ({ name, email, password }) => new Promise(async (resolve, reject) => {
    try {
        // Validate the input
        if (!name || !email || !password) {
            return resolve('Input field is missing');  
        }

        // Check the existing user
        const existingUser = await UserModel.findOne({
            email,
        });
        
        if (existingUser) {
            // return resolve('This user is already registered');
            return resolve({
                code: 400,
                data: 'This user is already registered',
            });
        }

        // Encrypt the password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Store the data in DB
        const user = new UserModel({
            name,
            email, 
            password: encryptedPassword,
        });
        await user.save();

        // Generate the token
        const token = jwt.sign({
            name,
            email,
        }, 
        TOKEN_SECRET_STRING,
        {
            expiresIn: '2d',
        });
        user.token = token;

        return resolve(user, token);

    } catch(err) {
        return reject(err);
    }
})