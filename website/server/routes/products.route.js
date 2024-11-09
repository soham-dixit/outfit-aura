import express from "express";
import {
  getProducts,
  getProductById,
} from "../controller/product.controller.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/product/:id", getProductById);

export default router;
