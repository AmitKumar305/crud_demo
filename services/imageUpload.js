const AWS = require('aws-sdk');

AWS.config.update({
    secretAccessKey: SECRET_KEY,
    accessKeyId: ACCESS_KEY,
    // region: 'YOUR_AWS_REGION',
    signatureVersion : 'v4'  //API version
});

const s3 = new AWS.S3({signatureVersion: 'v4'});


module.exports = async (picture, pictureName) => {
    const fileData = Buffer.from(picture.data);
    let params = {
        Bucket: 'amits3bucket123',
        Key: pictureName,
        Body: fileData,
    };
    
    s3.upload(params, (err, result) => {
        if(err) {
            console.log("Error", err);
        } else {
            console.log("S3 Response",result);
        }
    });
}
