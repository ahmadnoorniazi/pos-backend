"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwt = require("jsonwebtoken");

var ReceivedStock = new _mongoose.default.Schema({
  product_name: {
    type: String,
    required: true
  },
  product_price: {
    type: Number,
    required: true
  },
  product_quantity: {
    type: Number,
    required: true
  },
  product_id: {
    type: String,
    required: true
  },
  total_bill_amount: {
    type: Number,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});

var ReceivedStocks = _mongoose.default.model("received_stock", ReceivedStock);

var _default = ReceivedStocks;
exports.default = _default;