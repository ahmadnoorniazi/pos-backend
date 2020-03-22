import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");

const AvailableStockSchema = new mongoose.Schema({
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
  remaining_quantity:{
    type: Number,
    required: true
  },
  isLow: {
    type: Boolean,
    required: true
  },
  time : { type : Date, default: Date.now }
});

const AvailableStock = mongoose.model("available_stock", AvailableStockSchema);

export default AvailableStock;
