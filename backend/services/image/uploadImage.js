const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const endpoint = 'https://kr.object.ncloudstorage.com';
const region = 'kr-standard';

const S3 = new AWS.S3({
  endpoint,
  region,
  credentials: {
    accessKeyId: process.env.OBJECT_STORAGE_ACCESS_KEY,
    secretAccessKey: process.env.OBJECT_STORAGE_SECRET_KEY,
  },
});

const uploadImage = async (req, res) => {
  const { file } = req;
  const fileKey = `${uuidv4()}.${file.mimetype.split('/')[1]}`;
  await S3.putObject({
    Bucket: process.env.OBJECT_STORAGE_BUCKET_NAME,
    Key: fileKey,
    ACL: 'public-read',
    Body: file.buffer,
  })
    .promise()
    .then((data) => {
      if (data.$response.httpResponse.statusCode === 200) {
        const url = [endpoint, process.env.OBJECT_STORAGE_BUCKET_NAME, fileKey].join('/');
        res.json(url);
      } else res.sendStatus(500);
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
};

module.exports = uploadImage;
