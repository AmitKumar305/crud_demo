const { PostModel } = require('../../schemas')

module.exports = ({
    id,
    page = 1,
    limit = 10
}) => new Promise(async (resolve, reject) => {
    try {
        const postList = await PostModel.aggregate([
            {
                $sort: {
                    createdOn: -1,
                },
            },
            {
                $skip: (page - 1) * limit,
            },
            {
                $limit: limit,
            }
        ]);

        return resolve({
            code: 200,
            message: 'Post list fetched succesfully',
            data: postList,
            page,
            limit,
            hasMore: (postList || []).length === limit,
        });
    } catch (err) {
        return reject({
            code: 400,
            data: 'Error in creating post',
        });
    }
});