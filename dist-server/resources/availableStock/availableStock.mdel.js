"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwt = require("jsonwebtoken");

var AvailableStockSchema = new _mongoose.default.Schema({
  product_name: {
    type: String,
    required: true
  },
  product_id: {
    type: String,
    required: true
  },
  quantity_received: {
    type: Number,
    required: true
  },
  remaining_quantity: {
    type: Number,
    required: true
  },
  isLow: {
    type: Boolean,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});

var AvailableStock = _mongoose.default.model("available_stock", AvailableStockSchema);

var _default = AvailableStock;
exports.default = _default;