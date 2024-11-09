import express from 'express';
import { addToBrowsing, addToGeneratedBrowsing, addToRecommendedBrowsing, getBothData, getBrowsingHistory } from '../controller/browsingHistory.controller.js';
import { extractUserId } from '../middleware/extractUserId.js';

const router = express.Router();

// Get data from browsing history
router.get("/getBrowsingHistory/:userId", getBrowsingHistory);

// Add data to browsing history
router.post("/addToBrowsing",extractUserId, addToBrowsing);

// Add data to recommended Browsing history table
router.put("/addToRecommendedBrowsing/:userId", addToRecommendedBrowsing);

// Add data to generated Browsing history table
router.put("/addToGeneratedBrowsing/:userId", addToGeneratedBrowsing);

// Get recommended and genrated data
router.get("/getBothData", extractUserId, getBothData);

export default router;