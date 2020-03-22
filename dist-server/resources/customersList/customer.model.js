"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customerSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: Number
  },
  address: {
    type: String
  },
  shop_name: {
    type: String
  }
});

var Customer = _mongoose.default.model("customerList", customerSchema);

var _default = Customer;
exports.default = _default;