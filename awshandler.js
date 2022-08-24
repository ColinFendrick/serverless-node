// This is what I think it would look like in the aws architecture
const converter = require("json-2-csv");
const uuid = require("uuid");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const bucket = process.env.Bucket;

module.exports.formUploadHandler = async (event, context, callback) => {
  const csv = await converter.json2csvAsync([event.body]);
  const id = uuid();

  // Probably make this awaitable then try/catch
  s3.putObject({
    Bucket: bucket,
    Key: id,
    Body: csv,
    ContentType: "text/csv",
  }).promise();

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: {
      message: "Your form has been uploaded successfully",
      requestBody: req.body,
      id,
      csv,
    },
  };

  callback(null, response);
};
