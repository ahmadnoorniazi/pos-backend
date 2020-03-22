"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwt = require("jsonwebtoken");

var BillingSchema = new _mongoose.default.Schema({
  total_sale_price: {
    type: Number,
    required: true
  },
  total_actual_price: {
    type: Number,
    required: true
  },
  customer_name: {
    type: String
  },
  customer_id: {
    type: String
  },
  total_profit: {
    type: Number
  },
  discount: {
    type: Number
  },
  paid: {
    type: Boolean,
    required: true
  },
  taxName: {
    type: String
  },
  taxAmount: {
    type: String
  },
  items: [{
    name: {
      type: String
    },
    quantity: {
      type: Number
    },
    sale_price: {
      type: Number
    },
    actual_price: {
      type: Number
    },
    type: {
      type: String
    }
  }],
  time: {
    type: Date,
    default: Date.now
  }
});

var Billing = _mongoose.default.model("billing", BillingSchema);

var _default = Billing;
exports.default = _default;