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

var _child_process = require("child_process");

var _auth = require("./utils/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('fileeeeee runnninggggggggggggggggg');
var app = (0, _express.default)();

_dotenv.default.config();

app.use((0, _cors.default)());
app.use(_express.default.json());
/** Public Routes */

app.use("/signin", _auth.signin);
app.use("/user", _user.default);
app.use("/customer", _customer.default);
app.use("/product", _product.default);
app.use("/billing", _billing.default); // app.use("/user", protect); // acts as middleware function
// app.use("/user", userRoute);
// app.use("/time", timingRoute);

var port = process.env.PORT || 3003;
app.listen(port, function () {
  return console.log("Listening on port ".concat(port, "..."));
});