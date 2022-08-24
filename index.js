const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const multer = require("multer");
const upload = multer();
const { formUploadHandler } = require("./nodehandler");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.use(helmet({ referrerPolicy: { policy: "strict-origin" } }));
app.use(cors());

app.post("/upload", upload.none(), formUploadHandler); // Note the middleware here
app.get("/", (req, res) => res.send({ message: "working" }));

app.listen(3579, () => {
  console.log("server listening on 3579");
});
