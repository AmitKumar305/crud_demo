module.exports = () => new Promise(async (resolve, reject) => {
    try {
        return resolve({
            code: 200,
            data: 'Welcome Home',
        });
    } catch (err) {
        return reject({
            code: 400,
            data: 'Error in welcome',
        });
    }
});