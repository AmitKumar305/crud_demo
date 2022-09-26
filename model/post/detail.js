const { PostModel } = require('../../schemas')

module.exports = ({
    id,
    postRef,
}) => new Promise(async (resolve, reject) => {
    try {
        if (!postRef) {
            return resolve({
                code: 400,
                message: 'Missing field postRef',
            });    
        }
        const post = await PostModel.findOne({ _id: postRef });
        if (!post) {
            return resolve({
                code: 400,
                message: 'No post found',
            });
        }
        return resolve({
            code: 200,
            message: 'Details of post',
            data: post,
        });
    } catch (err) {
        console.log(err)
        return reject({
            code: 400,
            data: 'Error in fetching post detail.',
        });
    }
});