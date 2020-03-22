import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");

const ReceivedStock = new mongoose.Schema({
  product_name: {
    type: String,
    required:true
  },
  product_price: {
    type: Number,
    required:true
  },
  product_quantity: {
    type: Number,
    required:true
  },
  product_id: {
    type: String,
    required:true
  },
  total_bill_amount: {
    type: Number,
    required:true
  },
  time : { type : Date, default: Date.now }
});

const ReceivedStocks = mongoose.model("received_stock", ReceivedStock);

export default ReceivedStocks;
