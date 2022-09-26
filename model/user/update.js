const { UserModel } = require('../../schemas')

module.exports = ({
    id,
    name,
    headline,
    bio,
    companyName,
    country,
    city,
}) => new Promise(async (resolve, reject) => {
    try {
        const user = await UserModel.findOne({ _id: id });
        if (!user) {
            return reject({
                code: 400,
                message: 'No user found',
            });
        }
        const updatedUser = await UserModel.findOneAndUpdate({
            _id: id,
        }, {
            name,
            headline,
            bio,
            companyName,
            country,
            city,
        }, { new: true  });
        return resolve({
            code: 200,
            message: 'User updated succesfully',
            data: updatedUser,
        });
    } catch (err) {
        return reject({
            code: 400,
            data: 'Error in fetching user detail.',
        });
    }
});