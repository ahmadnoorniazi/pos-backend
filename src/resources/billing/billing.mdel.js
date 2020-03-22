import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");

const BillingSchema = new mongoose.Schema({
  total_sale_price: {
    type: Number,
    required:true
  },
  total_actual_price: {
    type: Number,
    required:true
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
    required:true
  },
  taxName: {
    type: String
  },
  taxAmount: {
    type: String
  },
  items: [
    {
      name: {
        type: String
      },
      quantity: {
        type: Number
      },
      sale_price: {
        type: Number
      },
      actual_price:{
        type: Number
      },
      type:{
        type: String
      }
    }
  ],
  time : { type : Date, default: new Date("2020-03-29T08:00:00Z")}
});

const Billing = mongoose.model("billing", BillingSchema);

export default Billing;
