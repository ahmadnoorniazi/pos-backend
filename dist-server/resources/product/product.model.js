"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var productSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  sale_price: {
    type: Number,
    required: true
  },
  actual_price: {
    type: Number,
    required: true
  }
});

var Product = _mongoose.default.model("product", productSchema);

var _default = Product;
exports.default = _default;