const converter = require("json-2-csv");
const uuid = require("uuid");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const bucket = process.env.Bucket;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
  try {
    const csv = await converter.json2csvAsync([event.body]);
    const id = uuid();

    await s3
      .putObject({
        Bucket: bucket,
        Key: id,
        Body: csv,
        ContentType: "text/csv",
      })
      .promise();

    return {
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
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};
