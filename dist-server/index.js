"use strict";

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

require("./config/mongoose");

var _dotenv = _interopRequireDefault(require("dotenv"));

require("core-js/stable");

require("regenerator-runtime/runtime");

var _user = _interopRequireDefault(require("./resources/user/user.router"));

var _customer = _interopRequireDefault(require("./resources/customersList/customer.router"));

var _product = _interopRequireDefault(require("./resources/product/product.router"));

var _billing = _interopRequireDefault(require("./resources/billing/billing.router"));

var _received_stock = _interopRequireDefault(require("./resources/ReceivedStock/received_stock.router"));

var _availableStock = _interopRequireDefault(require("./resources/availableStock/availableStock.router"));

var _path = _interopRequireDefault(require("path"));

var _multer = _interopRequireDefault(require("multer"));

var _auth = require("./utils/auth");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
var cookieParser = require("cookie-parser");

var bodyParser = require("body-parser");

var app = (0, _express.default)();

_dotenv.default.config();

app.use("/uploads", _express.default.static("uploads"));
app.use(_express.default.static(_path.default.join(__dirname, "public")));
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(bodyParser.json({
  limit: "50mb"
}));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true
}));
app.use(cookieParser());

var storage = _multer.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    // rejects storing a file
    cb(null, false);
  }
};

var upload = (0, _multer.default)({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
/** Public Routes */

app.get("/", function (req, res) {
  res.send("Hello Welcome");
});
app.post("/signin", _auth.signin);
app.post("/signup", upload.single("image"), _auth.signup);
app.use("/user", _auth.protect);
app.use("/user", _user.default);
app.use("/customer", _customer.default);
app.use("/product", _product.default);
app.use("/billing", _billing.default);
app.use("/received_stock", _received_stock.default);
app.use("/available_stock", _availableStock.default);
global.CronJob = require("./cron.js");
app.portNumber = 3003;

function listen(port) {
  app.portNumber = port;
  app.listen(port, function () {
    console.log("server is running on port :" + app.portNumber);
  }).on("error", function (err) {
    if (err.errno === "EADDRINUSE") {
      console.log("----- Port is Already Busy");
    } else {
      console.log(err);
    }
  });
}

listen(app.portNumber);