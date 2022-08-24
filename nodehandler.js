// This is what the signature would look like in express
const converter = require("json-2-csv");

module.exports.formUploadHandler = async (req, res) => {
  const csv = await converter.json2csvAsync([req.body]);
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: {
      message: "Your form has been uploaded successfully",
      requestBody: req.body,
      csv,
    },
  };

  return res.send(response);
};
