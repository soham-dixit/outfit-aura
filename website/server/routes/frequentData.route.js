import express from 'express';
import { addToFrequentData, addToGeneratedFrequentData, addToRecommendedFrequentData, getBothData, getFrequentData } from "../controller/frequentData.controller.js";
import { extractUserId } from '../middleware/extractUserId.js';

const router = express.Router();

// Add data to FrequentData history table
router.post("/addToFrequentData", extractUserId, addToFrequentData);

// Get data from FrequentData history table
router.get("/getFrequentData/:userId", getFrequentData);

// Add data to recommended FrequentData history table
router.put("/addToRecommendedFrequentData/:userId", addToRecommendedFrequentData);

// Add data to generated FrequentData history table
router.put("/addToGeneratedFrequentData/:userId", addToGeneratedFrequentData);

// Get recommended and genrated data
router.get("/getBothData", extractUserId, getBothData);

export default router;