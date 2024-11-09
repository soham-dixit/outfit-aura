import express from 'express'
import { addToCartHistory, addToGeneratedCart, addToRecommendedCart, getBothData, getCartHistory } from '../controller/cartHistory.controller.js';
import { extractUserId } from '../middleware/extractUserId.js';

const router = express.Router();


// Add data to cart history
router.post('/addToCartHistory', extractUserId, addToCartHistory);

// Get cart history
router.get('/getCartHistory/:userId', getCartHistory);

// Add data to recommended Cart history table
router.put("/addToRecommendedCart/:userId", addToRecommendedCart);

// Add data to generated Cart history table
router.put("/addToGeneratedCart/:userId", addToGeneratedCart);

// Get recommended and genrated data
router.get("/getBothData", extractUserId, getBothData);

export default router;