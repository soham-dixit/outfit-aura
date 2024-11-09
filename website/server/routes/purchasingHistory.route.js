import express from 'express';
import { addToGeneratedPurchasing, addToPurchasing, addToRecommendedPurchasing, getBothData, getPurchasingData } from '../controller/purchasingHistory.controller.js';
import { extractUserId } from '../middleware/extractUserId.js';

const router = express.Router();

// Add data to purchasing history table
router.post("/addToPurchasing", extractUserId, addToPurchasing);

// Get data from purchasing history table
router.get("/getPurchasing/:userId", getPurchasingData);

// Add data to recommended purchasing history table
router.put("/addToRecommendedPurchasing/:userId", addToRecommendedPurchasing);

// Add data to generated purchasing history table
router.put("/addToGeneratedPurchasing/:userId", addToGeneratedPurchasing);

// Get recommended and genrated data
router.get("/getBothData", extractUserId, getBothData);

export default router;