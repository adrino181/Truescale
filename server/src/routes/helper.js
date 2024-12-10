const AWS = require('aws-sdk');
const fs = require('fs');
const multiparty = require('multiparty');
// let Parser = require('rss-parser');
// const googleTrends = require('google-trends-api');


// configure the keys for accessing AWS


// create S3 instance
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadFile = (buffer, name, type, contentEncoding) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.AWS_S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };

  if(contentEncoding){
    Object.assign(params, {contentEncoding})
  }
  return s3.upload(params).promise();
};

const getGoogleTrends = async () => {
  // const newsResults = await googleTrends.dailyTrends(
  //   {
  //   trendDate: new Date(),
  //   geo: 'IN',
  // });
  // return newsResults;
}


module.exports = { uploadFile, getGoogleTrends };
