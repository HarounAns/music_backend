'use strict';
const aws = require('aws-sdk');
const { _getUrls } = require('./helpers');

// s3 credentials
aws.config.setPromisesDependency();
aws.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
});

const s3 = new aws.S3();

/**
 * List Song Urls returns a list of songs based on bucket
 * Defaults to haroun-lofi
 */
module.exports.listSongs = async event => {
  const bucket = event.pathParameters.bucket || 'haroun-lofi';

  try {
    const response = await s3.listObjectsV2({
      Bucket: bucket
    }).promise();

    // construct urls from contents
    // const bucket = response.Name;
    const contents = response.Contents;
    const songs = _getUrls(bucket, contents)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(
        {
          status: 'OK',
          message: 'Successfully Retrieved Song URLs',
          songs: songs
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(
        {
          status: 'Error',
          message: 'Server Error',
          error: error
        },
        null,
        2
      ),
    };
  }
};

/**
 * Uploads song to a bucket defaults to haroun-lofi
 */
module.exports.uploadSong = async event => {
  const bucket = event.pathParameters.bucket || 'haroun-lofi';

  try {
    // Setting up S3 upload parameters
    const params = {
      Bucket: bucket,
      Key: 'random key', // File name you want to save as in S3
      Body: event.body
    };

    console.log(event.body.name);

    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
      if (err) {
        throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(
          {
            status: 'OK',
            message: 'Successfully Uploaded Song',
            song: event.body
          },
          null,
          2
        ),
      };
    });
  } catch (error) {
    console.log(error);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(
        {
          status: 'Error',
          message: 'Server Error',
          error: error
        },
        null,
        2
      ),
    };
  }
}