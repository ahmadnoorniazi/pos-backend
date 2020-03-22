import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  sale_price: {
    type: Number,
    required: true,
  },
  actual_price: {
    type: Number,
    required: true,
  }
});

const Product = mongoose.model("product", productSchema);

export default Product;
