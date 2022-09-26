const { PostModel } = require('../../schemas')
const ImageUpload = require('../../services/imageUpload');

module.exports = ({
    id,
    title,
    description,
    picture,
}) => new Promise(async (resolve, reject) => {
    try {
        if (!(title || description)) {
            return resolve({
                code: 400,
                message: 'Missing either of title or description field',
            });    
        }

        let pictureName;
        if (picture) {
            pictureName = `${Date.now()}.jpg`;
            await ImageUpload(picture, pictureName);
        }

        const post = new PostModel({
            userRef: id,
            title,
            description,
            picture: pictureName,
            createdOn: new Date(),
            updatedOn: new Date(),
        })
        post.save();
        return resolve({
            code: 200,
            message: 'Post created succesfully',
            data: post,
        });
    } catch (err) {
        return reject({
            code: 400,
            data: 'Error in creating post',
        });
    }
});