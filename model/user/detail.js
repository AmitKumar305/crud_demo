const { UserModel } = require('../../schemas')

module.exports = ({
    id
}) => new Promise(async (resolve, reject) => {
    try {
        const data = await UserModel.findOne({ _id: id });
        if (!data) {
            return resolve({
                code: 200,
                message: 'No user found',
            });
        }
        return resolve({
            code: 200,
            message: 'Detail of user',
            data,
        });
    } catch (err) {
        return reject({
            code: 400,
            data: 'Error in fetching user detail.',
        });
    }
});