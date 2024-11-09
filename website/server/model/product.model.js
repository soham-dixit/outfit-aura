import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    required: true,
    unique: true,
  },
  brand: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  product_display_name: {
    type: String,
    required: true,
  },
  usage: {
    type: String,
    required: true,
  },
  occasion: {
    type: String,
  },
  product_name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("product", productSchema);

export default Product;